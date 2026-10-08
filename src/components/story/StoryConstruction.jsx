import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import useAutomaticProgress from '../experience/useAutomaticProgress'
import useReducedMotion from '../experience/useReducedMotion'
import { storyChapters } from './storyChapters'
import './storyConstruction.css'

const ConstructionScene = lazy(() => import('./ConstructionScene'))
export default function StoryConstruction() {
  const root = useRef(null)
  const viewport = useRef(null)
  const [visible,setVisible] = useState(false)
  const [chapter,setChapter] = useState(0)
  const reduced = useReducedMotion()
  const { progress, onReady, seek } = useAutomaticProgress(viewport, {
    duration: 28, reduced,
    onUpdate: (amount) => setChapter(storyChapters.reduce((current,item,index) => amount >= item.at-.025 ? index : current,0)),
  })
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin:'160px' })
    observer.observe(viewport.current)
    return () => observer.disconnect()
  },[])
  function inspect(index) { seek(storyChapters[index].at) }
  const active=chapter
  return <section id="story-construction" ref={root} className={`story-construction${reduced ? ' is-reduced' : ''}`} aria-labelledby="construction-heading">
    <div className="story-construction-sticky">
      <div className="story-construction-copy">
        <p className="editorial-eyebrow">OUR STORY / MADE TOGETHER</p><h2 id="construction-heading">Four makers.<br />{' '}<em>One shared vision.</em></h2>
        <div className="construction-chapter" aria-live={reduced ? 'polite' : 'off'}><p className="editorial-eyebrow">{storyChapters[active].tag}</p><h3>{storyChapters[active].title}</h3><p>{storyChapters[active].text}</p></div>
        <p className="construction-instruction">{reduced ? 'Choose a stage to inspect the construction without motion.' : 'Scroll to build the home. The makers move as the design develops.'}</p>
      </div>
      <div className="story-construction-visual">
        <div ref={viewport} className="construction-canvas" aria-label="Real 3D construction scene with four articulated workers and a progressively assembled house">
          {visible && <Suspense fallback={<div className="spatial-loading">Preparing the construction story…</div>}><ConstructionScene progress={progress} reduced={reduced} onReady={onReady}/></Suspense>}
        </div>
        <div className="construction-stage-controls" aria-label="Construction stages">{storyChapters.map((item,index) => <button key={item.at} aria-label={item.title} aria-pressed={active===index} onClick={() => inspect(index)}><span>0{index+1}</span><span className="construction-stage-name">{['Site','Foundation','Walls','Roof','Openings','Interior','Complete'][index]}</span></button>)}</div>
        <p className="construction-credit">PROCEDURAL ARCHITECTURAL CONCEPT / SIMPLIFIED BUILD SEQUENCE</p>
      </div>
    </div>
  </section>
}
