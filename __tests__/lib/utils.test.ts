import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn (class name merger)", () => {
  it("returns a single class name unchanged", () => {
    expect(cn("text-red-500")).toBe("text-red-500");
  });

  it("merges multiple class names with a space", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("resolves conflicting Tailwind classes by keeping the last one", () => {
    // tailwind-merge should resolve p-4 vs p-2 in favour of the last
    expect(cn("p-4", "p-2")).toBe("p-2");
  });

  it("ignores falsy conditional values", () => {
    expect(cn("base", false && "hidden", undefined, null, "extra")).toBe("base extra");
  });

  it("handles object syntax from clsx", () => {
    expect(cn({ "font-bold": true, "font-normal": false })).toBe("font-bold");
  });

  it("returns an empty string when no arguments are provided", () => {
    expect(cn()).toBe("");
  });

  it("deduplicates conflicting text-color utilities", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });
});
