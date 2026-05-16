import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { paginatedResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const rawPage = parseInt(searchParams.get("page") ?? "1", 10);
    const rawLimit = parseInt(searchParams.get("limit") ?? "20", 10);
    const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
    const limit = isNaN(rawLimit) || rawLimit < 1 ? 20 : Math.min(rawLimit, 100);

    const [subscribers, total] = await Promise.all([
      prisma.newsletter.findMany({
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      }),
      prisma.newsletter.count(),
    ]);

    return paginatedResponse(subscribers, total, page, limit);
  } catch (error) {
    console.error("[GET /api/newsletter/subscribers]", error);
    return errorResponse("Không thể tải danh sách người đăng ký", 500);
  }
}
