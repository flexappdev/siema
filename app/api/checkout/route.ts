import { NextRequest, NextResponse } from "next/server";

const PRICE_MAP: Record<string, string> = {
  "4k": process.env.STRIPE_PRICE_4K ?? "",
  generate: process.env.STRIPE_PRICE_GENERATE ?? "",
  poster: process.env.STRIPE_PRICE_POSTER ?? "",
  frame: process.env.STRIPE_PRICE_FRAME ?? "",
};

export async function POST(req: NextRequest) {
  const { productId, paintingSlug, generatedImageUrl } = await req.json();

  const priceId = PRICE_MAP[productId];
  if (!priceId || priceId.startsWith("price_todo")) {
    // Stripe not yet configured — return a friendly placeholder
    return NextResponse.json({
      url: null,
      message: "Stripe checkout coming soon — contact mat@matsiems.com to purchase.",
    });
  }

  // Stripe not installed yet — return placeholder
  return NextResponse.json({
    url: null,
    message: "Stripe checkout coming soon — contact mat@matsiems.com to purchase.",
  });
}
