# Siema Hourly Skill

## Purpose
Generate exactly one unique SIEMA SKETCH PAINTING from either:
1. an explicit topic supplied by the user;
2. the best new AI story available at run time; or
3. the strongest unique AI story from the previous 7 days when Top Weekly mode is requested.

The default repository is `flexappdev/siema`. The default timezone is `Europe/London`.

The index is mandatory. Every successful publication must update `data/siema-index.json` and `SIEMA_INDEX.md`.

## HARD RULE — ONE NEWS ITEM PER IMAGE

This is non-negotiable and overrides any batch convenience, layout preference, or prior prompt context.

**ONE NEWS ITEM = ONE IMAGE FILE.**

Rules:
- Every generated Siema news image must explain exactly ONE underlying news event, topic, model launch, policy change, company move, research result, personality, or other single subject.
- Never combine multiple news items into one image.
- Never create a Top-5, Top-10, weekly roundup, model roundup, storyboard, montage, contact sheet, comparison board, multi-story infographic, 2x5 grid, panel grid, split-screen roundup, or collage image.
- If the user supplies 10 news items, generate 10 separate standalone images. If the user supplies 10 personalities, generate 10 separate standalone images. If the user supplies 24 hourly stories, generate 24 separate standalone images.
- Generate batch items ONE AT A TIME. Do not place the full batch of titles or names into a single image-generation prompt, because that invites a collage or grid.
- A single image may contain multiple visual components, arrows, stages, actors, safeguards, causes or consequences only when every component explains the SAME subject.
- Do not carry unrelated titles, characters, model names, panels, numbering or visual material from a previous Siema image into the next one.
- Start each new subject image from a clean prompt unless the user explicitly asks to edit that exact image.
- A visible second news headline, unrelated model launch, unrelated personality, unrelated story, or multi-story panel makes the generation a FAILED QA result. Regenerate before publishing.
- `Top Weekly` means choose ONE strongest weekly story and create ONE image for that story. It never means a weekly image containing several stories.
- The 08:00 daily summary may list or link all hourly paintings in Markdown, but it must never replace them with a combined 24-story image.
- Never crop a multi-story collage into separate images and treat the crops as compliant originals. Each published Siema must be generated as its own standalone composition for its own subject.

Pre-publish QA question:
> Can a viewer describe this image as one subject without mentioning a second subject?

If the answer is not an immediate yes, do not publish it.

## CANONICAL SIEMA 2026 SKETCH-PAINT STYLE — LOCKED

The January 2026 series is the visual reference standard. This style is mandatory for Siema News, historical backfill, Top AI lists, AI personalities, explainers and similar editorial series unless the user explicitly requests another style.

### Canvas and medium
- Exactly one standalone landscape 16:9 image.
- Warm cream / off-white sketchbook paper as the visible background.
- Hand-drawn architectural black pen-and-ink line work.
- Loose expressive watercolor washes with visible handmade imperfections and natural bleeding.
- Clean, confident diagram drawing rather than photorealistic rendering.
- No CGI, glossy 3D render, dark-mode sci-fi poster, polished corporate vector art or photographic look.

### Colour discipline
- Black ink carries the structure.
- Warm paper and restrained natural neutrals support the scene.
- MatSiems `#006699` is the ONLY strong technological / explanatory accent colour.
- Small natural colours may appear where physically necessary, but avoid competing saturated accents.
- No purple.
- Avoid red except when the factual concept genuinely requires a danger / blocked-state cue, and keep it minor.

### Composition grammar
- One coherent wide explanatory scene, not a collection of separate cards.
- Build a visual thesis from left-to-right, centre-outward, or input→system→result.
- Use hand-drawn arrows, pipelines, loops, architectural sections, machines, maps, campuses, desks, laboratories, infrastructure, landscapes or other physical metaphors that make the topic understandable at a glance.
- The central subject should occupy the visual focus; secondary elements explain causes, mechanics, consequences or real-world applications.
- Prefer a believable physical world plus drawn technical annotations rather than floating abstract sci-fi decoration.
- Keep generous paper breathing room around major elements.

### Typography and editorial rhythm
- ONE large hand-painted headline at the top-left.
- ONE short funny / stoic quote at the bottom-left in handwritten black ink, optionally underlined with a restrained `#006699` brush stroke.
- ONE handwritten `Siema` signature at the bottom-right, preferably with a small `#006699` underline flourish.
- Use concise handwritten explanatory labels around the diagram: short phrases, arrows, 2–5 word notes, occasional compact bullet groups.
- Text exists to clarify the drawing, not to turn the image into a document.
- Do not use dense paragraphs, fake UI dashboards, newspaper layouts or oversized blocks of copy.

### Visual tone
- Intelligent, optimistic, slightly witty and practical.
- “AI architect sketchbook” rather than “marketing poster”.
- The joke or quote should be dry and memorable, but never undermine factual clarity.
- Prefer specific real-world physical consequences: compute, power, chips, code, agents, labs, products, cities, science, work, governance, robotics, infrastructure.

### People and personalities
- For a real-world AI personality, exactly ONE main person is the subject of that image unless additional background people are necessary to explain their work.
- Depict the public figure respectfully in the same watercolor/ink editorial language; do not turn the image into a glamour portrait.
- Their face may anchor one side of the composition while their 2026 AI impact unfolds as a diagram around them.
- Title should normally be the person’s name or a short editorial phrase about their role.
- The visual story should answer: “Why does this person matter to AI in 2026?”

### Forbidden drift
Reject and regenerate if the result becomes any of the following:
- collage, grid, storyboard, montage, contact sheet or split-screen;
- generic photorealistic portrait;
- glossy futuristic CGI;
- dark cyberpunk poster;
- corporate slide / dashboard;
- generic stock-tech illustration;
- unrelated previous-topic residue;
- multiple main news stories or personalities in one image;
- missing headline, quote or Siema signature;
- non-16:9 framing.

Canonical quality test:
> Does this look like one page torn from the same hand-painted 2026 Siema AI sketchbook as `RUBIN ARRIVES`, `PERSONAL INTELLIGENCE`, `CLAUDE GOES TO WORK`, `LOW-LATENCY AT SCALE`, `THE MODEL GETS PRINCIPLES`, `PRISM FOR SCIENCE`, `AGENTIC VISION`, and `PROJECT GENIE OPENS WORLDS`?

If not, regenerate before publish.

## Canonical Siema reference

Siema the artist is OPTIONAL in every painting. The story and visual explanation come first.

Default author policy: **omit the Siema character unless his presence materially improves the composition or joke**. The handwritten `Siema` signature remains required bottom-right even when the artist is not shown.

If Siema is visible, use Mat's canonical Siema character reference as the highest-priority character-design anchor.

Canonical reference traits:
- same recognizable face and proportions as the reference;
- curly/wavy medium-brown hair, normally tied back in a loose top knot / bun with natural stray curls;
- rugged short beard and moustache;
- black rectangular G3-style smart glasses with a small blue accent;
- black hoodie with subtle handwritten `Siema` signature;
- mature, weathered, intelligent face;
- relaxed, mildly amused Funny Stoic expression;
- AI architect / sketch painter / world traveller presence.

Do NOT freely reinterpret Siema's face, hairstyle, age, glasses or clothing when he appears.

If the canonical image reference is unavailable to an automated run, prefer in this order:
1. omit Siema entirely and make the environment/story the subject;
2. use a non-identifying back/over-shoulder view only if composition benefits;
3. only as a last resort use the textual traits above.

Never invent a materially different Siema.

## Triggers
- `Siema live` or `Siema hourly` → choose the latest high-signal unique AI story unless the ledger requests another mode.
- `Siema live: <topic>` or `Siema hourly: <topic>` → use the supplied topic.
- `Siema weekly` or `Siema top weekly` → choose the single strongest unique AI story from the previous 7 days.
- `Siema sketch: <topic>` → same on-demand topic workflow.
- Hourly scheduled run with no topic → latest unique AI story unless `data/siema-index.json.control.nextMode` overrides it.

## Control flags
Read optional `control` values from `data/siema-index.json` before topic selection.

Supported values:
- `nextMode: "top_weekly_once"` → the NEXT successful run must select exactly ONE strongest unique AI story from the previous 7 days, not a Top-5 recap. After a successful publish, set `nextMode` back to `"hourly"`.
- `authorPolicy: "optional_default_off"` → do not show the Siema artist by default. Include him only when the scene genuinely benefits.
- `indexRequired: true` → a run cannot be reported as successful until both machine-readable and Markdown indexes are updated.

## Required workflow

### 1. Read the ledger first
Read `data/siema-index.json` and the current curated paintings in `lib/paintings.ts`.

Never generate before checking uniqueness.

### 2. Select a topic
If a topic is supplied, use it.

If Top Weekly mode is active, search the previous 7 days and select **one** strongest story by a combination of:
- global AI significance;
- novelty;
- likely long-term importance;
- evidence quality;
- visual potential for one coherent Siema sketch.

Do not create a Top-5 board, weekly collage, dashboard or multiple-story recap. Top Weekly means exactly one story.

Otherwise search current news, prioritising:
1. AI model/research launches and breakthroughs
2. AI infrastructure, chips, compute and energy
3. major AI company/platform moves
4. agentic AI and robotics
5. AI policy, security and geopolitics
6. adjacent technology/world-affairs stories only when the AI angle is substantial

Prefer primary sources and high-quality reporting. Record the canonical source URL, publisher and publication time.

### 3. Enforce uniqueness
A scheduled story MUST be new.

Reject a candidate if ANY is true:
- canonical source URL already exists in `seen` or `paintings`;
- normalized headline/topic fingerprint already exists;
- normalized title is the same as an existing painting;
- the story is merely another write-up of the same underlying event already painted;
- semantic/topic overlap with a recent painting is high enough that a normal reader would call it the same story.

If rejected, move to the next best candidate. Do not generate filler just to satisfy the hourly cadence.

For an explicit topic that already exists, do not silently duplicate it. Either use a materially different angle supplied by the user or report that the topic already exists.

### 4. Create the concept
Create:
- short handwritten title;
- one funny/stoic quote;
- concise factual visual thesis;
- complete image prompt scoped to ONE subject only;
- 3–6 tags.

Humour must support the explanation rather than overwhelm it.

For a batch request, finish this workflow for one subject before beginning the next subject.

### 5. Canonical visual contract
Generate exactly ONE standalone landscape 16:9 image for exactly ONE subject and obey the locked Canonical Siema 2026 Sketch-Paint Style above.

SIEMA (OPTIONAL, DEFAULT OFF):
- Do not include the artist merely because the brand is Siema.
- Include Siema only when his presence clearly strengthens the visual explanation, humour or composition.
- If shown, use the canonical Siema reference as the character anchor.
- Preserve the reference face, tied-back curly/wavy hair, rugged short beard, black rectangular G3-style smart glasses, black hoodie and Funny Stoic expression.
- If the canonical reference image is unavailable, omit Siema rather than improvising a different-looking character.

STYLE:
- hand-drawn architectural pen-and-ink sketch;
- loose expressive watercolor washes on warm cream/off-white paper;
- visible handmade imperfections;
- confident black ink outlines;
- loose architectural line work;
- natural watercolor bleeding;
- muted palette appropriate to the location;
- #006699 is the single strong accent colour;
- no purple;
- no photorealism;
- no CGI;
- no collage;
- no grid;
- no split screen;
- no storyboard;
- no montage;
- no multi-story panels;
- ONE SUBJECT = ONE SCENE = ONE IMAGE.

TEXT:
- one subject title top-left;
- one short quote bottom-left;
- `Siema` signature bottom-right;
- concise diagram labels only;
- never include unrelated headlines, personalities or model names from other subjects.

### 6. Timestamp and filename
Use Europe/London local time at generation.

Filename:
`YYYY-MM-DD_HH-mm_<slug>.webp`

Preferred repository path:
`public/siema/YYYY/MM/DD/YYYY-MM-DD_HH-mm_<slug>.webp`

Example:
`public/siema/2026/09/09/2026-09-09_12-00_deepseek-ipo.webp`

If the image generator produces PNG/JPEG, convert to high-quality WebP before committing when practical. Keep 16:9 and preserve enough resolution for the gallery. Do not overwrite an existing timestamped asset.

### 7. Push image to GitHub
Commit the actual binary image to the timestamped path in `flexappdev/siema`.

When using the GitHub Git Data API:
- base64-encode the binary;
- create blob;
- create tree from the latest main tree;
- create commit;
- fast-forward `main`.

Never commit a base64 text file pretending to be an image.

### 8. Update index atomically
Append the new painting to `data/siema-index.json.paintings` and add the story to `seen`.

Each painting record must contain at least:
- id
- slug
- title
- s3Key (local public path beginning with `/siema/`)
- year
- medium
- description
- tags
- width
- height
- generatedAt
- timezone
- topic
- quote
- sourceUrl
- sourcePublisher
- sourcePublishedAt
- topicFingerprint
- imageFile
- prompt

Update `SIEMA_INDEX.md` newest-first in the same run.

If `control.nextMode` was `top_weekly_once`, reset it to `hourly` only after image + metadata + index writes all succeed.

The app automatically merges `data/siema-index.json.paintings` into the gallery.

### 9. Final QA before publish
Before committing, inspect the generated image and reject it if ANY are true:
- more than one main subject is represented;
- multiple unrelated headlines/models/events/personalities appear;
- the composition is a grid, collage, montage, roundup, storyboard or contact sheet;
- content from a previous subject leaked into the current image;
- the image would need to be cropped into sub-images to become compliant;
- the result drifts from the locked January-2026 Siema sketch-paint style;
- the title/quote/signature contract is missing or materially wrong.

Only after passing this QA may the image be published and indexed.

### 10. Commit
Use a concise commit message:
`siema: YYYY-MM-DD HH:mm <title>`

A successful run means ALL are true:
- one unique standalone image exists in GitHub for one subject;
- ledger/index updated;
- gallery metadata updated through the ledger;
- source recorded;
- commit reached main.

If any required write fails, do not claim the run completed.

## Scheduled-run output
Return a compact report with:
- mode: HOURLY / TOP_WEEKLY / TOPIC;
- title/topic;
- source;
- generated timestamp;
- image repository path;
- commit SHA/link;
- total generated paintings.

If there is no sufficiently new trustworthy story, return `NO_UNIQUE_STORY` and make no image/index commit.
