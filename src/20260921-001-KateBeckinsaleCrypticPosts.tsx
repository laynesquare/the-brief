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
export const id = '20260921-001-KateBeckinsaleCrypticPosts';
// The narration is 31.4775 seconds long. 945 frames is 31.5 seconds.
export const durationInFrames = 945;

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
			{ text: 'Kate', start: 0.14, end: 0.4 },
			{ text: 'Beckinsale', start: 0.4, end: 1.05 },
			{ text: 'posted', start: 1.05, end: 1.44 },
			{ text: '"bye"', start: 1.44, end: 1.64 },
		],
	},
	{
		words: [
			{ text: 'and', start: 2.14, end: 2.3 },
			{ text: 'turned', start: 2.3, end: 2.61 },
			{ text: 'off', start: 2.61, end: 2.77 },
			{ text: 'the', start: 2.77, end: 2.92 },
			{ text: 'comments.', start: 2.92, end: 3.34 },
		],
	},
	{
		words: [
			{ text: 'Another', start: 3.88, end: 4.21 },
			{ text: 'message', start: 4.21, end: 4.53 },
			{ text: 'read:', start: 4.53, end: 4.72 },
		],
	},
	{
		words: [
			{ text: 'Congratulations', start: 5.14, end: 6.01 },
			{ text: 'you', start: 6.01, end: 6.19 },
			{ text: 'won.', start: 6.19, end: 6.36 },
		],
	},
	{
		words: [
			{ text: 'I', start: 6.96, end: 7.04 },
			{ text: 'give', start: 7.04, end: 7.37 },
			{ text: 'up.', start: 7.37, end: 7.54 },
		],
	},
	{
		words: [
			{ text: 'Just', start: 8.3, end: 8.55 },
			{ text: 'weeks', start: 8.55, end: 8.86 },
			{ text: 'earlier,', start: 8.86, end: 9.3 },
		],
	},
	{
		words: [
			{ text: "she'd", start: 9.3, end: 9.62 },
			{ text: 'opened', start: 9.62, end: 9.99 },
			{ text: 'up', start: 9.99, end: 10.12 },
			{ text: 'about', start: 10.12, end: 10.43 },
			{ text: 'PTSD', start: 10.43, end: 10.68 },
		],
	},
	{
		words: [
			{ text: 'describing', start: 10.68, end: 11.31 },
			{ text: 'how', start: 11.31, end: 11.49 },
			{ text: 'people', start: 11.49, end: 11.87 },
			{ text: 'can', start: 11.87, end: 12.06 },
			{ text: 'appear', start: 12.06, end: 12.43 },
			{ text: 'fine', start: 12.43, end: 12.68 },
		],
	},
	{
		words: [
			{ text: 'while', start: 12.68, end: 13.0 },
			{ text: 'privately', start: 13.0, end: 13.56 },
		],
	},
	{
		words: [
			{ text: 'battling', start: 13.8, end: 14.36 },
			{ text: 'nightmares', start: 14.36, end: 15.07 },
			{ text: 'and', start: 15.07, end: 15.28 },
			{ text: 'trauma.', start: 15.28, end: 15.7 },
		],
	},
	{
		words: [
			{ text: "She's", start: 16.26, end: 16.56 },
			{ text: 'also', start: 16.56, end: 16.8 },
			{ text: 'faced', start: 16.8, end: 17.1 },
			{ text: 'criticism', start: 17.1, end: 17.65 },
		],
	},
	{
		words: [
			{ text: 'about', start: 17.65, end: 17.95 },
			{ text: 'her', start: 17.95, end: 18.13 },
			{ text: 'body', start: 18.13, end: 18.37 },
		],
	},
	{
		words: [
			{ text: 'while', start: 18.37, end: 18.67 },
			{ text: 'grieving', start: 18.67, end: 19.16 },
			{ text: 'her', start: 19.16, end: 19.34 },
			{ text: 'mother.', start: 19.34, end: 19.7 },
		],
	},
	{
		words: [
			{ text: 'In', start: 20.1, end: 20.21 },
			{ text: 'August,', start: 20.21, end: 20.53 },
			{ text: 'she', start: 20.53, end: 20.69 },
			{ text: 'cleared', start: 20.69, end: 21.07 },
			{ text: 'her', start: 21.07, end: 21.23 },
			{ text: 'Instagram', start: 21.23, end: 21.71 },
		],
	},
	{
		words: [
			{ text: 'after', start: 21.71, end: 21.98 },
			{ text: 'comments', start: 21.98, end: 22.41 },
			{ text: 'about', start: 22.41, end: 22.68 },
			{ text: 'her', start: 22.68, end: 22.84 },
			{ text: 'weight.', start: 22.84, end: 23.16 },
		],
	},
	{
		words: [
			{ text: 'What', start: 23.78, end: 24.09 },
			{ text: 'these', start: 24.09, end: 24.48 },
			{ text: 'latest', start: 24.48, end: 24.94 },
			{ text: 'posts', start: 24.94, end: 25.33 },
			{ text: 'mean', start: 25.33, end: 25.64 },
		],
	},
	{
		words: [
			{ text: 'remains', start: 25.64, end: 26.18 },
			{ text: 'unclear,', start: 26.18, end: 26.72 },
		],
	},
	{
		words: [
			{ text: 'and', start: 27.02, end: 27.18 },
			{ text: 'her', start: 27.18, end: 27.34 },
			{ text: 'representative', start: 27.34, end: 28.09 },
		],
	},
	{
		words: [
			{ text: "hadn't", start: 28.09, end: 28.41 },
			{ text: 'responded', start: 28.41, end: 28.9 },
			{ text: 'to', start: 28.9, end: 29.0 },
			{ text: 'a', start: 29.0, end: 29.06 },
			{ text: 'request', start: 29.06, end: 29.43 },
			{ text: 'for', start: 29.43, end: 29.59 },
			{ text: 'comment', start: 29.59, end: 29.97 },
		],
	},
	{
		words: [
			{ text: 'at', start: 29.97, end: 30.08 },
			{ text: 'the', start: 30.08, end: 30.24 },
			{ text: 'time', start: 30.24, end: 30.45 },
			{ text: 'of', start: 30.45, end: 30.56 },
			{ text: 'reporting.', start: 30.56, end: 31.04 },
		],
	},
];

const sceneCuts = [0, 50, 116, 249, 414, 488, 630, 713, 883, durationInFrames];
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
	const fashion = asset('img/kate-fashion-show.webp');
	const bye = asset('img/kate-bye.webp');
	const giveUp = asset('img/kate-give-up.webp');
	const hospital = asset('img/kate-hospital.webp');
	const parents = asset('img/kate-parents.webp');
	const bikini = asset('img/kate-bikini.webp');

	return (
		<AbsoluteFill>
			{frame < 50 && (
				<Still
					src={fashion}
					from={0}
					to={50}
					position='50% 18%'
					zoom={0.12}
				/>
			)}
			{frame >= 50 && frame < 116 && (
				<Still
					src={bye}
					from={50}
					to={116}
					position='50% 50%'
					zoom={0.06}
				/>
			)}
			{frame >= 116 && frame < 249 && (
				<Still
					src={giveUp}
					from={116}
					to={249}
					position='50% 42%'
					zoom={0.06}
				/>
			)}
			{frame >= 249 && frame < 414 && (
				<Still
					src={hospital}
					from={249}
					to={414}
					position='50% 36%'
					zoom={0.08}
				/>
			)}
			{frame >= 414 && frame < 488 && (
				<Still
					src={parents}
					from={414}
					to={488}
					position='50% 38%'
					zoom={0.07}
				/>
			)}
			<Sequence
				from={488}
				durationInFrames={142}
				premountFor={FPS}>
				<AbsoluteFill style={{ overflow: 'hidden', backgroundColor: INK }}>
					<OffthreadVideo
						src={asset('video/kate-bereavement-interview.mp4')}
						muted
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							objectPosition: '50% 28%',
							filter: 'saturate(.84) contrast(1.08) brightness(.82)',
						}}
					/>
				</AbsoluteFill>
			</Sequence>
			{frame >= 630 && frame < 713 && (
				<Still
					src={bikini}
					from={630}
					to={713}
					position='50% 22%'
					zoom={0.1}
				/>
			)}
			{frame >= 713 && frame < 883 && (
				<Still
					src={fashion}
					from={713}
					to={883}
					position='48% 20%'
					zoom={0.06}
				/>
			)}
			{frame >= 883 && (
				<Still
					src={hospital}
					from={883}
					to={durationInFrames}
					position='50% 34%'
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
				<span style={{ color: 'rgba(255,255,255,.55)', fontWeight: 600 }}>• KATE</span>
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
				CRYPTIC POSTS
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

	if (frame < 50) {
		const p = pop(2);
		const q = pop(18);
		return (
			<div style={{ position: 'absolute', left: 58, right: 165, top: 250 }}>
				<div style={{ fontSize: 24, fontWeight: 900, letterSpacing: 5, color: GOLD, marginBottom: 24 }}>
					KATE BECKINSALE
				</div>
				<div
					style={{
						...headline,
						opacity: p,
						transform: `translateY(${(1 - p) * 48}px) scale(${0.84 + 0.16 * p})`,
					}}>
					SHE POSTED
				</div>
				<div style={{ ...headline, color: GOLD, opacity: q, transform: `translateX(${(1 - q) * -70}px)` }}>
					“BYE”
				</div>
				<div style={{ height: 7, width: 240 * q, background: WHITE, marginTop: 28 }} />
			</div>
		);
	}

	if (frame < 116) {
		const p = pop(50);
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
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 6 }}>THEN SHE</div>
				<div style={{ ...headline, fontSize: 122, marginTop: 22 }}>
					TURNED
					<br />
					<span style={{ color: GOLD }}>COMMENTS OFF</span>
				</div>
			</div>
		);
	}

	if (frame < 249) {
		const p = pop(116);
		const q = pop(175);
		return (
			<div style={{ position: 'absolute', left: 58, right: 170, top: 250 }}>
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 5 }}>THE OTHER POST</div>
				<div
					style={{
						...headline,
						fontSize: 96,
						marginTop: 18,
						opacity: p,
						transform: `translateX(${(1 - p) * -70}px)`,
					}}>
					YOU WON.
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
					I GIVE UP.
				</div>
			</div>
		);
	}

	if (frame < 414) {
		const p = pop(249);
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
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 6 }}>JUST WEEKS EARLIER</div>
				<div style={{ ...headline, fontSize: 118, marginTop: 20 }}>
					OPENED UP
					<br />
					<span style={{ color: GOLD }}>ABOUT PTSD</span>
				</div>
			</div>
		);
	}

	if (frame < 488) {
		const p = pop(414);
		return (
			<div style={{ position: 'absolute', left: 58, right: 175, top: 285, opacity: p }}>
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 5 }}>SHE DESCRIBED</div>
				<div style={{ ...headline, fontSize: 112, marginTop: 20, transform: `translateY(${(1 - p) * 44}px)` }}>
					NIGHTMARES
					<br />
					<span style={{ color: GOLD }}>& TRAUMA</span>
				</div>
			</div>
		);
	}

	if (frame < 630) {
		const p = pop(488);
		return (
			<div
				style={{
					position: 'absolute',
					left: 58,
					top: 860,
					opacity: p,
					transform: `rotate(${(1 - p) * -4}deg) scale(${0.82 + 0.18 * p})`,
					transformOrigin: 'left center',
				}}>
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 6 }}>WHILE GRIEVING</div>
				<div style={{ ...headline, fontSize: 118, marginTop: 20 }}>
					HER
					<br />
					<span style={{ color: GOLD }}>MOTHER</span>
				</div>
			</div>
		);
	}

	if (frame < 713) {
		const p = pop(630);
		const q = pop(660);
		return (
			<div style={{ position: 'absolute', left: 58, right: 170, top: 860 }}>
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 5 }}>AFTER THE COMMENTS</div>
				<div
					style={{
						...headline,
						fontSize: 96,
						marginTop: 18,
						opacity: p,
						transform: `translateX(${(1 - p) * -70}px)`,
					}}>
					SHE WIPED
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
					INSTAGRAM CLEAN
				</div>
			</div>
		);
	}

	if (frame < 883) {
		const p = pop(713);
		return (
			<div style={{ position: 'absolute', left: 58, right: 160, top: 275, opacity: p }}>
				<div style={{ fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 5 }}>NO COMMENT YET</div>
				<div style={{ ...headline, fontSize: 106, marginTop: 22, transform: `translateX(${(1 - p) * -55}px)` }}>
					WHAT DO
					<br />
					<span style={{ color: GOLD }}>THEY MEAN?</span>
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
			<div style={{ ...headline, fontSize: 112, marginTop: 24 }}>A CRY</div>
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
				FOR HELP?
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
				INSTAGRAM • CRYPTIC POSTS
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

export const KateBeckinsaleCrypticPosts = () => (
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
			src={asset('audio/KateBeckinsaleCrypticPosts.mp3')}
			volume={1}
		/>
	</AbsoluteFill>
);
