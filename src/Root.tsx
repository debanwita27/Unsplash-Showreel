import {
	AbsoluteFill,
	Composition,
	useCurrentFrame,
	Img,
	staticFile,
} from 'remotion';
import {preloadImage} from '@remotion/preload';
import {range} from 'lodash';
import './style.css';
import React from 'react';

const imageUrls = range(0, 10)
	.map((n) => staticFile(`assets/photo-${n}.jpg`))
	.reverse();
const _preloadedImageHandles = imageUrls.map(preloadImage);

export const MyVideo = () => {
	const imageMinRotate = -25;
	const imageMaxRotate = 25;

	const translateOffset = 50;

	const imageCount = imageUrls.length;

	const [images, setImages] = React.useState<JSX.Element[]>([])

	React.useEffect(() => {
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
		setImages(imgs);
	}, []);


	const framesPerImage = 60 / imageCount;
	const currentFrame = useCurrentFrame();
	const lastIndex = Math.floor(currentFrame / framesPerImage) + 1

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'black',
				justifyContent: 'center',
				textAlign: 'center',
				alignItems: 'center',
				margin: 'auto',
			}}
			className="image-container"
		>
			{images.slice(0, lastIndex)}
		</AbsoluteFill>
	);
};

export const RemotionRoot: React.FC = () => {
	return (
		<Composition
			id="MyComp"
			component={MyVideo}
			durationInFrames={60}
			fps={30}
			width={1280}
			height={720}
		/>
	);
};
