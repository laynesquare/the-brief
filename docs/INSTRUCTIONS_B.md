# Agent-driven YouTube Shorts Workflow - Video Creation

Input: an existing [stage-one](INSTRUCTIONS_A.md) ID: `20260923-001-HarveyWeinsteinSentenced15Years`.

Turn the existing narration and media in `public/<id>/` into a finished, captioned YouTube Short using Remotion. Preserve The Brief's identity while adding distinctive, professional editing suited to the script.

```text
Provided ID → inspect assets and latest component → Whisper subtitles
→ plan story beats → edit → preview and refine → render and verify
```

## 1. Inspect the handoff and style reference

- Read `script/script.txt` and `script/sources.md`; listen to the complete narration in `audio/`. Filenames vary: distinguish narration from music and effects.
- Use the recording as the authority for spoken text and timing. Do not regenerate, accelerate, or cut speech to fit a template. Report missing narration; clarify only genuinely ambiguous recordings.
- Preview selected media for identity, context, resolution, framing, and usable source ranges. Preserve originals; record additional assets' sources, credits, and usage information in `sources.md`.
- Measure the narration rather than trusting stage one's approximate duration:

```bash
ffprobe -v error -show_entries format=duration \
  -of default=noprint_wrappers=1:nokey=1 \
  "public/<id>/audio/<actual-narration-file>"
```

Find the latest completed component using date/sequence IDs, `src/Root.tsx`, and available renders. Read it and watch its render when available. The current starting reference is `src/20260921-002-EdSheeranSaysFamilyAbandonedHim.tsx`; rediscover the latest each time.

Retain the wordmark, bold sans-serif typography, gold `#ffd22e`, ink `#07090d`, warm white `#f8f7f1`, and compatible motion/caption conventions. Replace all story-specific assets, wording, timestamps, and source offsets. Improve weak crops or effects instead of inheriting them.

## 2. Generate and correct Whisper subtitles

Whisper is already downloaded. Find the installed executable and compatible local model before installing or downloading anything. This machine exposes `whisper-cli` (whisper.cpp); check its local help and locate the actual model path.

Replace placeholders below. Create a transcription copy without trimming or shifting the audio:

```bash
mkdir -p "public/<id>/subtitles"

ffmpeg -i "public/<id>/audio/<actual-narration-file>" \
  -vn -ar 16000 -ac 1 -c:a pcm_s16le \
  "public/<id>/subtitles/transcription-input.wav"

whisper-cli \
  -m "/absolute/path/to/existing-compatible-model.bin" \
  -f "public/<id>/subtitles/transcription-input.wav" \
  -l en -ml 1 -ojf -osrt \
  -of "public/<id>/subtitles/whisper-raw"
```

Use the spoken language. The [whisper.cpp documentation](https://github.com/ggml-org/whisper.cpp/blob/master/README.md) describes `-ml 1` as experimental word timing; inspect and reconcile tokens. Python Whisper instead supports `--word_timestamps True --output_format all`; never mix the implementations' flags or model formats.

- Preserve raw outputs. Produce `subtitles/narration.words.json` containing `{text, start, end}` words in seconds from narration start, plus corrected, phrase-grouped `subtitles/narration.srt`.
- Convert units explicitly, merge subword tokens, and remove special tokens. Listen through every line to correct names, numbers, omissions, and hallucinations without changing spoken meaning.
- **Verify against the known script:** Diff Whisper output against `public/<id>/script/script.txt`. The script is the source of truth for *what* was said; Whisper is the source of timing. Fix any wrong words, dropped phrases, or invented text so captions match `script.txt` exactly (allowing only punctuation/casing needed for display). If audio and script diverge, trust the audio and note the mismatch in the edit plan.
- Require chronological, finite timings with `0 <= start < end <= audio duration`. Check overlaps and drift throughout the recording.
- Never distribute sentence duration evenly to invent word timing. Correct against playback or retranscribe a region, restoring its timeline offset. If word alignment remains unreliable, use accurate phrase captions and disclose the limitation.
- Update captions and scene timing after any audio timing change. Record the executable, model, language, and command in the edit plan.

## 3. Plan for clarity and retention

Write `public/<id>/script/edit-plan.md` with the audio duration, style reference, chosen concept, and a compact beat table: **time/frames → spoken beat → asset/source range → graphic → motion → sound**. Choose the concept and proceed without an approval checkpoint.

Map the actual narration's hook, context, evidence, complication, payoff, and closing question:

- **Opening 0–2 seconds:** Strong relevant image, short headline, immediate subject and stakes; no logo-only intro.
- **Development:** Reveal information with speech. Aim initially for a meaningful visual change every 2–4 seconds, adjusting for comprehension and emotional weight.
- **Evidence/turn:** Show relevant quotations or source material when mentioned. Use a comparison, timeline, scale change, or deliberate pause at the turning point.
- **Payoff/ending:** Give the result room to land, finish every spoken word, and connect visually to the opening when natural. Avoid a long end card.

Consider two or three ideas and implement at least one bespoke treatment, such as an animated timeline, highlighted source excerpt, or supported split-screen comparison. Retention is an objective, not a guarantee; use actual audience analytics when available to improve future edits.

## 4. Apply professional editing standards

### Layout and captions

- Work at **1080 × 1920, 30 fps**. Give each shot a clear focal point; protect faces and evidence when cropping landscape media.
- Match exposure, contrast, and color across assets. Use vibrant accents, believable skin tones, and restrained gradients or shadows for text separation.
- Keep headlines concise, typically 2–6 words, with consistent typography and spacing.
- Burn captions into the video. Use natural phrases of roughly 2–6 words, at most two lines, starting around 56–72 px with strong contrast.
- Keep phrases anchored and highlight the word currently being spoken in gold, following the word-timed treatment in the latest reference component. Spoken words may resolve to warm white and upcoming words to a muted white. Drive every change from verified word timing; do not estimate word position from phrase progress or bounce every word. Never obscure mouths, evidence, or headlines.
- Start essential text inside approximately x=90–900, y=200–1500; verify at phone size with a Shorts UI overlay. These are layout guides, not guaranteed platform safe areas.

### Motion and special effects

Choose a coherent combination that reinforces the script:

- Layered parallax and clean masked subject cutouts for depth.
- Eased push-ins and selective punch-ins on important delivery.
- Kinetic typography with staggered reveals, masks, and restrained overshoot.
- Animated quotation highlights, source cards, dates, and number emphasis.
- Motivated match cuts or masked wipes, with subtle grain, glow, or motion blur as finishing touches.

Time effects to meaningful beats. Alternate energy with calmer holds; avoid stacked transitions, strobing, constant shake, and arbitrary glitches. Sensitive stories need composed typography and evidence-led visuals, not celebratory or sensational effects. Preserve source context and identify archival or illustrative material when ambiguity could mislead.

### Sound

Keep narration central; mute source footage unless its sound serves a deliberate role. Duck suitable music under speech and use sparse, quiet transition effects. Avoid clipping and abrupt joins. As internal targets, aim near -14 to -16 LUFS integrated and no higher than -1 dBTP true peak. Check headphones, phone-speaker intelligibility, and mono compatibility where relevant.

## 5. Implement and render

- Create/update `src/<id>.tsx`, exporting `id`, `durationInFrames`, and the named component. Register it in `src/Root.tsx` without duplicate IDs or removing existing entries.
- Use ``staticFile(`${id}/...`)`` and existing Remotion patterns. Set duration from `Math.ceil(audioDurationSeconds * fps)`; document any intentional tail.
- Derive cuts/captions from audio timing, account for `Sequence` offsets, and prevent gaps or source overruns. Use deterministic frame-based interpolation and springs; load fonts/assets reliably.

Run from the repository root, substituting the ID:

```bash
npm run check
npm run preview:short -- <id>
```

Watch the half-resolution `out/<id>/preview.mp4` completely. Review opening, scene boundaries, longest caption, busiest graphic, payoff, and final frame. Inspect text/crops at full resolution; check visual clarity muted and synchronization with sound. Fix issues before rendering:

```bash
npm run render:short -- <id>
```

## 6. Completion and delivery

Confirm accurate, readable subtitles; coherent branding and original storytelling; intelligible synchronized audio; successful checks/renders; and no missing assets, bad crops, black gaps, frozen tails, or caption overflow. State any verification that could not be completed.

Deliver the component/registration, raw and corrected subtitles, edit plan with transcription details and QA results, updated sources where needed, and preview/final MP4s. Link the final video and relevant files, report duration/dimensions, and briefly summarize creative improvements and checks performed. Uploading or publishing is a separate task.
