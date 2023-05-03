/**
 * @fileoverview Stores the configuration options for every
 * sequence in the video.
 */

type SequenceConfig = Readonly<{
	numFrames: number;
	fps: number;
}>;

type VideoConfig = Readonly<{
  width: number;
  height: number;
	numSequences: number;
	sequences: SequenceConfig[];
}>;

const config: VideoConfig = {
	numSequences: 1,
  width: 1280,
  height: 720,
	sequences: [
		// The first sequence is a stack of images that are rendered
    // in order. This lasts for 3 seconds.
		{
			numFrames: 180,
			fps: 60,
		},
	],
};

export default config;
