import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPainting, paintingUrl, PAINTINGS } from "@/lib/paintings";
import { PurchasePanel } from "@/components/PurchasePanel";

export function generateStaticParams() {
  return PAINTINGS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const painting = getPainting(slug);
  if (!painting) return {};
  return {
    title: painting.title,
    description: painting.description,
    openGraph: {
      images: [{ url: paintingUrl(painting.s3Key), width: painting.width, height: painting.height }],
    },
  };
}

export default async function PaintingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const painting = getPainting(slug);
  if (!painting) notFound();

  const imageUrl = paintingUrl(painting.s3Key);

  return (
    <div style={{ minHeight: "100dvh", padding: "24px 24px 60px" }}>
      {/* Back link */}
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 13,
          color: "var(--foreground-muted)",
          textDecoration: "none",
          marginBottom: 24,
          fontFamily: "JetBrains Mono, monospace",
          transition: "color 140ms",
        }}
      >
        ← Gallery
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: 32,
          alignItems: "start",
        }}
      >
        {/* Painting */}
        <div>
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid var(--border)",
              background: "var(--card)",
              position: "relative",
              aspectRatio: "16/9",
            }}
          >
            <Image
              src={imageUrl}
              alt={painting.title}
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 1024px) 100vw, calc(100vw - 500px)"
              priority
              unoptimized
            />
          </div>

          {/* Description */}
          <div style={{ marginTop: 20 }}>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: "-0.025em",
                color: "var(--foreground)",
                marginBottom: 8,
              }}
            >
              {painting.title}
            </h1>
            <p style={{ fontSize: 15, color: "var(--foreground-subtle)", lineHeight: 1.65, maxWidth: 640 }}>
              {painting.description}
            </p>
            <div
              style={{
                display: "flex",
                gap: 20,
                marginTop: 16,
                fontSize: 12,
                fontFamily: "JetBrains Mono, monospace",
                color: "var(--foreground-muted)",
              }}
            >
              <span>Year: <span style={{ color: "var(--foreground-subtle)" }}>{painting.year}</span></span>
              <span>Medium: <span style={{ color: "var(--foreground-subtle)" }}>{painting.medium}</span></span>
              <span>Size: <span style={{ color: "var(--foreground-subtle)" }}>{painting.width}×{painting.height}</span></span>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              {painting.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 11,
                    padding: "3px 10px",
                    borderRadius: 20,
                    background: "var(--accent-dim)",
                    color: "var(--accent)",
                    fontWeight: 600,
                    textTransform: "lowercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Purchase panel */}
        <PurchasePanel painting={painting} />
      </div>
    </div>
  );
}
