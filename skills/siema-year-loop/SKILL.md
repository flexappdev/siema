# Siema Year Loop Skill

## Goal
Create exactly one standalone Siema Original Sketch Paint image for every Europe/London calendar day of 2026, using the most important verified AI news story for that date.

This is a historical backfill and catch-up loop that complements `skills/siema-hourly/SKILL.md`.

## Core invariant
**ONE DAY = ONE NEWS STORY = ONE IMAGE FILE.**

Never create a grid, collage, montage, storyboard, Top-10 board, contact sheet, split screen, or multi-story image. Never crop a multi-story board into fake standalone outputs. Each date must have its own fresh image-generation call and its own standalone image.

## State
Read `data/siema-year-2026.json` before every run.

The state file contains:
- `startDate`: first target date, normally `2026-01-01`;
- `targetEndMode`: `today_europe_london`, so the loop naturally extends through the current date;
- `cursor`: earliest date not yet successfully completed;
- `completed`: one evidence-backed record per completed date;
- `skipped`: exceptional dates that could not be completed, with exact blocker/reason;
- `policy`: generation and selection rules.

Never advance `cursor` merely because research or generation was attempted. Advance only after the selected date has a successful standalone image, GitHub image write, main Siema index write, year-state write and commit evidence.

## Date selection
On each Year Loop iteration:
1. Resolve the Europe/London current date.
2. Starting from `cursor`, find the earliest date from `2026-01-01` through the current date that is not present as successful in `completed`.
3. Process exactly ONE missing historical date per iteration.
4. After successful publication, advance the cursor to the next unresolved date.
5. When no dates are missing through today, set status to `caught_up`. The next calendar day automatically becomes the new missing date.

## Story research for a historical date
Research the target calendar day on the live web/archive-visible web.

Select exactly ONE strongest AI story for that day using this order of preference:
1. major frontier-model/research breakthrough;
2. agents, robotics or scientific AI breakthrough;
3. chips, compute, data centres or energy infrastructure;
4. major AI company launch, acquisition, funding or strategic move;
5. AI safety, cybersecurity, regulation or geopolitical development;
6. meaningful product/adoption story if no larger event exists.

Prefer the underlying event to have occurred on the target date. If no sufficiently material event occurred that day, select the strongest trustworthy AI story first published that day and record that distinction in metadata.

Use primary sources where available and high-quality secondary reporting such as Reuters, AP, Bloomberg, FT, reputable technical publications or research papers. Record source URL, publisher and publication/event time.

Do not invent a story to fill a day. If no trustworthy AI story can be established after serious search, record an explicit blocker in `skipped`; do not generate fictional history.

## Uniqueness
Compare the candidate with:
- `data/siema-index.json.seen`;
- `data/siema-index.json.paintings`;
- `data/siema-year-2026.json.completed`.

For the year archive, the same broad theme may recur on different dates only when there was a materially distinct new event. Do not reuse the same underlying event on multiple days merely because it received follow-up coverage.

## Image contract
Follow `skills/siema-hourly/SKILL.md`, especially its hard rule that one news item equals one image.

Create exactly ONE standalone landscape 16:9 Siema Original Sketch Paint for the selected historical story:
- warm cream/off-white sketchbook paper;
- architectural black pen-and-ink;
- loose expressive watercolor;
- visible handmade imperfections;
- #006699 as the single strong accent colour;
- no purple;
- no photorealism;
- no CGI;
- no collage;
- no grid;
- no split screen;
- no storyboard;
- one coherent scene only;
- concise handwritten story title top-left;
- one short funny/stoic quote bottom-left;
- handwritten `Siema` signature bottom-right.

Siema the artist is optional and default off. If shown, the canonical reference rules from `skills/siema-hourly/SKILL.md` apply.

## Historical naming
The historical story date must be visible in metadata but generation time must remain truthful.

Preferred image path:
`public/siema/2026/MM/DD/2026-MM-DD_daily_<slug>.webp`

Do not falsify `generatedAt` as the historical date. Use the actual generation timestamp and add:
- `archiveDate`: target historical date;
- `storyDate`: underlying event/publication date;
- `backfill`: true.

## Publish sequence
A date is successful only after all of the following succeed:
1. generate one valid image for the one selected story;
2. inspect image against the one-story QA rule;
3. commit the actual binary image to GitHub;
4. append the painting to `data/siema-index.json.paintings` and its story to `seen`;
5. update `SIEMA_INDEX.md` newest-first or archive-aware as appropriate;
6. append the historical date record to `data/siema-year-2026.json.completed`;
7. advance `cursor` to the next missing date;
8. commit evidence reaches `main`.

If any required write fails, leave the date unresolved and report the exact blocker.

## Year index record
Each completed date record should include at least:
- `archiveDate`;
- `title`;
- `topic`;
- `sourceUrl`;
- `sourcePublisher`;
- `sourcePublishedAt`;
- `eventDate` when known;
- `imageFile`;
- `paintingId`;
- `generatedAt`;
- `commitSha`;
- `topicFingerprint`.

## Live + backfill mode
When used by the hourly `Siema Live` automation:
1. First perform the normal live/top-weekly Siema workflow if required by `data/siema-index.json.control`.
2. Then perform exactly ONE Year Loop historical date.
3. The two outputs must be completely separate image-generation calls and separate standalone image files.
4. Failure of one branch must not be disguised as success of the other branch.
5. Report `LIVE` and `YEAR_BACKFILL` status separately.

At one successful backfill date per hour, a January-to-mid-September backlog takes roughly eleven days to catch up. Once caught up, the historical branch becomes effectively one new daily archive item per new calendar day.
