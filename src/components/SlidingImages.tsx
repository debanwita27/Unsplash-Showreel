import {
	AbsoluteFill,
	Img,
	useVideoConfig,
	useCurrentFrame,
} from 'remotion';
import assets from './assets';

export default function SlidingImages() {
	const {durationInFrames} = useVideoConfig();

	const images = [11, 17, 19].map((idx) => {
		return (
			<div
				style={{
					width: '33.34%',
					flexWrap: 'nowrap'
				}}
			>
				<Img
					key={idx}
					src={assets.imageUrls[idx]}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
					}}
				/>
			</div>
		);
	});


	const frame = useCurrentFrame();
	const indexByFrame = Math.floor((images.length * frame) / durationInFrames);

	return (
		<AbsoluteFill
			style={{
				flexDirection: 'row',
				display: 'flex',
				alignItems: 'stretch',
				
			}}
		>
			{images.slice(0, indexByFrame + 1)}
		</AbsoluteFill>
	);
}
