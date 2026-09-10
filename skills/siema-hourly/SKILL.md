# Siema Hourly Skill

## Purpose
Generate exactly one unique SIEMA SKETCH PAINTING from either:
1. an explicit topic supplied by the user;
2. the best new AI story available at run time; or
3. the strongest unique AI story from the previous 7 days when Top Weekly mode is requested.

The default repository is `flexappdev/siema`. The default timezone is `Europe/London`.

The index is mandatory. Every successful publication must update `data/siema-index.json` and `SIEMA_INDEX.md`.

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
- complete image prompt;
- 3–6 tags.

Humour must support the explanation rather than overwhelm it.

### 5. Canonical visual contract
Generate exactly ONE standalone landscape 16:9 image.

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
- ONE SCENE = ONE IMAGE.

TEXT:
- title top-left;
- short quote bottom-left;
- `Siema` signature bottom-right;
- minimal readable text only.

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

### 9. Commit
Use a concise commit message:
`siema: YYYY-MM-DD HH:mm <title>`

A successful run means ALL are true:
- one unique image exists in GitHub;
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
