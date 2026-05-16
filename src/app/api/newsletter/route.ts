import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { limiter } from "@/lib/rate-limit";

const newsletterSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
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

    const body = await request.json();
    const { email } = newsletterSchema.parse(body);

    const existing = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Email này đã đăng ký nhận tin rồi!" },
        { status: 200 }
      );
    }

    await prisma.newsletter.create({
      data: { email },
    });

    return NextResponse.json(
      { message: "Đăng ký thành công! Cảm ơn bạn đã quan tâm." },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Email không hợp lệ" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Không thể đăng ký. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
