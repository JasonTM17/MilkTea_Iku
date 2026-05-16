import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const reviewSchema = z.object({
  productId: z.string(),
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Nhận xét phải có ít nhất 10 ký tự"),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json(
      { error: "Thiếu productId" },
      { status: 400 }
    );
  }

  try {
    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    const stats = await prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true },
      _count: true,
    });

    return NextResponse.json({
      reviews,
      stats: {
        average: stats._avg.rating || 0,
        count: stats._count,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Không thể tải đánh giá" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = reviewSchema.parse(body);

    const review = await prisma.review.create({
      data: {
        productId: data.productId,
        customerName: data.name,
        rating: data.rating,
        comment: data.comment,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Không thể gửi đánh giá" },
      { status: 500 }
    );
  }
}
