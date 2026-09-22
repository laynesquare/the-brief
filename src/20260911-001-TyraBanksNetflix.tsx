import React from 'react';
import {
	AbsoluteFill,
	Audio,
	Easing,
	Img,
	OffthreadVideo,
	Sequence,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

const FPS = 30;
export const id = '20260911-001-TyraBanksNetflix';
// The narration is 32.365688 seconds long. 971 frames is 32.3667 seconds.
export const durationInFrames = 971;

const GOLD = '#ffd22e';
const INK = '#07090d';
const WHITE = '#f8f7f1';
const asset = (path: string) => staticFile(`${id}/${path}`);

type CaptionWord = { text: string; start: number; end: number };
type CaptionCue = { words: CaptionWord[] };

// Word timestamps are aligned to the supplied narration audio.
const captions: CaptionCue[] = [
	{
		words: [
			{ text: 'The', start: 0.0, end: 0.26 },
			{ text: "America's", start: 0.26, end: 0.86 },
			{ text: 'Next', start: 0.86, end: 1.02 },
			{ text: 'Top', start: 1.02, end: 1.28 },
			{ text: 'Model', start: 1.28, end: 1.6 },
			{ text: 'creator', start: 1.6, end: 2.0 },
		],
	},
	{
		words: [
			{ text: 'is', start: 2.0, end: 2.36 },
			{ text: 'seeking', start: 2.36, end: 2.64 },
			{ text: 'access', start: 2.64, end: 2.96 },
			{ text: 'to', start: 2.96, end: 3.32 },
			{ text: 'unedited', start: 3.32, end: 3.7 },
			{ text: 'interviews', start: 3.7, end: 4.14 },
		],
	},
	{
		words: [
			{ text: 'from', start: 4.14, end: 4.44 },
			{ text: "Netflix's", start: 4.44, end: 5.06 },
			{ text: 'Reality', start: 5.06, end: 5.44 },
			{ text: 'Check', start: 5.44, end: 5.8 },
			{ text: 'documentary.', start: 5.8, end: 6.36 },
		],
	},
	{
		words: [
			{ text: 'Banks', start: 6.84, end: 7.06 },
			{ text: 'is', start: 7.06, end: 7.38 },
			{ text: 'already', start: 7.38, end: 7.64 },
			{ text: 'suing', start: 7.64, end: 7.9 },
			{ text: 'Netflix,', start: 7.9, end: 8.38 },
		],
	},
	{
		words: [
			{ text: 'claiming', start: 8.88, end: 8.94 },
			{ text: 'producers', start: 8.94, end: 9.4 },
			{ text: 'reduced', start: 9.4, end: 9.78 },
			{ text: 'her', start: 9.78, end: 10.14 },
			{ text: 'three-and-a-half-hour', start: 10.14, end: 10.88 },
			{ text: 'interview', start: 10.88, end: 11.2 },
		],
	},
	{
		words: [
			{ text: 'to', start: 11.2, end: 11.4 },
			{ text: 'just', start: 11.4, end: 11.62 },
			{ text: '16', start: 11.62, end: 12.06 },
			{ text: 'minutes', start: 12.06, end: 12.38 },
			{ text: 'and', start: 12.38, end: 12.9 },
		],
	},
	{
		words: [
			{ text: 'removed', start: 12.9, end: 13.12 },
			{ text: 'comments', start: 13.12, end: 13.64 },
			{ text: 'in', start: 13.64, end: 13.92 },
			{ text: 'which', start: 13.92, end: 14.16 },
			{ text: 'she', start: 14.16, end: 14.36 },
			{ text: 'accepted', start: 14.36, end: 14.72 },
		],
	},
	{
		words: [
			{ text: 'responsibility', start: 14.72, end: 15.44 },
			{ text: 'for', start: 15.44, end: 15.86 },
			{ text: 'past', start: 15.86, end: 16.14 },
			{ text: 'controversies.', start: 16.14, end: 16.6 },
		],
	},
	{
		words: [
			{ text: 'But', start: 17.44, end: 17.56 },
			{ text: 'the', start: 17.56, end: 17.8 },
			{ text: 'public', start: 17.8, end: 18.04 },
			{ text: 'response', start: 18.04, end: 18.46 },
			{ text: 'is', start: 18.46, end: 18.84 },
			{ text: 'sharply', start: 18.84, end: 19.14 },
			{ text: 'divided.', start: 19.14, end: 19.58 },
		],
	},
	{
		words: [
			{ text: 'Some', start: 20.14, end: 20.42 },
			{ text: 'former', start: 20.42, end: 20.72 },
			{ text: 'contestants', start: 20.72, end: 21.14 },
			{ text: 'say', start: 21.14, end: 21.64 },
			{ text: 'Banks', start: 21.64, end: 21.94 },
			{ text: 'is', start: 21.94, end: 22.1 },
			{ text: 'now', start: 22.1, end: 22.38 },
		],
	},
	{
		words: [
			{ text: 'experiencing', start: 22.38, end: 22.9 },
			{ text: 'the', start: 22.9, end: 23.32 },
			{ text: 'same', start: 23.32, end: 23.6 },
			{ text: 'selective', start: 23.6, end: 24.14 },
			{ text: 'editing', start: 24.14, end: 24.54 },
		],
	},
	{
		words: [
			{ text: 'they', start: 24.54, end: 24.8 },
			{ text: 'faced', start: 24.8, end: 25.08 },
			{ text: 'on', start: 25.08, end: 25.36 },
			{ text: 'Top', start: 25.36, end: 25.6 },
			{ text: 'Model.', start: 25.6, end: 25.98 },
		],
	},
	{
		words: [
			{ text: 'Others', start: 26.56, end: 26.86 },
			{ text: 'argue', start: 26.86, end: 27.1 },
			{ text: 'the', start: 27.1, end: 27.28 },
			{ text: 'raw', start: 27.28, end: 27.54 },
			{ text: 'footage', start: 27.54, end: 27.82 },
		],
	},
	{
		words: [
			{ text: 'could', start: 27.82, end: 28.08 },
			{ text: 'prove', start: 28.08, end: 28.24 },
			{ text: 'she', start: 28.24, end: 28.56 },
			{ text: 'was', start: 28.56, end: 28.94 },
			{ text: 'unfairly', start: 28.94, end: 29.18 },
			{ text: 'portrayed.', start: 29.18, end: 29.42 },
		],
	},
	{
		words: [
			{ text: 'Should', start: 29.42, end: 30.14 },
			{ text: 'Netflix', start: 30.14, end: 30.52 },
			{ text: 'release', start: 30.52, end: 31.02 },
			{ text: 'the', start: 31.02, end: 31.3 },
			{ text: 'unedited', start: 31.3, end: 31.58 },
			{ text: 'interviews?', start: 31.58, end: 32.04 },
		],
	},
];

const sceneCuts = [0, 98, 205, 266, 380, 523, 604, 704, 797, 840, 883, durationInFrames];
const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

const ease = (frame: number, from: number, duration = 16) =>
	interpolate(frame, [from, from + duration], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });

const Still = ({
	src,
	from,
	to,
	position = '50% 50%',
	zoom = 0.08,
	contain = false,
}: {
	src: string;
	from: number;
	to: number;
	position?: string;
	zoom?: number;
	contain?: boolean;
}) => {
	const frame = useCurrentFrame();
	const p = interpolate(frame, [from, to], [0, 1], clamp);

	if (contain) {
		return (
			<AbsoluteFill style={{ overflow: 'hidden', backgroundColor: INK }}>
				<Img
					src={src}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: position,
						transform: `scale(${1.12 + p * 0.05})`,
						filter: 'blur(28px) saturate(.7) brightness(.5)',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						left: 54,
						right: 54,
						top: 205,
						height: 650,
						overflow: 'hidden',
						borderRadius: 28,
						border: '2px solid rgba(255,255,255,.24)',
						boxShadow: '0 28px 80px rgba(0,0,0,.55)',
					}}>
					<Img
						src={src}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							objectPosition: position,
							transform: `scale(${1.02 + p * zoom}) translate3d(${(p - 0.5) * -12}px, 0, 0)`,
							filter: 'saturate(.86) contrast(1.06) brightness(.9)',
						}}
					/>
				</div>
			</AbsoluteFill>
		);
	}

	return (
		<AbsoluteFill style={{ overflow: 'hidden', backgroundColor: INK }}>
			<Img
				src={src}
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					objectPosition: position,
					transform: `scale(${1.04 + p * zoom}) translate3d(${(p - 0.5) * -18}px, ${(p - 0.5) * -10}px, 0)`,
					filter: 'saturate(.84) contrast(1.06) brightness(.86)',
				}}
			/>
		</AbsoluteFill>
	);
};

const Background = () => {
	const frame = useCurrentFrame();
	const smiling = asset('img/tyra-smiling-in-netflix-interview.webp');
	const together = asset('img/jay-manuel-standing-with-tyra-in-the-2000s.avif');
	const judges = asset('img/tyra-banks-standing-in-the-judges-seat.jpg');
	const elimination = asset('img/tyra-ready-to-eliminate-candidates.webp');
	const makeup = asset('img/jay-manuel-putting-make-up-on-tyra.jpg');

	return (
		<AbsoluteFill>
			{frame < 98 && (
				<Still
					src={smiling}
					from={0}
					to={98}
					position='50% 45%'
					zoom={0.1}
				/>
			)}
			{frame >= 98 && frame < 205 && (
				<Still
					src={together}
					from={98}
					to={205}
					position='45% 30%'
					zoom={0.06}
				/>
			)}
			{frame >= 205 && frame < 266 && (
				<Still
					src={elimination}
					from={205}
					to={266}
					position='37% 30%'
					zoom={0.07}
				/>
			)}
			{frame >= 266 && frame < 380 && (
				<Still
					src={judges}
					from={266}
					to={380}
					position='48% 44%'
					zoom={0.08}
					contain
				/>
			)}
			{frame >= 380 && frame < 523 && (
				<Still
					src={smiling}
					from={380}
					to={523}
					position='50% 40%'
					zoom={0.12}
				/>
			)}
			<Sequence
				from={523}
				durationInFrames={274}
				premountFor={FPS}>
				<AbsoluteFill style={{ overflow: 'hidden', backgroundColor: INK }}>
					<OffthreadVideo
						src={asset('video/tyra-yells-at-tiffany.mp4')}
						muted
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							objectPosition: '50% 50%',
							filter: 'saturate(.84) contrast(1.08) brightness(.82)',
						}}
					/>
				</AbsoluteFill>
			</Sequence>
			{frame >= 797 && frame < 840 && (
				<Still
					src={makeup}
					from={797}
					to={840}
					position='50% 50%'
					zoom={0.06}
					contain
				/>
			)}
			{frame >= 840 && frame < 883 && (
				<Still
					src={together}
					from={840}
					to={883}
					position='46% 30%'
					zoom={0.05}
				/>
			)}
			{frame >= 883 && (
				<Still
					src={smiling}
					from={883}
					to={durationInFrames}
					position='50% 42%'
					zoom={0.08}
				/>
			)}
			<AbsoluteFill
				style={{
					background:
						'linear-gradient(180deg, rgba(5,7,10,.22) 0%, rgba(5,7,10,.0) 38%, rgba(5,7,10,.18) 68%, rgba(5,7,10,.46) 100%)',
				}}
			/>
			<AbsoluteFill style={{ boxShadow: 'inset 0 0 140px rgba(0,0,0,.32)' }} />
		</AbsoluteFill>
	);
};

const Kicker = () => {
	const frame = useCurrentFrame();
	const progress = frame / (durationInFrames - 1);
	return (
		<>
			<div
				style={{
					position: 'absolute',
					left: 58,
					right: 58,
					top: 54,
					height: 6,
					background: 'rgba(255,255,255,.22)',
					borderRadius: 8,
					overflow: 'hidden',
				}}>
				<div
					style={{
						width: `${progress * 100}%`,
						height: '100%',
						background: GOLD,
						boxShadow: `0 0 25px ${GOLD}`,
					}}
				/>
			</div>
			<div
				style={{
					position: 'absolute',
					top: 88,
					left: 58,
					display: 'flex',
					alignItems: 'center',
					gap: 18,
					fontWeight: 900,
					fontSize: 28,
					letterSpacing: 4,
				}}>
				<span
					style={{ width: 18, height: 18, borderRadius: 99, background: GOLD, boxShadow: `0 0 25px ${GOLD}` }}
				/>
				THE BRIEF
				<span style={{ color: 'rgba(255,255,255,.55)', fontWeight: 600 }}>• TYRA</span>
			</div>
			<div
				style={{
					position: 'absolute',
					top: 87,
					right: 58,
					border: '2px solid rgba(255,255,255,.48)',
					borderRadius: 999,
					padding: '8px 16px',
					fontWeight: 800,
					fontSize: 20,
					letterSpacing: 2,
					background: 'rgba(0,0,0,.28)',
				}}>
				NETFLIX FIGHT
			</div>
		</>
	);
};

const BigWords = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const pop = (from: number, stiffness = 180) =>
		spring({ frame: frame - from, fps, config: { damping: 14, stiffness } });
	const headline: React.CSSProperties = {
		fontSize: 106,
		lineHeight: 0.88,
		fontWeight: 950,
		letterSpacing: -5,
		textTransform: 'uppercase',
		textShadow: '0 12px 42px rgba(0,0,0,.82)',
	};

	if (frame < 205) {
		const p = pop(2);
		const q = pop(55);
		return (
			<div style={{ position: 'absolute', left: 58, right: 165, top: 250 }}>
				<div style={{ fontSize: 24, fontWeight: 900, letterSpacing: 5, color: GOLD, marginBottom: 24 }}>
					AMERICA'S NEXT TOP MODEL
				</div>
				<div
					style={{
						...headline,
						opacity: p,
						transform: `translateY(${(1 - p) * 48}px) scale(${0.84 + 0.16 * p})`,
					}}>
					TYRA WANTS
				</div>
				<div style={{ ...headline, color: GOLD, opacity: q, transform: `translateX(${(1 - q) * -70}px)` }}>
					THE RAW CUT
				</div>
				<div style={{ height: 7, width: 240 * q, background: WHITE, marginTop: 28 }} />
			</div>
		);
	}

	if (frame < 266) {
		const p = pop(205);
		return (
			<div
				style={{
					position: 'absolute',
					left: 58,
					top: 300,
					opacity: p,
					transform: `scale(${0.8 + 0.2 * p})`,
					transformOrigin: 'left center',
				}}>
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 6 }}>THE LEGAL BATTLE</div>
				<div style={{ ...headline, fontSize: 122, marginTop: 22 }}>
					SUING
					<br />
					<span style={{ color: GOLD }}>NETFLIX</span>
				</div>
			</div>
		);
	}

	if (frame < 523) {
		const p = pop(266);
		const q = pop(350);
		return (
			<div style={{ position: 'absolute', left: 58, right: 170, top: 255 }}>
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 5 }}>
					SHE SAYS PRODUCERS CUT
				</div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 24,
						marginTop: 24,
						opacity: p,
						transform: `translateX(${(1 - p) * -70}px)`,
					}}>
					<span style={{ fontSize: 132, lineHeight: 0.9, fontWeight: 950, letterSpacing: -7 }}>
						3½
						<br />
						<span style={{ fontSize: 40, letterSpacing: 2 }}>HOURS</span>
					</span>
					<span style={{ fontSize: 76, color: GOLD, fontWeight: 900 }}>→</span>
					<span style={{ fontSize: 132, lineHeight: 0.9, fontWeight: 950, letterSpacing: -7, color: GOLD }}>
						16
						<br />
						<span style={{ fontSize: 40, letterSpacing: 2, color: WHITE }}>MINUTES</span>
					</span>
				</div>
				<div
					style={{
						marginTop: 34,
						display: 'inline-block',
						padding: '12px 18px 10px',
						background: WHITE,
						color: INK,
						fontSize: 24,
						fontWeight: 900,
						letterSpacing: 3,
						opacity: q,
					}}>
					ACCOUNTABILITY LEFT OUT?
				</div>
			</div>
		);
	}

	if (frame < 604) {
		const p = pop(523);
		return (
			<div
				style={{
					position: 'absolute',
					left: 58,
					top: 300,
					opacity: p,
					transform: `rotate(${(1 - p) * -4}deg) scale(${0.82 + 0.18 * p})`,
					transformOrigin: 'left center',
				}}>
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 6 }}>THE RESPONSE?</div>
				<div style={{ ...headline, fontSize: 118, marginTop: 20 }}>
					SHARPLY
					<br />
					<span style={{ color: GOLD }}>DIVIDED.</span>
				</div>
			</div>
		);
	}

	if (frame < 797) {
		const p = pop(604);
		return (
			<div style={{ position: 'absolute', left: 58, right: 175, top: 285, opacity: p }}>
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 5 }}>
					FORMER CONTESTANTS ASK
				</div>
				<div style={{ ...headline, fontSize: 112, marginTop: 20, transform: `translateY(${(1 - p) * 44}px)` }}>
					THE SAME
					<br />
					<span style={{ color: GOLD }}>EDIT?</span>
				</div>
			</div>
		);
	}

	if (frame < 883) {
		const p = pop(797);
		return (
			<div style={{ position: 'absolute', left: 58, right: 160, top: 275, opacity: p }}>
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 5 }}>THE OTHER SIDE</div>
				<div style={{ ...headline, fontSize: 106, marginTop: 22, transform: `translateX(${(1 - p) * -55}px)` }}>
					UNFAIRLY
					<br />
					<span style={{ color: GOLD }}>PORTRAYED?</span>
				</div>
			</div>
		);
	}

	const p = pop(883);
	return (
		<div
			style={{
				position: 'absolute',
				left: 58,
				right: 58,
				top: 265,
				textAlign: 'center',
				opacity: p,
				transform: `scale(${0.84 + 0.16 * p})`,
				transformOrigin: 'center top',
			}}>
			<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 6 }}>WHAT DO YOU THINK?</div>
			<div style={{ ...headline, fontSize: 112, marginTop: 24 }}>RELEASE</div>
			<div
				style={{
					display: 'inline-block',
					background: GOLD,
					color: INK,
					padding: '12px 24px 8px',
					fontSize: 96,
					lineHeight: 0.95,
					fontWeight: 950,
					letterSpacing: -5,
					marginTop: 12,
				}}>
				THE TAPES?
			</div>
		</div>
	);
};

const Caption = () => {
	const frame = useCurrentFrame();
	const t = frame / FPS;
	const cue = captions.find(({ words }) => t >= words[0].start && t < words[words.length - 1].end);
	if (!cue) return null;

	return (
		<div
			style={{
				position: 'absolute',
				left: '50%',
				top: 1280,
				transform: 'translateX(-50%)',
				width: 820,
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
				columnGap: 10,
				rowGap: 2,
				fontSize: 40,
				lineHeight: 1.1,
				fontWeight: 950,
				letterSpacing: -1.6,
				textTransform: 'uppercase',
				textAlign: 'center',
			}}>
			{cue.words.map((word, index) => {
				const active = t >= word.start && t < word.end;
				const spoken = t >= word.end;
				return (
					<span
						key={`${word.text}-${index}`}
						style={{
							color: active ? GOLD : spoken ? WHITE : 'rgba(248,247,241,.55)',
							textShadow:
								'0 1px 0 #000, 0 2px 0 #000, 0 3px 8px rgba(0,0,0,.95), 0 8px 22px rgba(0,0,0,.8), 0 0 6px #000',
						}}>
						{word.text}
					</span>
				);
			})}
		</div>
	);
};

const Texture = () => {
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill style={{ pointerEvents: 'none' }}>
			<AbsoluteFill
				style={{
					opacity: 0.14,
					backgroundImage:
						'repeating-linear-gradient(0deg, transparent 0, transparent 5px, rgba(255,255,255,.055) 6px)',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					width: 500,
					height: 500,
					border: '1px solid rgba(255,210,46,.20)',
					borderRadius: 999,
					right: -320,
					top: 650,
					transform: `rotate(${frame * 0.2}deg)`,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					width: 330,
					height: 1,
					background: 'rgba(255,210,46,.42)',
					right: -75,
					top: 900,
					transform: `rotate(${-28 + Math.sin(frame / 30) * 2}deg)`,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: 64,
					bottom: 118,
					color: 'rgba(255,255,255,.55)',
					fontSize: 20,
					fontWeight: 800,
					letterSpacing: 4,
				}}>
				REALITY CHECK • LEGAL DISPUTE
			</div>
		</AbsoluteFill>
	);
};

const FlashCuts = () => {
	const frame = useCurrentFrame();
	const opacity = Math.max(
		...sceneCuts.slice(1, -1).map(cut => interpolate(Math.abs(frame - cut), [0, 4], [0.68, 0], clamp)),
	);
	return <AbsoluteFill style={{ background: WHITE, opacity, pointerEvents: 'none' }} />;
};

export const TyraBanksNetflix = () => (
	<AbsoluteFill
		style={{
			backgroundColor: INK,
			color: WHITE,
			fontFamily: 'Helvetica Neue, Arial, sans-serif',
			overflow: 'hidden',
		}}>
		<Background />
		<Texture />
		<Kicker />
		<BigWords />
		<Caption />
		<FlashCuts />
		<Audio
			src={asset('audio/Tyra Banks wants Netflix to show what viewers never saw.mp3')}
			volume={1}
		/>
	</AbsoluteFill>
);
