import { useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'

// Scene visibility starts/resumes a clock. It never supplies animation progress.
// Canvas readiness prevents a lazy-loaded scene from playing before it can render.
export default function useAutomaticProgress(target, { duration = 12, reduced = false, selector, onUpdate } = {}) {
  const progress = useRef(0)
  const tween = useRef(null)
  const presence = useRef({ visible: false, ready: false })
  const update = useRef(onUpdate)
  useEffect(() => { update.current = onUpdate }, [onUpdate])

  const onReady = useCallback(() => {
    presence.current.ready = true
    if (presence.current.visible && !document.hidden && progress.current < 1) tween.current?.play()
  }, [])

  useEffect(() => {
    const host = selector ? target.current?.querySelector(selector) : target.current
    if (!host) return
    if (reduced) {
      progress.current = 1
      update.current?.(1)
    } else {
      tween.current = gsap.to(progress, {
        current: 1, duration: duration * (1 - progress.current), ease: 'none', paused: true,
        onUpdate: () => update.current?.(progress.current),
      })
    }
    function synchronize() {
      const canPlay = presence.current.visible && presence.current.ready && !document.hidden
        && progress.current < 1 && !!host.querySelector('canvas')
      if (canPlay) tween.current?.play()
      else tween.current?.pause()
    }
    const observer = new IntersectionObserver(([entry]) => {
      presence.current.visible = entry.isIntersecting && entry.intersectionRatio >= .12
      synchronize()
    }, { threshold: [0, .12] })
    observer.observe(host)
    document.addEventListener('visibilitychange', synchronize)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', synchronize)
      tween.current?.kill()
      tween.current = null
    }
  }, [target, selector, duration, reduced])

  // Existing chapter controls select a scene stage directly, without scrolling.
  const seek = useCallback((amount) => {
    tween.current?.kill()
    progress.current = Math.max(0, Math.min(1, amount))
    update.current?.(progress.current)
    if (reduced || progress.current === 1) { tween.current = null; return }
    tween.current = gsap.to(progress, {
      current: 1, duration: duration * (1 - progress.current), ease: 'none', paused: true,
      onUpdate: () => update.current?.(progress.current),
    })
    if (presence.current.visible && presence.current.ready && !document.hidden) tween.current.play()
  }, [duration, reduced])

  return { progress, onReady, seek }
}
