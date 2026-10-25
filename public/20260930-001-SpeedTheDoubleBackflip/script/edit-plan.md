# Edit plan — 20260930-001-SpeedTheDoubleBackflip

## Media and output

- Source: `video/full-clip-of-speed-doing-backflip.mp4`
- Source properties: 78.001088 s; 2560 × 1440; 60 fps; AV1 video; stereo AAC at 44.1 kHz.
- Required output: 2160 × 2880; 30 fps; H.264/AAC.
- Final timeline: 1,156 frames / 38.533 s.
- Story: airborne cold-open tease → KFC-bucket stakes → grip/setup → first attempt and spill → retry → clean payoff → authentic final tag.
- Source order is preserved after the opening tease. The tease repeats 0.7 s from the successful attempt without revealing the landing.

## Cut map

| composition time / frames | source range | action / dialogue | crop / layout | caption treatment | transition | sound |
|---|---:|---|---|---|---|---|
| 0.000–0.700 / 0–20 | 53.20–53.90 | Cold open: Speed launches into the retry | Tight centered 3:4 action crop; no landing shown | Bespoke `WAIT—` hook only; no invented dialogue | 3-frame flash into setup | Local whoosh; source audio faded |
| 0.700–8.500 / 21–254 | 12.72–20.52 | “If no chicken falls out…” / backflip challenge | Center on Speed and bucket; slow 2% push | Whisper-timed Lemon Milk captions; KFC/bucket/backflip accents | Hard cut with short directional streak | Original dialogue at +3.8 dB |
| 8.500–14.700 / 255–440 | 25.20–31.40 | “How do I hold this?” / “Like that?” | Slightly wider crop to keep bucket and helpers readable | Warm-white words; “hold” highlighted cyan | Motivated push cut | Original dialogue; subtle whoosh under cut |
| 14.700–26.300 / 441–788 | 34.80–46.40 | First attempt, spill, “one more time” | Full readable stunt framing, then reaction punch-in | Captions move above crouched subject after landing | No transition across the flip; 2-frame impact flash on landing | Local impact on floor contact, low under reaction |
| 26.300–37.533 / 789–1125 | 51.20–62.44 | Retry, clean landing, “Let’s go… I do this” | Full stunt framing, then eased payoff punch-in | No caption over airborne frames; lime/cyan payoff accents | Clean hard cut before reset | Local 2 s riser before launch; impact at landing |
| 37.533–38.533 / 1126–1155 | 76.80–77.80 | “How did I do that though?” | Close reaction crop | Compact centered final phrase; hot-word pop | Fast push cut; clean end | Original audio fade, no end-card sound |

## Captions and transcription

- Audio was extracted unchanged on the 78.001 s source timeline to mono 16 kHz PCM.
- `whisper-cli` 1.9.2 with the already-installed local `ggml-base.en.bin` model generated `whisper-raw.json` and `whisper-raw.srt`.
- `dialogue.words.json` was derived from Whisper token offsets. Obvious context-supported recognition fixes only: “ticket” → “chicken”, “Backlit” → “Backflip”, “like” → “hold”, and “like it’s law” → “like and sub”. Timings remain Whisper-generated.
- Source word times are mapped per cut with `compositionTime = segmentStart + (sourceTime - sourceIn)`; no evenly distributed or invented word timing is used.
- Primary captions use the local Lemon Milk Bold OTF copied into this ID’s font directory and loaded before rendering.

## SFX provenance

- `audio/whoosh.wav`, `audio/riser.wav`, and `audio/impact.wav` are original procedural effects synthesized locally with FFmpeg lavfi oscillators/noise. No downloaded or third-party SFX are used.
- Effects are kept beneath the authentic source audio and occur only at motivated edit/action beats.

## QA notes

- Verify the two takeoff/rotation/landing beats at full resolution and phone size.
- Check the center captions around source 38.3–46.4 and 54.96–62.44 so they do not cover Speed’s face or the bucket.
- Measure the completed preview/final for dimensions, frame rate, duration, integrated loudness, and true peak; record final values here after rendering.
