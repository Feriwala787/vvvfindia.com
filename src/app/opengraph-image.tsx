import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #16a34a 0%, #065f46 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700 }}>VVVF India</div>
        <div style={{ fontSize: 32, marginTop: 16, opacity: 0.9 }}>
          Vishwa Vijeta Vision Foundation
        </div>
        <div style={{ fontSize: 24, marginTop: 12, opacity: 0.7 }}>
          Empowering communities across India
        </div>
      </div>
    ),
    { ...size }
  );
}
