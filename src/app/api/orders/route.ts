import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { limiter } from "@/lib/rate-limit";

const orderItemSchema = z.object({
  productId: z.string().min(1, "ID sản phẩm không hợp lệ"),
  size: z.string().min(1, "Kích cỡ không hợp lệ"),
  quantity: z.number().int().min(1, "Số lượng phải ít nhất là 1"),
  sugarLevel: z.number().int().min(0).max(100),
  iceLevel: z.number().int().min(0).max(100),
  toppings: z.array(z.string()),
  subtotal: z.number().int().min(0, "Thành tiền không hợp lệ"),
});

const orderSchema = z.object({
  customerName: z.string().min(2, "Tên khách hàng phải có ít nhất 2 ký tự"),
  phone: z.string().min(9, "Số điện thoại không hợp lệ"),
  address: z.string().optional(),
  note: z.string().optional(),
  items: z
    .array(orderItemSchema)
    .min(1, "Đơn hàng phải có ít nhất một sản phẩm"),
});

export async function POST(request: NextRequest) {
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

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Dữ liệu gửi lên không hợp lệ" },
        { status: 400 }
      );
    }

    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstMessage =
        Object.values(fieldErrors).flat()[0] ??
        parsed.error.flatten().formErrors[0] ??
        "Dữ liệu đơn hàng không hợp lệ";

      return NextResponse.json(
        {
          error: firstMessage,
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { items, ...orderData } = parsed.data;

    // Verify all products exist and are available
    const productIds = Array.from(new Set(items.map((i) => i.productId)));
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, isAvailable: true },
      select: { id: true },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { error: "Một hoặc nhiều sản phẩm không tồn tại hoặc đã ngừng bán" },
        { status: 422 }
      );
    }

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    const order = await prisma.order.create({
      data: {
        ...orderData,
        address: orderData.address ?? "",
        total,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            size: item.size,
            quantity: item.quantity,
            sugarLevel: item.sugarLevel,
            iceLevel: item.iceLevel,
            toppings: JSON.stringify(item.toppings),
            subtotal: item.subtotal,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("[POST /api/orders]", error);
    return NextResponse.json(
      { error: "Không thể tạo đơn hàng, vui lòng thử lại" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");

    const rawPage = parseInt(searchParams.get("page") ?? "1", 10);
    const rawLimit = parseInt(searchParams.get("limit") ?? "10", 10);
    const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
    const limit = isNaN(rawLimit) || rawLimit < 1 ? 10 : Math.min(rawLimit, 50);

    const where: Record<string, unknown> = {};
    if (phone) {
      where.phone = { contains: phone };
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({
      data: orders,
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
    console.error("[GET /api/orders]", error);
    return NextResponse.json(
      { error: "Không thể tải danh sách đơn hàng" },
      { status: 500 }
    );
  }
}
