/**
 * API Endpoint Test Script
 * Run: npx tsx scripts/test-api-endpoints.ts
 */

const BASE = "http://localhost:3000";

interface TestResult {
  endpoint: string;
  expected: string;
  actual: number;
  status: "PASS" | "FAIL";
  note?: string;
}

const results: TestResult[] = [];

function record(
  endpoint: string,
  expected: string,
  actual: number,
  pass: boolean,
  note?: string
) {
  results.push({
    endpoint,
    expected,
    actual,
    status: pass ? "PASS" : "FAIL",
    note,
  });
}

async function get(path: string): Promise<Response> {
  return fetch(`${BASE}${path}`, { cache: "no-store" } as RequestInit);
}

async function post(path: string, body: unknown): Promise<Response> {
  return fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  } as RequestInit);
}

// ─── 1. Status code tests ────────────────────────────────────────────────────

async function runStatusTests() {
  console.log("\n── Status Code Tests ──────────────────────────────────────");

  // GET /api/products → 200
  {
    const r = await get("/api/products");
    record("GET /api/products", "200", r.status, r.status === 200);
  }

  // GET /api/categories → 200
  {
    const r = await get("/api/categories");
    record("GET /api/categories", "200", r.status, r.status === 200);
  }

  // GET /api/toppings → 200
  {
    const r = await get("/api/toppings");
    record("GET /api/toppings", "200", r.status, r.status === 200);
  }

  // GET /api/search?q=tra → 200
  {
    const r = await get("/api/search?q=tra");
    record("GET /api/search?q=tra", "200", r.status, r.status === 200);
  }

  // GET /api/health → 200
  {
    const r = await get("/api/health");
    record("GET /api/health", "200", r.status, r.status === 200);
  }

  // POST /api/contact → 200 or 201
  {
    const r = await post("/api/contact", {
      name: "Test",
      email: "test@test.com",
      phone: "0901234567",
      message: "This is a test message for contact form",
    });
    const pass = r.status === 200 || r.status === 201;
    record(
      "POST /api/contact (valid)",
      "200/201",
      r.status,
      pass
    );
  }

  // POST /api/orders → 200 or 201 or 400 or 422
  {
    const r = await post("/api/orders", {
      customerName: "Test",
      phone: "0901234567",
      address: "123 Test",
      items: [
        {
          productId: "any",
          quantity: 1,
          size: "M",
          sugar: "100",
          ice: "100",
        },
      ],
    });
    const pass = [200, 201, 400, 422].includes(r.status);
    record(
      "POST /api/orders (test body)",
      "200/201/400/422",
      r.status,
      pass
    );
  }

  // GET /api/orders/tracking?phone=0901234567 → 200 or 404 (404 = no orders in DB)
  {
    const r = await get("/api/orders/tracking?phone=0901234567");
    const pass = r.status === 200 || r.status === 404;
    record(
      "GET /api/orders/tracking?phone=...",
      "200 (or 404 if no orders)",
      r.status,
      pass
    );
  }

  // GET /api/admin/orders (no auth) → 401
  {
    const r = await get("/api/admin/orders");
    record(
      "GET /api/admin/orders (no auth)",
      "401",
      r.status,
      r.status === 401
    );
  }

  // GET /api/admin/stats (no auth) → 401
  {
    const r = await get("/api/admin/stats");
    record(
      "GET /api/admin/stats (no auth)",
      "401",
      r.status,
      r.status === 401
    );
  }

  // GET /api/admin/coupons (no auth) → 401
  {
    const r = await get("/api/admin/coupons");
    record(
      "GET /api/admin/coupons (no auth)",
      "401",
      r.status,
      r.status === 401
    );
  }
}

// ─── 2. Rate limiting test ───────────────────────────────────────────────────

async function runRateLimitTest() {
  console.log("\n── Rate Limit Test (12 rapid POST /api/contact) ───────────");

  const body = {
    name: "RateTest",
    email: "rate@test.com",
    phone: "0901234567",
    message: "This is a rate limit test message for contact form",
  };

  const responses = await Promise.all(
    Array.from({ length: 12 }, () => post("/api/contact", body))
  );

  const statuses = responses.map((r) => r.status);
  const has429 = statuses.includes(429);
  const count429 = statuses.filter((s) => s === 429).length;

  console.log(`  Statuses: ${statuses.join(", ")}`);
  console.log(`  429 responses: ${count429}/12`);

  record(
    "Rate limit: 12x POST /api/contact",
    "at least one 429",
    count429,
    has429,
    `${count429} throttled`
  );
}

// ─── 3. Response validation ──────────────────────────────────────────────────

async function runResponseValidation() {
  console.log("\n── Response Validation ─────────────────────────────────────");

  const r = await get("/api/products");
  if (r.status !== 200) {
    record(
      "GET /api/products → array with id/name/slug/basePrice",
      "200 + valid shape",
      r.status,
      false,
      "non-200 response"
    );
    return;
  }

  const json = await r.json();

  // Products endpoint returns { data: [...], pagination: {...} }
  const arr: unknown[] = Array.isArray(json)
    ? json
    : Array.isArray(json?.data)
    ? json.data
    : [];

  if (arr.length === 0) {
    record(
      "GET /api/products → array with id/name/slug/basePrice",
      "non-empty array",
      r.status,
      false,
      "empty array — no products in DB?"
    );
    return;
  }

  const first = arr[0] as Record<string, unknown>;
  const hasShape =
    "id" in first &&
    "name" in first &&
    "slug" in first &&
    "basePrice" in first;

  record(
    "GET /api/products → array with id/name/slug/basePrice",
    "array[0] has id/name/slug/basePrice",
    r.status,
    hasShape,
    hasShape
      ? `OK — ${arr.length} products`
      : `Missing fields. Keys: ${Object.keys(first).join(", ")}`
  );
}

// ─── 4. Error handling ───────────────────────────────────────────────────────

async function runErrorHandlingTests() {
  console.log("\n── Error Handling Tests ────────────────────────────────────");

  // POST /api/contact with empty body → 400 (or 429 if rate-limited from prior burst)
  {
    const r = await fetch(`${BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });
    const pass = r.status === 400 || r.status === 429;
    record(
      "POST /api/contact (empty body)",
      "400 (or 429 if rate-limited)",
      r.status,
      pass,
      r.status === 429 ? "rate-limited before validation" : undefined
    );
  }

  // GET /api/products/nonexistent-product-slug-xyz → 404
  {
    const r = await get("/api/products/nonexistent-product-slug-xyz");
    record(
      "GET /api/products/nonexistent-product-slug-xyz",
      "404",
      r.status,
      r.status === 404
    );
  }
}

// ─── Print table ─────────────────────────────────────────────────────────────

function printTable() {
  const cols = {
    endpoint: 50,
    expected: 22,
    actual: 8,
    status: 6,
    note: 35,
  };

  const pad = (s: string | number, n: number) =>
    String(s).padEnd(n).slice(0, n);

  const divider =
    "─".repeat(cols.endpoint) +
    "─┼─" +
    "─".repeat(cols.expected) +
    "─┼─" +
    "─".repeat(cols.actual) +
    "─┼─" +
    "─".repeat(cols.status) +
    "─┼─" +
    "─".repeat(cols.note);

  const header =
    pad("Endpoint", cols.endpoint) +
    " │ " +
    pad("Expected", cols.expected) +
    " │ " +
    pad("Actual", cols.actual) +
    " │ " +
    pad("Result", cols.status) +
    " │ " +
    pad("Note", cols.note);

  console.log("\n" + "═".repeat(divider.length));
  console.log(header);
  console.log(divider);

  let passed = 0;
  let failed = 0;

  for (const r of results) {
    const statusLabel = r.status === "PASS" ? "PASS" : "FAIL";
    const line =
      pad(r.endpoint, cols.endpoint) +
      " │ " +
      pad(r.expected, cols.expected) +
      " │ " +
      pad(r.actual, cols.actual) +
      " │ " +
      pad(statusLabel, cols.status) +
      " │ " +
      pad(r.note ?? "", cols.note);
    console.log(line);
    if (r.status === "PASS") passed++;
    else failed++;
  }

  console.log("═".repeat(divider.length));
  console.log(`\nTotal: ${results.length}  PASS: ${passed}  FAIL: ${failed}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\nTesting API at ${BASE}`);
  console.log("=".repeat(60));

  await runStatusTests();
  await runRateLimitTest();
  await runResponseValidation();
  await runErrorHandlingTests();

  printTable();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
