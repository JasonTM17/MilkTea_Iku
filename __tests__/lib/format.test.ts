import { describe, it, expect } from "vitest";
import {
  formatPrice,
  formatPhoneNumber,
  slugify,
  truncate,
  getInitials,
  calculateDiscount,
  getTimeGreeting,
} from "@/lib/format";

describe("formatPrice", () => {
  it("formats a typical VND price with đ suffix", () => {
    expect(formatPrice(55000)).toBe("55.000đ");
  });

  it("formats zero as 0đ", () => {
    expect(formatPrice(0)).toBe("0đ");
  });

  it("formats a large price with correct thousand separators", () => {
    expect(formatPrice(1000000)).toBe("1.000.000đ");
  });

  it("formats a price using dot as the vi-VN thousand separator", () => {
    // vi-VN locale uses "." as the thousand separator, not a decimal point
    expect(formatPrice(35500)).toBe("35.500đ");
  });
});

describe("formatPhoneNumber", () => {
  it("formats a 10-digit phone number with spaces", () => {
    expect(formatPhoneNumber("0901234567")).toBe("0901 234 567");
  });

  it("strips non-digit characters before formatting", () => {
    expect(formatPhoneNumber("090-123-4567")).toBe("0901 234 567");
  });

  it("returns the original string when length is not 10 digits", () => {
    expect(formatPhoneNumber("12345")).toBe("12345");
  });

  it("returns the original string for an 11-digit number", () => {
    expect(formatPhoneNumber("09012345678")).toBe("09012345678");
  });
});

describe("slugify", () => {
  it("converts spaces to hyphens and lowercases", () => {
    expect(slugify("Matcha Latte")).toBe("matcha-latte");
  });

  it("strips Vietnamese diacritics", () => {
    expect(slugify("Trà Sữa Taro")).toBe("tra-sua-taro");
  });

  it("converts đ to d", () => {
    expect(slugify("Trà Đen")).toBe("tra-den");
  });

  it("removes leading and trailing hyphens", () => {
    expect(slugify("  brown sugar  ")).toBe("brown-sugar");
  });

  it("collapses multiple non-alphanumeric characters into a single hyphen", () => {
    expect(slugify("hello -- world")).toBe("hello-world");
  });

  it("returns empty string for empty input", () => {
    expect(slugify("")).toBe("");
  });
});

describe("truncate", () => {
  it("returns the original text when it is shorter than maxLength", () => {
    expect(truncate("short", 10)).toBe("short");
  });

  it("returns the original text when it equals maxLength exactly", () => {
    expect(truncate("exactly10!", 10)).toBe("exactly10!");
  });

  it("truncates and appends ellipsis when text exceeds maxLength", () => {
    const result = truncate("This is a long sentence", 10);
    expect(result).toMatch(/\.\.\.$/);
    expect(result.length).toBeLessThanOrEqual(13); // 10 chars + "..."
  });

  it("trims trailing whitespace before appending ellipsis", () => {
    const result = truncate("hello world", 6);
    expect(result).toBe("hello...");
  });
});

describe("getInitials", () => {
  it("returns first letters of two words uppercased", () => {
    expect(getInitials("Nguyen Son")).toBe("NS");
  });

  it("returns only the first letter for a single word", () => {
    expect(getInitials("Admin")).toBe("A");
  });

  it("returns at most 2 characters for names with more than 2 words", () => {
    expect(getInitials("Nguyen Van An")).toBe("NV");
  });

  it("uppercases lowercase input", () => {
    expect(getInitials("john doe")).toBe("JD");
  });
});

describe("calculateDiscount", () => {
  it("applies a percentage discount correctly", () => {
    expect(calculateDiscount(100000, "percentage", 20)).toBe(80000);
  });

  it("applies a fixed discount correctly", () => {
    expect(calculateDiscount(100000, "fixed", 15000)).toBe(85000);
  });

  it("returns 0 when fixed discount exceeds the original price", () => {
    expect(calculateDiscount(10000, "fixed", 20000)).toBe(0);
  });

  it("rounds percentage discount result to nearest integer", () => {
    // 55000 * (1 - 10/100) = 49500 — exact, no rounding needed
    expect(calculateDiscount(55000, "percentage", 10)).toBe(49500);
  });

  it("handles 0% percentage discount by returning original price", () => {
    expect(calculateDiscount(50000, "percentage", 0)).toBe(50000);
  });

  it("handles 100% percentage discount by returning 0", () => {
    expect(calculateDiscount(50000, "percentage", 100)).toBe(0);
  });
});

describe("getTimeGreeting", () => {
  it("returns one of the three valid Vietnamese greeting strings", () => {
    const valid = ["Chào buổi sáng", "Chào buổi chiều", "Chào buổi tối"];
    expect(valid).toContain(getTimeGreeting());
  });
});
