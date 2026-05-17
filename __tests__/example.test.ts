/**
 * Smoke tests that verify the Vitest setup works and the most-used
 * utilities from backend/lib/format.ts are importable and correct.
 * Detailed coverage lives in __tests__/lib/*.test.ts.
 */

import { describe, it, expect } from "vitest";
import { formatPrice, slugify, calculateDiscount } from "@/lib/format";
import { sanitizeHtml } from "@/lib/sanitize";

describe("formatPrice (smoke)", () => {
  it("formats a VND amount with đ suffix", () => {
    expect(formatPrice(55000)).toBe("55.000đ");
  });

  it("formats zero as 0đ", () => {
    expect(formatPrice(0)).toBe("0đ");
  });
});

describe("slugify (smoke)", () => {
  it("converts spaces to hyphens and lowercases", () => {
    expect(slugify("Matcha Latte")).toBe("matcha-latte");
  });

  it("strips Vietnamese diacritics", () => {
    expect(slugify("Trà Sữa Taro")).toBe("tra-sua-taro");
  });

  it("converts đ to d", () => {
    expect(slugify("Trà Đen")).toBe("tra-den");
  });
});

describe("calculateDiscount (smoke)", () => {
  it("applies a percentage discount", () => {
    expect(calculateDiscount(100000, "percentage", 20)).toBe(80000);
  });

  it("applies a fixed discount", () => {
    expect(calculateDiscount(100000, "fixed", 15000)).toBe(85000);
  });

  it("clamps fixed discount to 0 when it exceeds the price", () => {
    expect(calculateDiscount(10000, "fixed", 20000)).toBe(0);
  });
});

describe("sanitizeHtml (smoke)", () => {
  it("escapes a basic XSS script tag", () => {
    expect(sanitizeHtml("<script>alert(1)</script>")).toBe(
      "&lt;script&gt;alert(1)&lt;/script&gt;"
    );
  });
});
