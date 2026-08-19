"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Gallery", icon: "⬛" },
  { href: "/generate", label: "Generate", icon: "✦" },
  { href: "/about", label: "About", icon: "◎" },
];

export function Nav() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("siema:theme");
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("siema:theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <aside
      aria-label="SIEMA navigation"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: 64,
        zIndex: 40,
        background: "var(--nav-bg)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0 16px",
        gap: 4,
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        title="SIEMA"
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 18,
          fontSize: 15,
          fontWeight: 800,
          color: "#ffffff",
          letterSpacing: "-0.03em",
          textDecoration: "none",
        }}
      >
        S
      </Link>

      {NAV.map((n) => {
        const active = n.href === "/" ? pathname === "/" : pathname?.startsWith(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            title={n.label}
            style={{
              width: 44,
              height: 44,
              borderRadius: 11,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: active ? "var(--accent)" : "var(--foreground-muted)",
              background: active ? "var(--accent-dim)" : "transparent",
              border: active ? "1px solid var(--accent-glow)" : "1px solid transparent",
              transition: "all 140ms",
              textDecoration: "none",
            }}
          >
            {n.icon}
          </Link>
        );
      })}

      <div style={{ flex: 1 }} />

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        style={{
          width: 44,
          height: 44,
          borderRadius: 11,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          color: "var(--foreground-muted)",
          background: "transparent",
          border: "1px solid transparent",
          cursor: "pointer",
          transition: "color 140ms",
        }}
      >
        {theme === "dark" ? "☀" : "◑"}
      </button>
    </aside>
  );
}
