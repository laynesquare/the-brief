# The Brief

Remotion pipeline for editorial YouTube Shorts.

## Editorial workflow

Follow [`docs/YOUTUBE_SHORTS.md`](docs/YOUTUBE_SHORTS.md) to turn an article URL into a sourced, narrated Short.

## Start

```bash
npm install
npm run dev
```

## Add a short

1. `src/YYYYMMDD-NNN-Title.tsx` — export `id`, `durationInFrames`, and the component
2. Matching assets: `public/<id>/...`
3. Register it in `src/Root.tsx` `shorts` array

## Narrate

```bash
# .env: ELEVENLABS_API_KEY=...
# optional: ELEVENLABS_VOICE_ID=...
npm run narrate -- 20260921-002-EdSheeranSaysFamilyAbandonedHim
```

Writes `public/<id>/audio/narration.mp3`.

## Render

```bash
npm run preview:short -- 20260901-001-MeghanMontecitoStaffing
npm run render:short -- 20260901-001-MeghanMontecitoStaffing
```

Writes `out/<id>/preview.mp4` or `out/<id>/final.mp4`.
