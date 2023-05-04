import {AbsoluteFill, Img, useVideoConfig, useCurrentFrame} from 'remotion';
import assets from './assets';

/**
 * 1. A set of images fill up the screen from left to right.
 * 2. The images then change (also from left to right).
 * 3. Finally, the images dissappear in the same order they arrived in,
 *    revealing the sequence underneath.
 */
export default function Gallery() {
	const {durationInFrames} = useVideoConfig();

	// A 2D Array where every entry is a list of indices.
	// Each number in a list is an index into `assets.imageUrls`.
	// We traverse this array in-order, and for each list,
	// display all the images in it.
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
	// The current set of images to use.
	const currentImageSet =
		imageSets[Math.floor((imageSets.length * frame) / durationInFrames)];

	const images = currentImageSet.map((idx) => {
		return (
			<div
				key={idx}
				style={{
					width: '33.34%',
					outline: 'none',
				}}
			>
				{idx === -1 ? null : (
					<Img
						src={assets.imageUrls[idx]}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							filter: 'grayscale(60%)',
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
