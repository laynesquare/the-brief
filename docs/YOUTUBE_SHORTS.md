# YouTube Shorts Workflow

Input: one celebrity-news article URL.

Create the ID as:

```text
YYYYMMDD-NNN-UpperCamelCaseTitle
```

Example: `20260921-002-EdSheeranSaysFamilyAbandonedHim`

## 1. Research and assets

- Read the article, its original sources, other reliable coverage, and relevant forums.
- Record source URLs and media credits in `public/<id>/script/sources.md`.
- Create this asset structure:

```text
public/<id>/{audio,img,script,subtitles,video}/
```

- Download usable images from the article.
- Collect at least five distinct images on the internet.
- If there are fewer than five, find contextual photos of the person or setting.
- Search YouTube for the event, speech, interview, or related footage of the person.
- Select a useful clip of about 10 seconds.

```bash
yt-dlp -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]" \
  --merge-output-format mp4 \
  -o "public/<id>/video/source.%(ext)s" \
  "YOUTUBE_URL"

ffmpeg -ss 00:02:05 -i "public/<id>/video/source.mp4" -t 10 \
  -c:v libx264 -c:a aac "public/<id>/video/clip.mp4"
```

## 2. Write the script

Return an UpperCamelCase title followed by a 90–120 word script that runs approximately 30 seconds.

```text
HOOK → CONTEXT → EVIDENCE → COMPLICATION → PAYOFF → VIEWER QUESTION
```

- Hook viewers immediately
- Aim for 90–120 words
- Use short, conversational sentences
- Add a new detail every 3–5 seconds
- Place the CTA after the payoff
- Separate facts from rumors
- Provide original commentary
- Credit reliable sources

* No long introductions
* No unnecessary sentences
* No misleading hooks
* No unedited third-party clips
* No repetitive, mass-produced scripts

Save only spoken narration to `public/<id>/script/script.txt`.

## 3. Audio, subtitles, and video

- Generate approved narration with the ElevenLabs API and save it as `public/<id>/audio/narration.mp3`. Keep credentials in environment variables.
- Confirm pronunciation and a runtime of 30 ~ 35 seconds.
- Create `public/<id>/subtitles/narration.srt` from the final audio with Whisper.
- Create `src/<id>.tsx`, following an existing Short for consistent visual style.
- Match video duration to the audio and keep captions away from YouTube controls.
- Register the composition in `src/Root.tsx`.

```bash
npm run check
npm run preview:short -- <id>
npm run render:short -- <id>
```

Final output: `out/<id>/final.mp4`
