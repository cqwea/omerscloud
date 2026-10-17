import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = site.brand;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#15171a", color: "#ecebe6", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 80, borderBottom: "12px solid #9fdcf5" }}>
        <div style={{ fontSize: 30, color: "#9fdcf5", marginBottom: 24 }}>{site.brand}</div>
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{site.headline}</div>
      </div>
    ),
    size,
  );
}
