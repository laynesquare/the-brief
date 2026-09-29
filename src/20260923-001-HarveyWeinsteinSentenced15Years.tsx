import { useEffect, useState } from 'react';
import {
	AbsoluteFill,
	Audio,
	Img,
	OffthreadVideo,
	cancelRender,
	continueRender,
	delayRender,
	interpolate,
	staticFile,
	useCurrentFrame,
} from 'remotion';

const FPS = 30;
export const id = '20260923-001-HarveyWeinsteinSentenced15Years';
// Original and mastered narration: 39.471 s. Only 0.029 s of frame rounding; no added tail.
export const durationInFrames = Math.ceil(39.471 * FPS);
const GOLD = '#ffd22e';
const INK = '#07090d';
const WHITE = '#f8f7f1';
const SIDE = 58;
const CONTENT_WIDTH = 1080 - SIDE * 2;
const asset = (path: string) => staticFile(`${id}/${path}`);
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
type Cue = { text: string; start: number; end: number };
type CaptionWord = { text: string; start: number; end: number };
const cuts = [0, 4, 7.75, 11.5, 14.81, 17.37, 20.63, 24.55, 26.54, 28.71, 31.2, 33.08, 36, 39.5];

const Photo = ({
	file,
	start,
	position = '50% 40%',
	hero = false,
}: {
	file: string;
	start: number;
	position?: string;
	hero?: boolean;
}) => {
	const f = useCurrentFrame();
	const p = interpolate(f, [start * FPS, (start + 5) * FPS], [0, 1], clamp);
	return (
		<div
			style={{
				position: 'absolute',
				left: hero ? 0 : SIDE,
				top: hero ? 0 : 530,
				width: hero ? 1080 : CONTENT_WIDTH,
				height: hero ? 1260 : 620,
				overflow: 'hidden',
			}}>
			<Img
				src={asset(`img/${file}`)}
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					objectPosition: position,
					transform: `scale(${1.015 + p * 0.045}) translateY(${-p * 6}px)`,
					filter: 'saturate(.88) contrast(1.025)',
				}}
			/>
			{hero && (
				<AbsoluteFill
					style={{
						background:
							'linear-gradient(180deg, rgba(7,9,13,.72), transparent 30%, transparent 66%, #07090d 100%)',
					}}
				/>
			)}
		</div>
	);
};

const Footage = () => (
	<div
		style={{
			position: 'absolute',
			left: SIDE,
			top: 530,
			width: CONTENT_WIDTH,
			height: 620,
			overflow: 'hidden',
			background: INK,
		}}>
		<OffthreadVideo
			src={asset('video/harvey-wdinstein-sentenced-to-15-years-he-walking.mp4')}
			muted
			style={{
				width: '100%',
				height: '100%',
				objectFit: 'cover',
				objectPosition: '50% 22%',
				transform: 'scale(1.55)',
			}}
		/>
		<div
			style={{
				position: 'absolute',
				left: 18,
				top: 18,
				padding: '8px 12px',
				background: 'rgba(7,9,13,.82)',
				fontSize: 18,
				fontWeight: 800,
				letterSpacing: 2,
			}}>
			ARCHIVAL FOOTAGE
		</div>
	</div>
);
const Label = ({ children }: { children: React.ReactNode }) => (
	<div
		style={{
			fontSize: 26,
			fontWeight: 700,
			letterSpacing: 4,
			color: GOLD,
			marginBottom: 18,
			textTransform: 'uppercase',
		}}>
		{children}
	</div>
);
const Title = ({ label, children }: { label: string; children: React.ReactNode }) => (
	<div style={{ position: 'absolute', left: SIDE, top: 295, width: CONTENT_WIDTH }}>
		<Label>{label}</Label>
		<div style={{ fontSize: 76, lineHeight: 1.02, fontWeight: 900, letterSpacing: -3 }}>{children}</div>
	</div>
);
const Credit = ({ children }: { children: React.ReactNode }) => (
	<div
		style={{
			position: 'absolute',
			left: SIDE,
			top: 1535,
			width: CONTENT_WIDTH,
			fontSize: 20,
			lineHeight: 1.4,
			color: '#a5a8ae',
		}}>
		{children}
	</div>
);

const Comparison = () => {
	const f = useCurrentFrame();
	return (
		<>
			<Title label='The sentencing requests'>
				Two sides.
				<br />
				Two requests.
			</Title>
			<div style={{ position: 'absolute', top: 625, left: SIDE, width: CONTENT_WIDTH }}>
				{[
					{ n: 20, label: 'PROSECUTION', at: 7.75 },
					{ n: 9, label: 'DEFENSE', at: 9.32 },
				].map(({ n, label, at }) => {
					const p = interpolate(f, [at * FPS, at * FPS + 16], [0, 1], clamp);
					return (
						<div
							key={label}
							style={{ marginBottom: 75, opacity: p, transform: `translateY(${(1 - p) * 16}px)` }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
								<span style={{ fontSize: 29, letterSpacing: 3 }}>{label}</span>
								<span
									style={{
										fontSize: 98,
										fontWeight: 900,
										color: label === 'PROSECUTION' ? GOLD : WHITE,
									}}>
									{n}
									<span style={{ fontSize: 27, marginLeft: 12 }}>YEARS</span>
								</span>
							</div>
							<div style={{ height: 16, background: '#26292f' }}>
								<div
									style={{
										height: '100%',
										width: `${(n / 20) * 100 * p}%`,
										background: label === 'PROSECUTION' ? GOLD : WHITE,
									}}
								/>
							</div>
						</div>
					);
				})}
			</div>
			<Credit>Sentencing requests • figures from supplied reporting</Credit>
		</>
	);
};
const Timeline = ({ recap = false }: { recap?: boolean }) => {
	const f = useCurrentFrame();
	const events = recap
		? [
				{ year: '2020', text: 'Original conviction', at: 31.2 },
				{ year: '2024', text: 'Conviction overturned', at: 31.2 },
				{ year: '2025', text: 'Retrial conviction', at: 31.2 },
			]
		: [
				{ year: '2024', text: 'Conviction overturned', at: 17.37 },
				{ year: '2025', text: 'Retrial conviction', at: 19.24 },
			];
	return (
		<>
			<Title label='The New York case'>
				{recap ? (
					<>
						Six years.
						<br />
						Same charge.
					</>
				) : (
					<>
						An overturned conviction.
						<br />
						<span style={{ color: GOLD }}>A retrial.</span>
					</>
				)}
			</Title>
			<div style={{ position: 'absolute', left: SIDE + 18, top: 660, width: CONTENT_WIDTH - 36 }}>
				<div
					style={{
						position: 'absolute',
						left: 9,
						top: 30,
						width: 2,
						height: recap ? 415 : 245,
						background: '#4b4e55',
					}}
				/>
				{events.map(e => {
					const p = interpolate(f, [e.at * FPS, e.at * FPS + 12], [0, 1], clamp);
					return (
						<div
							key={e.year}
							style={{
								position: 'relative',
								paddingLeft: 65,
								marginBottom: 65,
								opacity: p,
								transform: `translateY(${(1 - p) * 12}px)`,
							}}>
							<div
								style={{
									position: 'absolute',
									left: 0,
									top: 28,
									width: 20,
									height: 20,
									borderRadius: '50%',
									background: GOLD,
								}}
							/>
							<div style={{ fontSize: 80, fontWeight: 900, color: GOLD, letterSpacing: -3 }}>
								{e.year}
							</div>
							<div style={{ fontSize: 35, marginTop: 10 }}>{e.text}</div>
						</div>
					);
				})}
			</div>
			<Credit>New York case chronology • supplied reporting</Credit>
		</>
	);
};
const JudgeQuote = ({ second }: { second: boolean }) => {
	const f = useCurrentFrame();
	const start = second ? 28.71 : 26.54;
	const p = interpolate(f, [start * FPS, start * FPS + 18], [0, 1], clamp);
	return (
		<>
			<Title label='At sentencing'>The judge’s response</Title>
			<div
				style={{
					position: 'absolute',
					left: SIDE,
					top: 585,
					width: CONTENT_WIDTH,
					borderTop: `3px solid ${GOLD}`,
					paddingTop: 40,
				}}>
				<div style={{ fontSize: 120, color: GOLD, lineHeight: 0.8 }}>“</div>
				<div
					style={{
						fontSize: second ? 75 : 79,
						lineHeight: 1.12,
						fontWeight: 900,
						letterSpacing: -2,
						marginTop: 15,
					}}>
					{second ? (
						<>
							And you have
							<br />
							never accepted
							<br />
							<span style={{ color: GOLD }}>responsibility.</span>
						</>
					) : (
						<>
							You took what
							<br />
							you wanted
							<br />
							<span style={{ color: GOLD }}>by force.</span>
						</>
					)}
				</div>
				<div style={{ height: 5, width: `${p * 100}%`, background: GOLD, marginTop: 32 }} />
				<div style={{ fontSize: 28, marginTop: 32, color: '#c0c3c9' }}>JUDGE CURTIS FARBER</div>
			</div>
			<Credit>Quotation as reported in the supplied source material</Credit>
		</>
	);
};
const Story = () => {
	const t = useCurrentFrame() / FPS;
	if (t < 4)
		return (
			<>
				<Photo
					file='weinstein-wheelchair-portrait.jpg'
					start={0}
					hero
					position='50% 38%'
				/>
				<div style={{ position: 'absolute', left: SIDE, top: 990, width: CONTENT_WIDTH }}>
					<Label>Harvey Weinstein</Label>
					<div style={{ fontSize: 126, fontWeight: 900, letterSpacing: -6, lineHeight: 1 }}>15 YEARS.</div>
					<div style={{ fontSize: 44, fontWeight: 700, color: GOLD, marginTop: 14 }}>
						Still claiming innocence.
					</div>
				</div>
				<Credit>Photo: Steven Hirsch / Pool / New York Post via AP</Credit>
			</>
		);
	if (t < 7.75)
		return (
			<>
				<Title label='Manhattan court'>74. In a wheelchair.</Title>
				<Footage />
				<Credit>Archival video: ABC7 / supplied source clip</Credit>
			</>
		);
	if (t < 11.5) return <Comparison />;
	if (t < 14.81)
		return (
			<>
				<Title label='Miriam Haley'>The woman who testified</Title>
				<Photo
					file='miriam-haley-courtroom.jpg'
					start={11.5}
					position='66% 38%'
				/>
				<Credit>Photo: Pool / Page Six</Credit>
			</>
		);
	if (t < 17.37)
		return (
			<>
				<Photo
					file='miriam-haley.jpg'
					start={14.81}
					hero
					position='52% 34%'
				/>
				<div style={{ position: 'absolute', left: SIDE, top: 990, width: CONTENT_WIDTH }}>
					<Label>Haley’s impact statement</Label>
					<div style={{ fontSize: 78, fontWeight: 900, letterSpacing: -3, lineHeight: 1.04 }}>
						A life sentence
						<br />
						<span style={{ color: GOLD }}>for her.</span>
					</div>
				</div>
				<Credit>Photo: Steven Hirsch for New York Post / Page Six • statement paraphrased</Credit>
			</>
		);
	if (t < 20.63) return <Timeline />;
	if (t < 24.55)
		return (
			<>
				<Title label='Weinstein’s position'>
					{t < 23.13 ? (
						<>Says he feels bad.</>
					) : (
						<>
							Still says
							<br />
							<span style={{ color: GOLD }}>he’s innocent.</span>
						</>
					)}
				</Title>
				<Photo
					file='weinstein-defense-table.jpg'
					start={20.63}
					position='50% 42%'
				/>
				<Credit>Photo: Pool / Page Six</Credit>
			</>
		);
	if (t < 26.54)
		return (
			<>
				<Title label='Judge Curtis Farber'>The judge’s response</Title>
				<Photo
					file='weinstein-with-attorneys.jpg'
					start={24.55}
					position='50% 42%'
				/>
				<Credit>Photo: Page Six / pool</Credit>
			</>
		);
	if (t < 31.2) return <JudgeQuote second={t >= 28.71} />;
	if (t < 33.08) return <Timeline recap />;
	if (t < 36)
		return (
			<>
				<Title label='The sentence'>The result</Title>
				<div style={{ position: 'absolute', left: SIDE, top: 570, width: CONTENT_WIDTH }}>
					<div style={{ fontSize: 270, fontWeight: 900, color: GOLD, lineHeight: 0.94, letterSpacing: -16 }}>
						15
					</div>
					<div style={{ fontSize: 76, fontWeight: 900, letterSpacing: 8, marginTop: 14 }}>YEARS</div>
					{t >= 33.92 && (
						<div
							style={{
								borderTop: '2px solid #54565c',
								paddingTop: 32,
								marginTop: 48,
								fontSize: 43,
								lineHeight: 1.18,
							}}>
							+ Sex-offender
							<br />
							registration
						</div>
					)}
				</div>
				<Credit>New York sentence • supplied reporting</Credit>
			</>
		);
	return (
		<>
			<Photo
				file='weinstein-wheelchair-court-02.jpg'
				start={36}
				hero
				position='48% 35%'
			/>
			<div style={{ position: 'absolute', left: SIDE, top: 970, width: CONTENT_WIDTH }}>
				<Label>The question</Label>
				<div style={{ fontSize: 77, fontWeight: 900, lineHeight: 1.06, letterSpacing: -3 }}>
					Justice delayed,
					<br />
					<span style={{ color: GOLD }}>or unfinished?</span>
				</div>
			</div>
			<Credit>Photo: Barry Williams / Pool / Daily News via AP</Credit>
		</>
	);
};

export const HarveyWeinsteinSentenced15Years = () => {
	const f = useCurrentFrame();
	const [handle] = useState(() => delayRender('Load corrected narration timing'));
	const [cues, setCues] = useState<Cue[]>([]);
	const [words, setWords] = useState<CaptionWord[]>([]);
	useEffect(() => {
		Promise.all([
			fetch(asset('subtitles/narration.cues.json')).then(r => {
				if (!r.ok) throw new Error(`Caption cues: ${r.status}`);
				return r.json() as Promise<Cue[]>;
			}),
			fetch(asset('subtitles/narration.words.json')).then(r => {
				if (!r.ok) throw new Error(`Caption words: ${r.status}`);
				return r.json() as Promise<CaptionWord[]>;
			}),
		])
			.then(([cueData, wordData]) => {
				setCues(cueData);
				setWords(wordData);
				continueRender(handle);
			})
			.catch(cancelRender);
	}, [handle]);
	const time = f / FPS;
	const cue = cues.find(c => time >= c.start && time < c.end);
	const cueWords = cue ? words.filter(word => word.start >= cue.start - 0.001 && word.end <= cue.end + 0.001) : [];
	const index = cuts.findIndex((s, i) => time >= s && time < cuts[i + 1]);
	return (
		<AbsoluteFill
			style={{ background: INK, color: WHITE, fontFamily: 'Arial, Helvetica, sans-serif', overflow: 'hidden' }}>
			<Story />
			<div
				style={{
					position: 'absolute',
					left: SIDE,
					top: 204,
					display: 'flex',
					alignItems: 'center',
					gap: 16,
					fontSize: 30,
					fontWeight: 900,
					letterSpacing: 4,
				}}>
				<span style={{ width: 15, height: 15, background: GOLD, borderRadius: '50%' }} />
				THE BRIEF
			</div>
			<div
				style={{
					position: 'absolute',
					left: SIDE,
					top: 258,
					width: CONTENT_WIDTH,
					height: 2,
					background: '#ffffff40',
				}}>
				<div style={{ width: `${(f / (durationInFrames - 1)) * 100}%`, height: '100%', background: GOLD }} />
			</div>
			{cue && (
				<div
					style={{
						position: 'absolute',
						left: SIDE,
						top: 1320,
						width: CONTENT_WIDTH,
						minHeight: 160,
						display: 'flex',
						flexWrap: 'wrap',
						alignItems: 'center',
						justifyContent: 'center',
						alignContent: 'center',
						columnGap: 13,
						rowGap: 3,
						boxSizing: 'border-box',
						padding: '20px 24px',
						background: '#11151d',
						borderLeft: `5px solid ${GOLD}`,
						fontSize: 56,
						fontWeight: 700,
						lineHeight: 1.13,
						textAlign: 'center',
					}}>
					{cueWords.map((word, wordIndex) => {
						const active = time >= word.start && time < word.end;
						const spoken = time >= word.end;
						return (
							<span
								key={`${word.text}-${word.start}-${wordIndex}`}
								style={{
									color: active ? GOLD : spoken ? WHITE : 'rgba(248,247,241,.55)',
									textShadow: active
										? '0 0 24px rgba(255,210,46,.38), 0 5px 18px rgba(0,0,0,.72)'
										: '0 5px 18px rgba(0,0,0,.72)',
								}}>
								{word.text}
							</span>
						);
					})}
				</div>
			)}
			<div
				style={{ position: 'absolute', left: SIDE, top: 1660, fontSize: 22, letterSpacing: 3, color: '#6f737c' }}>
				NEW YORK <span style={{ padding: '0 16px' }}> / </span> {String(index + 1).padStart(2, '0')}
			</div>
			<Audio src={asset('audio/narration-master.wav')} />
		</AbsoluteFill>
	);
};
