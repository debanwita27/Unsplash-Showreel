/**
 * @fileoverview Stores the configuration options for every
 * sequence in the video.
 */

type SequenceParams = Readonly<{
	numFrames: number;
	fps: number;
}>;

const sequences: SequenceParams[] = [
	// The first sequence is a stack of images that are rendered
	// in order. This lasts for 3 seconds.
	{
		numFrames: 180,
		fps: 60,
	},
];

const video = {
	durationInSec: 15,
	fps: 60,
	width: 1280,
	height: 720,
	sequences,
};

export default video;
