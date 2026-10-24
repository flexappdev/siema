import Image from "next/image";
import Link from "next/link";
import { SIEMA_GENERATIONS } from "@/data/siema-generations";

export const metadata = { title: "SIEMA Live Dashboard" };
export const dynamic = "force-dynamic";

export default function SiemaLivePage() {
  const generations = [...SIEMA_GENERATIONS].sort((a, b) =>
    (b.generatedAt ?? "").localeCompare(a.generatedAt ?? "")
  );
  const published = generations.filter((g) => g.status === "published");
  const drafts = generations.filter((g) => g.status === "draft");
  const rejected = generations.filter((g) => g.status === "rejected");
  const latest = generations[0];
  const now = new Date();
  const londonNow = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    dateStyle: "full",
    timeStyle: "medium",
  }).format(now);

  return (
    <main style={{ minHeight: "100dvh", padding: "28px 22px 72px", maxWidth: 1500, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 26 }}>
        <div>
          <div className="mono" style={{ color: "var(--accent)", fontSize: 11, letterSpacing: ".18em", fontWeight: 800 }}>SIEMA LIVE</div>
          <h1 style={{ fontSize: 46, letterSpacing: "-.045em", marginTop: 7 }}>What is happening now.</h1>
          <p style={{ color: "var(--foreground-subtle)", marginTop: 8, maxWidth: 760, lineHeight: 1.6 }}>
            The repository ledger is the source of truth. Every persisted SIEMA generation appears here automatically.
          </p>
        </div>
        <div style={{ border: "1px solid var(--border)", borderRadius: 14, padding: "12px 15px", background: "var(--surface)" }}>
          <div className="mono" style={{ fontSize: 9, color: "var(--foreground-muted)", letterSpacing: ".12em" }}>LONDON NOW</div>
          <div className="mono" style={{ fontSize: 12, marginTop: 5 }}>{londonNow}</div>
        </div>
      </header>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginBottom: 24 }}>
        {[
          ["Published", published.length],
          ["Draft", drafts.length],
          ["Rejected", rejected.length],
          ["Total tracked", generations.length],
        ].map(([label, value]) => (
          <div key={String(label)} style={{ border: "1px solid var(--border)", borderRadius: 14, padding: 16, background: "var(--card)" }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--foreground-muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>{label}</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: label === "Published" ? "var(--accent)" : "var(--foreground)", marginTop: 5 }}>{value}</div>
          </div>
        ))}
      </section>

      <section style={{ border: "1px solid var(--border)", borderRadius: 16, padding: 18, background: "var(--surface)", marginBottom: 28 }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--accent)", fontWeight: 800, letterSpacing: ".12em" }}>CURRENT STATE</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18, marginTop: 12 }}>
          <div>
            <div style={{ fontSize: 13, color: "var(--foreground-muted)" }}>Latest persisted event</div>
            <div style={{ fontSize: 18, fontWeight: 750, marginTop: 4 }}>{latest?.title ?? "Waiting for first generation"}</div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: "var(--foreground-muted)" }}>Pipeline</div>
            <div className="mono" style={{ fontSize: 12, marginTop: 6 }}>DISCOVER → VERIFY → DEDUPE → PAINT → QA → PUBLISH</div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: "var(--foreground-muted)" }}>Publishing rule</div>
            <div style={{ fontSize: 14, marginTop: 4 }}>1 story = 1 standalone 16:9 SIEMA. No collage.</div>
          </div>
        </div>
      </section>

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
        <h2 style={{ fontSize: 24 }}>Live archive</h2>
        <div className="mono" style={{ fontSize: 11, color: "var(--foreground-muted)" }}>Newest persisted generation first</div>
      </div>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(330px,1fr))", gap: 20 }}>
        {generations.map((g) => (
          <article key={g.id} style={{ border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden", background: "var(--card)" }}>
            {g.imageUrl ? (
              <Link href={`/painting/${g.slug}`} style={{ display: "block", position: "relative", aspectRatio: "16/9" }}>
                <Image src={g.imageUrl} alt={g.title} fill unoptimized style={{ objectFit: "cover" }} />
              </Link>
            ) : (
              <div style={{ aspectRatio: "16/9", display: "grid", placeItems: "center", color: "var(--foreground-muted)" }}>Image not persisted</div>
            )}
            <div style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <span className="mono" style={{ fontSize: 10, color: g.status === "published" ? "var(--accent)" : "var(--foreground-muted)", textTransform: "uppercase", letterSpacing: ".12em" }}>{g.status}</span>
                {g.generatedAt && <span className="mono" style={{ fontSize: 10, color: "var(--foreground-muted)" }}>{g.generatedAt}</span>}
              </div>
              <h3 style={{ fontSize: 18, marginTop: 8 }}>{g.title}</h3>
              {g.sourcePublisher && <div className="mono" style={{ fontSize: 10, color: "var(--foreground-muted)", marginTop: 8 }}>SOURCE · {g.sourcePublisher}</div>}
              {g.tt && (
                <div style={{ marginTop: 13, paddingTop: 13, borderTop: "1px solid var(--border)" }}>
                  <div className="mono" style={{ color: "var(--accent)", fontSize: 10, fontWeight: 700 }}>TT READY</div>
                  <p style={{ fontSize: 13, marginTop: 5, color: "var(--foreground-subtle)" }}>{g.tt.hook}</p>
                </div>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
