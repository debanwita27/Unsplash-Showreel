import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	spring,
	Img,
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
 * The final sequence that shows the unsplash user's profile.
 */
export function ProfilePage() {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const scale = spring({fps, frame: frame - 60, from: 600, to: 0});

	return (
		<AbsoluteFill
			style={{
				fontSize: 80,
				...textContainerStyle,
				background: 'none',
				color: 'black',
			}}
		>
			<Img
				src={assets.imageUrls[25]}
				className="photograph-polaroid"
				style={{
					position: 'absolute',
					transform: 'rotate(40deg) translate(-600px, 80px)',
				}}
			/>

			<Img
				src={assets.imageUrls[28]}
				className="photograph-polaroid"
				style={{
					position: 'absolute',
					transform: 'rotate(-20deg) translate(600px, 100px)',
				}}
			/>

			<Img
				src={assets.imageUrls[19]}
				className="photograph-polaroid"
				style={{
					position: 'absolute',
					transform: 'rotate(15deg) translate(-450px, 500px)',
				}}
			/>

			<span style={{transform: `translateY(${scale}px)` }}>
				Daniel Shapiro
			</span>
			<span style={{textDecoration: 'underline', color: '#1B9CFC', fontSize: '44px'}}>
				unsplash.com/dshap
			</span>
		</AbsoluteFill>
	);
}

/**
 * Transition from the carousel to the pastel background text.
 */
export function TextTransition() {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const fontSize = spring({fps, frame: frame - 20, from: 80, to: 100});

	return (
		<AbsoluteFill style={{fontSize, ...textContainerStyle}}>
			with my camera ;)
		</AbsoluteFill>
	);
}

export function PastelText() {
	const bgColors = [
		'#222f3e',
		'#c0392b',
		'#10ac84',
		'#8e44ad',
		'#f39c12',
		'#f39c12',
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
