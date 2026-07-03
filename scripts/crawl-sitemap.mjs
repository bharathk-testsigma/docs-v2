/**
 * crawl-sitemap.mjs
 *
 * Full-site "zero errors" verification crawler for the docs v2 site.
 *
 * What it does:
 *   1. Fetches /sitemap.xml (or sitemap-index.xml) from the deployed site
 *   2. Visits EVERY page listed (every "entity": Suite pages, Arcus pages,
 *      changelog entries, API reference pages, etc.)
 *   3. Flags: non-200 status, redirect loops, empty/error page bodies,
 *      missing <title>, and broken internal/external links found on each page
 *   4. Writes a JSON + human-readable report and exits with code 1 if
 *      anything failed, so it can gate a soft launch in CI or a pre-flight check
 *
 * Usage:
 *   BASE_URL=https://docs-v2-alpha.vercel.app node crawl-sitemap.mjs
 *
 * Optional env vars:
 *   BASE_URL          (required) root of the deployed site
 *   CONCURRENCY        default 8   number of pages fetched in parallel
 *   CHECK_EXTERNAL     default "false"  set "true" to also validate external links
 *   TIMEOUT_MS         default 15000
 */

import { writeFile } from "node:fs/promises";

const BASE_URL = (process.env.BASE_URL || "https://docs-v2-alpha.vercel.app").replace(/\/$/, "");
const CONCURRENCY = Number(process.env.CONCURRENCY || 8);
const CHECK_EXTERNAL = (process.env.CHECK_EXTERNAL || "false") === "true";
const TIMEOUT_MS = Number(process.env.TIMEOUT_MS || 15000);

const results = [];
const visitedPages = new Set();
const externalLinkCache = new Map();

function log(...args) {
  console.log(...args);
}

async function fetchWithTimeout(url, opts = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal, redirect: "follow" });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function getSitemapUrls() {
  const candidates = ["/sitemap-index.xml", "/sitemap.xml"];
  let xml = null;
  let usedUrl = null;

  for (const path of candidates) {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}${path}`);
      if (res.ok) {
        xml = await res.text();
        usedUrl = `${BASE_URL}${path}`;
        break;
      }
    } catch {
      // try next candidate
    }
  }

  if (!xml) {
    throw new Error(
      `Could not fetch a sitemap from ${BASE_URL} (tried ${candidates.join(", ")}). ` +
      `Pass BASE_URL explicitly or confirm Starlight's sitemap integration is enabled.`
    );
  }

  // If this is a sitemap index, recurse into each child sitemap
  const childSitemaps = [...xml.matchAll(/<sitemap>\s*<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  let allUrls = [...xml.matchAll(/<url>\s*<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

  if (childSitemaps.length > 0) {
    log(`Sitemap index found at ${usedUrl} with ${childSitemaps.length} child sitemap(s).`);
    for (const child of childSitemaps) {
      const res = await fetchWithTimeout(child);
      const childXml = await res.text();
      const urls = [...childXml.matchAll(/<url>\s*<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
      allUrls = allUrls.concat(urls);
    }
  }

  return [...new Set(allUrls)];
}

function extractLinks(html, pageUrl) {
  const links = new Set();
  const hrefMatches = [...html.matchAll(/href=["']([^"'#]+)["']/g)].map((m) => m[1]);
  const srcMatches = [...html.matchAll(/src=["']([^"']+)["']/g)].map((m) => m[1]);

  for (const raw of [...hrefMatches, ...srcMatches]) {
    if (raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("javascript:")) continue;
    try {
      const resolved = new URL(raw, pageUrl).toString();
      links.add(resolved);
    } catch {
      // ignore malformed URLs
    }
  }
  return [...links];
}

function isErrorLikeBody(html) {
  const lowered = html.toLowerCase();
  const errorMarkers = [
    "404: this page could not be found",
    "404 not found",
    "500: internal server error",
    "something went wrong",
    "application error",
    "this page could not be found",
  ];
  return errorMarkers.some((marker) => lowered.includes(marker));
}

async function checkLink(url) {
  const isInternal = url.startsWith(BASE_URL);
  if (!isInternal && !CHECK_EXTERNAL) return { url, skipped: true };
  if (externalLinkCache.has(url)) return externalLinkCache.get(url);

  try {
    let res = await fetchWithTimeout(url, { method: "HEAD" });
    // some servers/CDNs don't support HEAD properly — fall back to GET
    if (res.status === 405 || res.status === 501) {
      res = await fetchWithTimeout(url, { method: "GET" });
    }
    const result = { url, status: res.status, ok: res.ok };
    if (!isInternal) externalLinkCache.set(url, result);
    return result;
  } catch (err) {
    const result = { url, status: null, ok: false, error: String(err.message || err) };
    if (!isInternal) externalLinkCache.set(url, result);
    return result;
  }
}

async function checkPage(pageUrl) {
  const entry = {
    url: pageUrl,
    status: null,
    ok: false,
    hasTitle: false,
    errorLikeBody: false,
    brokenLinks: [],
    notes: [],
  };

  try {
    const res = await fetchWithTimeout(pageUrl);
    entry.status = res.status;
    entry.ok = res.ok;

    if (!res.ok) {
      entry.notes.push(`Non-200 status: ${res.status}`);
      results.push(entry);
      return entry;
    }

    const html = await res.text();

    entry.hasTitle = /<title>[^<]{2,}<\/title>/.test(html);
    if (!entry.hasTitle) entry.notes.push("Missing or empty <title> tag");

    entry.errorLikeBody = isErrorLikeBody(html);
    if (entry.errorLikeBody) entry.notes.push("Page body contains an error/not-found marker");

    const links = extractLinks(html, pageUrl).filter((l) => !visitedPages.has(l));
    const linkChecks = await Promise.all(links.map(checkLink));
    entry.brokenLinks = linkChecks.filter((l) => l && !l.skipped && !l.ok);

    if (entry.brokenLinks.length > 0) {
      entry.notes.push(`${entry.brokenLinks.length} broken link(s) on this page`);
    }
  } catch (err) {
    entry.notes.push(`Fetch failed: ${String(err.message || err)}`);
  }

  results.push(entry);
  return entry;
}

async function runWithConcurrency(items, worker, limit) {
  const queue = [...items];
  const active = [];
  const output = [];

  async function next() {
    if (queue.length === 0) return;
    const item = queue.shift();
    const p = worker(item).then((res) => {
      output.push(res);
      active.splice(active.indexOf(p), 1);
      return next();
    });
    active.push(p);
    if (active.length < limit) return next();
    return p;
  }

  const starters = Array.from({ length: Math.min(limit, items.length) }, () => next());
  await Promise.all(starters);
  await Promise.all(active);
  return output;
}

async function main() {
  log(`Crawling ${BASE_URL} ...`);
  const urls = await getSitemapUrls();
  log(`Found ${urls.length} page(s) in the sitemap. Checking each (concurrency=${CONCURRENCY})...`);

  urls.forEach((u) => visitedPages.add(u));

  await runWithConcurrency(urls, checkPage, CONCURRENCY);

  const failed = results.filter((r) => !r.ok || r.errorLikeBody || r.brokenLinks.length > 0 || !r.hasTitle);
  const summary = {
    baseUrl: BASE_URL,
    totalPages: results.length,
    passed: results.length - failed.length,
    failed: failed.length,
    generatedAt: new Date().toISOString(),
  };

  await writeFile("crawl-report.json", JSON.stringify({ summary, results }, null, 2));

  log("\n=== CRAWL SUMMARY ===");
  log(`Base URL:      ${summary.baseUrl}`);
  log(`Pages checked: ${summary.totalPages}`);
  log(`Passed:        ${summary.passed}`);
  log(`Failed:        ${summary.failed}`);
  log(`Full report:   crawl-report.json`);

  if (failed.length > 0) {
    log("\n=== FAILURES ===");
    for (const f of failed) {
      log(`\n- ${f.url}`);
      f.notes.forEach((n) => log(`    ${n}`));
      f.brokenLinks.slice(0, 5).forEach((bl) => log(`    broken link: ${bl.url} (status ${bl.status ?? "error"})`));
      if (f.brokenLinks.length > 5) log(`    ...and ${f.brokenLinks.length - 5} more`);
    }
    log(`\nRESULT: FAILED — ${failed.length} page(s) need fixing before soft launch.`);
    process.exitCode = 1;
  } else {
    log("\nRESULT: PASSED — 0 errors across all pages. Safe to proceed with soft launch.");
  }
}

main().catch((err) => {
  console.error("Crawl script crashed:", err);
  process.exitCode = 1;
});
