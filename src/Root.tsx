import {Composition} from 'remotion';
import * as MeghanMontecitoStaffing from './20260901-001-MeghanMontecitoStaffing';

// Add each new short here (file must export: id, durationInFrames, and the component).
const shorts = [
  {
    id: MeghanMontecitoStaffing.id,
    component: MeghanMontecitoStaffing.MeghanMontecitoStaffing,
    durationInFrames: MeghanMontecitoStaffing.durationInFrames,
  },
  // { id: LadyGaGa.id, component: LadyGaGa.LadyGaGa, durationInFrames: LadyGaGa.durationInFrames },
];

export const Root = () => (
  <>
    {shorts.map((short) => (
      <Composition
        key={short.id}
        id={short.id}
        component={short.component}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={short.durationInFrames}
      />
    ))}
  </>
);
