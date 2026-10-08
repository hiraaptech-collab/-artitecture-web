import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { architectureImages } from '../../data/architectureImages'
import './cinematicHero.css'

gsap.registerPlugin(ScrollTrigger)
export function EditorialLink({ to, children, className = 'editorial-link' }) {
  return to.startsWith('#') ? <a className={className} href={to}>{children}<span aria-hidden="true">↗</span></a>
    : <Link className={className} to={to}>{children}<span aria-hidden="true">↗</span></Link>
}

// One photograph travels from a full hero background into the introductory card.
// Percentage geometry follows the viewport on refresh; no cloned image or fixed overlay.
export default function CinematicHero({ title, content }) {
  const root = useRef(null)
  const image = architectureImages[content.image]
  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add({ motion: '(prefers-reduced-motion: no-preference)', compact: '(max-width: 650px) and (orientation: portrait)', short: '(max-width: 650px) and (max-height: 700px) and (orientation: portrait)' }, ({ conditions }) => {
      if (!conditions.motion) return
      const scope = gsap.context(() => {
        const mirrored = content.variant === 'reverse'
        const frame = root.current.querySelector('.cinema-travelling-image')
        const intro = root.current.querySelector('.cinema-introduction')
        const zoom = () => {
          const viewport = root.current.querySelector('.cinema-sticky')
          const density = Math.max(viewport.clientWidth / image.width, viewport.clientHeight / image.height) * (window.devicePixelRatio || 1)
          return 1 + Math.min(.06, Math.max(.02, .06 / Math.max(1, density)))
        }
        gsap.to(frame, { scale:1.025, duration:14, repeat:-1, yoyo:true, ease:'sine.inOut', scrollTrigger:{ trigger:root.current, start:'top bottom', end:'bottom top', toggleActions:'play pause resume pause' } })
        gsap.set(intro, { autoAlpha: 0 })
        const timeline = gsap.timeline({ scrollTrigger: {
          trigger: root.current, start: () => 'top top+=' + (window.innerWidth <= 850 ? 78 : 92),
          end: 'bottom bottom', scrub: .65, invalidateOnRefresh: true,
        } })
        timeline.to('.cinema-heading', { y: -45, autoAlpha: 0, duration: .35, ease: 'power1.in' }, 0)
          .to('.cinema-shade', { opacity: 0, duration: .6 }, .05)
          .to(frame, { left: conditions.compact ? '6%' : mirrored ? '7%' : '54%',
            top: conditions.short ? '62%' : conditions.compact ? '54%' : '12%', width: conditions.compact ? '88%' : '39%',
            height: conditions.short ? '33%' : conditions.compact ? '41%' : '76%', borderRadius: '3px', duration: .8, ease: 'power2.inOut' }, .12)
          .fromTo('.cinema-photo', { scale: zoom, yPercent: () => Math.min(2, (zoom() - 1) * 35) },
            { scale: 1, yPercent: 0, duration: 1, ease: 'none' }, 0)
          .to(intro, { autoAlpha: 1, duration: .35 }, .6)
          .to('.cinema-image-note', { autoAlpha: 1, duration: .2 }, .8)
        gsap.from('.cinema-heading > *', { y: 18, opacity: 0, duration: .9, stagger: .1, ease: 'power3.out' })
      }, root)
      return () => scope.revert()
    })
    return () => media.revert()
  }, [content, image])
  return <section ref={root} className={`cinematic-hero cinema--${content.variant}`} aria-label={`${title} introduction`}>
    <div className="cinema-sticky">
      <figure className="cinema-travelling-image">
        <img className="cinema-photo" src={image.src} alt={image.alt} width={image.width} height={image.height}
          style={{ objectPosition: image.position }} loading="eager" fetchPriority="high" decoding="async" />
        <figcaption className="cinema-image-note">SPATIAL REFERENCE / {image.alt}</figcaption>
      </figure>
      <div className="cinema-shade" aria-hidden="true" />
      <header className="cinema-heading">
        <p className="cinema-eyebrow">{content.label}</p>
        <h1 className="cinema-title">{title}</h1>
        <p className="cinema-summary">{content.summary}</p>
        <EditorialLink className="cinema-button" to={content.cta[1]}>{content.cta[0]}</EditorialLink>
        <p className="cinema-scroll-note">SCROLL / FROM IMAGE TO IDEA <span aria-hidden="true">↓</span></p>
      </header>
      <div className="cinema-introduction">
        <p className="editorial-eyebrow">THE IDEA BEHIND THE IMAGE</p>
        <h2>{content.intro[0]}</h2>
        <p>{content.intro[1]}</p><p className="cinema-intro-support">{content.intro[2]}</p>
        <EditorialLink to={content.introLink[1]}>{content.introLink[0]}</EditorialLink>
      </div>
    </div>
  </section>
}
