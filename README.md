# The Brief

Remotion pipeline for editorial YouTube Shorts.

## Start

```bash
npm install
npm run dev
```

## Add a short

1. `src/YYYYMMDD-NNN-Title.tsx` — export `id`, `durationInFrames`, and the component
2. Matching assets: `public/<id>/...`
3. Register it in `src/Root.tsx` `shorts` array

## Render

```bash
npm run preview:short -- 20260901-001-MeghanMontecitoStaffing
npm run render:short -- 20260901-001-MeghanMontecitoStaffing
```

Writes `out/<id>/preview.mp4` or `out/<id>/final.mp4`.
