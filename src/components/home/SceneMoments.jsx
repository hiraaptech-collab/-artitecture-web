import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ViewportScene from '../home3d/ViewportScene'
import useAutomaticProgress from '../experience/useAutomaticProgress'

export function ArchitecturalShowcase({ reducedMotion }) {
  const section = useRef(null)
  const { progress, onReady } = useAutomaticProgress(section, { duration: 14, reduced: reducedMotion, selector: '.architecture-canvas' })
  return <section ref={section} className="showcase-section home-section">
    <div className="showcase-copy" data-reveal-group>
      <p className="section-label" data-reveal>05 / FORM IN DIALOGUE</p>
      <h2 className="section-display" data-reveal>The space<br /><em>between.</em></h2>
      <p data-reveal>A rhythm of columns. A plane of light. A quiet surface of water.
        Our colonnade study explores how very little can create a profound sense of place.</p>
      <span className="small-note" data-reveal>PROCEDURAL STUDY / THE COLONNADE</span>
    </div>
    <div className="showcase-scene">
      <ViewportScene variant="showcase" progress={progress} reducedMotion={reducedMotion} onReady={onReady} />
      <p className="scene-note">Light, structure and the art of restraint.</p>
    </div>
  </section>
}

export function FinalArchitecturalMoment({ reducedMotion }) {
  const turn = useRef(0)
  const [turning, setTurning] = useState(false)
  useEffect(() => () => gsap.killTweensOf(turn), [])
  function rotate() {
    setTurning(true)
    gsap.to(turn, { current: turn.current + (reducedMotion ? Math.PI / 2 : Math.PI * 2), duration: reducedMotion ? 0 : 3.2, ease: 'power2.inOut', onComplete: () => setTurning(false) })
  }
  const section = useRef(null)
  const { progress, onReady } = useAutomaticProgress(section, { duration: 14, reduced: reducedMotion, selector: '.architecture-canvas' })
  return <section ref={section} className="final-moment">
    <div className="final-moment-sticky">
      <div className="final-moment-title" data-reveal-group>
        <p className="section-label" data-reveal>07 / EVERY DETAIL, TOGETHER</p>
        <h2 className="section-display" data-reveal>From possibility.<br /><em>To a place of your own.</em></h2>
      </div>
      <div className="final-moment-scene"><ViewportScene variant="final" turn={turn} progress={progress} reducedMotion={reducedMotion} onReady={onReady} /></div>
      <div className="spatial-controls"><button disabled={turning} onClick={rotate}>{turning ? 'Rotating\u2026' : reducedMotion ? 'Next pavilion perspective' : 'Explore the pavilion \u00b7 360\u00b0'} <span aria-hidden="true">{'\u21bb'}</span></button></div>
      <div className="final-moment-caption"><span>THE PAVILION / COMPLETE</span><span>A quiet architecture. A lasting impression.</span></div>
    </div>
  </section>
}

