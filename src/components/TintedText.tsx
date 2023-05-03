import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/google-fonts/DMSans';

const {fontFamily} = loadFont('normal', {weights: ['400', '500', '700']});

export default function TintedText(): JSX.Element {
	const {durationInFrames} = useVideoConfig();
	const currentFrame = useCurrentFrame();
	const texts = [
    '',
		'I',
		'shoot',
		'people',
		'.',
		'..',
		'...',
		'with ',
		'with my',
		'with my camera ',
		'with my camera ;',
		'with my camera ;)',
	];

	const textIndex = Math.floor(
		(currentFrame / durationInFrames) * texts.length
	);

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'rgba(0, 0, 0, 0.6)',
				fontSize: 80,
				color: 'white',
				fontFamily,
				fontWeight: 700,
			}}
		>
			{texts[textIndex]}
		</AbsoluteFill>
	);
}
