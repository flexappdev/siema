import Image from "next/image";
import Link from "next/link";
import { SIEMA_GENERATIONS } from "@/data/siema-generations";

export const metadata = { title: "SIEMA Archive" };

export default function SiemaGalleryPage() {
  const published = SIEMA_GENERATIONS.filter((g) => g.status === "published").length;
  const drafts = SIEMA_GENERATIONS.filter((g) => g.status === "draft").length;
  const rejected = SIEMA_GENERATIONS.filter((g) => g.status === "rejected").length;

  return (
    <div style={{ minHeight: "100dvh", padding: "32px 24px 64px", maxWidth: 1500, margin: "0 auto" }}>
      <header style={{ marginBottom: 28 }}>
        <div className="mono" style={{ color: "var(--accent)", fontSize: 11, letterSpacing: ".18em", fontWeight: 700 }}>SIEMA LIVE ARCHIVE</div>
        <h1 style={{ fontSize: 48, letterSpacing: "-.045em", marginTop: 8 }}>Every Siema. One visual history.</h1>
        <p style={{ color: "var(--foreground-subtle)", marginTop: 10, maxWidth: 720, lineHeight: 1.6 }}>
          Published paintings now; drafts and rejected generations appear automatically once their image binaries are persisted by the SIEMA generation workflow.
        </p>
      </header>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
        {[
          ["All", SIEMA_GENERATIONS.length],
          ["Published", published],
          ["Drafts", drafts],
          ["Rejected", rejected],
        ].map(([label, count]) => (
          <span key={String(label)} className="mono" style={{ padding: "8px 12px", border: "1px solid var(--border)", borderRadius: 999, background: "var(--surface)", fontSize: 12 }}>
            {label} · <b style={{ color: "var(--accent)" }}>{count}</b>
          </span>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 22 }}>
        {SIEMA_GENERATIONS.map((g) => (
          <article key={g.id} style={{ border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden", background: "var(--card)" }}>
            {g.imageUrl ? (
              <Link href={`/painting/${g.slug}`} style={{ display: "block", position: "relative", aspectRatio: "16/9" }}>
                <Image src={g.imageUrl} alt={g.title} fill unoptimized style={{ objectFit: "cover" }} />
              </Link>
            ) : (
              <div style={{ aspectRatio: "16/9", display: "grid", placeItems: "center", color: "var(--foreground-muted)" }}>Image not persisted</div>
            )}
            <div style={{ padding: 16 }}>
              <div className="mono" style={{ fontSize: 10, color: g.status === "published" ? "var(--accent)" : "var(--foreground-muted)", textTransform: "uppercase", letterSpacing: ".12em" }}>{g.status}</div>
              <h2 style={{ fontSize: 18, marginTop: 7 }}>{g.title}</h2>
              {g.generatedAt && <div className="mono" style={{ fontSize: 11, color: "var(--foreground-muted)", marginTop: 8 }}>{g.generatedAt}</div>}
              {g.tt && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                  <div className="mono" style={{ color: "var(--accent)", fontSize: 10, fontWeight: 700 }}>TT</div>
                  <p style={{ fontSize: 13, marginTop: 6, color: "var(--foreground-subtle)" }}>{g.tt.hook}</p>
                  <p className="mono" style={{ fontSize: 10, marginTop: 7, color: "var(--foreground-muted)" }}>{g.tt.hashtags.join(" ")}</p>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
