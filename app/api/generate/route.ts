import { NextRequest, NextResponse } from "next/server";

const SIEMA_SYSTEM_PROMPT = `You are Siema, an AI artist specialising in bold, expressive sketch paintings.
Style: dramatic linework, high contrast, slightly dark and surreal, reminiscent of charcoal sketches
mixed with digital precision. Subjects range from historical scenes to abstract concepts and cosmic imagery.`;

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
    return NextResponse.json({ error: "Prompt is required (min 3 chars)" }, { status: 400 });
  }
  if (prompt.length > 500) {
    return NextResponse.json({ error: "Prompt too long (max 500 chars)" }, { status: 400 });
  }

  const stylePrompt = `${SIEMA_SYSTEM_PROMPT}\n\nCreate a painting: ${prompt.trim()}.
Sketch style, bold lines, high contrast, slightly dark atmosphere.`;

  // Use Pollinations.ai for free image generation (Flux model)
  const encodedPrompt = encodeURIComponent(stylePrompt);
  const width = 1672;
  const height = 941;
  const seed = Math.floor(Math.random() * 999999);

  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=flux`;

  return NextResponse.json({
    imageUrl,
    prompt: prompt.trim(),
    seed,
    width,
    height,
  });
}
