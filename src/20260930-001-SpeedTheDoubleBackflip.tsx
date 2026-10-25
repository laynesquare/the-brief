import { useEffect, useMemo, useState } from 'react';
import {
	AbsoluteFill,
	Audio,
	OffthreadVideo,
	Sequence,
	cancelRender,
	continueRender,
	delayRender,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
} from 'remotion';

export const FPS = 30;
export const id = '20260930-001-SpeedTheDoubleBackflip';
export const durationInFrames = 1156;

const WHITE = '#fffaf0';
const YELLOW = '#ffe334';
const CYAN = '#32e7ff';
const LIME = '#69ff6d';
const ORANGE = '#ff8a24';
const PINK = '#ff3d8d';
const INK = '#08080a';
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const asset = (path: string) => staticFile(`${id}/${path}`);
const sourceVideo = asset('video/full-clip-of-speed-doing-backflip.mp4');

type SourceWord = { text: string; start: number; end: number };
type TimelineWord = SourceWord;
type CaptionCue = { words: TimelineWord[] };
type EditSegment = {
	key: string;
	compStart: number;
	duration: number;
	sourceStart: number;
	sourceEnd: number;
	cropX: number;
	cropY: number;
	zoomFrom: number;
	zoomTo: number;
	muted?: boolean;
	landingSource?: number;
};

const segments: EditSegment[] = [
	{
		key: 'cold-open',
		compStart: 0,
		duration: 21,
		sourceStart: 53.2,
		sourceEnd: 53.9,
		cropX: 49,
		cropY: 51,
		zoomFrom: 1.02,
		zoomTo: 1.04,
	},
	{
		key: 'challenge',
		compStart: 21,
		duration: 234,
		sourceStart: 12.72,
		sourceEnd: 20.52,
		cropX: 50,
		cropY: 50,
		zoomFrom: 1.025,
		zoomTo: 1.055,
	},
	{
		key: 'grip',
		compStart: 255,
		duration: 186,
		sourceStart: 25.2,
		sourceEnd: 31.4,
		cropX: 49,
		cropY: 51,
		zoomFrom: 1.015,
		zoomTo: 1.04,
	},
	{
		key: 'attempt-one',
		compStart: 441,
		duration: 348,
		sourceStart: 34.8,
		sourceEnd: 46.4,
		cropX: 49,
		cropY: 51,
		zoomFrom: 1,
		zoomTo: 1.015,
		landingSource: 36.8,
	},
	{
		key: 'attempt-two',
		compStart: 789,
		duration: 337,
		sourceStart: 51.2,
		sourceEnd: 62.44,
		cropX: 49,
		cropY: 51,
		zoomFrom: 1,
		zoomTo: 1.025,
		landingSource: 54,
	},
	{
		key: 'tag',
		compStart: 1126,
		duration: 30,
		sourceStart: 76.8,
		sourceEnd: 77.8,
		cropX: 53,
		cropY: 49,
		zoomFrom: 1.08,
		zoomTo: 1.12,
	},
];

const mapWordsToTimeline = (sourceWords: SourceWord[]): TimelineWord[] =>
	segments.flatMap(segment => {
		if (segment.key === 'cold-open') return [];
		return sourceWords
			.filter(word => word.start >= segment.sourceStart - 0.001 && word.end <= segment.sourceEnd + 0.001)
			.map(word => ({
				...word,
				start: segment.compStart / FPS + (word.start - segment.sourceStart),
				end: segment.compStart / FPS + (word.end - segment.sourceStart),
			}));
	});

const makeCaptionCues = (words: TimelineWord[]): CaptionCue[] => {
	const cues: CaptionCue[] = [];
	let current: TimelineWord[] = [];
	for (const word of words) {
		const previous = current[current.length - 1];
		if (previous && (word.start - previous.end > 0.42 || current.length >= 5)) {
			cues.push({ words: current });
			current = [];
		}
		current.push(word);
		if (/[.!?]$/.test(word.text) || (/[,:]$/.test(word.text) && current.length >= 3)) {
			cues.push({ words: current });
			current = [];
		}
	}
	if (current.length) cues.push({ words: current });
	return cues;
};

const accentForWord = (text: string) => {
	const normalized = text.toLowerCase().replace(/[^a-z]/g, '');
	if (['backflip', 'hold', 'did', 'that'].includes(normalized)) return CYAN;
	if (['kfc', 'bucket', 'chicken'].includes(normalized)) return YELLOW;
	if (['go', 'this'].includes(normalized)) return LIME;
	if (['no', 'what'].includes(normalized)) return PINK;
	if (['one', 'more', 'time', 'come'].includes(normalized)) return ORANGE;
	return WHITE;
};

const VideoSegment = ({ segment }: { segment: EditSegment }) => {
	const frame = useCurrentFrame();
	const progress = interpolate(frame, [0, Math.max(1, segment.duration - 1)], [0, 1], clamp);
	const sourceTime = segment.sourceStart + frame / FPS;
	const landingFrame = segment.landingSource ? (segment.landingSource - segment.sourceStart) * FPS : null;
	const landingPunch =
		landingFrame === null
			? 0
			: spring({
					fps: FPS,
					frame: Math.max(0, frame - landingFrame),
					config: { damping: 15, stiffness: 190, mass: 0.55 },
					durationInFrames: 18,
				});
	const stuntWindow = (sourceTime >= 35.65 && sourceTime <= 37.05) || (sourceTime >= 53.05 && sourceTime <= 54.2);
	const scale = stuntWindow
		? 1
		: interpolate(progress, [0, 1], [segment.zoomFrom, segment.zoomTo], clamp) + landingPunch * 0.045;

	return (
		<AbsoluteFill style={{ backgroundColor: INK, overflow: 'hidden' }}>
			<OffthreadVideo
				src={sourceVideo}
				trimBefore={Math.round(segment.sourceStart * FPS)}
				trimAfter={Math.round(segment.sourceEnd * FPS)}
				muted={segment.muted}
				volume={f => {
					const fadeIn = interpolate(f, [0, 2], [0.2, 1], clamp);
					const fadeOut = interpolate(f, [segment.duration - 3, segment.duration - 1], [1, 0.25], clamp);
					return 1.55 * Math.min(fadeIn, fadeOut);
				}}
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					objectPosition: `${segment.cropX}% ${segment.cropY}%`,
					scale,
					filter: 'saturate(1.08) contrast(1.045)',
				}}
			/>
			<AbsoluteFill
				style={{
					background:
						'linear-gradient(180deg, rgba(0,0,0,.44) 0%, transparent 18%, transparent 73%, rgba(0,0,0,.48) 100%)',
				}}
			/>
		</AbsoluteFill>
	);
};

const CaptionLayer = ({ cues }: { cues: CaptionCue[] }) => {
	const frame = useCurrentFrame();
	const time = frame / FPS;
	const cue = cues.find(
		item => time >= item.words[0].start - 0.02 && time < item.words[item.words.length - 1].end + 0.2,
	);
	if (!cue) return null;

	const top = frame >= 535 && frame < 789 ? 900 : frame >= 1126 ? 1840 : frame >= 789 ? 1590 : 1510;
	return (
		<div
			style={{
				position: 'absolute',
				left: 140,
				top,
				width: 1880,
				minHeight: 360,
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
				alignContent: 'center',
				alignItems: 'center',
				columnGap: 28,
				rowGap: 6,
				fontFamily: 'Lemon Milk',
				fontSize: 142,
				fontWeight: 700,
				lineHeight: 1.02,
				letterSpacing: -5,
				textAlign: 'center',
				textTransform: 'uppercase',
				paintOrder: 'stroke fill',
				WebkitTextStroke: '6px rgba(0,0,0,.82)',
			}}>
			{cue.words.map((word, index) => {
				const active = time >= word.start && time < word.end;
				const reveal = interpolate(time, [word.start, word.start + 0.075], [0, 1], clamp);
				const pop = active
					? interpolate(
							time,
							[word.start, word.start + 0.055, Math.max(word.start + 0.056, word.end)],
							[1, 1.15, 1.07],
							clamp,
						)
					: 1;
				const accent = accentForWord(word.text);
				const emphasized = accent !== WHITE;
				return (
					<span
						key={`${word.start}-${word.text}-${index}`}
						style={{
							opacity: time < word.start ? 0 : reveal,
							color: active ? accent : emphasized && time >= word.end ? accent : WHITE,
							scale: pop,
							textShadow:
								active && emphasized
									? `0 0 18px ${accent}, 0 12px 18px rgba(0,0,0,.9)`
									: '0 12px 18px rgba(0,0,0,.9)',
						}}>
						{word.text}
					</span>
				);
			})}
		</div>
	);
};

const Flash = ({ at, color = WHITE, strength = 0.45 }: { at: number; color?: string; strength?: number }) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [at - 1, at, at + 2, at + 5], [0, strength, strength * 0.18, 0], clamp);
	return <AbsoluteFill style={{ backgroundColor: color, opacity }} />;
};

const CutStreaks = () => {
	const frame = useCurrentFrame();
	const cuts = [21, 255, 441, 789, 1126];
	return (
		<>
			{cuts.map(cut => {
				const opacity = interpolate(frame, [cut - 2, cut, cut + 4], [0, 0.75, 0], clamp);
				const x = interpolate(frame, [cut - 2, cut + 4], [2280, -980], clamp);
				return (
					<div
						key={cut}
						style={{
							position: 'absolute',
							left: 0,
							top: 0,
							width: 820,
							height: 2880,
							translate: `${x}px 0`,
							rotate: '10deg',
							opacity,
							background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.58), transparent)',
							filter: 'blur(20px)',
						}}
					/>
				);
			})}
		</>
	);
};

const BeatLabel = ({
	from,
	duration,
	eyebrow,
	title,
	color,
}: {
	from: number;
	duration: number;
	eyebrow: string;
	title: string;
	color: string;
}) => (
	<Sequence
		from={from}
		durationInFrames={duration}>
		<BeatLabelContent
			eyebrow={eyebrow}
			title={title}
			color={color}
		/>
	</Sequence>
);

const BeatLabelContent = ({ eyebrow, title, color }: { eyebrow: string; title: string; color: string }) => {
	const frame = useCurrentFrame();
	const enter = spring({
		fps: FPS,
		frame,
		config: { damping: 16, stiffness: 220, mass: 0.55 },
		durationInFrames: 13,
	});
	const exit = interpolate(frame, [17, 24], [1, 0], clamp);
	return (
		<div
			style={{
				position: 'absolute',
				left: 150,
				top: 305,
				opacity: exit,
				translate: `${interpolate(enter, [0, 1], [-110, 0], clamp)}px 0`,
				fontFamily: 'Lemon Milk',
				textTransform: 'uppercase',
				filter: 'drop-shadow(0 12px 15px rgba(0,0,0,.78))',
			}}>
			<div style={{ fontSize: 42, color: WHITE, letterSpacing: 9 }}>{eyebrow}</div>
			<div
				style={{
					fontSize: 138,
					lineHeight: 0.95,
					color,
					letterSpacing: -5,
					WebkitTextStroke: '4px rgba(0,0,0,.75)',
					paintOrder: 'stroke fill',
				}}>
				{title}
			</div>
		</div>
	);
};

const TopRail = () => {
	const frame = useCurrentFrame();
	return (
		<>
			<div
				style={{
					position: 'absolute',
					left: 130,
					top: 150,
					fontFamily: 'Lemon Milk',
					fontSize: 42,
					letterSpacing: 7,
					color: WHITE,
					textShadow: '0 8px 14px rgba(0,0,0,.85)',
				}}>
				KFC BACKFLIP CHALLENGE
			</div>
			<div
				style={{
					position: 'absolute',
					left: 130,
					right: 130,
					top: 220,
					height: 8,
					borderRadius: 99,
					background: 'rgba(255,255,255,.3)',
					overflow: 'hidden',
				}}>
				<div
					style={{
						width: `${interpolate(frame, [0, durationInFrames - 1], [0, 100], clamp)}%`,
						height: '100%',
						background: `linear-gradient(90deg, ${YELLOW}, ${CYAN})`,
					}}
				/>
			</div>
		</>
	);
};

const SoundDesign = () => (
	<>
		<Sequence
			from={0}
			durationInFrames={11}>
			<Audio
				src={asset('audio/whoosh.wav')}
				volume={0.5}
			/>
		</Sequence>
		{[21, 255, 441, 789, 1126].map(cut => (
			<Sequence
				key={cut}
				from={cut}
				durationInFrames={11}>
				<Audio
					src={asset('audio/whoosh.wav')}
					volume={0.18}
				/>
			</Sequence>
		))}
		<Sequence
			from={792}
			durationInFrames={60}>
			<Audio
				src={asset('audio/riser.wav')}
				volume={0.4}
			/>
		</Sequence>
		<Sequence
			from={501}
			durationInFrames={14}>
			<Audio
				src={asset('audio/impact.wav')}
				volume={0.38}
			/>
		</Sequence>
		<Sequence
			from={873}
			durationInFrames={14}>
			<Audio
				src={asset('audio/impact.wav')}
				volume={0.5}
			/>
		</Sequence>
	</>
);

export const SpeedTheDoubleBackflip = () => {
	const [handle] = useState(() => delayRender('Load Lemon Milk and Whisper word timings'));
	const [sourceWords, setSourceWords] = useState<SourceWord[]>([]);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const font = new FontFace('Lemon Milk', `url(${asset('fonts/LEMONMILK-Bold.otf')})`, { weight: '700' });
		Promise.all([
			fetch(asset('subtitles/dialogue.words.json')).then(response => {
				if (!response.ok) throw new Error(`Word timings failed: ${response.status}`);
				return response.json() as Promise<SourceWord[]>;
			}),
			font.load(),
		])
			.then(([words, loadedFont]) => {
				document.fonts.add(loadedFont);
				setSourceWords(words);
				setReady(true);
				continueRender(handle);
			})
			.catch(error => cancelRender(error));
	}, [handle]);

	const cues = useMemo(() => makeCaptionCues(mapWordsToTimeline(sourceWords)), [sourceWords]);
	if (!ready) return null;

	return (
		<AbsoluteFill style={{ backgroundColor: INK, color: WHITE, overflow: 'hidden', fontFamily: 'Lemon Milk' }}>
			{segments.map(segment => (
				<Sequence
					key={segment.key}
					from={segment.compStart}
					durationInFrames={segment.duration}
					premountFor={FPS * 2}>
					<VideoSegment segment={segment} />
				</Sequence>
			))}
			<TopRail />
			<Sequence
				from={0}
				durationInFrames={21}>
				<BeatLabelContent
					eyebrow='Wait—'
					title='WITH THE BUCKET?!'
					color={YELLOW}
				/>
			</Sequence>
			<BeatLabel
				from={441}
				duration={25}
				eyebrow='First run'
				title='TRY 1'
				color={ORANGE}
			/>
			<BeatLabel
				from={789}
				duration={25}
				eyebrow='One more time'
				title='TRY 2'
				color={CYAN}
			/>
			<BeatLabel
				from={504}
				duration={25}
				eyebrow='The bucket'
				title='SPILLED'
				color={PINK}
			/>
			<BeatLabel
				from={876}
				duration={25}
				eyebrow='No spill'
				title='CLEAN!'
				color={LIME}
			/>
			<CaptionLayer cues={cues} />
			<CutStreaks />
			<Flash
				at={21}
				strength={0.42}
			/>
			<Flash
				at={501}
				color={ORANGE}
				strength={0.24}
			/>
			<Flash
				at={873}
				color={LIME}
				strength={0.25}
			/>
			<SoundDesign />
		</AbsoluteFill>
	);
};
