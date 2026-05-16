import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Vui lòng chọn chủ đề"),
  message: z.string().min(20, "Nội dung phải có ít nhất 20 ký tự"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
      },
    });

    return NextResponse.json(
      { message: "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong 24 giờ.", id: contact.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Không thể gửi liên hệ. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
