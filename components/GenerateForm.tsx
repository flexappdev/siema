"use client";

import { useState } from "react";
import Image from "next/image";

const STYLE_PROMPTS = [
  "Bold sketchy linework",
  "Cosmic and surreal",
  "Historical battle scene",
  "Abstract neural patterns",
  "Ancient ruins and light",
  "Digital dreamscape",
];

export function GenerateForm() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ imageUrl: string; prompt: string } | null>(null);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"compose" | "checkout" | "done">("compose");

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Generation failed");
      }
      const data = await res.json();
      setResult(data);
      setStep("checkout");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckout(tier: "generate" | "poster" | "frame") {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: tier, generatedImageUrl: result?.imageUrl }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
      else setStep("done");
    } catch {
      setError("Checkout unavailable — please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Compose step */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 18,
          padding: 24,
          marginBottom: 24,
        }}
      >
        <label
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 700,
            color: "var(--foreground-muted)",
            fontFamily: "JetBrains Mono, monospace",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Describe your painting
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. A cavalry charge through a mountain pass at dawn, bold sketch style..."
          rows={4}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "var(--card)",
            color: "var(--foreground)",
            fontSize: 14,
            lineHeight: 1.6,
            resize: "vertical",
            outline: "none",
            fontFamily: "Inter, sans-serif",
            transition: "border-color 140ms",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />

        {/* Style chips */}
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          {STYLE_PROMPTS.map((s) => (
            <button
              key={s}
              onClick={() => setPrompt((p) => (p ? `${p}, ${s.toLowerCase()}` : s))}
              style={{
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 20,
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--foreground-muted)",
                cursor: "pointer",
                transition: "all 140ms",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--accent)";
                el.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.color = "var(--foreground-muted)";
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18 }}>
          <span style={{ fontSize: 12, color: "var(--foreground-muted)" }}>
            {prompt.length} / 500 chars
          </span>
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            style={{
              padding: "12px 24px",
              borderRadius: 11,
              background: loading || !prompt.trim() ? "var(--card)" : "var(--accent)",
              color: loading || !prompt.trim() ? "var(--foreground-muted)" : "#0a0a0a",
              border: "none",
              fontSize: 14,
              fontWeight: 700,
              cursor: loading || !prompt.trim() ? "not-allowed" : "pointer",
              transition: "all 150ms",
            }}
          >
            {loading ? "Generating…" : "✦ Generate — $1"}
          </button>
        </div>

        {error && (
          <div
            style={{
              marginTop: 14,
              padding: "10px 14px",
              borderRadius: 8,
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#f87171",
              fontSize: 13,
            }}
          >
            {error}
          </div>
        )}
      </div>

      {/* Result */}
      {result && (
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--accent-glow)",
            borderRadius: 18,
            padding: 24,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              fontFamily: "JetBrains Mono, monospace",
              marginBottom: 12,
            }}
          >
            Your Siema
          </div>

          <div
            style={{
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid var(--border)",
              position: "relative",
              aspectRatio: "16/9",
              marginBottom: 20,
              background: "var(--card)",
            }}
          >
            <Image
              src={result.imageUrl}
              alt="Generated painting"
              fill
              style={{ objectFit: "contain" }}
              unoptimized
            />
          </div>

          <p style={{ fontSize: 12, color: "var(--foreground-muted)", marginBottom: 18, fontStyle: "italic" }}>
            &ldquo;{result.prompt}&rdquo;
          </p>

          {step === "checkout" && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 12 }}>
                Love it? Take it further:
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {[
                  { id: "generate" as const, label: "Download", price: "$1", desc: "Full-res digital" },
                  { id: "poster" as const, label: "Poster", price: "$10", desc: "A2 giclée print" },
                  { id: "frame" as const, label: "Framed", price: "$100", desc: "Museum frame" },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => handleCheckout(tier.id)}
                    disabled={loading}
                    style={{
                      padding: "12px",
                      borderRadius: 11,
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      color: "var(--foreground)",
                      cursor: loading ? "not-allowed" : "pointer",
                      textAlign: "center",
                      transition: "all 140ms",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--accent)";
                      el.style.background = "var(--accent-dim)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--border)";
                      el.style.background = "var(--card)";
                    }}
                  >
                    <div style={{ fontSize: 18, fontWeight: 800, color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}>
                      {tier.price}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>{tier.label}</div>
                    <div style={{ fontSize: 11, color: "var(--foreground-muted)", marginTop: 2 }}>{tier.desc}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => { setResult(null); setStep("compose"); setPrompt(""); }}
                style={{
                  marginTop: 14,
                  fontSize: 12,
                  color: "var(--foreground-muted)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Generate another
              </button>
            </div>
          )}

          {step === "done" && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 32 }}>✓</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--accent)", marginTop: 8 }}>Order placed!</div>
              <div style={{ fontSize: 13, color: "var(--foreground-muted)", marginTop: 6 }}>
                Check your email for download / shipping details.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
