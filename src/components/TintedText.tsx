import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import assets from './assets'

/**
 * Renders a series of strings in order (on top of a tinted background).
 */
export default function KineticTextOnTintedBg(): JSX.Element {
	const {durationInFrames} = useVideoConfig();
	const currentFrame = useCurrentFrame();
	const texts = [
		'',
		'I',
		'I shoot',
		'I shoot people',
		'I shoot people',
		'.',
		'..',
		'...',
		'with ',
		'with my',
		'with my camera ',
		'with my camera ;',
		'with my camera ;)',
	];

	const textIndex = Math.min(
		Math.floor((currentFrame / (durationInFrames - 50)) * texts.length),
		texts.length - 1
	);

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'rgba(0, 0, 0, 0.6)',
				fontSize: 80,
				color: 'white',
				fontFamily: assets.fontFamily,
				fontWeight: 700,
			}}
		>
			{texts[textIndex]}
		</AbsoluteFill>
	);
}
