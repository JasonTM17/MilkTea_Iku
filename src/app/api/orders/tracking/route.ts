import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { phoneSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");
  const phone = searchParams.get("phone");

  if (!orderId && !phone) {
    return NextResponse.json(
      { error: "Vui lòng cung cấp mã đơn hàng hoặc số điện thoại" },
      { status: 400 }
    );
  }

  if (phone && !orderId) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return NextResponse.json(
        { error: "Số điện thoại không hợp lệ" },
        { status: 400 }
      );
    }
  }

  try {
    const where = orderId
      ? { id: orderId }
      : { phone: phone! };

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    if (orders.length === 0) {
      return NextResponse.json(
        { error: "Không tìm thấy đơn hàng" },
        { status: 404 }
      );
    }

    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json(
      { error: "Không thể tra cứu đơn hàng" },
      { status: 500 }
    );
  }
}
