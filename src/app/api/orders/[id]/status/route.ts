import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { logger } from "@/lib/logger";
import { isAuthorized, UNAUTHORIZED_HEADERS } from "@/lib/auth";

export const dynamic = "force-dynamic";

const VALID_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "DELIVERING",
  "COMPLETED",
  "CANCELLED",
] as const;

type OrderStatus = (typeof VALID_STATUSES)[number];

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
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return errorResponse("Dữ liệu không hợp lệ", 400);
    }

    const { status } = body as { status?: string };

    if (!status || !VALID_STATUSES.includes(status as OrderStatus)) {
      return errorResponse(
        `Trạng thái không hợp lệ. Các giá trị hợp lệ: ${VALID_STATUSES.join(", ")}`,
        400
      );
    }

    const { id } = params;

    const existing = await prisma.order.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse("Không tìm thấy đơn hàng", 404);
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status },
    });

    logger.info("PATCH /api/orders/[id]/status - status updated", {
      orderId: id,
      oldStatus: existing.status,
      newStatus: status,
    });

    return successResponse(updated);
  } catch (error) {
    logger.error("PATCH /api/orders/[id]/status failed", {
      error: String(error),
      orderId: params.id,
    });
    return errorResponse("Không thể cập nhật trạng thái đơn hàng", 500);
  }
}
