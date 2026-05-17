#!/usr/bin/env node
/**
 * Generate a strong scrypt-hashed password for ADMIN_PASSWORD_HASH.
 *
 * Usage:
 *   node scripts/generate-admin-hash.mjs "your-strong-password"
 *
 * Or interactive (recommended — does not appear in shell history):
 *   node scripts/generate-admin-hash.mjs
 */

import { randomBytes, scryptSync } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const SCRYPT_N = 16384;
const SCRYPT_r = 8;
const SCRYPT_p = 1;
const KEY_LEN = 64;

function hash(plain) {
  if (!plain || plain.length < 12) {
    console.error("Password must be at least 12 characters.");
    process.exit(1);
  }
  const salt = randomBytes(16);
  const derived = scryptSync(plain, salt, KEY_LEN, {
    N: SCRYPT_N,
    r: SCRYPT_r,
    p: SCRYPT_p,
  });
  return `scrypt$${SCRYPT_N}$${SCRYPT_r}$${SCRYPT_p}$${salt.toString("hex")}$${derived.toString("hex")}`;
}

async function main() {
  let password = process.argv[2];
  if (!password) {
    const rl = createInterface({ input, output });
    password = await rl.question("Admin password (>=12 chars): ");
    rl.close();
  }
  const encoded = hash(password.trim());
  console.log("\nADMIN_PASSWORD_HASH=\"" + encoded + "\"\n");
  console.log("Set this as a Vercel env var (Production + Preview) and a GitHub Actions secret.");
  console.log("After setting ADMIN_PASSWORD_HASH, you may unset ADMIN_PASSWORD on the server.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
