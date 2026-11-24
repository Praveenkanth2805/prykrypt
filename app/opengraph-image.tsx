import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PryKrypt — Your Secrets, Hidden in Pixels.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "radial-gradient(60rem 40rem at 8% -12%, rgba(139, 92, 246, 0.35), transparent 60%), radial-gradient(50rem 35rem at 100% 100%, rgba(217, 70, 239, 0.28), transparent 55%), #06030d",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "88px",
              height: "88px",
              borderRadius: "22px",
              background: "linear-gradient(135deg, #a855f7 0%, #c026d3 100%)",
              fontSize: "38px",
              fontWeight: 900,
              color: "#ffffff",
            }}
          >
            PK
          </div>
          <div style={{ fontSize: "52px", fontWeight: 800, letterSpacing: "-1px" }}>
            PryKrypt
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "56px",
            fontWeight: 900,
            letterSpacing: "-2px",
            textAlign: "center",
            lineHeight: 1.1,
            maxWidth: "1000px",
          }}
        >
          Your Secrets,{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #c084fc, #e879f9, #d8b4fe)",
              backgroundClip: "text",
              color: "transparent",
              marginLeft: "16px",
            }}
          >
            Hidden in Pixels.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "36px",
            fontSize: "26px",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          Client-side PNG steganography with optional AES-256-GCM encryption.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "48px",
            fontSize: "18px",
            color: "#64748b",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          prykrypt.vercel.app
        </div>
      </div>
    ),
    { ...size },
  );
}