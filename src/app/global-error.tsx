"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="vi">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#fdf6ee",
          padding: "1rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 120 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ margin: "0 auto 1.5rem", display: "block" }}
          >
            <path
              d="M25 40 L30 120 Q30 130 40 130 L80 130 Q90 130 90 120 L95 40 Z"
              fill="#FDE8D0"
              stroke="#E8A87C"
              strokeWidth="2"
            />
            <rect x="20" y="32" width="80" height="12" rx="6" fill="#F5C49A" stroke="#E8A87C" strokeWidth="2" />
            <path d="M28 70 L32 120 Q32 126 40 126 L80 126 Q88 126 88 120 L92 70 Z" fill="#C2783C" opacity="0.35" />
            <circle cx="48" cy="108" r="7" fill="#7C3D12" opacity="0.55" />
            <circle cx="62" cy="115" r="6" fill="#7C3D12" opacity="0.55" />
            <circle cx="74" cy="107" r="7" fill="#7C3D12" opacity="0.55" />
            <rect x="56" y="4" width="8" height="60" rx="4" fill="#F97316" opacity="0.7" />
            <circle cx="50" cy="58" r="3" fill="#7C3D12" opacity="0.7" />
            <circle cx="70" cy="58" r="3" fill="#7C3D12" opacity="0.7" />
            <path d="M48 72 Q60 66 72 72" stroke="#7C3D12" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
            <ellipse cx="47" cy="65" rx="2" ry="3" fill="#93C5FD" opacity="0.7" />
          </svg>

          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1a1a1a", marginBottom: "0.5rem" }}>
            Ôi không! Có lỗi xảy ra
          </h1>
          <p style={{ color: "#555", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            Ly trà sữa của bạn bị đổ mất rồi. Đừng lo, hãy thử lại hoặc quay về trang chủ nhé!
          </p>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={reset}
              style={{
                background: "#d4792a",
                color: "#fff",
                border: "none",
                borderRadius: "9999px",
                padding: "0.6rem 1.5rem",
                fontSize: "0.9rem",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Thử lại
            </button>
            <a
              href="/"
              style={{
                background: "transparent",
                color: "#d4792a",
                border: "2px solid #d4792a",
                borderRadius: "9999px",
                padding: "0.6rem 1.5rem",
                fontSize: "0.9rem",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Về trang chủ
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
