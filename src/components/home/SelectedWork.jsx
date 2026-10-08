import { useLayoutEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { categories, projects } from './projects'

export default function SelectedWork() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedCategory = searchParams.get('category')
  const category = categories.includes(requestedCategory) ? requestedCategory : 'All'
  const [busy, setBusy] = useState(false)
  const grid = useRef(null)
  const animation = useRef(null)
  const initial = useRef(true)
  const filtered = projects.filter((project) => category === 'All' || project.category === category)

  useLayoutEffect(() => {
    if (initial.current) { initial.current = false; return }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const incoming = gsap.fromTo(Array.from(grid.current.children), { opacity: 0, y: 25, clipPath: 'inset(0 0 12% 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.65, stagger: 0.09, ease: 'power2.out',
        onComplete: () => { setBusy(false); ScrollTrigger.refresh() } })
    animation.current = incoming
    return () => incoming.kill()
  }, [category])

  useLayoutEffect(() => () => animation.current?.kill(), [])

  function setCategory(next) {
    const params = new URLSearchParams(searchParams)
    params.set('category', next)
    setSearchParams(params, { replace: true, state: { preserveScroll: true } })
  }

  function select(next) {
    if (next === category || busy) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCategory(next); return }
    setBusy(true)
    animation.current = gsap.to(Array.from(grid.current.children), {
      opacity: 0, y: -16, duration: 0.3, stagger: 0.025, ease: 'power2.in',
      onComplete: () => { if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setBusy(false); setCategory(next) },
    })
  }

  return <section id="selected-work" className="selected-work home-section" aria-labelledby="selected-title">
    <div className="section-heading-row" data-reveal-group>
      <div><p className="section-label" data-reveal>06 / SELECTED WORK</p><h2 id="selected-title" className="section-display" data-reveal>A considered collection.</h2></div>
      <p className="section-aside" data-reveal>Six original concepts.<br />Architecture for different ways of living.</p>
    </div>
    <div className="work-filters" role="group" aria-label="Filter projects by category">
      {categories.map((item) => <button type="button" key={item} aria-pressed={category === item}
        aria-controls="selected-grid" disabled={busy} onClick={() => select(item)}>{item}</button>)}
    </div>
    <p className="visually-hidden" role="status" aria-live="polite">{filtered.length} {category === 'All' ? '' : category} concept projects</p>
    <div ref={grid} id="selected-grid" className="selected-grid" aria-busy={busy}>
      {filtered.map((project) => <article className="selected-tile" key={project.id}>
        <figure><img src={project.image} alt={project.alt} width={project.width} height={project.height} style={{ objectPosition: project.imagePosition }} loading="lazy" decoding="async" /><figcaption>CONCEPT / VISUAL REFERENCE</figcaption></figure>
        <div className="selected-tile-heading"><h3>{project.name}</h3><span>{project.year}</span></div>
        <p className="project-meta">{project.category} / {project.location}</p>
        <p className="project-description">{project.description}</p>
      </article>)}
    </div>
  </section>
}


