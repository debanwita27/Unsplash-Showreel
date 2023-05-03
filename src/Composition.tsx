import { AbsoluteFill, useCurrentFrame, interpolate, random } from "remotion";

export const FadeIn = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

	// Const arr = [...Array(10)].map(() => Math.floor(Math.random() * 15) - 7);
	const randomValues = new Array(10).fill(true).map((_, i) => 	Math.floor(random(`x-${i}`) * 15) - 7) ;
	console.log(randomValues);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        fontSize: 80,
      }}
    >
      <div style={{ opacity, zIndex:3 }}>Bokiiiii :D {randomValues}</div>
			
    </AbsoluteFill>
  );
};