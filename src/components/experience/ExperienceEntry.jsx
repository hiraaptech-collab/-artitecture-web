import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { architectureImages } from '../../data/architectureImages'
import useReducedMotion from './useReducedMotion'
import EntryScene from './EntryScene'
import './experience.css'

function hasEntered() {
  try { return sessionStorage.getItem('architecture-entered') === 'yes' } catch { return false }
}
export default function ExperienceEntry({ children }) {
  const [entered, setEntered] = useState(hasEntered)
  const cover = useRef(null)
  const skip = useRef(null)
  const finishRef = useRef(null)
  const progress = useRef(0)
  const sceneReady = useRef(false)
  const startWhenReady = useRef(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (entered) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    skip.current?.focus({ preventScroll: true })
    const complete = () => {
      try { sessionStorage.setItem('architecture-entered', 'yes') } catch { /* Private browsing can disable storage. */ }
      setEntered(true)
    }
    let releasePhoto = () => {}
    const scope = gsap.context(() => {
      const timeline = gsap.timeline({ paused: true, onComplete: complete })
      timeline.to(progress, { current: 1, duration: reduced ? .45 : 2.35, ease: 'power2.inOut' }, 0)
      if (!reduced) {
        timeline.fromTo('.entry-photo', { scale: 1.08 }, { scale: 1, duration: 2.35 }, 0)
        timeline.fromTo('.entry-copy > *', { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: .12, duration: .75 }, .1)
      }
      timeline.to(cover.current, { opacity: 0, duration: reduced ? .15 : .45 }, reduced ? .45 : 2.1)
      const photo=cover.current.querySelector('img')
      const start=(force=false) => {
        const photoReady=photo.complete && photo.naturalWidth>0
        if ((force===true || (photoReady && sceneReady.current)) && !timeline.isActive()) timeline.play()
      }
      startWhenReady.current=start
      const timeout=window.setTimeout(() => start(true), 900)
      if (photo.complete && photo.naturalWidth) start()
      else { photo.addEventListener('load',start,{once:true}); photo.addEventListener('error',start,{once:true}) }
      releasePhoto=() => { clearTimeout(timeout); photo.removeEventListener('load',start); photo.removeEventListener('error',start) }
      finishRef.current = () => { timeline.kill(); complete() }
    }, cover)
    return () => {
      startWhenReady.current=null
      releasePhoto()
      finishRef.current = null
      scope.revert()
      document.body.style.overflow = previous
    }
  }, [entered, reduced])
  if (entered) return children
  const image = architectureImages['skylit-gallery']
  return <div ref={cover} className="experience-entry" role="dialog" aria-modal="true" aria-labelledby="entry-title" data-lenis-prevent>
    <img className="entry-photo" src={image.src} alt="" width={image.width} height={image.height} fetchPriority="high" />
    <div className="entry-shade" />
    <div className="entry-depth" aria-hidden="true">
      <EntryScene progress={progress} reduced={reduced} onReady={() => { sceneReady.current=true; startWhenReady.current?.() }} />
    </div>
    <div className="entry-copy"><p>ARCHITECTURE / AN INVITATION</p>
      <h1 id="entry-title">Loading Your Dream Home…</h1><span>Space. Material. Light.</span></div>
    <button ref={skip} className="entry-skip" onClick={() => finishRef.current?.()}>Enter the studio <span aria-hidden="true">↗</span></button>
  </div>
}
