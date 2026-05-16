import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "MilkTea Iku - Trà Sữa Premium";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#fdf9f0",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "#d4792a",
            opacity: 0.12,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "#d4792a",
            opacity: 0.1,
          }}
        />

        {/* Logo bubble */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "28px",
            background: "#d4792a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            boxShadow: "0 12px 40px rgba(212,121,42,0.35)",
          }}
        >
          <span style={{ fontSize: 52, color: "#fdf9f0" }}>IKU</span>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: "#d4792a",
            letterSpacing: "-2px",
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          MilkTea Iku
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#7c5c3a",
            letterSpacing: "0.5px",
            opacity: 0.85,
          }}
        >
          Trà Sữa Premium · Mỗi ngụm là một trải nghiệm
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "#d4792a",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
