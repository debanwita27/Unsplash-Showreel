import {
	AbsoluteFill,
	Img,
	useCurrentFrame,
	useVideoConfig,
	interpolate,
	Easing
} from 'remotion';
import assets from './assets';

export function CarouselTransition(): JSX.Element {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const xOffset = interpolate(
		frame,
		[0, 60, 70],
		[0, 0, 20],
		{
			easing: Easing.cubic
		}
	);

	const scale = interpolate(
		frame,
		[0, 10, 25, 30, 45, durationInFrames - 20],
		[1, 1, 3, 2.8, 1.2, 1.2]
	);

	const rotation = frame > 5 ?  0 : 25;

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Img
				src={assets.imageUrls[0]}
				id="transition-image"
				style={{
					transform: `translateX(${xOffset}px) scale(${scale}) rotate(${rotation}deg)`,
				}}
				className="photograph-polaroid"
			/>
		</AbsoluteFill>
	);
}

export function Carousel(): JSX.Element {
	const images = assets.imageUrls;
	const {durationInFrames} = useVideoConfig();
	const currentFrame = useCurrentFrame();
	const xOffset = (durationInFrames - currentFrame) * 40 - 100;

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					gap: '2rem',
				}}
			>
				{images.map((url, index) => (
					<Img
						key={index}
						className="photograph-polaroid"
						src={url}
						style={{
							transform: `translateX(${xOffset}px)`,
							height: '80%',
						}}
					/>
				))}
			</div>
		</AbsoluteFill>
	);
}
