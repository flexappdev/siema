import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const THEME_INIT = `(function(){try{var t=localStorage.getItem('siema:theme');if(t!=='light'&&t!=='dark')t='dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://siema.matsiems.com"),
  title: { default: "SIEMA — Sketch Paintings", template: "%s · SIEMA" },
  description: "Original AI sketch paintings by Siema. Browse the gallery, generate your own for $1, or order a 4K print, poster, or framed piece.",
  applicationName: "SIEMA",
  authors: [{ name: "Siema" }],
  creator: "Siema",
  keywords: ["sketch", "painting", "AI art", "digital art", "gallery", "Siema"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SIEMA",
    title: "SIEMA — Sketch Paintings",
    description: "Original AI sketch paintings by Siema. Generate your own for $1.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIEMA — Sketch Paintings",
    description: "Original AI sketch paintings by Siema. Generate your own for $1.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body suppressHydrationWarning>
        <Nav />
        <div style={{ paddingLeft: 64, minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
          <Header />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
