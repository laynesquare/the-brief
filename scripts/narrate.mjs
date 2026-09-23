#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

const id = process.argv[2];
if (!id) {
	console.error('Usage: npm run narrate -- <id>');
	process.exit(1);
}

loadDotenv();

const script = join('public', id, 'script', 'script.txt');
const out = join('public', id, 'audio', 'narration.mp3');
const text = (await readFile(script, 'utf8')).trim();
if (!text) {
	console.error(`empty script: ${script}`);
	process.exit(1);
}

const voiceId = process.env.ELEVENLABS_VOICE_ID ?? '15CVCzDByBinCIoCblXo';
const audio = await new ElevenLabsClient().textToSpeech.convert(voiceId, {
	text,
	modelId: 'eleven_multilingual_v2',
	outputFormat: 'mp3_44100_128',
	voiceSettings: { stability: 0, similarityBoost: 1, style: 0.41, speed: 1.1, useSpeakerBoost: true },
});

await mkdir(dirname(out), { recursive: true });
await writeFile(out, await drain(audio));

const sec = duration(out);
const warn = sec != null && (sec < 30 || sec > 35) ? '  (want 30–35s)' : '';
console.log(sec != null ? `${out}  ${sec.toFixed(2)}s${warn}` : out);

async function drain(stream) {
	const reader = stream.getReader();
	const chunks = [];
	for (;;) {
		const { done, value } = await reader.read();
		if (done) return Buffer.concat(chunks);
		chunks.push(Buffer.from(value));
	}
}

function duration(file) {
	const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], {
		encoding: 'utf8',
	});
	const n = Number(r.stdout);
	return Number.isFinite(n) ? n : null;
}

function loadDotenv() {
	if (!existsSync('.env')) return;
	for (const line of readFileSync('.env', 'utf8').split('\n')) {
		const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
		if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
	}
}
