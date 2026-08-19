"use client";

import { useMemo, useState } from "react";
import type { Painting } from "@/lib/paintings";
import { PaintingCard } from "@/components/PaintingCard";

export function GallerySearch({ paintings }: { paintings: Painting[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return paintings;
    return paintings.filter((p) => {
      const hay = [p.title, p.description, p.medium, ...p.tags].join(" ").toLowerCase();
      return hay.includes(term);
    });
  }, [q, paintings]);

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search titles, tags, descriptions…"
          aria-label="Search gallery"
          style={{
            width: "100%",
            maxWidth: 640,
            height: 44,
            padding: "0 16px",
            borderRadius: 12,
            background: "var(--surface)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
            fontSize: 14,
            outline: "none",
            fontFamily: "inherit",
          }}
        />
        {q && (
          <div
            style={{
              marginTop: 8,
              fontSize: 12,
              color: "var(--foreground-muted)",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            {filtered.length} match{filtered.length === 1 ? "" : "es"} for “{q}”
          </div>
        )}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        {filtered.map((p) => (
          <PaintingCard key={p.id} painting={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div
          style={{
            marginTop: 24,
            padding: "24px 16px",
            textAlign: "center",
            color: "var(--foreground-muted)",
            fontSize: 14,
            border: "1px dashed var(--border)",
            borderRadius: 12,
          }}
        >
          No paintings match your search.
        </div>
      )}
    </>
  );
}
