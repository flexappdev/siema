"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import type { Painting } from "@/lib/paintings";
import { paintingUrl } from "@/lib/paintings";

export function PaintingsIndex({
  paintings,
  searchParams,
}: {
  paintings: Painting[];
  searchParams: Promise<{ q?: string }>;
}) {
  const params = use(searchParams);
  const [q, setQ] = useState(params.q ?? "");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return paintings;
    return paintings.filter((p) => {
      const hay = [p.id, p.slug, p.title, p.description, p.medium, `${p.year}`, ...p.tags].join(" ").toLowerCase();
      return hay.includes(term);
    });
  }, [q, paintings]);

  const tdBase: React.CSSProperties = {
    padding: "10px 12px",
    fontSize: 12,
    color: "var(--foreground-subtle)",
    borderTop: "1px solid var(--border)",
    verticalAlign: "top",
  };
  const th: React.CSSProperties = {
    padding: "10px 12px",
    fontSize: 10,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--foreground-muted)",
    fontFamily: "JetBrains Mono, monospace",
    textAlign: "left",
    borderBottom: "1px solid var(--border)",
    background: "var(--surface)",
    position: "sticky",
    top: 56,
  };

  return (
    <div style={{ padding: "32px 24px 60px", maxWidth: 1400, margin: "0 auto" }}>
      <header style={{ marginBottom: 24 }}>
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
          Index
        </div>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--foreground)",
            lineHeight: 1.1,
          }}
        >
          All Paintings
        </h1>
        <p style={{ fontSize: 14, color: "var(--foreground-subtle)", marginTop: 6 }}>
          {paintings.length} works · complete metadata (id, slug, year, medium, dimensions, tags, S3 key).
        </p>
      </header>

      <div style={{ marginBottom: 16 }}>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter index…"
          aria-label="Filter index"
          style={{
            width: "100%",
            maxWidth: 480,
            height: 40,
            padding: "0 14px",
            borderRadius: 10,
            background: "var(--surface)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
            fontSize: 13,
            outline: "none",
            fontFamily: "inherit",
          }}
        />
        <span
          style={{
            marginLeft: 12,
            fontSize: 12,
            color: "var(--foreground-muted)",
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          {filtered.length}/{paintings.length}
        </span>
      </div>

      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflow: "auto",
          background: "var(--card)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
          <thead>
            <tr>
              <th style={th}>#</th>
              <th style={th}>Title</th>
              <th style={th}>Slug</th>
              <th style={th}>Year</th>
              <th style={th}>Medium</th>
              <th style={th}>Dims</th>
              <th style={th}>Tags</th>
              <th style={th}>S3 Key</th>
              <th style={th}>Description</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id}>
                <td style={{ ...tdBase, fontFamily: "JetBrains Mono, monospace", color: "var(--foreground-muted)" }}>
                  {String(i + 1).padStart(2, "0")}
                </td>
                <td style={{ ...tdBase, color: "var(--foreground)", fontWeight: 600 }}>
                  <Link href={`/painting/${p.slug}`} style={{ color: "var(--accent)" }}>
                    {p.title}
                  </Link>
                </td>
                <td style={{ ...tdBase, fontFamily: "JetBrains Mono, monospace" }}>{p.slug}</td>
                <td style={{ ...tdBase, fontFamily: "JetBrains Mono, monospace" }}>{p.year}</td>
                <td style={tdBase}>{p.medium}</td>
                <td style={{ ...tdBase, fontFamily: "JetBrains Mono, monospace" }}>
                  {p.width}×{p.height}
                </td>
                <td style={tdBase}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 10,
                          padding: "2px 8px",
                          borderRadius: 999,
                          background: "var(--accent-dim)",
                          color: "var(--accent)",
                          fontFamily: "JetBrains Mono, monospace",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td style={{ ...tdBase, fontFamily: "JetBrains Mono, monospace", fontSize: 11 }}>
                  <a
                    href={paintingUrl(p.s3Key)}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ color: "var(--foreground-subtle)" }}
                  >
                    {p.s3Key}
                  </a>
                </td>
                <td style={{ ...tdBase, maxWidth: 320 }}>{p.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
