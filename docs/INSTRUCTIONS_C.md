# Agent-driven YouTube Shorts Workflow - IShowSpeed Clips

Input: an existing ID: `20260930-001-SpeedTheDoubleBackflip`.

Turn the existing stream excerpt into a finished, fast-paced, captioned vertical video using Remotion. Do not research or download replacement footage: the source clip already exists in the ID's `video/` directory.

```text
Inspect existing clip → identify the strongest story arc
→ transcribe and verify word timing → plan the cut → edit and sound-design
→ preview and refine → render and verify
```

## 1. Use the supplied media

- Work only from media already present in `public/<id>/video/`. For this ID, the source is:

```text
public/20260930-001-SpeedTheDoubleBackflip/video/full-clip-of-speed-doing-backflip.mp4
```

- Treat it as an extracted clip from a roughly three-hour stream, not as the entire stream. The supplied file is approximately 78 seconds, 2560 × 1440, 60 fps, with stereo AAC audio.
- Watch the entire supplied clip before editing. Identify the clearest self-contained sequence: setup or challenge, anticipation, attempt, reaction, and payoff. Remove dead air, repeated setup, and frames that do not help that arc.
- Preserve the original file. Do not overwrite, transcode in place, or modify it.
- Do not invent context or reorder speech/actions in a misleading way. Jump cuts may tighten pauses, but the final sequence must preserve what actually happened.
- Use the source audio as the main audio. Do not add narration or replace IShowSpeed's voice.
- Aim for the shortest complete cut that lands the payoff, typically 20–45 seconds. Do not force a fixed duration if it cuts off the setup, stunt, or reaction.

Inspect exact media properties before implementing:

```bash
ffprobe -v error \
  -show_entries stream=index,codec_type,codec_name,width,height,r_frame_rate,sample_rate,channels:format=duration \
  -of default=noprint_wrappers=1 \
  "public/<id>/video/<actual-source-file>"

```

## 2. Use the required output format

- The finished composition and export must be **2160 × 2880 at 30 fps**.
- This is a 3:4 vertical frame. Do not silently substitute 1080 × 1920, 9:16, a different frame rate, or another standard preset.
- Fill the canvas intentionally from the 16:9 source. Use a sharp center/subject crop for the foreground and, when necessary, a full-bleed blurred or enlarged duplicate behind it. Never stretch the source.
- Reframe dynamically to keep Speed, the stunt, and reactions visible. Animate crop position only when the subject moves enough to require it; avoid constant drifting.
- Keep important faces, the stunt, and captions away from the extreme edges and likely platform UI. Inspect the render at phone size as well as full resolution.

## 3. Auto-generate captions

Create these deliverables:

```text
public/<id>/subtitles/transcription-input.wav
public/<id>/subtitles/whisper-raw.json
public/<id>/subtitles/whisper-raw.srt
public/<id>/subtitles/dialogue.words.json
public/<id>/subtitles/dialogue.srt
```

- Use Whisper to automatically generate the transcript and word timings.
- Find and use an already installed Whisper executable and compatible local model before installing or downloading anything.
- On this machine, the verified local Whisper resources are:

```text
Executable: /opt/homebrew/bin/whisper-cli
Model:      /Users/cudisquare/models/whisper/ggml-large-v3.bin
```

- Prefer `ggml-large-v3.bin` for max local accuracy on English Shorts (force `-l en`).
  Faster fallback: `ggml-large-v3-turbo.bin`. Also on disk: `ggml-small.en.bin`, `ggml-base.en.bin`.
- Prefer the model above instead of the Homebrew test fixture at
  `/opt/homebrew/Cellar/whisper.cpp/1.9.2/share/whisper-cpp/for-tests-ggml-tiny.bin`.
  That fixture contains no real model tensors and cannot transcribe production audio.
- The verified CLI is whisper.cpp, not Python Whisper. A working CPU-safe command pattern is:

```bash
/opt/homebrew/bin/whisper-cli \
  -m "/Users/cudisquare/models/whisper/ggml-large-v3.bin" \
  -ng -t 8 -l en -ojf -osrt -owts \
  -of "public/<id>/subtitles/whisper-raw" \
  "public/<id>/subtitles/transcription-input.wav"
```

- Extract mono 16 kHz audio from the original source without changing its timeline:

```bash
mkdir -p "public/<id>/subtitles"

ffmpeg -i "public/<id>/video/<actual-source-file>" \
  -vn -ar 16000 -ac 1 -c:a pcm_s16le \
  "public/<id>/subtitles/transcription-input.wav"
```

- Generate word timestamps using the installed tool's supported flags; do not mix Python Whisper flags with whisper.cpp flags.
- Preserve Whisper's raw JSON and SRT outputs. Convert the generated word timestamps into `dialogue.words.json` entries in the form `{ "text": string, "start": number, "end": number }`, with times in seconds from the start of the unedited source.
- Use the auto-generated wording and timing as the caption source. Optional QA may fix an obvious transcription error, but manual transcription and manual word-by-word timing are not required.
- Require finite chronological timings with `0 <= start < end <= source duration`. Never distribute a sentence evenly to fake word timing.
- When the edit removes pauses or rearranges contiguous source ranges, explicitly map source time to composition time. Captions must follow the edited timeline and remain synchronized after every cut.

## 4. Plan the retention edit

Write `public/<id>/script/edit-plan.md` before implementation. Include source duration/properties, required output properties, selected in/out ranges, final duration, and a compact table:

```text
composition time/frames | source range | action/dialogue | crop/layout | caption treatment | transition | sound
```

Build a truthful mini-story with this rhythm:

- **0–1 second — cold open:** Begin on the strongest relevant motion, claim, or reaction. If useful, tease a very short payoff fragment, then immediately return to the setup; do not spoil the full landing.
- **Setup:** Establish the double-backflip challenge quickly enough that a viewer with no stream context understands it.
- **Anticipation:** Tighten pauses with motivated jump cuts, progressive punch-ins, and rising sound design.
- **Attempt/payoff:** Keep the stunt readable. Avoid transitions, oversized captions, or speed ramps that hide the takeoff, rotations, landing, or outcome.
- **Reaction/loop:** Let the best authentic reaction land, then end cleanly or use a natural visual/audio match back to the opening. Do not add a generic end card.

Use frequent visual changes only when they add clarity or energy. Favor reframes, reaction punch-ins, brief replays, and purposeful emphasis over arbitrary effects. “Viral” is a creative objective, not a guaranteed result.

## 5. Use center-screen TikTok-style captions

- Burn captions into the finished video. Position the active caption around the visual center, adjusting locally so it never covers Speed's face or the stunt's critical action.
- Use the already-downloaded **Lemon Milk Bold** font for every primary caption. Locate the local font file, load it explicitly in Remotion, and verify it renders in both preview and final output; do not silently fall back to a system font.
- Display words as they are spoken. Drive each reveal and highlight from Whisper's generated word timestamps, not estimated sentence progress.
- Use compact phrases, normally 2–5 words and no more than two lines. Break phrases at natural speech boundaries and keep rapid exclamations readable.
- Add a strong dark drop shadow and, where needed, a restrained outline so Lemon Milk Bold remains readable over every background.
- Apply a quick, smooth fade-in to each new word or phrase. The fade must begin on the verified speech timing and finish rapidly enough to keep fast dialogue readable; never let the animation make the caption appear late.
- Make captions vibrant but coherent. Color-code important words according to emotional impact—for example, electric yellow for anticipation, cyan or lime for positive excitement, orange for urgency, and hot pink or red for shock or maximum intensity. Use warm white for neutral words and avoid random color changes that do not reflect the moment.
- Apply a controlled glow effect to emotionally important or strongly stressed words. Match the glow to the word's accent color, keep it readable rather than hazy, and avoid glowing every caption.
- The currently spoken word may pop to roughly 108–118% scale and switch accent color, then settle. Keep animation quick and frame-driven; avoid bouncing every word continuously.
- Use occasional bespoke emphasis for key phrases such as the challenge, “double backflip,” the attempt, or the reaction. Do not let decorative typography obstruct footage.
- Check the longest phrase, fastest speech, and the stunt frames at full resolution and at phone size. Fix overlap, clipping, late words, early words, and unreadably short flashes.

## 6. Add lively editing, transitions, and sound design

Keep the source performance central. Add polish that follows the action:

- Use hard cuts and whip/push transitions for major beat changes; use a brief flash or impact frame only on a real visual impact.
- Add eased punch-ins on strong reactions, quick directional motion blur on motivated transitions, and a short replay only if it makes the stunt easier or more satisfying to understand.
- Use speed changes sparingly. Keep speech natural, and keep the decisive stunt readable. Any ramp must return to real time at the key action or landing.
- Add tasteful SFX such as a riser before the attempt, whooshes on transitions, a bass hit or impact on the landing/payoff, and a subtle sparkle or crowd accent where supported by the footage.
- Every SFX must be synchronized to a visible action or editorial beat. Do not layer effects continuously, use meme sounds without purpose, or bury authentic reactions.
- If no suitable SFX already exists in the repository, create simple original effects locally or use clearly licensed assets and document their source/license in `public/<id>/script/edit-plan.md`. Do not download unlicensed effects casually.
- Clean and level the original audio before adding effects. Reduce noise only if it does not make speech metallic. Duck SFX beneath speech and preserve the source reaction.
- Avoid clipping and abrupt joins. As internal delivery targets, aim around **-14 to -16 LUFS integrated** and no higher than **-1 dBTP**. Check headphones, phone-speaker intelligibility, and mono compatibility.
- Avoid constant shake, strobing, excessive flashes, or stacked transitions. Energy should rise toward the attempt and payoff.

## 7. Implement in Remotion

- Replace the placeholder in `src/20260930-001-SpeedTheDoubleBackflip.tsx` with the finished edit.
- Export `id`, `durationInFrames`, and `SpeedTheDoubleBackflip`. Use `FPS = 30`, and calculate the duration from the final edit timeline.
- Confirm the composition is registered exactly once in `src/Root.tsx` with width `2160`, height `2880`, and fps `30`. Do not remove or change unrelated compositions.
- Load repository media with `staticFile()`. Keep all animation deterministic and based on `useCurrentFrame()`, `interpolate()`, and `spring()`.
- For each source segment, account for its in-point, out-point, playback rate, and `Sequence` offset. Prevent source overruns, blank frames, frozen tails, and caption drift across jump cuts.
- Preserve existing user work and reuse project patterns where they help, but do not retain placeholder copy or generic title-card timing.

## 8. Preview, refine, render, and verify

Run from the repository root:

```bash
npm run check
npm run preview:short -- 20260930-001-SpeedTheDoubleBackflip
```

Watch `out/20260930-001-SpeedTheDoubleBackflip/preview.mp4` completely with sound. Review the first second, every source cut, the fastest caption sequence, the full stunt, the payoff/reaction, and the final frame. Then inspect representative frames at full resolution.

Refine until all of the following are true:

- The story is understandable without prior stream context.
- The opening delivers immediate motion or stakes.
- Every caption matches the audible word and appears on time.
- Center captions do not hide faces, the takeoff, rotations, landing, or key reaction.
- Reframing follows the subject without stretching or cutting off essential action.
- Transitions and SFX are motivated, synchronized, and not overwhelming.
- Source dialogue remains clear and the audio does not clip.
- There are no black gaps, missing assets, frozen tails, or broken frames.
- Output properties are 2160 × 2880 at 30 fps.

Render the final only after the preview passes:

```bash
npm run render:short -- 20260930-001-SpeedTheDoubleBackflip

ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,r_frame_rate:format=duration \
  -of default=noprint_wrappers=1 \
  "out/20260930-001-SpeedTheDoubleBackflip/final.mp4"
```

## 9. Deliverables

Deliver:

- The completed Remotion component and correct `src/Root.tsx` registration.
- Whisper-generated raw and processed word-timed subtitles.
- `public/<id>/script/edit-plan.md` with source ranges, caption/transcription method, SFX provenance, and QA notes.
- `out/<id>/preview.mp4` and `out/<id>/final.mp4`.
- A short handoff stating the final duration, 2160 × 2880 dimensions, 30 fps, creative structure, caption treatment, audio checks, and any verification that could not be completed.

Uploading or publishing is outside this workflow unless explicitly requested.
