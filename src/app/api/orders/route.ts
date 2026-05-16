import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const orderSchema = z.object({
  customerName: z.string().min(2),
  phone: z.string().min(9),
  address: z.string().optional(),
  note: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string(),
      size: z.string(),
      quantity: z.number().min(1),
      sugarLevel: z.number(),
      iceLevel: z.number(),
      toppings: z.array(z.string()),
      subtotal: z.number(),
    })
  ),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = orderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid order data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { items, ...orderData } = parsed.data;
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
    include: { items: true },
  });

  return NextResponse.json(order, { status: 201 });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get("phone");

  const where: Record<string, unknown> = {};
  if (phone) {
    where.phone = { contains: phone };
  }

  const orders = await prisma.order.findMany({
    where,
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}
