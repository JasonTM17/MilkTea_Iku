import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim();

    if (!q || q.length < 1) {
      return NextResponse.json({ data: [] });
    }

    const products = await prisma.product.findMany({
      where: {
        isAvailable: true,
        name: { contains: q },
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    });

    const data = products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.basePrice,
      category: p.category?.name ?? null,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("[GET /api/search]", error);
    return NextResponse.json(
      { error: "Không thể tìm kiếm sản phẩm" },
      { status: 500 }
    );
  }
}
