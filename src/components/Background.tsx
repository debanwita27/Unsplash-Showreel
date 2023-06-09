import { AbsoluteFill, Img, staticFile } from 'remotion'

// A static background image that lasts for the entire duration of the video.
export default function BackgroundSequence(): JSX.Element {
  return (<AbsoluteFill>
    <Img
      src={staticFile('assets/bg-img.jpg')}
      style={{
        width : "100%",
      }}
    />
  </AbsoluteFill>)
}
