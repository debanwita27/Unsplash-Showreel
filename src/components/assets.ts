import {preloadImage, preloadAudio} from '@remotion/preload';
import {staticFile} from 'remotion';
import {range} from 'lodash';

type Assets = {
	imageUrls: string[];
	audioTrackUrl: string;
	_preloadedImageHandles: Array<() => void>;
	_audioTrackHandle: null | (() => void);
  load: () => void;
  unload: () => void;
};

/**
 * Resources like sounds, images, GIFs, etc. used in the video.
 * All assets are preloaded before the video begins.
 * This results in a smoother development process, and more
 * predictable rendering in the final MP4 file.
 */
const assets: Assets = {
	imageUrls: [],

	audioTrackUrl: staticFile('assets/music.mp3'),

	_audioTrackHandle: null,

	// A list of functions where the `i`th function
	// unloads the `i`th image in the `imageUrls` list.
	_preloadedImageHandles: [],

	/**
	 * pre-loads all assets from disk / network.
   * Must be called *once* before the video has begun playing.
	 */
	load() {
		this.imageUrls = range(0, 20)
			.map((n) => staticFile(`assets/photo-${n}.jpg`))
			.reverse();
		this._preloadedImageHandles = this.imageUrls.map(preloadImage);
		this._audioTrackHandle = preloadAudio(this.audioTrackUrl)
	},

  /**
   * unload all assets from memory
   */
  unload() {
    this._preloadedImageHandles.forEach(handle => handle());
		if (this._audioTrackHandle)
			this._audioTrackHandle();
  }
};

export default assets;
