import {AbsoluteFill, Img} from 'remotion';
import assets from './assets';
import { last } from 'lodash'

export function CarouselTransition(): JSX.Element {
	// TODO (@dm): club common styles into a CSS class, or a style object.

	const rotation = 25;
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Img src={assets.imageUrls[5]} className="photograph" style={{
				transform: `rotate(${rotation}deg)`,
				height: '80%'
			}} />
		</AbsoluteFill>
	);
}

export function Carousel(): JSX.Element {
	return <> </>
}