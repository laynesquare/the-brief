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
export const id = '20260901-001-MeghanMontecitoStaffing';
export const durationInFrames = 1104;
const GOLD = '#ffd22e';
const INK = '#07090d';
const WHITE = '#f8f7f1';
const asset = (path: string) => staticFile(`${id}/${path}`);

type CaptionCue = {start: number; end: number; text: string};

const captions: CaptionCue[] = [
  {start: 0.00, end: 1.44, text: 'Meghan Markle reportedly had such'},
  {start: 1.44, end: 2.98, text: 'a bad reputation with housekeepers'},
  {start: 2.98, end: 3.92, text: 'that hiring staff became'},
  {start: 3.92, end: 5.28, text: 'nearly impossible.'},
  {start: 5.28, end: 6.45, text: 'Meghan personally interviewed'},
  {start: 6.45, end: 7.63, text: 'housekeepers for her Montecito'},
  {start: 7.63, end: 9.12, text: 'mansion, but an insider claims'},
  {start: 9.12, end: 10.40, text: 'some candidates found her'},
  {start: 10.40, end: 12.04, text: 'behavior snobbish and rude,'},
  {start: 12.04, end: 13.72, text: 'and apparently they started talking.'},
  {start: 13.72, end: 14.88, text: 'Word allegedly spread among local'},
  {start: 14.88, end: 15.96, text: 'housekeepers until many simply'},
  {start: 15.96, end: 16.76, text: "didn't want to work for"},
  {start: 16.76, end: 17.76, text: 'Harry and Meghan.'},
  {start: 17.76, end: 18.97, text: 'The source says it even became a'},
  {start: 18.97, end: 20.19, text: 'running joke around Montecito'},
  {start: 20.19, end: 21.32, text: 'that the local maids hated'},
  {start: 21.32, end: 22.53, text: 'working for them, and this comes'},
  {start: 22.53, end: 23.67, text: 'after several members of Harry'},
  {start: 23.67, end: 24.72, text: "and Meghan's staff left their"},
  {start: 24.72, end: 26.36, text: 'team in 2025.'},
  {start: 26.36, end: 27.77, text: 'Meghan has faced accusations about her'},
  {start: 27.77, end: 28.98, text: 'treatment of staff before,'},
  {start: 28.98, end: 30.36, text: 'allegations she has denied.'},
  {start: 30.36, end: 31.62, text: 'So was this just another rumor'},
  {start: 31.62, end: 33.01, text: "following one of the world's most"},
  {start: 33.01, end: 34.04, text: 'scrutinized couples?'},
  {start: 34.04, end: 35.25, text: "Or did Meghan's reputation really"},
  {start: 35.25, end: 36.46, text: 'make it that hard to hire help?'},
];

const sceneCuts = [0, 158, 411, 533, 676, 791, 911, durationInFrames];

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const enter = (frame: number, from = 0, duration = 18) =>
  interpolate(frame, [from, from + duration], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});

const Still = ({src, from, to, position = '50% 50%', zoom = 0.08}: {
  src: string;
  from: number;
  to: number;
  position?: string;
  zoom?: number;
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [from, to], [0, 1], clamp);
  return (
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: INK}}>
      <Img
        src={src}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: position,
          transform: `scale(${1.03 + p * zoom}) translate3d(${(p - 0.5) * -18}px, ${(p - 0.5) * -10}px, 0)`,
          filter: 'saturate(.82) contrast(1.08) brightness(.72)',
        }}
      />
    </AbsoluteFill>
  );
};

const Interview = ({from, duration, startFrom}: {from: number; duration: number; startFrom: number}) => (
  <Sequence from={from} durationInFrames={duration} premountFor={FPS}>
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: INK}}>
      <OffthreadVideo
        src={asset('video/megan-being-interviewed.mp4')}
        startFrom={startFrom}
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '27% 50%',
          filter: 'saturate(.75) contrast(1.13) brightness(.62)',
        }}
      />
    </AbsoluteFill>
  </Sequence>
);

const Background = () => {
  const frame = useCurrentFrame();
  const meghan = asset('img/prince-harry-duke-sussex-meghan-137998316.webp');
  const couple = asset('img/los-angeles-ca-prince-harry-137527226_d06849.webp');

  return (
    <AbsoluteFill>
      {frame < 158 && <Still src={meghan} from={0} to={158} position="48% 42%" zoom={0.10} />}
      <Interview from={158} duration={253} startFrom={16} />
      {frame >= 411 && frame < 533 && <Still src={couple} from={411} to={533} position="45% 46%" zoom={0.07} />}
      {frame >= 533 && frame < 676 && <Still src={meghan} from={533} to={676} position="48% 35%" zoom={0.13} />}
      <Interview from={676} duration={115} startFrom={225} />
      {frame >= 791 && frame < 911 && <Still src={meghan} from={791} to={911} position="48% 36%" zoom={0.06} />}
      {frame >= 911 && <Still src={couple} from={911} to={durationInFrames} position="44% 45%" zoom={0.09} />}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(5,7,10,.34) 0%, rgba(5,7,10,.03) 35%, rgba(5,7,10,.48) 66%, rgba(5,7,10,.94) 100%)'}} />
      <AbsoluteFill style={{boxShadow: 'inset 0 0 210px rgba(0,0,0,.62)'}} />
    </AbsoluteFill>
  );
};

const Kicker = () => {
  const frame = useCurrentFrame();
  const progress = frame / (durationInFrames - 1);
  return (
    <>
      <div style={{position: 'absolute', left: 58, right: 58, top: 54, height: 6, background: 'rgba(255,255,255,.22)', borderRadius: 8, overflow: 'hidden'}}>
        <div style={{width: `${progress * 100}%`, height: '100%', background: GOLD, boxShadow: `0 0 25px ${GOLD}`}} />
      </div>
      <div style={{position: 'absolute', top: 88, left: 58, display: 'flex', alignItems: 'center', gap: 18, fontWeight: 900, fontSize: 28, letterSpacing: 4}}>
        <span style={{width: 18, height: 18, borderRadius: 99, background: GOLD, boxShadow: `0 0 25px ${GOLD}`}} />
        THE BRIEF
        <span style={{color: 'rgba(255,255,255,.55)', fontWeight: 600}}>• {id}</span>
      </div>
      <div style={{position: 'absolute', top: 87, right: 58, border: '2px solid rgba(255,255,255,.48)', borderRadius: 999, padding: '8px 16px', fontWeight: 800, fontSize: 20, letterSpacing: 2, background: 'rgba(0,0,0,.28)'}}>
        REPORTED CLAIMS
      </div>
    </>
  );
};

const BigWords = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = (from: number, stiffness = 180) => spring({frame: frame - from, fps, config: {damping: 14, stiffness}});
  const wordStyle: React.CSSProperties = {
    fontSize: 100,
    lineHeight: .88,
    fontWeight: 950,
    letterSpacing: -5,
    textTransform: 'uppercase',
    textShadow: '0 12px 40px rgba(0,0,0,.7)',
  };

  if (frame < 158) {
    const p = pop(2);
    const q = pop(54);
    const r = pop(96);
    return (
      <div style={{position: 'absolute', left: 58, top: 260, width: 940}}>
        <div style={{fontSize: 25, fontWeight: 900, letterSpacing: 5, color: GOLD, marginBottom: 24}}>MONTECITO STAFFING DRAMA</div>
        <div style={{...wordStyle, transform: `translateY(${(1-p)*50}px) scale(${.82+.18*p})`, opacity: p}}>BAD</div>
        <div style={{...wordStyle, color: GOLD, transform: `translateY(${(1-q)*45}px)`, opacity: q}}>REPUTATION?</div>
        <div style={{height: 7, width: 210 * r, background: WHITE, marginTop: 28}} />
        <div style={{fontSize: 39, fontWeight: 850, marginTop: 22, width: 680, lineHeight: 1.1, opacity: r}}>HIRING HELP BECAME “NEARLY IMPOSSIBLE”</div>
      </div>
    );
  }

  if (frame < 411) {
    const local = frame - 158;
    const rude = enter(local, 150, 14);
    return (
      <>
        <div style={{position: 'absolute', left: 58, top: 260, writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: 22, fontWeight: 900, letterSpacing: 6, color: GOLD}}>THE INTERVIEWS</div>
        {local > 110 && <div style={{position: 'absolute', left: 120, top: 350, fontSize: 88, fontWeight: 950, lineHeight: .9, letterSpacing: -4, transform: `scale(${.88 + .12 * rude})`, transformOrigin: 'left center', opacity: rude, textShadow: '0 10px 35px #000'}}>“SNOBBISH<br/><span style={{color: GOLD}}>&amp; RUDE”</span></div>}
        <div style={{position: 'absolute', left: 120, top: 555, fontSize: 20, fontWeight: 800, letterSpacing: 3, padding: '10px 15px', color: INK, background: WHITE}}>ACCORDING TO AN INSIDER</div>
      </>
    );
  }

  if (frame < 533) {
    const p = pop(411);
    return (
      <div style={{position: 'absolute', left: 58, right: 58, top: 305}}>
        <div style={{fontSize: 26, color: GOLD, letterSpacing: 6, fontWeight: 900}}>ALLEGEDLY</div>
        <div style={{...wordStyle, fontSize: 126, marginTop: 18, transform: `translateX(${(1-p)*-80}px)`, opacity: p}}>WORD<br/><span style={{color: GOLD}}>SPREAD.</span></div>
        <div style={{marginTop: 28, display: 'flex', gap: 14}}>{[0,1,2,3,4].map((n) => <span key={n} style={{width: 16 + n*4, height: 16 + n*4, borderRadius: 99, border: `3px solid ${WHITE}`, opacity: .9 - n*.12}} />)}</div>
      </div>
    );
  }

  if (frame < 676) {
    const p = pop(533);
    return (
      <div style={{position: 'absolute', left: 58, top: 315, width: 930}}>
        <div style={{fontSize: 24, color: GOLD, letterSpacing: 5, fontWeight: 900}}>AROUND MONTECITO</div>
        <div style={{...wordStyle, fontSize: 120, marginTop: 22, opacity: p, transform: `rotate(${(1-p)*-4}deg) scale(${.8+.2*p})`}}>A RUNNING<br/><span style={{color: GOLD}}>JOKE?</span></div>
      </div>
    );
  }

  if (frame < 791) {
    const p = pop(676);
    return (
      <div style={{position: 'absolute', left: 58, right: 58, top: 290, textAlign: 'center'}}>
        <div style={{fontSize: 23, fontWeight: 900, letterSpacing: 5, color: GOLD}}>THE WIDER CONTEXT</div>
        <div style={{fontSize: 116, fontWeight: 950, letterSpacing: -6, lineHeight: .9, marginTop: 25, transform: `scale(${.8+.2*p})`, opacity: p, textShadow: '0 10px 45px #000'}}>STAFF<br/>LEFT</div>
        <div style={{display: 'inline-block', background: GOLD, color: INK, fontSize: 74, fontWeight: 950, lineHeight: 1, padding: '12px 22px 6px', marginTop: 22}}>2025</div>
      </div>
    );
  }

  if (frame < 911) {
    const p = pop(791);
    return (
      <div style={{position: 'absolute', left: 58, right: 58, top: 310}}>
        <div style={{fontSize: 25, color: GOLD, fontWeight: 900, letterSpacing: 5}}>IMPORTANT CONTEXT</div>
        <div style={{...wordStyle, fontSize: 112, marginTop: 20, opacity: p}}>SHE HAS<br/><span style={{color: GOLD}}>DENIED</span></div>
        <div style={{fontSize: 34, fontWeight: 850, marginTop: 23}}>PRIOR STAFF-TREATMENT ALLEGATIONS</div>
      </div>
    );
  }

  const p = pop(911);
  return (
    <div style={{position: 'absolute', left: 58, right: 58, top: 300, textAlign: 'center', opacity: p}}>
      <div style={{fontSize: 24, color: GOLD, fontWeight: 900, letterSpacing: 6}}>WHAT DO YOU THINK?</div>
      <div style={{fontSize: 116, lineHeight: .88, fontWeight: 950, letterSpacing: -6, marginTop: 25, textShadow: '0 12px 50px #000'}}>RUMOR</div>
      <div style={{fontSize: 30, fontWeight: 900, letterSpacing: 8, margin: '18px 0'}}>OR</div>
      <div style={{fontSize: 108, lineHeight: .9, fontWeight: 950, letterSpacing: -5, color: GOLD, textShadow: '0 12px 50px #000'}}>REPUTATION?</div>
      <div style={{fontSize: 28, fontWeight: 800, letterSpacing: 3, marginTop: 35}}>DROP YOUR TAKE ↓</div>
    </div>
  );
};

const Caption = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const cue = captions.find((c) => t >= c.start && t < c.end);
  if (!cue) return null;
  const words = cue.text.split(/\s+/);
  const progress = (t - cue.start) / (cue.end - cue.start);
  const active = Math.min(words.length - 1, Math.floor(progress * words.length));

  return (
    <div style={{position: 'absolute', left: 54, right: 54, bottom: 135, minHeight: 245, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(7,9,13,.9), rgba(7,9,13,.76), rgba(7,9,13,.9))', border: '1px solid rgba(255,255,255,.14)', borderRadius: 30, boxShadow: '0 24px 60px rgba(0,0,0,.35)', backdropFilter: 'blur(14px)'}} />
      <div style={{position: 'relative', width: 900, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: 17, rowGap: 4, fontSize: 61, lineHeight: 1.08, fontWeight: 950, letterSpacing: -2.7, textTransform: 'uppercase', textAlign: 'center'}}>
        {words.map((word, index) => {
          const clean = word.toLowerCase().replace(/[^a-z0-9]/g, '');
          const key = ['bad','reputation','impossible','snobbish','rude','talking','spread','joke','hated','left','2025','accusations','denied','rumor','hard'].includes(clean);
          const on = index === active;
          return <span key={`${word}-${index}`} style={{color: on || (key && index < active) ? GOLD : index < active ? WHITE : 'rgba(248,247,241,.44)', transform: `scale(${on ? 1.10 : 1})`, transformOrigin: 'center bottom', marginInline: on ? 12 : 0, textShadow: on ? '0 0 24px rgba(255,210,46,.4)' : '0 4px 18px rgba(0,0,0,.65)'}}>{word}</span>;
        })}
      </div>
    </div>
  );
};

const Texture = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill style={{opacity: .14, backgroundImage: 'repeating-linear-gradient(0deg, transparent 0, transparent 5px, rgba(255,255,255,.055) 6px)'}} />
      <div style={{position: 'absolute', width: 500, height: 500, border: '1px solid rgba(255,210,46,.20)', borderRadius: 999, right: -320, top: 680, transform: `rotate(${frame * .2}deg)`}} />
      <div style={{position: 'absolute', width: 310, height: 1, background: 'rgba(255,210,46,.42)', right: -70, top: 930, transform: `rotate(${-28 + Math.sin(frame/30)*2}deg)`}} />
    </AbsoluteFill>
  );
};

const FlashCuts = () => {
  const frame = useCurrentFrame();
  const opacity = Math.max(...sceneCuts.slice(1, -1).map((cut) => interpolate(Math.abs(frame - cut), [0, 4], [.72, 0], clamp)));
  return <AbsoluteFill style={{background: WHITE, opacity, pointerEvents: 'none'}} />;
};

const SoundDesign = () => (
  <>
    <Audio src={asset('audio/ElevenLabs_2026-08-24T23_55_21_Lucan Rook  - Energetic Male_pvc_sp120_s0_sb100_se40_b_m2.mp3')} volume={1} />
    <Audio src={asset('audio/editorial-bed.m4a')} volume={0.48} />
    {sceneCuts.slice(1, -1).map((cut) => (
      <Sequence key={cut} from={cut} durationInFrames={15}>
        <Audio src={asset('audio/transition-hit.m4a')} volume={0.28} />
      </Sequence>
    ))}
  </>
);

export const MeghanMontecitoStaffing = () => (
  <AbsoluteFill style={{backgroundColor: INK, color: WHITE, fontFamily: 'Helvetica Neue, Arial, sans-serif', overflow: 'hidden'}}>
    <Background />
    <Texture />
    <Kicker />
    <BigWords />
    <Caption />
    <FlashCuts />
    <SoundDesign />
  </AbsoluteFill>
);
