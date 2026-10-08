import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { SmoothScrollContext } from '../lib/smoothScroll'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

// One Lenis instance for the app, shared by Home and every footer.
export default function SmoothScrollProvider({ children }) {
  const instance = useRef(null)
  const controls = useMemo(() => ({
    pause() { instance.current?.stop() },
    resume() { instance.current?.start() },
    scrollTo(target, options = {}) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (instance.current) {
        instance.current.scrollTo(target, { duration: 1.6, ...options, immediate: reduced || options.immediate })
      } else {
        const element = typeof target === 'string' ? document.querySelector(target) : target
        const top = typeof element === 'number' ? element : element?.getBoundingClientRect().top + window.scrollY
        if (Number.isFinite(top)) window.scrollTo({ top: top + (options.offset || 0), behavior: reduced || options.immediate ? 'instant' : 'smooth' })
        options.onComplete?.()
      }
    },
  }), [])

  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({ duration: 1.25, smoothWheel: true, anchors: { offset: -100, duration: 1.6 } })
      instance.current = lenis
      const update = () => ScrollTrigger.update()
      const tick = (time) => lenis.raf(time * 1000)
      lenis.on('scroll', update)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      return () => {
        instance.current = null
        gsap.ticker.remove(tick)
        gsap.ticker.lagSmoothing(1000, 33)
        lenis.off('scroll', update)
        lenis.destroy()
      }
    })
    return () => media.revert()
  }, [])

  return <SmoothScrollContext.Provider value={controls}>{children}</SmoothScrollContext.Provider>
}

