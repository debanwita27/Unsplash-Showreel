import {Composition, Sequence, Audio} from 'remotion';
import './css/style.css';
import React from 'react';
import {
	ImageStackSequence,
	CarouselTransition,
	Carousel,
	BackgroundSequence,
	KineticText,
	TextTransition,
	PastelText,
	Gallery,
	ProfileText,
} from './components';
import video from './components/video-parameters';
import assets from './components/assets';

export const Video: React.FC = () => {
	// This sequence always plays in the background (from first to last frame),
	// and shows a static texture.
	const bgSequence = (
		<Sequence durationInFrames={video.durationInSec * video.fps}>
			<BackgroundSequence />
		</Sequence>
	);

	// This sequence starts from 0ms, and shows a bunch of images
	// stacking on top of each other.
	const imageStackSequence = (
		<Sequence durationInFrames={180}>
			<ImageStackSequence />
		</Sequence>
	);

	// An intermediate sequence is used to transition from the stack of images
	// to the carousel.
	const imageStackToCarouselTransition = (
		<Sequence from={180 - 30} durationInFrames={182}>
			<CarouselTransition />
		</Sequence>
	);

	// The second part shows a carousel of photos sliding from right to left
	const carouselSequence = (
		<Sequence from={240} durationInFrames={240}>
			<Carousel />
		</Sequence>
	);

	// On top of the carousel, we display a kinetic text ("I shoot people... with my camera ;)").
	const kineticTextSequence = (
		<Sequence from={240} durationInFrames={240}>
			<KineticText />
		</Sequence>
	);

	// Once again, a transition sequence is used to go from the
	// moving kinetic text to a static text on a pastel background.
	const kineticToPastelTextTransition = (
		<Sequence from={480} durationInFrames={60}>
			<TextTransition />
		</Sequence>
	);

	// After the previous sequence, we transition into a new one with
	// a static text over a pastel background.
	// The background colors keep changing before we finally transition
	// into the next sequence.
	const pastelTextSequence = (
		<Sequence from={480 + 60} durationInFrames={120}>
				<PastelText />
		</Sequence>
	)
		
	// This sequence shows a gallery of images flipping quickly,
	// and then dissapearring to reveal the final page.
	const gallerySequence = (
		<Sequence from={480 + 60 + 100} durationInFrames={125}>
				<Gallery />
		</Sequence>
	)
	
	// At the end, we see the Unsplash user's name and profile link on
	// a background that has some images scattered around the edges (
	// to give it a neuromorphic look).
	const profileText = (
		<Sequence from={480 + 60 + 100 + 80} durationInFrames={200}>
				<ProfileText />
		</Sequence>
	)

	return (
		<>
			{/* Audio track always plays in the background, and fades out at the end */}
			<Audio src={assets.audioTrackUrl} />

			{bgSequence}
			{imageStackSequence}
			{imageStackToCarouselTransition}
			{carouselSequence}
			{kineticTextSequence}
			{kineticToPastelTextTransition}
			{pastelTextSequence}
			{profileText}
			{gallerySequence}
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
