import { NextRequest, NextResponse } from "next/server";
import { limiter } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    try {
      await limiter.check(10, ip);
    } catch {
      return NextResponse.json(
        { error: "Quá nhiều yêu cầu, vui lòng thử lại sau" },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Tin nhắn không hợp lệ" },
        { status: 400 }
      );
    }

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!n8nWebhookUrl) {
      return NextResponse.json({
        reply: "Xin chào! Tôi là trợ lý ảo của MilkTea Iku. Hiện tại hệ thống chatbot đang được cấu hình. Vui lòng liên hệ hotline 1900-xxxx để được hỗ trợ.",
        source: "fallback",
      });
    }

    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message.trim(), ip }),
    });

    if (!n8nResponse.ok) {
      return NextResponse.json({
        reply: "Xin lỗi, tôi không thể xử lý yêu cầu lúc này. Vui lòng thử lại sau.",
        source: "error",
      });
    }

    const data = await n8nResponse.json();

    return NextResponse.json({
      reply: data.reply || data.message || "Cảm ơn bạn đã liên hệ!",
      source: "n8n",
    });
  } catch {
    return NextResponse.json(
      { error: "Lỗi hệ thống chatbot" },
      { status: 500 }
    );
  }
}
