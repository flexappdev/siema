"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PAINTINGS } from "@/lib/paintings";

export function Footer() {
  const router = useRouter();

  function randomPainting() {
    const p = PAINTINGS[Math.floor(Math.random() * PAINTINGS.length)];
    if (p) router.push(`/painting/${p.slug}`);
  }

  return (
    <footer
      style={{
        position: "sticky",
        bottom: 0,
        left: 64,
        right: 0,
        zIndex: 30,
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "0 20px",
        background: "var(--nav-bg)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--foreground-muted)",
          fontFamily: "JetBrains Mono, monospace",
        }}
      >
        SIEMA · {PAINTINGS.length} paintings
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Link
          href="/paintings"
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "var(--foreground-subtle)",
            padding: "7px 12px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            textDecoration: "none",
          }}
        >
          Index
        </Link>
        <button
          type="button"
          onClick={randomPainting}
          aria-label="Open a random painting"
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#ffffff",
            background: "var(--accent)",
            padding: "8px 14px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          ⚄ Random Painting
        </button>
      </div>
    </footer>
  );
}
