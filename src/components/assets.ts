import {preloadImage} from '@remotion/preload';
import {staticFile} from 'remotion';
import {range} from 'lodash';

type Assets = {
	imageUrls: string[];
	_preloadedImageHandles: Array<() => void>;
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
		assets._preloadedImageHandles = assets.imageUrls.map(preloadImage);
	},

  /**
   * unload all assets from memory
   */
  unload() {
    this._preloadedImageHandles.forEach(handle => handle());
  }
};

export default assets;
