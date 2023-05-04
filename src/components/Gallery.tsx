import {AbsoluteFill, Img, useVideoConfig, useCurrentFrame} from 'remotion';
import assets from './assets';

export default function Gallery() {
	const {durationInFrames} = useVideoConfig();

	// TODO(@dm) Add a comment explaining this
	const imageSets = [
		[1],
		[1, 2],
		[1, 2, 20],
		[1, 2, 20],
		[3, 2, 20],
		[3, 4, 20],
		[3, 4, 21],
		[5, 4, 21],
		[5, 6, 21],
		[5, 6, 22],
		[-1, 6, 22],
		[-1, -1, 22],
		[-1, -1, -1],
	];

	const frame = useCurrentFrame();
	const currentImageSet =
		imageSets[Math.floor((imageSets.length * frame) / durationInFrames)];

	const images = currentImageSet.map((idx) => {
		return (
			<div
				style={{
					width: '33.34%',
					outline: 'none',
				}}
			>
				{idx === -1 ? null : (
					<Img
						key={idx}
						src={assets.imageUrls[idx]}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							filter: 'grayscale(50%)',
						}}
					/>
				)}
			</div>
		);
	});

	return (
		<AbsoluteFill
			style={{
				flexDirection: 'row',
				display: 'flex',
				alignItems: 'stretch',
			}}
		>
			{images}
		</AbsoluteFill>
	);
}
