import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim();

    if (!q || q.length < 1) {
      return successResponse([]);
    }

    const products = await prisma.product.findMany({
      where: {
        isAvailable: true,
        OR: [
          { name: { contains: q } },
          { description: { contains: q } },
        ],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        basePrice: true,
        image: true,
        category: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    const data = products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.basePrice,
      image: p.image,
      category: p.category?.name ?? null,
    }));

    return successResponse(data);
  } catch (error) {
    console.error("[GET /api/search]", error);
    return errorResponse("Không thể tìm kiếm sản phẩm", 500);
  }
}
