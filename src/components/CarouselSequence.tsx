import React from 'react';
import { AbsoluteFill, Img } from 'remotion';

export default function Carousel(): JSX.Element {
  // TODO (@dm): club common styles into a CSS class, or a style object.
	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'black',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
        Foo
		</AbsoluteFill>
	);
}
