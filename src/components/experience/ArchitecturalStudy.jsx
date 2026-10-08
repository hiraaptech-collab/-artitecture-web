import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import useAutomaticProgress from './useAutomaticProgress'
import { architecturalStudies } from '../../data/architecturalStudies'
import useReducedMotion from './useReducedMotion'
import './experience.css'
const StudyScene = lazy(() => import('./StudyScene'))

export default function ArchitecturalStudy({ collection }) {
  const study = architecturalStudies[collection]
  const section = useRef(null)
  const viewport = useRef(null)
  const controls = useRef({ turn: 0, detail: 0 })
  const [visible, setVisible] = useState(false)
  const [chapter, setChapter] = useState(0)
  const [detail, setDetail] = useState(false)
  const [turning, setTurning] = useState(false)
  const reduced = useReducedMotion()
  const { progress, onReady } = useAutomaticProgress(viewport, {
    duration: 12, reduced, onUpdate: (amount) => setChapter(Math.min(2, Math.floor(amount * 3))),
  })

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '200px' })
    observer.observe(viewport.current)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    const tween = gsap.to(controls.current, { detail: detail ? 1 : 0, duration: reduced ? 0 : 1.2, ease: 'power2.inOut' })
    return () => tween.kill()
  }, [detail, reduced])
  useEffect(() => () => gsap.killTweensOf(controls.current), [])

  const currentChapter = reduced ? 2 : chapter
  function rotate() {
    if (turning) return
    setTurning(true)
    gsap.to(controls.current, { turn: controls.current.turn + (reduced ? Math.PI / 2 : Math.PI * 2), duration: reduced ? 0 : 3.2,
      ease: 'power2.inOut', onComplete: () => setTurning(false) })
  }
  return <section ref={section} className={`spatial-study${reduced ? ' is-reduced' : ''}`} data-study={study.model} aria-label={`${study.title} Interactive architectural study`}>
    <div className="spatial-study-sticky">
      <div className="spatial-study-copy">
        <p className="spatial-eyebrow">SPATIAL STUDY / {study.number}</p>
        <h2>{study.title}</h2><p className="spatial-description">{study.subtitle}</p>
        <ol className="spatial-chapters">{study.chapters.map((text, index) =>
          <li key={text} className={currentChapter === index ? 'is-current' : ''} aria-current={currentChapter === index ? 'step' : undefined}>
            <span>{String(index + 1).padStart(2, '0')}</span>{text}</li>)}</ol>
        <p className="spatial-instruction">{reduced ? 'Explore the completed study with the controls.' : 'Scroll to follow the space, or explore at your own pace.'}</p>
      </div>
      <div className="spatial-study-visual">
        <div ref={viewport} className="spatial-canvas" aria-label={`3D ${study.model} architectural model`}>
          {visible && <Suspense fallback={<div className="spatial-loading">Preparing the spatial study…</div>}>
            <StudyScene onReady={onReady} study={study} progress={progress} controls={controls} reduced={reduced} onExplore={() => setDetail((value) => !value)} />
          </Suspense>}
        </div>
        <div className="spatial-controls">
          <button onClick={rotate} disabled={turning} aria-label={reduced ? "View the next side of the architectural study" : "Rotate the architectural study through 360 degrees"}>{turning ? 'Rotating…' : reduced ? 'Next perspective' : 'Rotate 360°'} <span aria-hidden="true">↻</span></button>
          <button onClick={() => setDetail((value) => !value)} aria-pressed={detail}>{detail ? 'Return to the whole' : study.detail} <span aria-hidden="true">↗</span></button>
        </div>
        <p className="spatial-caption"><span>AN ARCHITECTURAL CONCEPT / NOT A BUILT PROJECT</span><span>{study.chapters[currentChapter]}</span></p>
      </div>
    </div>
  </section>
}
