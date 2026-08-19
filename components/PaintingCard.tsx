"use client";

import Link from "next/link";
import Image from "next/image";
import { type Painting, paintingUrl } from "@/lib/paintings";

export function PaintingCard({ painting }: { painting: Painting }) {
  const url = paintingUrl(painting.s3Key);

  return (
    <Link
      href={`/painting/${painting.slug}`}
      style={{
        display: "block",
        borderRadius: 14,
        overflow: "hidden",
        background: "var(--card)",
        border: "1px solid var(--border)",
        textDecoration: "none",
        color: "var(--foreground)",
        transition: "transform 150ms ease, border-color 150ms, box-shadow 150ms",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-3px)";
        el.style.borderColor = "var(--accent-glow)";
        el.style.boxShadow = "0 8px 32px rgba(212,168,83,0.15)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.borderColor = "var(--border)";
        el.style.boxShadow = "none";
      }}
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "var(--card-hover)" }}>
        <Image
          src={url}
          alt={painting.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
      </div>
      <div style={{ padding: "14px 16px 16px" }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            lineHeight: 1.3,
            marginBottom: 6,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {painting.title}
        </div>
        <div
          style={{
            fontSize: 11,
            color: "var(--foreground-muted)",
            fontFamily: "JetBrains Mono, monospace",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>{painting.year}</span>
          <span style={{ color: "var(--border)" }}>·</span>
          <span>{painting.medium}</span>
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {painting.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                padding: "2px 7px",
                borderRadius: 20,
                background: "var(--accent-dim)",
                color: "var(--accent)",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "lowercase",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
