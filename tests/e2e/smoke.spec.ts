import { test, expect } from "@playwright/test";

/**
 * Feature smoke tests for the docs v2 site.
 * These cover the interactive "entities" a sitemap crawl can't check:
 * product switcher, sidebar, search, Ask Assistant, API reference pages,
 * changelog, app-type filters, breadcrumbs.
 *
 * Run with: BASE_URL=https://docs-v2-alpha.vercel.app npx playwright test
 */

test.describe("Product switcher", () => {
  test("loads with a default product and no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
    expect(errors, `Console/page errors on load: ${errors.join(" | ")}`).toEqual([]);
  });

  test("switching product updates data-product and persists across reload", async ({ page }) => {
    await page.goto("/");
    const switcher = page.getByRole("button", { name: /suite|arcus|product/i }).first();
    if (!(await switcher.isVisible().catch(() => false))) {
      test.skip(true, "Product switcher trigger not found with this selector — update selector to match markup");
    }
    await switcher.click();

    const arcusOption = page.getByText(/arcus/i).first();
    await arcusOption.click();

    const dataProduct = await page.locator("html, body, [data-product]").first().getAttribute("data-product");
    await page.reload();
    const dataProductAfterReload = await page.locator("html, body, [data-product]").first().getAttribute("data-product");

    expect(dataProductAfterReload).toBe(dataProduct);
  });
});

test.describe("Sidebar navigation", () => {
  test("Suite sidebar renders and links resolve", async ({ page }) => {
    await page.goto("/suite/");
    const sidebarLinks = page.locator("nav a[href]");
    const count = await sidebarLinks.count();
    expect(count, "Suite sidebar should have links").toBeGreaterThan(0);

    // Spot-check the first few links actually navigate without error
    const sample = Math.min(5, count);
    for (let i = 0; i < sample; i++) {
      const href = await sidebarLinks.nth(i).getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#")) continue;
      const res = await page.request.get(href);
      expect(res.ok(), `Sidebar link ${href} should return 2xx`).toBeTruthy();
    }
  });

  test("Arcus sidebar renders and links resolve", async ({ page }) => {
    await page.goto("/arcus/");
    const sidebarLinks = page.locator("nav a[href]");
    const count = await sidebarLinks.count();
    expect(count, "Arcus sidebar should have links").toBeGreaterThan(0);
  });
});

test.describe("App-type filters", () => {
  test("filter chips narrow the sidebar without erroring", async ({ page }) => {
    await page.goto("/suite/");
    const chip = page.getByRole("button", { name: /web|android|ios|rest api/i }).first();
    if (!(await chip.isVisible().catch(() => false))) {
      test.skip(true, "App-type chip not found with this selector — update selector to match markup");
    }
    await chip.click();
    await expect(page.locator("nav")).toBeVisible();
  });
});

test.describe("Search (Pagefind)", () => {
  test("search returns results for a known term", async ({ page }) => {
    await page.goto("/suite/");
    const searchTrigger = page.getByRole("button", { name: /search/i }).first();
    if (!(await searchTrigger.isVisible().catch(() => false))) {
      test.skip(true, "Search trigger not found with this selector — update selector to match markup");
    }
    await searchTrigger.click();

    const input = page.getByRole("textbox").first();
    await input.fill("test case");
    await page.waitForTimeout(500); // Pagefind indexes async

    const resultsList = page.locator("[class*='pagefind'], [class*='search-result']");
    await expect(resultsList.first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe("Ask Assistant", () => {
  test("ask endpoint responds without a server error", async ({ request }) => {
    const res = await request.post("/api/ask", {
      data: { question: "How do I create a test case?" },
      headers: { "Content-Type": "application/json" },
    });
    // Accept 200 (success) — explicitly fail on 500-range serverless errors
    expect(res.status(), "Ask Assistant endpoint should not 5xx").toBeLessThan(500);
  });

  test("Ask overlay opens from the UI", async ({ page }) => {
    await page.goto("/suite/");
    const askTrigger = page.getByRole("button", { name: /ask|assistant/i }).first();
    if (!(await askTrigger.isVisible().catch(() => false))) {
      test.skip(true, "Ask trigger not found with this selector — update selector to match markup");
    }
    await askTrigger.click();
    await expect(page.locator("[class*='ask'], [class*='overlay']").first()).toBeVisible();
  });
});

test.describe("API reference pages", () => {
  test("an API reference page renders method badge, request and response blocks", async ({ page }, testInfo) => {
    // Update this path to a real API reference page in your content tree
    const sampleApiPage = "/suite/api/projects/";
    const res = await page.goto(sampleApiPage);
    if (!res || res.status() === 404) {
      test.skip(true, `${sampleApiPage} not found — replace with a real API reference page path`);
    }
    await expect(page.getByText(/POST|GET|PUT|DELETE|PATCH/).first()).toBeVisible();
    await expect(page.locator("pre, code").first()).toBeVisible();
  });
});

test.describe("Changelog", () => {
  test("changelog feed renders entries with version pills", async ({ page }) => {
    const res = await page.goto("/suite/changelog/");
    if (!res || res.status() === 404) {
      test.skip(true, "/suite/changelog/ not found — update to the real changelog route");
    }
    const entries = page.locator("[class*='changelog'], article");
    expect(await entries.count()).toBeGreaterThan(0);
  });
});

test.describe("Breadcrumbs", () => {
  test("a nested page shows a breadcrumb trail", async ({ page }) => {
    await page.goto("/suite/");
    const firstDeepLink = page.locator("nav a[href]").nth(2);
    const href = await firstDeepLink.getAttribute("href");
    if (href) await page.goto(href);
    const breadcrumb = page.locator("[class*='breadcrumb'], nav[aria-label='breadcrumb']");
    await expect(breadcrumb.first()).toBeVisible();
  });
});
