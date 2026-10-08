import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function PageTransition({ children }) {
  const { pathname } = useLocation()
  const root = useRef(null)
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Animate the opening, rather than transforming sticky scene ancestors.
    const scope = gsap.context(() => {
      const opening=root.current.querySelector('.image-page-heading, .hero-content')
      if (opening) gsap.fromTo(opening,{rotateX:3,y:14,transformPerspective:1000},
        {rotateX:0,y:0,duration:1,ease:'power3.out',clearProps:'transform',onComplete:()=>ScrollTrigger.refresh()})
    },root)
    return () => scope.revert()
  },[pathname])
  return <div ref={root} className="page-transition" key={pathname}>{children}</div>
}
