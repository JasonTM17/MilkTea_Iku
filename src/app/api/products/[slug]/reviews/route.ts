import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { limiter } from "@/lib/rate-limit";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const rawLimit = parseInt(searchParams.get("limit") || "10");
    const limit = Math.min(Math.max(rawLimit, 1), 50);
    const skip = (page - 1) * limit;

    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
    });

    if (!product) {
      return NextResponse.json({ error: "Sản phẩm không tồn tại" }, { status: 404 });
    }

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { productId: product.id },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.review.count({ where: { productId: product.id } }),
    ]);

    const stats = await prisma.review.aggregate({
      where: { productId: product.id },
      _avg: { rating: true },
      _count: true,
    });

    return NextResponse.json({
      reviews,
      stats: {
        average: stats._avg.rating || 0,
        total: stats._count,
      },
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    try {
      await limiter.check(5, ip);
    } catch {
      return NextResponse.json(
        { error: "Quá nhiều yêu cầu, vui lòng thử lại sau" },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { rating, name, comment } = body;

    if (!rating || !name || !comment) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating phải từ 1-5" }, { status: 400 });
    }

    if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json({ error: "Tên phải từ 2-100 ký tự" }, { status: 400 });
    }

    if (typeof comment !== "string" || comment.trim().length < 5 || comment.trim().length > 1000) {
      return NextResponse.json({ error: "Bình luận phải từ 5-1000 ký tự" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
    });

    if (!product) {
      return NextResponse.json({ error: "Sản phẩm không tồn tại" }, { status: 404 });
    }

    const review = await prisma.review.create({
      data: {
        productId: product.id,
        rating,
        customerName: name.trim(),
        comment: comment.trim(),
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
