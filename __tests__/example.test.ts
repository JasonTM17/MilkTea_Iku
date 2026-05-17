/**
 * Example unit test — verifies the Vitest setup is working correctly.
 * Replace or extend with real utility tests as the project grows.
 */

import { describe, it, expect } from "vitest";

// --- simple pure-function helpers used across the app ---

function formatPrice(amount: number, currency = "VND"): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

// --- tests ---

describe("formatPrice", () => {
  it("formats a VND amount with currency symbol", () => {
    const result = formatPrice(55000);
    expect(result).toContain("55.000");
    expect(result).toContain("₫");
  });

  it("formats zero correctly", () => {
    const result = formatPrice(0);
    expect(result).toContain("0");
  });
});

describe("clamp", () => {
  it("returns value when within range", () => {
    expect(clamp(5, 1, 10)).toBe(5);
  });

  it("clamps to min when below range", () => {
    expect(clamp(0, 1, 10)).toBe(1);
  });

  it("clamps to max when above range", () => {
    expect(clamp(15, 1, 10)).toBe(10);
  });
});

describe("slugify", () => {
  it("converts spaces to hyphens", () => {
    expect(slugify("Trà Sữa Taro")).toBe("tr-sa-taro");
  });

  it("lowercases the result", () => {
    expect(slugify("MATCHA LATTE")).toBe("matcha-latte");
  });

  it("trims leading and trailing whitespace", () => {
    expect(slugify("  brown sugar  ")).toBe("brown-sugar");
  });
});
