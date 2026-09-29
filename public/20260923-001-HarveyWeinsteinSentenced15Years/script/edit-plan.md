# Edit plan — Harvey Weinstein sentencing

## Source, duration, concept

Original narration: `audio/20260923-001-HarveyWeinsteinSentenced15Years.mp3`, mono 44.1 kHz; ffprobe and decoded PCM both report **39.471 seconds**. Output: 1080 × 1920, 30 fps, `ceil(39.471 * 30) = 1185` frames (39.500 seconds). No speech cuts, regeneration, rate changes, or intentional end-card tail. Original assets preserved.

Latest completed style reference: `src/20260921-002-EdSheeranSaysFamilyAbandonedHim.tsx` and its existing MP4, confirmed against source IDs, Root registration, and renders. Inspected rendered contact sheet across its entire runtime. Retained THE BRIEF, bold sans-serif, gold #ffd22e, ink #07090d, warm white #f8f7f1, subtle push-ins and anchored captions. Captions now reproduce its timed gold active-word treatment. All horizontal edges share the reference's thin 58px margin. No flash cuts for this sensitive subject.

Considered: (1) courtroom portrait montage, (2) chronological case file, (3) competing sentencing requests. Chosen: evidence-led courtroom edit combining the **20 versus 9 comparison**, **2024/2025 timeline**, and two sequential attributed judge quotation cards. The ending returns to courtroom imagery without repeating the opening still. No audience analytics supplied; no retention claim.

## Beat map

Times are narration-relative seconds; frame boundaries use the first frame at or after the stated time. All photos are stills, with no source-time range.

| Time / frames | Spoken beat | Asset / source range | Graphic | Motion | Sound |
|---|---|---|---|---|---|
| 0–4 / 0–119 | 15 years; claims innocence | wheelchair-portrait | 15 YEARS; subject name | restrained push-in | narration |
| 4–7.75 / 120–232 | 74; Manhattan court | archival walking clip / composition seconds 4–7.75 | age / wheelchair + archival label | cropped source motion | muted source; narration |
| 7.75–11.5 / 233–344 | prosecution 20; defense nine | vector graphic | labeled proportional bars, identical scale | reveal with each spoken request | narration |
| 11.5–14.81 / 345–444 | Haley; former assistant | miriam-haley-courtroom | name and role | face-protecting crop | narration |
| 14.81–17.37 / 445–521 | life sentence; testified twice | miriam-haley portrait | attributed paraphrase | slow push | narration |
| 17.37–20.63 / 522–618 | overturn; retrial | vector timeline | 2024 → 2025 | sequential markers | narration |
| 20.63–24.55 / 619–736 | remorse claim; innocence | defense-table | paired positions | text changes at 23.13 | narration |
| 24.55–26.54 / 737–796 | Judge Farber responds | with-attorneys | judge-response introduction | calm portrait hold | narration |
| 26.54–28.71 / 797–861 | took by force | editorial quotation card | attributed quotation | gold underline | narration |
| 28.71–31.2 / 862–935 | never accepted responsibility | editorial quotation card | second quotation | restrained underline | narration |
| 31.2–33.08 / 936–992 | six years; same charge | vector recap | 2020 / 2024 / 2025 | short recap, dates already contextualized | narration |
| 33.08–36 / 993–1079 | sentence; registration | vector result card | 15 YEARS + registration | registration appears with speech | narration |
| 36–39.5 / 1080–1184 | closing question; comment below | wheelchair-court-02 | justice delayed / unfinished? | subtle continued push; no frozen tail | full narration through final word |

## Transcription and captions

Executable: `/opt/homebrew/bin/whisper-cli` (whisper.cpp, installed libwhisper 1.9.2). Existing compatible model: `/Users/cudisquare/models/whisper/ggml-base.en.bin`. Language: English (`en`). No installation or model download.

```sh
ffmpeg -i public/20260923-001-HarveyWeinsteinSentenced15Years/audio/20260923-001-HarveyWeinsteinSentenced15Years.mp3 -vn -ar 16000 -ac 1 -c:a pcm_s16le public/20260923-001-HarveyWeinsteinSentenced15Years/subtitles/transcription-input.wav
whisper-cli -m /Users/cudisquare/models/whisper/ggml-base.en.bin -f public/20260923-001-HarveyWeinsteinSentenced15Years/subtitles/transcription-input.wav -l en -ml 1 -ojf -osrt -of public/20260923-001-HarveyWeinsteinSentenced15Years/subtitles/whisper-raw
```

Metal failed in sandbox; the authorized unsandboxed run succeeded. Additional CPU (`-ng`) region passes used samples from 10.5–15.0 and 31.1–39.471 seconds; their offsets are embedded in filenames. Restore these offsets before comparison. A third ending pass with the script as a prompt recovered spelling but produced unusable zero-duration end tokens: preserved as raw evidence, **not used for timing**.

`prepare-captions.py` reproduces corrected words, phrase cues, and SRT from raw results. Offsets in milliseconds are explicitly divided by 1000. Subwords, contractions, punctuation, and compound words are merged. Non-speech and empty tokens are omitted. Haley-region timings replace the zero-duration “Then” segment. Project Runway capitalization corrected. Closing “just as” recognized as “justice,” combining its existing acoustic span (not subdividing or evenly distributing time); a spurious “hey” removed using script context. These corrections require human listening confirmation. Original main-pass ending boundaries retained, clipped only at measured duration. 114 words / 32 phrases; bounds, finiteness, positive duration and non-overlap asserted.

**Alignment limitation:** regional passes disagree at some word boundaries. Burned captions use stable complete phrases and highlight the active word from the corrected word JSON. The JSON remains an approximate transcription alignment rather than a human-verified karaoke track. Script-assisted final-question correction and every-line listening remain unverified because this execution interface provides no auditory monitoring. No claim of completed listening review.

## Assets and audio

Selected photographs were inspected at full source resolution. Still image crops preserve subject faces. The edit now rotates through distinct supplied images instead of repeating the same courtroom still: wheelchair portrait, Haley courtroom arrival, Haley portrait, defense table, attorneys, and the sentencing-table image at the close. The supplied ABC7 clip appears during the Manhattan-court setup with an explicit `ARCHIVAL FOOTAGE` label; the crop keeps its old lower-third chronology outside the visible edit. The edit's dates follow the supplied script. No added external assets, music, or SFX; the calm narration-only mix suits the subject. Quotes are editorial cards, not simulated court documents. Credits remain visible below essential text.

Original audio measured −24.59 LUFS integrated / −4.98 dBTP. `narration-master.wav` is a duration-preserving loudness master:

```sh
ffmpeg -i public/20260923-001-HarveyWeinsteinSentenced15Years/audio/20260923-001-HarveyWeinsteinSentenced15Years.mp3 -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 48000 -c:a pcm_s24le public/20260923-001-HarveyWeinsteinSentenced15Years/audio/narration-master.wav
```

Master measured **−15.88 LUFS integrated / −1.49 dBTP / 2.2 LU loudness range**. Mono source, no stereo cancellation risk. No timing change; captions remain on original timeline.

## QA

- `npm run check`: passed.
- `npm run preview:short -- 20260923-001-HarveyWeinsteinSentenced15Years`: passed at 540 × 960; regenerated with timed word highlighting, unified 58px margins, varied stills, and the archival source clip.
- `npm run render:short -- 20260923-001-HarveyWeinsteinSentenced15Years`: passed. macOS sandbox blocked Chromium, so rendering used authorized unsandboxed execution.
- Final probe: H.264, 1080 × 1920, 30 fps, 1185 video frames / 39.500 seconds; AAC audio. Full video/audio decode passed. Container may include AAC encoder padding beyond the visual timeline; see `qa/final-probe.json`.
- Final mux measured **−15.95 LUFS integrated / −4.42 dBTP**, within targets. No clipping. Audio source starts at composition zero and remains unchanged in timing.
- All 114 word entries and 32 phrase cues pass finite, positive-duration, chronological, non-overlap and audio-bound checks.
- Inspected active-word samples throughout the revised preview and final render, including the opening, names, numbers, quotation, closing question, and call to action. Each active word turns gold while spoken and upcoming words retain the reference colors. Inspected opening, archival crop, comparison, distinct Haley and courtroom crops, timeline, quote, payoff and last frame at final resolution. No visible caption overflow, face obstruction by captions, missing assets, or black gaps. Full-runtime blackdetect scan passed (98% black-frame threshold); designed dark editorial cards are intentional.
- Phone-size review used a conservative mock UI overlay at 270 × 480, including right controls, top chrome and bottom metadata. Essential wordmark, headlines, graphics and captions remained clear. Actual Shorts UI varies; this is a guide, not a platform guarantee.
- Last frame retains the closing question, photograph and complete “Comment below.” caption; subtle image movement continues to the end. No extra end card.
- Evidence: `out/<id>/qa/all-captions.jpg`, `phone-ui-review.png`, seven full-resolution PNGs, render logs, probe JSON, loudness log and blackdetect log.
- Captions retain stable phrase groups while the currently spoken word changes to gold from the corrected word-timing file; spoken words resolve to warm white and upcoming words remain muted. The effect follows the latest reference component and uses measured word timestamps rather than distributing phrase duration.
- All horizontal content edges use the shared `58px` thin-margin token; media cards, headings, graphics, captions, credits, progress rule, wordmark, and footer align to it.
- **Not completed:** continuous real-time watch with sound, every-line auditory correction, headphone/phone-speaker listening and perceptual sync confirmation. Visual review used decoded sample frames across the runtime. Closing-question and Haley-region alignment remain approximate; their highlights follow the corrected Whisper spans and should receive a human auditory pass before publication.
