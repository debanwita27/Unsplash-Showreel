import {Composition} from 'remotion';
import './css/style.css';
import React from 'react';
import ImageStackSequence from './components/ImageStackSequence';
import Config from './components/config';
import assets from './components/assets';

export const RemotionRoot: React.FC = () => {
	const firstSequence = Config.sequences[0];

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
			id="FirstSequence"
			component={ImageStackSequence}
			durationInFrames={firstSequence.numFrames}
			fps={firstSequence.fps}
			width={Config.width}
			height={Config.height}
		/>
	);
};
