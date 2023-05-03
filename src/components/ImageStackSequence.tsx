import {
	AbsoluteFill,
	useCurrentFrame,
	Img,
	staticFile,
} from 'remotion';
import {preloadImage} from '@remotion/preload';
import {range} from 'lodash';
import React from 'react';
import Config from './config'

// The sequence described by this file.
const Sequence = Config.sequences[0];

const imageUrls = range(0, 20)
	.map((n) => staticFile(`assets/photo-${n}.jpg`))
	.reverse();

const _preloadedImageHandles = imageUrls.map(preloadImage);

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
				style={{
					margin: 'auto',
					height: '75%',
					position: 'absolute',
					border: '3px solid white',
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
	const imageCount = imageUrls.length;
	const [images, setImages] = React.useState<JSX.Element[]>([]);

	React.useEffect(() => {
		setImages(stackImages(imageUrls));
	}, []);

	// Once every `framesPerImage` frames, we render a new image on top
	const framesPerImage = Sequence.numFrames / imageCount;
	const currentFrame = useCurrentFrame();

	// Every frame, images in range [0, lastIndex] are displayed.
	const lastIndex = Math.floor(currentFrame / framesPerImage) + 1;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'black',
				justifyContent: 'center',
				alignItems: 'center',
			}}
			className="image-container"
		>
			{images.slice(0, lastIndex)}
		</AbsoluteFill>
	);
};
