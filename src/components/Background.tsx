import { AbsoluteFill, Img, staticFile } from 'remotion'

export default function BackgroundSequence(): JSX.Element {
  // return <AbsoluteFill style={{ background: "linear-gradient(to top, #B19CD8, #E6D1F2)" }} />
  return (<AbsoluteFill>
    <Img
      src={staticFile('assets/bg-img.jpg')}
      style={{
        width : "100%",
      }}
    />
  </AbsoluteFill>)
}
