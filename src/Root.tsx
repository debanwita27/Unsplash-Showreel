import {Composition, Sequence, Audio} from 'remotion';
import './css/style.css';
import React from 'react';
import {
	ImageStackSequence,
	CarouselTransition,
	Carousel,
	BackgroundSequence,
	TextWithBg,
} from './components';
import video from './components/video-parameters';
import assets from './components/assets';

export const Video: React.FC = () => {
	const firstSequence = video.sequences[0];
	return (
		<>
			<Audio src={assets.audioTrackUrl} />
			<Sequence durationInFrames={video.durationInSec * video.fps}>
				<BackgroundSequence />
			</Sequence>
			<Sequence durationInFrames={firstSequence.numFrames}>
				<ImageStackSequence />
			</Sequence>
			<Sequence from={firstSequence.numFrames - 30} durationInFrames={182}>
				<CarouselTransition />
			</Sequence>

			<Sequence from={240} durationInFrames={240}>
				<Carousel />
			</Sequence>


			<Sequence from={240} durationInFrames={240}>
				<TextWithBg />
			</Sequence>
		</>
	);
};

export const RemotionRoot: React.FC = () => {
	// load all assets before the first render.
	React.useEffect(() => {
		// when the `Root` component is mounted, load all assets.
		assets.load();
		// when the `Root` component is *un*mounted, unload all assets
		// from memory.
		return () => assets.unload();
	}, []);

	return (
		<>
			<Composition
				id="ShowReel"
				component={Video}
				durationInFrames={video.durationInSec * video.fps}
				fps={video.fps}
				width={video.width}
				height={video.height}
			/>
		</>
	);
};
