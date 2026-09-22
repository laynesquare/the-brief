import { Composition } from 'remotion';
import * as EdSheeranSaysFamilyAbandonedHim from './20260921-002-EdSheeranSaysFamilyAbandonedHim';

// Add each new short here (file must export: id, durationInFrames, and the component).
const shorts = [
	{
		id: EdSheeranSaysFamilyAbandonedHim.id,
		component: EdSheeranSaysFamilyAbandonedHim.EdSheeranSaysFamilyAbandonedHim,
		durationInFrames: EdSheeranSaysFamilyAbandonedHim.durationInFrames,
	},
];

export const Root = () => (
	<>
		{shorts.map(short => (
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
