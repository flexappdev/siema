import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const PRICE_MAP: Record<string, string> = {
  "4k": process.env.STRIPE_PRICE_4K ?? "",
  generate: process.env.STRIPE_PRICE_GENERATE ?? "",
  poster: process.env.STRIPE_PRICE_POSTER ?? "",
  frame: process.env.STRIPE_PRICE_FRAME ?? "",
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:17017";

export async function POST(req: NextRequest) {
  const { productId, paintingSlug, generatedImageUrl } = await req.json();

  const priceId = PRICE_MAP[productId];
  const secret = process.env.STRIPE_SECRET_KEY;

  if (!secret || !priceId || priceId.startsWith("price_todo")) {
    return NextResponse.json({
      url: null,
      message: "Stripe checkout coming soon — contact mat@matsiems.com to purchase.",
    });
  }

  const stripe = new Stripe(secret);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${APP_URL}/painting/${paintingSlug ?? ""}`,
    metadata: {
      productId,
      paintingSlug: paintingSlug ?? "",
      generatedImageUrl: generatedImageUrl ?? "",
    },
  });

  return NextResponse.json({ url: session.url });
}
