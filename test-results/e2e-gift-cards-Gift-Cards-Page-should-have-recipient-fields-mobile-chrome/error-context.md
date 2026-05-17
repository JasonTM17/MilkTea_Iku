# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\gift-cards.spec.ts >> Gift Cards Page >> should have recipient fields
- Location: tests\e2e\gift-cards.spec.ts:18:7

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 2
Received:    0
```

# Page snapshot

```yaml
- generic [active]:
  - alert [ref=e1]
  - dialog "Server Error" [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - navigation [ref=e8]:
          - button "previous" [disabled] [ref=e9]:
            - img "previous" [ref=e10]
          - button "next" [disabled] [ref=e12]:
            - img "next" [ref=e13]
          - generic [ref=e15]: 1 of 1 error
          - generic [ref=e16]:
            - text: Next.js (14.2.35) is outdated
            - link "(learn more)" [ref=e18] [cursor=pointer]:
              - /url: https://nextjs.org/docs/messages/version-staleness
        - heading "Server Error" [level=1] [ref=e19]
        - paragraph [ref=e20]: "TypeError: e[o] is not a function"
        - generic [ref=e21]: This error happened while generating the page. Any console logs will be displayed in the terminal window.
      - generic [ref=e22]:
        - heading "Call Stack" [level=2] [ref=e23]
        - group [ref=e24]:
          - generic "Next.js" [ref=e25] [cursor=pointer]:
            - img [ref=e26]
            - img [ref=e28]
            - text: Next.js
        - generic [ref=e33]:
          - heading "JSON.parse" [level=3] [ref=e34]
          - generic [ref=e36]: <anonymous>
        - group [ref=e37]:
          - generic "Next.js" [ref=e38] [cursor=pointer]:
            - img [ref=e39]
            - img [ref=e41]
            - text: Next.js
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Gift Cards Page", () => {
  4  |   test("should display gift card form", async ({ page }) => {
  5  |     await page.goto("/gift-cards");
  6  |     await page.waitForLoadState("networkidle");
  7  |     await expect(page.locator("main")).toBeVisible();
  8  |   });
  9  | 
  10 |   test("should have amount selection", async ({ page }) => {
  11 |     await page.goto("/gift-cards");
  12 |     await page.waitForLoadState("networkidle");
  13 |     const buttons = page.locator("button");
  14 |     const count = await buttons.count();
  15 |     expect(count).toBeGreaterThan(2);
  16 |   });
  17 | 
  18 |   test("should have recipient fields", async ({ page }) => {
  19 |     await page.goto("/gift-cards");
  20 |     await page.waitForLoadState("networkidle");
  21 |     const inputs = page.locator("input");
  22 |     const count = await inputs.count();
> 23 |     expect(count).toBeGreaterThanOrEqual(2);
     |                   ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  24 |   });
  25 | });
  26 | 
```