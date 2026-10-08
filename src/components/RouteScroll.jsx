import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSmoothScroll } from '../lib/smoothScroll'

export default function RouteScroll() {
  const location = useLocation()
  const scroll = useSmoothScroll()
  useEffect(() => {
    if (location.state?.preserveScroll) return
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      const target = location.hash ? document.getElementById(location.hash.slice(1)) : null
      scroll.scrollTo(target || 0, { immediate: !target, offset: target ? -100 : 0 })
    })
    return () => cancelAnimationFrame(frame)
  }, [location.pathname, location.hash, location.key, location.state, scroll])
  return null
}

