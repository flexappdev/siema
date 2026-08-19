# SIEMA — Sketch Paintings Gallery

AI-assisted sketch painting gallery by Siema. Browse 20 original works, generate your own for $1, or purchase 4K prints, posters, and framed pieces.

**Live:** https://siema.matsiems.com (owed) · **Local:** http://localhost:17017

## Features

- **Gallery (`/`)** — 20 sketch paintings with search filter across title, description, medium, tags
- **Index (`/paintings`)** — full-metadata table (id, slug, year, medium, dimensions, tags, S3 key, description) with `?q=` prefilter
- **Painting detail (`/painting/[slug]`)** — full-size view with purchase options panel
- **Generate (`/generate`)** — custom Siema-style painting for $1 (Pollinations Flux AI)
- **Sticky Header** — SIEMA brand · search (→ `/paintings?q=…`) · Log in · Register (anchor points `#login-link` / `#register-link` for Auth.js activation)
- **Sticky Footer** — painting count · Index link · `⚄ Random Painting` button
- **Purchase tiers**:
  - $1 — 4K Digital Download (Frame TV ready, 3840×2160)
  - $1 — Generate your own unique painting
  - $10 — A2 giclée poster print
  - $100 — Museum-quality framed print
- **Dark/light theme** — Mat Siems `#006699` accent (light theme `#005580`), wikai-inspired layout

## Tech Stack

- Next.js 16 + Tailwind v4
- MongoDB (`siema` DB)
- AWS S3 (`com27/siema/` prefix) for painting storage
- Auth.js v5 + Google OAuth (scaffold — add keys to activate)
- Stripe (installed — add `STRIPE_SECRET_KEY` + price IDs to activate checkout)
- Pollinations.ai Flux for AI generation (free tier)

## Local Dev

```bash
npm install
npm run dev    # http://localhost:17017
```

## S3 Upload

To upload/re-upload paintings from `C:\ABC\MEDIA\IMAGES\2026\siema`:

```bash
node scripts/upload-to-s3.mjs
```

Images live at: `https://com27.s3.eu-west-2.amazonaws.com/siema/<slug>.png`

## Stripe Setup (owed)

1. Create 4 price IDs in Stripe dashboard
2. Add to `.env.local`:
   - `STRIPE_PRICE_4K` — $1
   - `STRIPE_PRICE_GENERATE` — $1
   - `STRIPE_PRICE_POSTER` — $10
   - `STRIPE_PRICE_FRAME` — $100
3. Add `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`
4. Restart the dev server — `app/api/checkout/route.ts` will create real Stripe sessions once both `STRIPE_SECRET_KEY` and the matching price ID are present (otherwise it returns the "coming soon" placeholder).

## Environment

Copy from `/home/matsiems/context-2026/agents/.env` — see `.env.local` for required vars.

## Version History

- **v0.2.0** — 2026-08-19 — Mat Siems `#006699` accent; sticky top Header (SIEMA brand + search + Log in / Register); sticky Footer (Index link + Random Painting); home search filter; `/paintings` index route with full metadata (id, slug, year, medium, dims, tags, S3 key, description).
- **v0.1.1** — 2026-08-19 — Rotate S3 access key; wire real Stripe Checkout Sessions in `/api/checkout` (gated on env).
- **v0.1.0** — 2026-08-19 — Initial build: 20 paintings gallery + generate + purchase tiers, S3 upload, wikai-style UI
