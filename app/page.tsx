import { PAINTINGS } from "@/lib/paintings";
import { GallerySearch } from "@/components/GallerySearch";
import Link from "next/link";

export const metadata = {
  title: "Gallery — SIEMA Sketch Paintings",
};

export default function GalleryPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        padding: "32px 24px 60px",
        maxWidth: 1400,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: 36 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--foreground-muted)",
            fontFamily: "JetBrains Mono, monospace",
            marginBottom: 8,
          }}
        >
          Gallery
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1
              style={{
                fontSize: 36,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--foreground)",
                lineHeight: 1.1,
              }}
            >
              SIEMA
            </h1>
            <p style={{ fontSize: 15, color: "var(--foreground-subtle)", marginTop: 6, maxWidth: 420 }}>
              Sketch paintings — AI-assisted art exploring the edge of imagination.
            </p>
          </div>
          <Link
            href="/generate"
            className="cta-generate"
          >
            ✦ Generate Your Own — $1
          </Link>
        </div>
      </header>

      {/* Stats bar */}
      <div
        style={{
          display: "flex",
          gap: 24,
          marginBottom: 28,
          padding: "12px 16px",
          borderRadius: 10,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          fontSize: 12,
          fontFamily: "JetBrains Mono, monospace",
          color: "var(--foreground-muted)",
        }}
      >
        <span style={{ color: "var(--accent)", fontWeight: 700 }}>{PAINTINGS.length}</span>
        <span>paintings</span>
        <span style={{ color: "var(--border)" }}>·</span>
        <span>4K prints from <span style={{ color: "var(--foreground-subtle)" }}>$1</span></span>
        <span style={{ color: "var(--border)" }}>·</span>
        <span>Posters from <span style={{ color: "var(--foreground-subtle)" }}>$10</span></span>
        <span style={{ color: "var(--border)" }}>·</span>
        <span>Framed from <span style={{ color: "var(--foreground-subtle)" }}>$100</span></span>
      </div>

      {/* Search + gallery grid */}
      <GallerySearch paintings={PAINTINGS} />
    </div>
  );
}
