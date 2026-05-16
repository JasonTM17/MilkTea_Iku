import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

function getDatabaseUrl(): string {
  if (process.env.VERCEL) {
    const tmpDb = "/tmp/dev.db";

    if (!fs.existsSync(tmpDb)) {
      const possibleSources = [
        path.join(process.cwd(), "prisma", "dev.db"),
        path.join(process.cwd(), "dev.db"),
        path.join(__dirname, "..", "..", "prisma", "dev.db"),
        path.join(__dirname, "..", "..", "..", "prisma", "dev.db"),
      ];

      for (const src of possibleSources) {
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, tmpDb);
          break;
        }
      }
    }

    if (fs.existsSync(tmpDb)) {
      return `file:${tmpDb}`;
    }
  }

  return process.env.DATABASE_URL || "file:./prisma/dev.db";
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: { url: getDatabaseUrl() },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
