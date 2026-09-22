import React from 'react';
import {
	AbsoluteFill,
	Audio,
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
export const id = '20260921-002-EdSheeranSaysFamilyAbandonedHim';
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
			{ text: 'Ed', start: 0.06, end: 0.13 },
			{ text: 'Sheeran', start: 0.13, end: 0.59 },
			{ text: 'says', start: 0.59, end: 0.86 },
		],
	},
	{
		words: [
			{ text: 'even', start: 0.86, end: 1.13 },
			{ text: 'his', start: 1.13, end: 1.33 },
			{ text: 'family', start: 1.33, end: 1.73 },
			{ text: 'abandoned', start: 1.73, end: 2.33 },
			{ text: 'him,', start: 2.33, end: 2.69 },
		],
	},
	{
		words: [
			{ text: 'and', start: 2.8, end: 2.89 },
			{ text: 'the', start: 2.89, end: 3.09 },
			{ text: 'fallout', start: 3.09, end: 3.57 },
			{ text: 'started', start: 3.57, end: 4.05 },
		],
	},
	{
		words: [
			{ text: 'with', start: 4.05, end: 4.32 },
			{ text: 'his', start: 4.32, end: 4.52 },
			{ text: 'opening', start: 4.52, end: 5.09 },
			{ text: 'act.', start: 5.21, end: 5.84 },
		],
	},
	{
		words: [
			{ text: 'Macklemore', start: 5.9, end: 6.49 },
			{ text: 'was', start: 6.5, end: 6.71 },
			{ text: 'dropped', start: 6.71, end: 7.19 },
		],
	},
	{
		words: [
			{ text: 'from', start: 7.19, end: 7.46 },
			{ text: 'his', start: 7.46, end: 7.66 },
			{ text: 'tour', start: 7.66, end: 7.93 },
		],
	},
	{
		words: [
			{ text: 'after', start: 7.93, end: 8.26 },
			{ text: 'a', start: 8.26, end: 8.33 },
			{ text: 'pro-Palestinian', start: 8.34, end: 9.36 },
			{ text: 'speech.', start: 9.36, end: 10.08 },
		],
	},
	{
		words: [
			{ text: 'Reportedly,', start: 10.14, end: 10.87 },
			{ text: 'venues', start: 10.87, end: 11.27 },
			{ text: 'threatened', start: 11.27, end: 11.92 },
		],
	},
	{
		words: [
			{ text: 'to', start: 11.93, end: 12.06 },
			{ text: 'cancel', start: 12.06, end: 12.46 },
			{ text: 'shows', start: 12.46, end: 12.57 },
		],
	},
	{
		words: [
			{ text: 'if', start: 12.88, end: 12.92 },
			{ text: 'he', start: 12.92, end: 13.05 },
			{ text: 'stayed.', start: 13.05, end: 13.68 },
		],
	},
	{
		words: [
			{ text: 'Then', start: 13.74, end: 13.94 },
			{ text: 'came', start: 13.94, end: 14.2 },
			{ text: 'the', start: 14.2, end: 14.38 },
			{ text: 'personal', start: 14.41, end: 14.93 },
			{ text: 'backlash.', start: 14.93, end: 15.68 },
		],
	},
	{
		words: [
			{ text: "Ed's", start: 15.68, end: 15.91 },
			{ text: 'cousin', start: 15.91, end: 16.17 },
			{ text: 'publicly', start: 16.49, end: 16.73 },
		],
	},
	{
		words: [
			{ text: 'turned', start: 16.76, end: 17.08 },
			{ text: 'on', start: 17.08, end: 17.2 },
			{ text: 'him.', start: 17.2, end: 17.6 },
		],
	},
	{
		words: [
			{ text: 'In', start: 17.6, end: 17.69 },
			{ text: 'Philadelphia,', start: 17.69, end: 18.31 },
		],
	},
	{
		words: [
			{ text: 'Ed', start: 18.38, end: 18.45 },
			{ text: 'broke', start: 18.45, end: 18.79 },
			{ text: 'down,', start: 18.79, end: 19.19 },
		],
	},
	{
		words: [
			{ text: 'telling', start: 19.19, end: 19.67 },
			{ text: 'fans', start: 19.67, end: 19.94 },
			{ text: 'he', start: 19.94, end: 20.07 },
			{ text: 'felt', start: 20.07, end: 20.32 },
			{ text: 'abandoned', start: 20.32, end: 20.8 },
		],
	},
	{
		words: [
			{ text: 'by', start: 21.0, end: 21.14 },
			{ text: 'friends', start: 21.14, end: 21.48 },
			{ text: 'and', start: 21.62, end: 21.77 },
			{ text: 'family,', start: 21.77, end: 22.4 },
		],
	},
	{
		words: [
			{ text: 'but', start: 22.4, end: 22.56 },
			{ text: 'he', start: 22.56, end: 22.66 },
			{ text: 'thanked', start: 22.66, end: 23.03 },
			{ text: 'the', start: 23.03, end: 23.2 },
			{ text: 'crowd', start: 23.2, end: 23.41 },
		],
	},
	{
		words: [
			{ text: 'for', start: 23.43, end: 23.54 },
			{ text: 'showing', start: 23.74, end: 24.17 },
			{ text: 'up.', start: 24.17, end: 24.52 },
		],
	},
	{
		words: [
			{ text: 'The', start: 24.52, end: 24.58 },
			{ text: 'tour', start: 24.74, end: 25.01 },
			{ text: 'continued.', start: 25.01, end: 25.85 },
		],
	},
	{
		words: [
			{ text: 'The', start: 25.85, end: 26.06 },
			{ text: 'damage', start: 26.06, end: 26.16 },
			{ text: 'to', start: 26.49, end: 26.62 },
			{ text: 'those', start: 26.62, end: 26.84 },
			{ text: 'relationships?', start: 26.98, end: 28.1 },
		],
	},
	{
		words: [
			{ text: "That's", start: 28.1, end: 28.52 },
			{ text: 'less', start: 28.52, end: 28.77 },
			{ text: 'clear.', start: 28.78, end: 29.44 },
		],
	},
	{
		words: [
			{ text: 'Should', start: 29.5, end: 29.77 },
			{ text: 'Ed', start: 29.77, end: 29.88 },
			{ text: 'have', start: 29.88, end: 30.09 },
			{ text: 'risked', start: 30.09, end: 30.33 },
			{ text: 'the', start: 30.5, end: 30.59 },
			{ text: 'shows', start: 30.59, end: 30.81 },
		],
	},
	{
		words: [
			{ text: 'to', start: 30.94, end: 31.02 },
			{ text: 'stand', start: 31.02, end: 31.34 },
			{ text: 'by', start: 31.34, end: 31.44 },
			{ text: 'Macklemore?', start: 31.44, end: 31.96 },
		],
	},
];

const sceneCuts = [0, 80, 177, 302, 412, 528, 576, 672, 736, 885, durationInFrames];
const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

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
	const closeup = asset('img/ed-closeup.webp');
	const macklemore = asset('img/ed-macklemore.webp');
	const standing = asset('img/ed-standing.webp');
	const onstage = asset('img/ed-onstage.webp');
	const tears = asset('img/ed-tears.webp');
	const facepalm = asset('img/ed-facepalm.webp');

	return (
		<AbsoluteFill>
			{frame < 80 && (
				<Still
					src={closeup}
					from={0}
					to={80}
					position='18% 38%'
					zoom={0.06}
				/>
			)}
			{frame >= 80 && frame < 177 && (
				<Still
					src={macklemore}
					from={80}
					to={177}
					position='50% 22%'
					zoom={0.06}
					contain
				/>
			)}
			<Sequence
				from={177}
				durationInFrames={125}
				premountFor={FPS}>
				<AbsoluteFill style={{ overflow: 'hidden', backgroundColor: INK }}>
					<OffthreadVideo
						src={asset('video/macklemore-speech.mp4')}
						muted
						startFrom={240}
						style={{
							position: 'absolute',
							width: '230%',
							height: '230%',
							left: '-65%',
							top: '-62%',
							objectFit: 'cover',
							objectPosition: '50% 38%',
							filter: 'saturate(.84) contrast(1.08) brightness(.82)',
						}}
					/>
				</AbsoluteFill>
			</Sequence>
			{frame >= 302 && frame < 412 && (
				<Still
					src={standing}
					from={302}
					to={412}
					position='50% 18%'
					zoom={0.08}
				/>
			)}
			{frame >= 412 && frame < 528 && (
				<Still
					src={onstage}
					from={412}
					to={528}
					position='50% 32%'
					zoom={0.07}
				/>
			)}
			{frame >= 528 && frame < 576 && (
				<Still
					src={tears}
					from={528}
					to={576}
					position='50% 30%'
					zoom={0.1}
				/>
			)}
			{frame >= 576 && frame < 672 && (
				<Still
					src={facepalm}
					from={576}
					to={672}
					position='50% 28%'
					zoom={0.08}
				/>
			)}
			{frame >= 672 && frame < 736 && (
				<Still
					src={onstage}
					from={672}
					to={736}
					position='48% 22%'
					zoom={0.06}
				/>
			)}
			{frame >= 736 && frame < 885 && (
				<Still
					src={standing}
					from={736}
					to={885}
					position='52% 16%'
					zoom={0.06}
				/>
			)}
			{frame >= 885 && (
				<Still
					src={macklemore}
					from={885}
					to={durationInFrames}
					position='50% 20%'
					zoom={0.08}
					contain
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
				<span style={{ color: 'rgba(255,255,255,.55)', fontWeight: 600 }}>• ED</span>
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
				ABANDONED
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

	if (frame < 80) {
		const p = pop(2);
		const q = pop(18);
		return (
			<div style={{ position: 'absolute', left: 58, right: 58, top: 860 }}>
				<div style={{ fontSize: 24, fontWeight: 900, letterSpacing: 5, color: GOLD, marginBottom: 24 }}>
					ED SHEERAN
				</div>
				<div
					style={{
						...headline,
						opacity: p,
						transform: `translateY(${(1 - p) * 48}px) scale(${0.84 + 0.16 * p})`,
					}}>
					FAMILY
				</div>
				<div style={{ ...headline, color: GOLD, opacity: q, transform: `translateX(${(1 - q) * -70}px)` }}>
					ABANDONED
					<br />
					HIM
				</div>
				<div style={{ height: 7, width: 240 * q, background: WHITE, marginTop: 28 }} />
			</div>
		);
	}

	if (frame < 177) {
		const p = pop(80);
		return (
			<div
				style={{
					position: 'absolute',
					left: 58,
					top: 920,
					opacity: p,
					transform: `scale(${0.8 + 0.2 * p})`,
					transformOrigin: 'left center',
				}}>
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 6 }}>THE FALLOUT</div>
				<div style={{ ...headline, fontSize: 122, marginTop: 22 }}>
					HIS OPENING
					<br />
					<span style={{ color: GOLD }}>ACT</span>
				</div>
			</div>
		);
	}

	if (frame < 302) {
		const p = pop(177);
		const q = pop(220);
		return (
			<div style={{ position: 'absolute', left: 58, right: 170, top: 250 }}>
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 5 }}>MACKLEMORE</div>
				<div
					style={{
						...headline,
						fontSize: 96,
						marginTop: 18,
						opacity: p,
						transform: `translateX(${(1 - p) * -70}px)`,
					}}>
					DROPPED
				</div>
				<div
					style={{
						display: 'inline-block',
						marginTop: 16,
						padding: '12px 18px 10px',
						background: GOLD,
						color: INK,
						fontSize: 56,
						lineHeight: 0.95,
						fontWeight: 950,
						letterSpacing: -2,
						opacity: q,
					}}>
					AFTER THE SPEECH
				</div>
			</div>
		);
	}

	if (frame < 412) {
		const p = pop(302);
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
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 6 }}>VENUES THREATENED</div>
				<div style={{ ...headline, fontSize: 118, marginTop: 20 }}>
					CANCEL
					<br />
					<span style={{ color: GOLD }}>OR HE GOES</span>
				</div>
			</div>
		);
	}

	if (frame < 528) {
		const p = pop(412);
		const q = pop(430);
		return (
			<div style={{ position: 'absolute', left: 58, right: 170, top: 250 }}>
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 5 }}>THEN THE BACKLASH</div>
				<div
					style={{
						...headline,
						fontSize: 96,
						marginTop: 18,
						opacity: p,
						transform: `translateX(${(1 - p) * -70}px)`,
					}}>
					HIS COUSIN
				</div>
				<div
					style={{
						display: 'inline-block',
						marginTop: 16,
						padding: '12px 18px 10px',
						background: GOLD,
						color: INK,
						fontSize: 72,
						lineHeight: 0.95,
						fontWeight: 950,
						letterSpacing: -4,
						opacity: q,
					}}>
					TURNED ON HIM
				</div>
			</div>
		);
	}

	if (frame < 576) {
		const p = pop(528);
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
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 6 }}>IN PHILADELPHIA</div>
				<div style={{ ...headline, fontSize: 118, marginTop: 20 }}>
					HE BROKE
					<br />
					<span style={{ color: GOLD }}>DOWN</span>
				</div>
			</div>
		);
	}

	if (frame < 672) {
		const p = pop(576);
		return (
			<div style={{ position: 'absolute', left: 58, right: 175, top: 285, opacity: p }}>
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 5 }}>HE TOLD FANS</div>
				<div style={{ ...headline, fontSize: 112, marginTop: 20, transform: `translateY(${(1 - p) * 44}px)` }}>
					ABANDONED
					<br />
					<span style={{ color: GOLD }}>BY FAMILY</span>
				</div>
			</div>
		);
	}

	if (frame < 736) {
		const p = pop(672);
		const q = pop(696);
		return (
			<div style={{ position: 'absolute', left: 58, right: 170, top: 250 }}>
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 5 }}>STILL, ONSTAGE</div>
				<div
					style={{
						...headline,
						fontSize: 96,
						marginTop: 18,
						opacity: p,
						transform: `translateX(${(1 - p) * -70}px)`,
					}}>
					HE THANKED
				</div>
				<div
					style={{
						display: 'inline-block',
						marginTop: 14,
						padding: '12px 18px 10px',
						background: WHITE,
						color: INK,
						fontSize: 56,
						fontWeight: 950,
						letterSpacing: -2,
						opacity: q,
					}}>
					THE CROWD
				</div>
			</div>
		);
	}

	if (frame < 885) {
		const p = pop(736);
		return (
			<div style={{ position: 'absolute', left: 58, right: 160, top: 275, opacity: p }}>
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 5 }}>THE TOUR GOES ON</div>
				<div style={{ ...headline, fontSize: 106, marginTop: 22, transform: `translateX(${(1 - p) * -55}px)` }}>
					THE DAMAGE?
					<br />
					<span style={{ color: GOLD }}>LESS CLEAR</span>
				</div>
			</div>
		);
	}

	const p = pop(885);
	return (
		<div
			style={{
				position: 'absolute',
				left: 58,
				right: 58,
				top: 920,
				textAlign: 'center',
				opacity: p,
				transform: `scale(${0.84 + 0.16 * p})`,
				transformOrigin: 'center top',
			}}>
			<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 6 }}>WHAT DO YOU THINK?</div>
			<div style={{ ...headline, fontSize: 96, marginTop: 24 }}>STAND BY</div>
			<div
				style={{
					display: 'inline-block',
					background: GOLD,
					color: INK,
					padding: '12px 24px 8px',
					fontSize: 80,
					lineHeight: 0.95,
					fontWeight: 950,
					letterSpacing: -4,
					marginTop: 12,
				}}>
				MACKLEMORE?
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
				PHILADELPHIA • LOOP TOUR
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

export const EdSheeranSaysFamilyAbandonedHim = () => (
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
			src={asset('audio/EdSheeranSaysFamilyAbandonedHim.mp3')}
			volume={1}
		/>
	</AbsoluteFill>
);
