import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword, isHashedPassword } from "@/lib/password";

describe("hashPassword", () => {
  it("returns a string starting with the scrypt$ prefix", () => {
    const hash = hashPassword("securepass");
    expect(hash).toMatch(/^scrypt\$/);
  });

  it("produces a hash with 6 dollar-sign-delimited segments", () => {
    const hash = hashPassword("securepass");
    expect(hash.split("$")).toHaveLength(6);
  });

  it("produces a different hash on each call due to random salt", () => {
    const hash1 = hashPassword("securepass");
    const hash2 = hashPassword("securepass");
    expect(hash1).not.toBe(hash2);
  });

  it("throws when the password is shorter than 8 characters", () => {
    expect(() => hashPassword("short")).toThrow("Password must be at least 8 characters");
  });

  it("throws when the password is an empty string", () => {
    expect(() => hashPassword("")).toThrow("Password must be at least 8 characters");
  });
});

describe("verifyPassword", () => {
  it("returns true when the plain password matches the hash", () => {
    const plain = "correctpassword";
    const hash = hashPassword(plain);
    expect(verifyPassword(plain, hash)).toBe(true);
  });

  it("returns false when the plain password does not match the hash", () => {
    const hash = hashPassword("correctpassword");
    expect(verifyPassword("wrongpassword", hash)).toBe(false);
  });

  it("returns false when the plain password is empty", () => {
    const hash = hashPassword("somepassword");
    expect(verifyPassword("", hash)).toBe(false);
  });

  it("returns false when the encoded hash is empty", () => {
    expect(verifyPassword("somepassword", "")).toBe(false);
  });

  it("returns false for a malformed hash string", () => {
    expect(verifyPassword("somepassword", "not-a-valid-hash")).toBe(false);
  });

  it("returns false for a hash with wrong prefix", () => {
    expect(verifyPassword("somepassword", "bcrypt$abc$def$ghi$jkl$mno")).toBe(false);
  });

  it("returns false for a hash with non-numeric N parameter", () => {
    expect(verifyPassword("somepassword", "scrypt$NaN$8$1$aabbcc$ddeeff")).toBe(false);
  });
});

describe("isHashedPassword", () => {
  it("returns true for a string produced by hashPassword", () => {
    const hash = hashPassword("testpassword");
    expect(isHashedPassword(hash)).toBe(true);
  });

  it("returns true for any string starting with scrypt$", () => {
    expect(isHashedPassword("scrypt$16384$8$1$salt$hash")).toBe(true);
  });

  it("returns false for a plain text password", () => {
    expect(isHashedPassword("plainpassword")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isHashedPassword("")).toBe(false);
  });
});
