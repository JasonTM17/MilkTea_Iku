import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    let productCount = 0;
    try {
      productCount = await prisma.product.count();
    } catch (e) {
      return NextResponse.json({
        status: "unhealthy",
        database: "connected",
        error: `product count failed: ${e instanceof Error ? e.message : String(e)}`,
        cwd: process.cwd(),
        dirname: __dirname,
        dbFiles: [
          path.join(process.cwd(), "prisma", "dev.db"),
          path.join(process.cwd(), "dev.db"),
          path.join(process.cwd(), ".next", "server", "prisma-dev.db"),
          "/tmp/dev.db",
        ].map((p) => ({ path: p, exists: fs.existsSync(p), size: fs.existsSync(p) ? fs.statSync(p).size : 0 })),
      });
    }

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: "connected",
      productCount,
    });
  } catch {
    return NextResponse.json(
      { status: "unhealthy", database: "disconnected" },
      { status: 503 }
    );
  }
}
