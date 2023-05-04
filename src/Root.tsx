import {Composition, Sequence, Audio} from 'remotion';
import './css/style.css';
import React from 'react';
import {
	ImageStackSequence,
	CarouselTransition,
	Carousel,
	BackgroundSequence,
	TextWithBg,
	CutoutTransition,
	Cutout,
	SlidingImages
} from './components';
import video from './components/video-parameters';
import assets from './components/assets';

export const Video: React.FC = () => {
	const firstSequence = video.sequences[0];
	return (
		<>
			<Audio src={assets.audioTrackUrl} />

			{/*
			 * This sequence spans the entire length of the video, and
			 * serves as the background color for every sequence on top of it.
			 */}
			<Sequence durationInFrames={video.durationInSec * video.fps}>
				<BackgroundSequence />
			</Sequence>

			{/**
			 *  The first part of the video shows a bunch of images haphazardly stacking on top
			 * of each other.
			 */}
			<Sequence durationInFrames={firstSequence.numFrames}>
				<ImageStackSequence />
			</Sequence>

			{/**
			 * The second part shows a carousel of photos sliding from right to left
			 */}
			<Sequence from={firstSequence.numFrames - 30} durationInFrames={182}>
				<CarouselTransition />
			</Sequence>

			<Sequence from={240} durationInFrames={240}>
				<Carousel />
			</Sequence>

			<Sequence from={240} durationInFrames={240}>
				<TextWithBg />
			</Sequence>

			<Sequence from={480} durationInFrames={60}>
				<CutoutTransition />
			</Sequence>

			<Sequence from={540} durationInFrames={130}>
				<Cutout />
			</Sequence>

			<Sequence from={540 + 65} durationInFrames={65}>
				<SlidingImages />
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
