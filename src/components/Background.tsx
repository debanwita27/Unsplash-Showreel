import { useVideoConfig, useCurrentFrame, AbsoluteFill } from 'remotion'

export default function BackgroundSequence(): JSX.Element {
  return <AbsoluteFill style={{ background: "linear-gradient(to top, #1d976c, #93f9b9)" }} />
}
