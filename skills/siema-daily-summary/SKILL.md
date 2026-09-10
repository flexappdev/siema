# SIEMA Daily 24 Summary

## Goal
Produce one daily summary for the previous completed Europe/London calendar day containing all 24 hourly SIEMA slots, 00:00 through 23:00.

## Source of truth
Read `data/siema-index.json`, `SIEMA_INDEX.md`, and the timestamped image assets under `public/siema/YYYY/MM/DD/` in `flexappdev/siema`.

## Completeness
A complete day has exactly 24 successful hourly paintings, one per clock hour. Never silently treat fewer than 24 as complete.

For each hour show:
- hour (00–23 Europe/London)
- title
- topic
- source/publisher
- image path/link
- commit SHA/link
- generation timestamp

If multiple valid paintings exist in one hour, show the first successful canonical hourly painting and list extras separately. If an hour is missing, mark it `MISSING`.

## Backfill rule
Before publishing the summary, if any of the 24 slots are missing, attempt to backfill missing slots using unique trustworthy AI stories appropriate to that date, following `skills/siema-hourly/SKILL.md`. Keep each backfilled painting unique and timestamp it to the missing hourly slot while recording the actual backfill execution time separately. If image generation or GitHub write capability is unavailable, do not pretend the slot was filled; report the exact missing hours.

## Output
Return:
- date
- completeness: `24/24` or `<n>/24`
- 24 hourly entries in chronological order
- concise Top 5 stories of the day
- one-line daily theme/observation
- links to the GitHub index and live SIEMA gallery

Also write/update `daily/YYYY-MM-DD.md` in the repository with the same 24-slot summary, preserving evidence links. Do not create a collage; the summary is an index of the 24 standalone paintings.
