import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DISABLED_RESPONSE = {
  success: false,
  error:
    "Wishlist API is disabled until per-user authentication is implemented. " +
    "Wishlist hiện được lưu cục bộ trong trình duyệt qua zustand. Xem docs/HONEST_SCOPE.md.",
};

export async function GET() {
  return NextResponse.json(DISABLED_RESPONSE, { status: 410 });
}

export async function POST(_request: NextRequest) {
  return NextResponse.json(DISABLED_RESPONSE, { status: 410 });
}

export async function DELETE(_request: NextRequest) {
  return NextResponse.json(DISABLED_RESPONSE, { status: 410 });
}
