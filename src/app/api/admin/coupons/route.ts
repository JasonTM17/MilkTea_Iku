import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { isAuthorized, UNAUTHORIZED_HEADERS } from "@/lib/auth";

export const dynamic = "force-dynamic";

const couponSchema = z.object({
  code: z.string().min(3).max(30).regex(/^[A-Za-z0-9_-]+$/),
  description: z.string().max(200).optional().default(""),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.number().positive().max(100000),
  minOrderAmount: z.number().int().min(0).optional().default(0),
  maxUses: z.number().int().min(1).max(100000).optional().default(100),
  expiresAt: z.string().datetime().optional(),
});

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: UNAUTHORIZED_HEADERS }
    );
  }

  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(coupons);
  } catch {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: UNAUTHORIZED_HEADERS }
    );
  }

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ" },
        { status: 400 }
      );
    }

    const parsed = couponSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dữ liệu coupon không hợp lệ", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { code, description, discountType, discountValue, minOrderAmount, maxUses, expiresAt } = parsed.data;

    const existing = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } });
    if (existing) {
      return NextResponse.json({ error: "Mã coupon đã tồn tại" }, { status: 409 });
    }

    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        description: description ?? "",
        discountType,
        discountValue,
        minOrderAmount: minOrderAmount ?? 0,
        usageLimit: maxUses ?? 100,
        expiresAt: expiresAt ? new Date(expiresAt) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json(coupon, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
