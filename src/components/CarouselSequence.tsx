import {AbsoluteFill, Img, useCurrentFrame, useVideoConfig} from 'remotion';
import assets from './assets';

export function CarouselTransition(): JSX.Element {
	// TODO (@dm): club common styles into a CSS class, or a style object.

	const rotation = 25;
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
				className="photograph"
			/>
		</AbsoluteFill>
	);
}

export function Carousel(): JSX.Element {
	const images = assets.imageUrls;
	const {width, height, durationInFrames } = useVideoConfig();
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
					width: "100%",
					gap: "2rem"
				}}
			>
				{images.map((url, index) => (
					<Img
						key={index}
						className="photograph"
						src={url}
						style={{
							transform: `translateX(${xOffset}px)`,
							height: '100%',
						}}
					/>
				))}
			</div>
		</AbsoluteFill>
	);
}
