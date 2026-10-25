import { Composition } from 'remotion';
import * as EdSheeranSaysFamilyAbandonedHim from './20260921-002-EdSheeranSaysFamilyAbandonedHim';
import * as HarveyWeinsteinSentenced15Years from './20260923-001-HarveyWeinsteinSentenced15Years';
import * as SpeedTheDoubleBackflip from './20260930-001-SpeedTheDoubleBackflip';

// Add each new short here (file must export: id, durationInFrames, and the component).
const shorts = [
	{
		id: SpeedTheDoubleBackflip.id,
		component: SpeedTheDoubleBackflip.SpeedTheDoubleBackflip,
		durationInFrames: SpeedTheDoubleBackflip.durationInFrames,
		width: 2160,
		height: 2880,
	},
];

export const Root = () => (
	<>
		{shorts.map(short => (
			<Composition
				key={short.id}
				id={short.id}
				component={short.component}
				width={'width' in short && short.width ? short.width : 1080}
				height={'height' in short && short.height ? short.height : 1920}
				fps={30}
				durationInFrames={short.durationInFrames}
			/>
		))}
	</>
);
