#!/usr/bin/env node
/**
 * Local dev server for the Ask Assistant — no Vercel account needed.
 *
 * Serves the built static site from dist/ AND runs the real api/ask.ts handler
 * at /api/ask, so you get the full streaming AI experience locally.
 *
 * Prereqs:
 *   1. Build the embedding index:  npm run build:ask-index
 *   2. Build the static site:      npm run build
 *   3. Start this server:          npm run dev:ask   (loads .env via --env-file)
 *
 * Then open the URL it prints and use the Ask box. The handler reads the index
 * from public/ (process.cwd()/public), and ANTHROPIC_API_KEY / VOYAGE_API_KEY
 * from the environment (loaded from .env by the npm script).
 *
 * Note: this must run under tsx so it can import the TypeScript handler:
 *   node --import tsx --env-file=.env scripts/dev-server.mjs
 */

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const PORT = Number(process.env.PORT) || 4321;

// The Vercel handlers, written in Node req/res style. Vercel routes /api/* from
// the filesystem; here the mapping is explicit — add a line per new endpoint.
const handlers = {
  '/api/ask': (await import('../api/ask.ts')).default,
  '/api/ask-feedback': (await import('../api/ask-feedback.ts')).default,
};

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.mjs':  'text/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.txt':  'text/plain; charset=utf-8',
  '.xml':  'application/xml',
  '.wasm': 'application/wasm',
};

// Add the Express-ish helpers the Vercel handler calls (res.status().json())
function enhance(res) {
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (obj) => {
    if (!res.headersSent) res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(obj));
    return res;
  };
  return res;
}

async function serveStatic(req, res) {
  const { pathname } = new URL(req.url, 'http://localhost');

  // The build carries base=/docs-new (site-config.mjs), so every URL in the
  // output starts with it. Serve dist/ under that prefix, exactly like the
  // production httpd does, and bounce the two roots a person actually types.
  if (pathname === '/' || pathname === '/docs-new' || pathname === '/docs-new/') {
    res.statusCode = 302;
    res.setHeader('Location', '/docs-new/home/');
    res.end();
    return;
  }
  if (!pathname.startsWith('/docs-new/')) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('404 Not Found (the site is served under /docs-new/)');
    return;
  }

  const rel = decodeURIComponent(pathname.slice('/docs-new'.length));
  const candidates = [join(DIST, rel)];

  try {
    let fp = candidates[0];
    const s = await stat(fp).catch(() => null);
    if (s?.isDirectory()) fp = join(fp, 'index.html');
    else if (!s) fp = fp + '.html';   // pretty URL → file.html

    const data = await readFile(fp);
    res.setHeader('Content-Type', MIME[extname(fp)] || 'application/octet-stream');
    res.statusCode = 200;
    res.end(data);
  } catch {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('404 Not Found');
  }
}

createServer(async (req, res) => {
  enhance(res);
  const { pathname } = new URL(req.url, 'http://localhost');
  try {
    if (handlers[pathname]) {
      await handlers[pathname](req, res);
    } else {
      await serveStatic(req, res);
    }
  } catch (err) {
    console.error('Server error:', err);
    if (!res.headersSent) res.statusCode = 500;
    res.end('Internal error');
  }
}).listen(PORT, () => {
  console.log(`\n  Ask dev server running`);
  console.log(`  Site : http://localhost:${PORT}/suite/`);
  console.log(`  API  : http://localhost:${PORT}/api/ask  (POST)\n`);
  if (!process.env.VOYAGE_API_KEY)    console.warn('  ⚠  VOYAGE_API_KEY not set — did you run with --env-file=.env?');
  if (!process.env.ANTHROPIC_API_KEY) console.warn('  ⚠  ANTHROPIC_API_KEY not set — did you run with --env-file=.env?');
});
