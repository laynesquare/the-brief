#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const mode = process.argv[2]; // final | preview
const id = process.argv[3];

if (!['final', 'preview'].includes(mode) || !id) {
	console.error('Usage:');
	console.error('  npm run render:short -- <CompositionId>');
	console.error('  npm run preview:short -- <CompositionId>');
	console.error('');
	console.error('Example:');
	console.error('  npm run preview:short -- 20260901-001-MeghanMontecitoStaffing');
	process.exit(1);
}

const out = join('out', id, `${mode}.mp4`);
mkdirSync(dirname(out), { recursive: true });

const quality =
	mode === 'preview'
		? ['--scale=0.5', '--codec=h264', '--crf=24']
		: ['--codec=h264', '--crf=18', '--audio-bitrate=192k'];

const result = spawnSync('npx', ['remotion', 'render', 'src/index.ts', id, out, '--bundle-cache=false', ...quality], {
	stdio: 'inherit',
	shell: process.platform === 'win32',
});

process.exit(result.status ?? 1);
