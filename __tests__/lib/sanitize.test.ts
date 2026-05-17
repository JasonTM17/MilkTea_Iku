import { describe, it, expect } from "vitest";
import { sanitizeHtml, sanitizeInput } from "@/lib/sanitize";

describe("sanitizeHtml", () => {
  it("escapes ampersands", () => {
    expect(sanitizeHtml("bread & butter")).toBe("bread &amp; butter");
  });

  it("escapes less-than signs", () => {
    expect(sanitizeHtml("<script>")).toBe("&lt;script&gt;");
  });

  it("escapes greater-than signs", () => {
    expect(sanitizeHtml("a > b")).toBe("a &gt; b");
  });

  it("escapes double quotes", () => {
    expect(sanitizeHtml('say "hello"')).toBe("say &quot;hello&quot;");
  });

  it("escapes single quotes", () => {
    expect(sanitizeHtml("it's fine")).toBe("it&#x27;s fine");
  });

  it("escapes a full XSS payload", () => {
    const input = `<img src="x" onerror='alert(1)'>`;
    const result = sanitizeHtml(input);
    expect(result).not.toContain("<");
    expect(result).not.toContain(">");
    expect(result).not.toContain('"');
    expect(result).not.toContain("'");
  });

  it("returns an empty string unchanged", () => {
    expect(sanitizeHtml("")).toBe("");
  });

  it("leaves plain text without special characters unchanged", () => {
    expect(sanitizeHtml("hello world")).toBe("hello world");
  });
});

describe("sanitizeInput", () => {
  it("trims leading whitespace", () => {
    expect(sanitizeInput("   hello")).toBe("hello");
  });

  it("trims trailing whitespace", () => {
    expect(sanitizeInput("hello   ")).toBe("hello");
  });

  it("collapses multiple internal spaces into a single space", () => {
    expect(sanitizeInput("hello   world")).toBe("hello world");
  });

  it("collapses tabs and newlines into a single space", () => {
    expect(sanitizeInput("hello\t\nworld")).toBe("hello world");
  });

  it("returns an empty string for a whitespace-only input", () => {
    expect(sanitizeInput("   ")).toBe("");
  });

  it("leaves already-clean input unchanged", () => {
    expect(sanitizeInput("clean input")).toBe("clean input");
  });
});
