"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function Header() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/paintings?q=${encodeURIComponent(term)}` : "/paintings");
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        left: 64,
        right: 0,
        zIndex: 30,
        height: 56,
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "0 20px",
        background: "var(--nav-bg)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "var(--foreground)",
          textDecoration: "none",
        }}
      >
        SIEMA
      </Link>
      <form onSubmit={onSubmit} style={{ flex: 1, maxWidth: 520 }}>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search paintings, tags, descriptions…"
          aria-label="Search paintings"
          style={{
            width: "100%",
            height: 36,
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
      </form>
      <div style={{ flex: 1 }} />
      <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Link
          href="/login"
          id="login-link"
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--foreground-subtle)",
            padding: "8px 12px",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          Log in
        </Link>
        <Link
          href="/register"
          id="register-link"
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#ffffff",
            background: "var(--accent)",
            padding: "8px 14px",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          Register
        </Link>
      </nav>
    </header>
  );
}
