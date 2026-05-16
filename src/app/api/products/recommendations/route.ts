import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category")?.trim();

    const where: Record<string, unknown> = { isAvailable: true };
    if (category) {
      where.category = { slug: category };
    }

    // Fetch a pool of products then pick 4 at random in JS
    // (SQLite via Prisma does not expose ORDER BY RANDOM() natively)
    const pool = await prisma.product.findMany({
      where,
      select: {
        id: true,
        name: true,
        slug: true,
        basePrice: true,
        image: true,
        isNew: true,
        isBestSeller: true,
        category: { select: { name: true, slug: true } },
      },
      take: 50,
    });

    // Fisher-Yates shuffle, then take first 4
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const recommendations = pool.slice(0, 4);

    return successResponse(recommendations);
  } catch (error) {
    console.error("[GET /api/products/recommendations]", error);
    return errorResponse("Không thể tải sản phẩm gợi ý", 500);
  }
}
