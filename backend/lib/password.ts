import { timingSafeEqual, randomBytes, scryptSync } from "crypto";

const SCRYPT_N = 16384;
const SCRYPT_r = 8;
const SCRYPT_p = 1;
const KEY_LEN = 64;

function safeEq(a: Buffer, b: Buffer): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function hashPassword(plain: string): string {
  if (!plain || plain.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  const salt = randomBytes(16);
  const derived = scryptSync(plain, salt, KEY_LEN, {
    N: SCRYPT_N,
    r: SCRYPT_r,
    p: SCRYPT_p,
  });
  return `scrypt$${SCRYPT_N}$${SCRYPT_r}$${SCRYPT_p}$${salt.toString("hex")}$${derived.toString("hex")}`;
}

export function verifyPassword(plain: string, encoded: string): boolean {
  if (!plain || !encoded) return false;
  const parts = encoded.split("$");
  if (parts.length !== 6 || parts[0] !== "scrypt") return false;
  try {
    const N = Number(parts[1]);
    const r = Number(parts[2]);
    const p = Number(parts[3]);
    const salt = Buffer.from(parts[4], "hex");
    const expected = Buffer.from(parts[5], "hex");
    if (!Number.isFinite(N) || !Number.isFinite(r) || !Number.isFinite(p)) {
      return false;
    }
    const derived = scryptSync(plain, salt, expected.length, { N, r, p });
    return safeEq(derived, expected);
  } catch {
    return false;
  }
}

export function isHashedPassword(value: string): boolean {
  return typeof value === "string" && value.startsWith("scrypt$");
}
