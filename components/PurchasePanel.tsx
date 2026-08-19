"use client";

import { useState } from "react";
import type { Painting } from "@/lib/paintings";

const PRODUCTS = [
  {
    id: "4k",
    label: "4K Digital Download",
    sublabel: "Perfect for Frame TV · 3840×2160",
    price: "$1",
    icon: "📺",
    accent: true,
  },
  {
    id: "poster",
    label: "A2 Poster Print",
    sublabel: "High-quality giclée print · ships worldwide",
    price: "$10",
    icon: "🖼",
    accent: false,
  },
  {
    id: "frame",
    label: "Framed Art Print",
    sublabel: "Museum-quality frame · ready to hang",
    price: "$100",
    icon: "🏛",
    accent: false,
  },
];

export function PurchasePanel({ painting }: { painting: Painting }) {
  const [selected, setSelected] = useState<string>("4k");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handlePurchase() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: selected, paintingSlug: painting.slug }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
      else setSuccess(true);
    } catch {
      alert("Checkout unavailable — please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const selectedProduct = PRODUCTS.find((p) => p.id === selected);

  return (
    <div
      style={{
        position: "sticky",
        top: 24,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 18,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--foreground-muted)",
            fontFamily: "JetBrains Mono, monospace",
            marginBottom: 6,
          }}
        >
          Own this piece
        </div>
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--foreground)",
            lineHeight: 1.2,
          }}
        >
          {painting.title}
        </h2>
      </div>

      {/* Product options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PRODUCTS.map((product) => {
          const isSelected = selected === product.id;
          return (
            <button
              key={product.id}
              onClick={() => setSelected(product.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 16px",
                borderRadius: 12,
                border: isSelected ? "1.5px solid var(--accent)" : "1px solid var(--border)",
                background: isSelected ? "var(--accent-dim)" : "var(--card)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 140ms",
              }}
            >
              <span style={{ fontSize: 22, lineHeight: 1 }}>{product.icon}</span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: isSelected ? "var(--accent)" : "var(--foreground)",
                  }}
                >
                  {product.label}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--foreground-muted)",
                    marginTop: 2,
                  }}
                >
                  {product.sublabel}
                </div>
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: isSelected ? "var(--accent)" : "var(--foreground-subtle)",
                  letterSpacing: "-0.02em",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {product.price}
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <button
        onClick={handlePurchase}
        disabled={loading || success}
        style={{
          padding: "15px",
          borderRadius: 12,
          background: success ? "var(--accent-dim)" : "var(--accent)",
          color: success ? "var(--accent)" : "#0a0a0a",
          border: success ? "1px solid var(--accent)" : "none",
          fontSize: 15,
          fontWeight: 700,
          cursor: loading || success ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          transition: "all 150ms",
          letterSpacing: "-0.01em",
        }}
      >
        {success ? "✓ Order Placed" : loading ? "Processing…" : `Buy — ${selectedProduct?.price}`}
      </button>

      {/* Generate own */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: 16,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 12, color: "var(--foreground-muted)", marginBottom: 10 }}>
          Want something unique?
        </div>
        <a
          href="/generate"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 600,
            color: "var(--accent)",
            textDecoration: "none",
          }}
        >
          ✦ Generate your own Siema — $1
        </a>
      </div>
    </div>
  );
}
