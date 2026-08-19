# SIEMA — Sketch Paintings Gallery

AI-assisted sketch painting gallery by Siema. Browse 20 original works, generate your own for $1, or purchase 4K prints, posters, and framed pieces.

**Live:** https://siema.matsiems.com (owed) · **Local:** http://localhost:17017

## Features

- **Gallery** — 20 sketch paintings with titles, descriptions, and tags
- **Painting detail** — full-size view with purchase options panel
- **Generate** — create a custom Siema-style painting for $1 (Pollinations Flux AI)
- **Purchase tiers**:
  - $1 — 4K Digital Download (Frame TV ready, 3840×2160)
  - $1 — Generate your own unique painting
  - $10 — A2 giclée poster print
  - $100 — Museum-quality framed print
- **Dark/light theme** — warm gold (#d4a853) accent, wikai-inspired layout

## Tech Stack

- Next.js 16 + Tailwind v4
- MongoDB (`siema` DB)
- AWS S3 (`com27/siema/` prefix) for painting storage
- Auth.js v5 + Google OAuth (scaffold — add keys to activate)
- Stripe (scaffold — add keys to activate)
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
4. `npm install stripe` to activate checkout route

## Environment

Copy from `/home/matsiems/context-2026/agents/.env` — see `.env.local` for required vars.

## Version History

- **v0.1.0** — 2026-08-19 — Initial build: 20 paintings gallery + generate + purchase tiers, S3 upload, wikai-style UI
