# Agent-driven YouTube Shorts Workflow - Media

Input: https://pagesix.com/2026/09/23/celebrity-news/harvey-weinstein-sentenced-to-15-years-in-prison-in-new-york-sexual-assault-case/

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
- Provide original commentary
- First 3 seconds (Hook): Drop a bold claim, contrarian take, or open loop. Max 12 words. Zero intro fluff ("Hey guys", "Did you know").
- Middle (3-20 sec): Deliver 2 rapid-fire value hits or proof points. Add a pattern interrupt at second 12.
- Climax/Payoff (20-35 sec): Deliver the core insight or twist.
- Outro/CTA (35-45 sec): Loop-friendly closing line + micro-CTA under 5 words.

* No long introductions
* No unnecessary sentences
* No misleading hooks
* No unedited third-party clips
* No repetitive, mass-produced scripts
* PLEASE USE LESS FORMAL LANGUAGE, make it conversational, looser voice.

Save only spoken narration to `public/<id>/script/script.txt`.
