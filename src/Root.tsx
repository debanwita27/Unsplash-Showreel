import {Composition} from 'remotion';
import './css/style.css';
import React from 'react';
import ImageStackSequence from './components/ImageStackSequence'
import Config from './components/config'

export const RemotionRoot: React.FC = () => {
	const firstSequence = Config.sequences[0];
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
