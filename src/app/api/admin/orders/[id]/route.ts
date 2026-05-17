import { prisma } from "@/lib/prisma";
import { isAuthorized, UNAUTHORIZED_HEADERS } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: UNAUTHORIZED_HEADERS }
    );
  }

  try {
    const body = await request.json();
    const { status } = body;

    const validStatuses = ["pending", "confirmed", "preparing", "delivering", "completed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(order);
  } catch {
    console.error("[PATCH /api/admin/orders/:id]", { id: params.id });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
