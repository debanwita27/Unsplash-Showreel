import {
	AbsoluteFill,
	useCurrentFrame,
	Img
} from 'remotion';
import React from 'react';
import assets from './assets'

/**
 * Load images from their URLs, and stack them on top of each other.
 * @param imageUrls A list of URLs where every URL represents an image
 * @return an array of image elements where every item is slightly rotated and translated.
 */
function stackImages(imageUrls: string[]): JSX.Element[] {
	const imageCount = imageUrls.length;
	const imageMinRotate = -25;
	const imageMaxRotate = 25;
	const translateOffset = 50;

	const imgs = imageUrls.map((url, index) => {
		const rotationInDeg =
			(index % 2 ? -1 : 1) *
			(imageMinRotate +
				(imageMaxRotate - imageMinRotate) * ((index + 1) / imageCount));
		const translateInPx = (index % 2 ? 1 : -1) * translateOffset;

		return (
			<Img
				key={index}
				className="photograph"
				style={{
					margin: 'auto',
					height: '75%',
					position: 'absolute',
					transform: `rotate(${rotationInDeg}deg) translate(${translateInPx}px)`,
				}}
				src={url}
			/>
		);
	});

	return imgs;
}

/**
 * The first sequence in the video that shows a bunch of images stacking on
 * top on each other.
 */
 export default function ImageStackSequence(): JSX.Element {
	const imageCount = assets.imageUrls.length;
	const [images, setImages] = React.useState<JSX.Element[]>([]);
	const framesToLast = 180;

	React.useEffect(() => {
		setImages(stackImages(assets.imageUrls));
	}, []);

	// Once every `framesPerImage` frames, we render a new image on top
	const framesPerImage = framesToLast / imageCount;
	const currentFrame = useCurrentFrame();

	// Every frame, images in range [0, lastIndex] are displayed.
	const lastIndex = Math.floor(currentFrame / framesPerImage) + 1;

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
			className="image-container gradient-bg"
		>
			{images.slice(0, lastIndex)}
		</AbsoluteFill>
	);
};
