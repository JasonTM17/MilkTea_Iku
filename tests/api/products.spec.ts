import { test, expect } from "@playwright/test";
import { API_BASE } from "../helpers/test-utils";

test.describe("Products API", () => {
  test("GET /api/products should return products", async ({ request }) => {
    const response = await request.get(`${API_BASE}/products`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data.products || data)).toBe(true);
  });

  test("GET /api/products should support pagination", async ({ request }) => {
    const response = await request.get(`${API_BASE}/products?limit=2&page=1`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    const products = data.products || data;
    expect(products.length).toBeLessThanOrEqual(2);
  });

  test("GET /api/products should filter by category", async ({ request }) => {
    const response = await request.get(`${API_BASE}/products?category=tra-sua`);
    expect(response.status()).toBe(200);
  });

  test("GET /api/categories should return categories", async ({ request }) => {
    const response = await request.get(`${API_BASE}/categories`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  test("GET /api/toppings should return toppings", async ({ request }) => {
    const response = await request.get(`${API_BASE}/toppings`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });

  test("GET /api/search should search products", async ({ request }) => {
    const response = await request.get(`${API_BASE}/search?q=matcha`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });

  test("GET /api/search should return empty for no match", async ({ request }) => {
    const response = await request.get(`${API_BASE}/search?q=xyznonexistent`);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });
});
