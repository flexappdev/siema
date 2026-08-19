import Link from "next/link";

export const metadata = { title: "Order Confirmed — SIEMA" };

export default function SuccessPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px",
        textAlign: "center",
        maxWidth: 480,
        margin: "0 auto",
      }}
    >
      <div style={{ fontSize: 56, marginBottom: 20 }}>✓</div>
      <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--accent)", marginBottom: 12 }}>
        Order Confirmed
      </h1>
      <p style={{ fontSize: 15, color: "var(--foreground-subtle)", lineHeight: 1.65, marginBottom: 28 }}>
        Thank you for your purchase. You&apos;ll receive a confirmation email shortly with your download link or shipping details.
      </p>
      <Link
        href="/"
        style={{
          padding: "12px 24px",
          borderRadius: 12,
          background: "var(--accent)",
          color: "#0a0a0a",
          fontSize: 14,
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        Back to Gallery
      </Link>
    </div>
  );
}
