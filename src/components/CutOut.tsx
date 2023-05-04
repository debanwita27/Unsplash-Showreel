import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	spring,
} from 'remotion';
import assets from './assets';

const textContainerStyle: React.CSSProperties = {
	fontFamily: assets.fontFamily,
	color: '#fff',
	backgroundColor: '#222f3e',
	textAlign: 'center',
	justifyContent: 'center',
	alignItems: 'center',
	fontWeight: 700,
};

/**
 * Transition from the carousel to the cutout styled text.
 */
export function CutoutTransition() {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const fontSize = spring({fps, frame: frame - 20, from: 80, to: 100});

	// TODO: club these styles somewhere
	return (
		<AbsoluteFill style={{fontSize, ...textContainerStyle}}>
			with my camera ;)
		</AbsoluteFill>
	);
}

export function Cutout() {
	const bgColors = [
		'#222f3e',
		'#c0392b',
		'#10ac84',
		'#8e44ad',
		'#f39c12',
		'#f39c12'
	];

	const {durationInFrames} = useVideoConfig();
	const frame = useCurrentFrame();
	const colorIndex = Math.floor((bgColors.length * frame) / durationInFrames);

	return (
		<AbsoluteFill
			style={{
				fontSize: 100,
				...textContainerStyle,
				backgroundColor: bgColors[colorIndex],
			}}
		>
			with my camera ;)
		</AbsoluteFill>
	);
}
