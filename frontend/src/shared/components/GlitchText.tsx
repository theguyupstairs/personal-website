import './GlitchText.css'

interface Props {
  text: string
}

export default function GlitchText({ text }: Props) {
  return (
    <span className="glitch" data-text={text}>
      {text}
    </span>
  )
}
