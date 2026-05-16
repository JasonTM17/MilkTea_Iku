import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";

// In-memory mock store (no DB model for wishlist yet)
const wishlistStore: Set<string> = new Set();

export async function GET() {
  try {
    const items = Array.from(wishlistStore);
    logger.info("GET /api/wishlist", { count: items.length });
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    logger.error("GET /api/wishlist failed", { error: String(error) });
    return NextResponse.json(
      { success: false, error: "Không thể tải danh sách yêu thích" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Dữ liệu không hợp lệ" },
        { status: 400 }
      );
    }

    const { productId } = body as { productId?: string };

    if (!productId || typeof productId !== "string" || productId.trim() === "") {
      return NextResponse.json(
        { success: false, error: "productId không hợp lệ" },
        { status: 400 }
      );
    }

    const id = productId.trim();

    if (wishlistStore.has(id)) {
      return NextResponse.json(
        { success: true, data: { productId: id, added: false, message: "Sản phẩm đã có trong danh sách yêu thích" } },
        { status: 200 }
      );
    }

    wishlistStore.add(id);
    logger.info("POST /api/wishlist - item added", { productId: id });

    return NextResponse.json(
      { success: true, data: { productId: id, added: true } },
      { status: 201 }
    );
  } catch (error) {
    logger.error("POST /api/wishlist failed", { error: String(error) });
    return NextResponse.json(
      { success: false, error: "Không thể thêm vào danh sách yêu thích" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId || productId.trim() === "") {
      return NextResponse.json(
        { success: false, error: "productId không hợp lệ" },
        { status: 400 }
      );
    }

    const id = productId.trim();

    if (!wishlistStore.has(id)) {
      return NextResponse.json(
        { success: false, error: "Sản phẩm không có trong danh sách yêu thích" },
        { status: 404 }
      );
    }

    wishlistStore.delete(id);
    logger.info("DELETE /api/wishlist - item removed", { productId: id });

    return NextResponse.json(
      { success: true, data: { productId: id, removed: true } },
      { status: 200 }
    );
  } catch (error) {
    logger.error("DELETE /api/wishlist failed", { error: String(error) });
    return NextResponse.json(
      { success: false, error: "Không thể xóa khỏi danh sách yêu thích" },
      { status: 500 }
    );
  }
}
