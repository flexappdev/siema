import Link from "next/link";

export const metadata = {
  title: "About — SIEMA",
  description: "About Siema — AI sketch paintings, generation, and purchasing.",
};

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100dvh", padding: "32px 24px 60px", maxWidth: 680, margin: "0 auto" }}>
      <Link
        href="/"
        style={{ fontSize: 13, color: "var(--foreground-muted)", fontFamily: "JetBrains Mono, monospace", textDecoration: "none" }}
      >
        ← Gallery
      </Link>

      <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em", marginTop: 20, marginBottom: 12 }}>
        About SIEMA
      </h1>

      <div style={{ fontSize: 15, color: "var(--foreground-subtle)", lineHeight: 1.75, display: "flex", flexDirection: "column", gap: 18 }}>
        <p>
          <strong style={{ color: "var(--foreground)" }}>SIEMA</strong> is an AI-assisted sketch painting series — bold, expressive,
          and deeply human. Each work is generated through a collaboration between artistic vision and machine intelligence,
          resulting in pieces that feel simultaneously ancient and futuristic.
        </p>
        <p>
          The gallery contains {20} original works spanning historical scenes, cosmic dreamscapes, and abstract explorations
          of the mind and technology.
        </p>
        <p>
          Every painting is available as a high-resolution 4K digital download ($1), a giclée poster print ($10),
          or a museum-quality framed piece ($100).
        </p>
        <p>
          You can also{" "}
          <Link href="/generate" style={{ color: "var(--accent)" }}>
            generate your own Siema painting
          </Link>{" "}
          for $1 — describe your vision and receive a unique piece in the Siema style.
        </p>

        <div
          style={{
            marginTop: 12,
            padding: "20px",
            borderRadius: 14,
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--foreground-muted)", fontFamily: "JetBrains Mono, monospace", marginBottom: 12 }}>
            Pricing
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              ["$1", "4K Digital Download", "3840×2160 PNG, perfect for Frame TV"],
              ["$1", "Generate Your Own", "Unique AI sketch in Siema style"],
              ["$10", "A2 Poster Print", "High-quality giclée, ships worldwide"],
              ["$100", "Framed Art Print", "Museum-quality frame, ready to hang"],
            ].map(([price, label, desc]) => (
              <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <span style={{ minWidth: 40, fontSize: 14, fontWeight: 800, color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}>
                  {price}
                </span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}>{label}</div>
                  <div style={{ fontSize: 12, color: "var(--foreground-muted)" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: 13, color: "var(--foreground-muted)" }}>
          Questions? Contact{" "}
          <a href="mailto:mat@matsiems.com" style={{ color: "var(--accent)" }}>
            mat@matsiems.com
          </a>
        </p>
      </div>
    </div>
  );
}
