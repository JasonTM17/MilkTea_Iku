import { NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";
import { isHashedPassword, verifyPassword } from "./password";

function safeEq(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

function checkAdminPassword(plain: string): boolean {
  const hashed = process.env.ADMIN_PASSWORD_HASH;
  if (hashed && isHashedPassword(hashed)) {
    return verifyPassword(plain, hashed);
  }
  const fallback = process.env.ADMIN_PASSWORD;
  if (!fallback) return false;
  return safeEq(plain, fallback);
}

export function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const adminUser = process.env.ADMIN_USERNAME;
  const adminToken = process.env.ADMIN_API_TOKEN;

  if (authHeader.startsWith("Basic ")) {
    if (!adminUser) return false;
    const decoded = Buffer.from(authHeader.slice(6), "base64").toString();
    const sep = decoded.indexOf(":");
    if (sep === -1) return false;
    const user = decoded.slice(0, sep);
    const pass = decoded.slice(sep + 1);
    if (!user || !pass) return false;
    return safeEq(user, adminUser) && checkAdminPassword(pass);
  }

  if (authHeader.startsWith("Bearer ")) {
    if (!adminToken) return false;
    const token = authHeader.slice(7);
    return safeEq(token, adminToken);
  }

  return false;
}

export const UNAUTHORIZED_HEADERS = {
  "WWW-Authenticate": 'Basic realm="Admin"',
};
