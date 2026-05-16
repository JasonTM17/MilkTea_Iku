import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const bestSeller = searchParams.get("bestSeller");
    const sort = searchParams.get("sort") ?? "newest";

    const rawPage = parseInt(searchParams.get("page") ?? "1", 10);
    const rawLimit = parseInt(searchParams.get("limit") ?? "12", 10);
    const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
    const limit = isNaN(rawLimit) || rawLimit < 1 ? 12 : Math.min(rawLimit, 100);

    const where: Record<string, unknown> = { isAvailable: true };

    if (category) {
      where.category = { slug: category };
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }
    if (bestSeller === "true") {
      where.isBestSeller = true;
    }

    type OrderByClause =
      | { basePrice: "asc" | "desc" }
      | { createdAt: "asc" | "desc" }
      | { orderItems: { _count: "asc" | "desc" } };

    const orderBy: OrderByClause = (() => {
      switch (sort) {
        case "price_asc":
          return { basePrice: "asc" as const };
        case "price_desc":
          return { basePrice: "desc" as const };
        case "popular":
          return { orderItems: { _count: "desc" as const } };
        case "newest":
        default:
          return { createdAt: "desc" as const };
      }
    })();

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("[GET /api/products]", error);
    return NextResponse.json(
      { error: "Không thể tải danh sách sản phẩm" },
      { status: 500 }
    );
  }
}
