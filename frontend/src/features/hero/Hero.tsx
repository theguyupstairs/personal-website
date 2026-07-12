import GlitchText from '../../shared/components/GlitchText'
import useTypewriter from '../../shared/hooks/useTypewriter'
import './hero.css'

export default function Hero() {
  const role = useTypewriter('software developer.', 65)

  return (
    <section className="hero">
      <p className="hero__comment">{'// who'}</p>

      <h1 className="hero__handle">
        <GlitchText text="@theguyupstairs" />
      </h1>

      <p className="hero__role">
        <span className="hero__role-cursor">{'>'}</span>
        {role}
      </p>

      <nav className="hero__links">
        <a href="https://github.com/theguyupstairs" target="_blank" rel="noreferrer">
          github
        </a>
        <span className="hero__sep">//</span>
        {/* TODO: add contact / LinkedIn / etc */}
        <a href="mailto:todo@example.com">contact</a>
      </nav>
    </section>
  )
}
