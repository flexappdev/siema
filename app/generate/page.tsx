import { GenerateForm } from "@/components/GenerateForm";

export const metadata = {
  title: "Generate — Create Your Own Siema Sketch",
  description: "Generate a custom Siema-style sketch painting for $1. Describe your vision and get a unique artwork.",
};

export default function GeneratePage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        padding: "32px 24px 60px",
        maxWidth: 800,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--foreground-muted)",
          fontFamily: "JetBrains Mono, monospace",
          marginBottom: 10,
        }}
      >
        Generate
      </div>
      <h1
        style={{
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "var(--foreground)",
          marginBottom: 10,
        }}
      >
        Create Your Siema
      </h1>
      <p
        style={{
          fontSize: 15,
          color: "var(--foreground-subtle)",
          lineHeight: 1.65,
          marginBottom: 32,
          maxWidth: 560,
        }}
      >
        Describe your vision and we&apos;ll generate a unique sketch painting in Siema&apos;s style — bold, abstract, and deeply expressive.
        One generation, one dollar.
      </p>

      {/* Tiers explainer */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          marginBottom: 36,
        }}
      >
        {[
          { label: "Generate", price: "$1", desc: "1 unique sketch painting in Siema's style", icon: "✦" },
          { label: "Poster", price: "$10", desc: "A2 giclée print of your generated piece", icon: "🖼" },
          { label: "Framed", price: "$100", desc: "Museum-quality frame, ready to hang", icon: "🏛" },
        ].map((tier) => (
          <div
            key={tier.label}
            style={{
              padding: "16px",
              borderRadius: 12,
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 8 }}>{tier.icon}</div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "var(--accent)",
                fontFamily: "JetBrains Mono, monospace",
                marginBottom: 4,
              }}
            >
              {tier.price}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 4 }}>
              {tier.label}
            </div>
            <div style={{ fontSize: 12, color: "var(--foreground-muted)", lineHeight: 1.4 }}>
              {tier.desc}
            </div>
          </div>
        ))}
      </div>

      <GenerateForm />
    </div>
  );
}
