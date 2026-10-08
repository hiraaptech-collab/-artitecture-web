import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSmoothScroll } from '../lib/smoothScroll'
import './navbar.css'

const groups = {
  studio: { label: 'Studio', note: 'The people and ideas behind the spaces.', links: [['Our Story','/about/our-story'],['Team','/about/team'],['Career','/career']] },
  journal: { label: 'Journal', note: 'Architecture, in conversation.', links: [['Events','/news/events'],['Press','/news/press'],['Awards','/news/awards'],['Insights','/news/insights']] },
}
export default function Navbar() {
  const [open, setOpen] = useState(null)
  const [mobile, setMobile] = useState(false)
  const header = useRef(null), toggle = useRef(null), focusRequest = useRef(null)
  const location = useLocation()
  const scroll = useSmoothScroll()
  useLayoutEffect(() => {
    if (open && focusRequest.current===open) {
      const frame=requestAnimationFrame(() => {
        header.current.querySelector(`#nav-${open} a`)?.focus()
        focusRequest.current=null
      })
      return () => cancelAnimationFrame(frame)
    }
    if (!open) focusRequest.current=null
  }, [open])
  useEffect(() => {
    const frame=requestAnimationFrame(() => { setOpen(null); setMobile(false) })
    return () => cancelAnimationFrame(frame)
  }, [location.pathname,location.search])
  useEffect(() => {
    const outside = (event) => { if (!header.current?.contains(event.target)) { setOpen(null); setMobile(false) } }
    const escape = (event) => {
      if (event.key === 'Escape') {
        if (mobile) { setMobile(false); toggle.current?.focus() }
        else if (open) header.current.querySelector(`[aria-controls="nav-${open}"]`)?.focus()
        setOpen(null)
      }
      if (mobile && event.key === 'Tab') {
        const links = [...header.current.querySelectorAll('a,button')].filter(element => element.getClientRects().length)
        const first=links[0], last=links[links.length-1]
        if (event.shiftKey && document.activeElement===first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement===last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('pointerdown',outside)
    document.addEventListener('keydown',escape)
    return () => { document.removeEventListener('pointerdown',outside); document.removeEventListener('keydown',escape) }
  }, [open,mobile])
  useEffect(() => {
    if (!mobile) return
    const previous=document.body.style.overflow
    document.body.style.overflow='hidden'
    scroll.pause()
    const media=window.matchMedia('(min-width: 851px)')
    const resize=() => { if (media.matches) setMobile(false) }
    media.addEventListener('change',resize)
    const frame=requestAnimationFrame(() => header.current.querySelector('.studio-nav a, .studio-nav button')?.focus())
    return () => { cancelAnimationFrame(frame); document.body.style.overflow=previous; scroll.resume(); media.removeEventListener('change',resize) }
  }, [mobile,scroll])

  function group(key) {
    const item=groups[key]
    return <div className="nav-group" key={key}
      onMouseEnter={() => { if (window.matchMedia('(hover: hover) and (min-width: 851px)').matches) setOpen(key) }}
      onMouseLeave={() => { if (window.matchMedia('(hover: hover) and (min-width: 851px)').matches && !header.current.querySelector(`#nav-${key}`)?.contains(document.activeElement)) setOpen(null) }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(value => value===key ? null : value) }}>
      <button className={`nav-primary${item.links.some(([,path]) => path===location.pathname) ? ' active' : ''}`}
        aria-expanded={open===key} aria-controls={`nav-${key}`}
        onClick={() => setOpen(value => value===key ? null : key)}
        onKeyDown={(event) => {
          if (event.key==='ArrowDown') { event.preventDefault(); if (open===key) header.current.querySelector(`#nav-${key} a`)?.focus(); else { focusRequest.current=key; setOpen(key) } }
        }}>{item.label}<span aria-hidden="true" className="nav-plus">{open===key ? '−' : '+'}</span></button>
      <div id={`nav-${key}`} className={`nav-dropdown${open===key ? ' is-open' : ''}`} inert={open!==key}
        onKeyDown={(event) => {
          const links=[...event.currentTarget.querySelectorAll('a')]
          const index=links.indexOf(document.activeElement)
          let next
          if (event.key==='ArrowDown') next=(index+1)%links.length
          if (event.key==='ArrowUp') next=(index-1+links.length)%links.length
          if (event.key==='Home') next=0
          if (event.key==='End') next=links.length-1
          if (next!==undefined) { event.preventDefault(); links[next].focus() }
        }}>
        <p className="nav-dropdown-note">{item.note}</p>
        {item.links.map(([label,path],i) => <NavLink to={path} key={path}><span><small>{String(i+1).padStart(2,'0')}</small>{label}</span><span aria-hidden="true">↗</span></NavLink>)}
      </div>
    </div>
  }
  return <header ref={header} onClick={(event) => { if (event.target.closest('a')) { setOpen(null); setMobile(false) } }} className={`navbar studio-navbar${mobile ? ' mobile-open' : ''}`}>
    <NavLink to="/" className="navbar-logo" aria-label="Architecture studio — Home">ARCHITECTURE<span>SPACE · MATERIAL · LIGHT</span></NavLink>
    <nav data-lenis-prevent id="studio-navigation" aria-label="Main navigation" className={`studio-nav${mobile ? ' is-open' : ''}`}>
      <NavLink to="/" end className="nav-home nav-primary">Home</NavLink>
      {group('studio')}
      <NavLink to="/portfolio" className="nav-primary">Portfolio</NavLink>
      {group('journal')}
      <NavLink to="/connect" className="nav-primary nav-connect">Connect <span aria-hidden="true">↗</span></NavLink>
    </nav>
    <button ref={toggle} className="studio-menu-toggle" aria-expanded={mobile} aria-controls="studio-navigation"
      onClick={() => { setMobile(value => !value); setOpen(null) }}>{mobile ? 'Close' : 'Menu'}<span aria-hidden="true">{mobile ? '−' : '+'}</span></button>
  </header>
}
