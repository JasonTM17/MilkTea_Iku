import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const bestSeller = searchParams.get("bestSeller");

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

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}
