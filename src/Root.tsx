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
	ProfilePage,
} from './components';
import video from './components/video-parameters';
import assets from './components/assets';

// This object stores the timings for every sequence in the video.
// Having all the sequence timings in the same place helps avoid
// magic numbers in random places.
const sequences = {
	// background texture spans the entire video
	bg: {from: 0, duration: video.durationInSec * video.fps},
	// images stacking lasts for 3 seconds at 60FPS
	imgStack: {from: 0, duration: 180},

	// the transition to carousel starts
	// before the last sequence has ended (hence the "- 30"),
	// and lasts for a little over 3 seconds
	imgToCarousel: {from: 180 - 30, duration: 182},
	// carousel starts at 4 seconds, and lasts for 4 seconds
	carousel: {from: 240, duration: 240},
	// In tandem with the carousel, the kinetic text also kicks in,
	// and lasts for just as long (4s).
	kineticText: {from: 240, duration: 240},

	// Now, the kinetic text is changed to a static
	// text with pastel background, and this transition lasts 1s.
	kineticToPastel: {from: 480, duration: 60},

	// The text then flashes for a bit, for about 2 seconds.
	pastelText: {from: 540, duration: 120},
	// The gallery starts 20 frames *before* the pastel text has finished flashing,
	// this makes it look like the gallery is a layer on top of the text :p
	gallery: {from: 640, duration: 125},
	// The profile text starts after the gallery has started,
	// and lasts until the end of the beyond.
	profileText: {from: 720, duration: 200},
};

/**
 * Encapsulates the list of sequences that make up the showreel.
 * This component must only be used once (inside a composition).
 */
export const ShowreelVideo: React.FC = () => {
	// This sequence always plays in the background (from first to last frame),
	// and shows a static texture.
	const bgSequence = (
		<Sequence durationInFrames={sequences.bg.duration}>
			<BackgroundSequence />
		</Sequence>
	);

	// This sequence starts from 0ms, and shows a bunch of images
	// stacking on top of each other.
	const imageStackSequence = (
		<Sequence durationInFrames={sequences.imgStack.duration}>
			<ImageStackSequence />
		</Sequence>
	);

	// An intermediate sequence is used to transition from the stack of images
	// to the carousel.
	const imageStackToCarouselTransition = (
		<Sequence
			from={sequences.imgToCarousel.from}
			durationInFrames={sequences.imgToCarousel.duration}
		>
			<CarouselTransition />
		</Sequence>
	);

	// The second part shows a carousel of photos sliding from right to left
	const carouselSequence = (
		<Sequence
			from={sequences.carousel.from}
			durationInFrames={sequences.carousel.duration}
		>
			<Carousel />
		</Sequence>
	);

	// On top of the carousel, we display a kinetic text ("I shoot people... with my camera ;)").
	const kineticTextSequence = (
		<Sequence
			from={sequences.kineticText.from}
			durationInFrames={sequences.kineticText.duration}
		>
			<KineticText />
		</Sequence>
	);

	// Once again, a transition sequence is used to go from the
	// moving kinetic text to a static text on a pastel background.
	const kineticToPastelTextTransition = (
		<Sequence
			from={sequences.kineticToPastel.from}
			durationInFrames={sequences.kineticToPastel.duration}
		>
			<TextTransition />
		</Sequence>
	);

	// After the previous sequence, we transition into a new one with
	// a static text over a pastel background.
	// The background colors keep changing before we finally transition
	// into the next sequence.
	const pastelTextSequence = (
		<Sequence
			from={sequences.pastelText.from}
			durationInFrames={sequences.pastelText.duration}
		>
			<PastelText />
		</Sequence>
	);

	// This sequence shows a gallery of images flipping quickly,
	// and then dissapearring to reveal the final page.
	const gallerySequence = (
		<Sequence
			from={sequences.gallery.from}
			durationInFrames={sequences.gallery.duration}
		>
			<Gallery />
		</Sequence>
	);

	// At the end, we see the Unsplash user's name and profile link on
	// a background that has some images scattered around the edges (
	// to give it a neuromorphic look).
	const profileText = (
		<Sequence
			from={sequences.profileText.from}
			durationInFrames={sequences.profileText.duration}
		>
			<ProfilePage />
		</Sequence>
	);

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

/**
 * Root component for the remotion video.
 * NOTE: do not instantiate this manually.
 * Used in {@link ./index.ts}
 */
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
		<Composition
			id="ShowReel"
			component={ShowreelVideo}
			durationInFrames={video.durationInSec * video.fps}
			fps={video.fps}
			width={video.width}
			height={video.height}
		/>
	);
};
