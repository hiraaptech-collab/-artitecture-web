import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { studio } from '../config/studio'
import { useSmoothScroll } from '../lib/smoothScroll'
import './footer.css'

gsap.registerPlugin(ScrollTrigger)

const mobileQuery = '(max-width: 700px)'
const subscribeMobile = (notify) => {
  const media = window.matchMedia(mobileQuery)
  media.addEventListener('change', notify)
  return () => media.removeEventListener('change', notify)
}
const mobileSnapshot = () => window.matchMedia(mobileQuery).matches

function Arrow() { return <span className="studio-footer-arrow" aria-hidden="true">↗</span> }

function FooterColumn({ label, children, mobile }) {
  return <details className="studio-footer-column" open={!mobile} data-footer-column onToggle={() => ScrollTrigger.refresh()}>
    <summary tabIndex={mobile ? 0 : -1}>{label}<span aria-hidden="true">+</span></summary>
    <div className="studio-footer-column-content">{children}</div>
  </details>
}

export default function Footer() {
  const root = useRef(null)
  const dialog = useRef(null)
  const [notice, setNotice] = useState(null)
  const mobile = useSyncExternalStore(subscribeMobile, mobileSnapshot, () => false)
  const location = useLocation()
  const scroll = useSmoothScroll()
  const socials = studio.socials.filter((item) => /^https?:\/\//.test(item.url || ''))
  const photo = studio.photograph
  const legal = notice ? studio.notices[notice] : null
  const [copyrightYear] = useState(() => new Date().getFullYear())

  useEffect(() => {
    if (notice) dialog.current.showModal()
  }, [notice])

  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const scope = gsap.context(() => {
        const reveal = (selector, trigger, stagger = 0.12) => gsap.fromTo(selector,
          { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1.15, stagger, ease: 'power3.out',
            scrollTrigger: { trigger, start: 'top 90%', once: true } })
        reveal('.studio-footer-statement-line', '.studio-footer-opening', 0.16)
        reveal('.studio-footer-description', '.studio-footer-opening')
        reveal('[data-footer-column]', '.studio-footer-navigation', 0.13)
        reveal('.studio-footer-contact > *', '.studio-footer-contact')
        reveal('.studio-footer-socials a', '.studio-footer-socials', 0.1)
        gsap.fromTo('.studio-footer-image-frame', { y: 45, clipPath: 'inset(18% 0 0 0)' },
          { y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'power3.out',
            scrollTrigger: { trigger: '.studio-footer-visual', start: 'top 88%', once: true } })
        if (photo.src) gsap.fromTo('.studio-footer-image', { scale: 1.12, yPercent: 4 },
          { scale: 1.02, yPercent: -4, ease: 'none',
            scrollTrigger: { trigger: '.studio-footer-visual', start: 'top bottom', end: 'bottom top', scrub: 1 } })
        gsap.fromTo('.studio-footer-cta', { scale: 0.97, y: 20, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: '.studio-footer-cta', start: 'top 93%', once: true } })
      }, root)
      return () => scope.revert()
    })
    return () => media.revert()
  }, [location.pathname, photo.src])

  function backToTop() {
    scroll.scrollTo(0, { onComplete: () => {
      const heading = document.querySelector('main h1')
      if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }) }
    } })
  }

  return <footer ref={root} className="studio-footer" aria-label="Architecture studio">
    <div className="studio-footer-opening">
      <div>
        <p className="studio-footer-label">THE STUDIO / AN ONGOING CONVERSATION</p>
        <h2 className="studio-footer-statement">
          <span className="studio-footer-line-mask"><span className="studio-footer-statement-line">We shape spaces.</span></span>
          <span className="studio-footer-line-mask"><em className="studio-footer-statement-line">You give them life.</em></span>
        </h2>
      </div>
      <p className="studio-footer-description">{studio.description}</p>
    </div>

    <div className="studio-footer-middle">
      <div className="studio-footer-navigation">
        {studio.navigation.map((column) => <FooterColumn key={column.label} label={column.label} mobile={mobile}>
          <ul>{column.items.map((item) => <li key={item.label}><Link className="studio-footer-link" to={item.to}>{item.label}<Arrow /></Link></li>)}</ul>
        </FooterColumn>)}
        <FooterColumn label="Disciplines" mobile={mobile}>
          <ul className="studio-footer-disciplines">{studio.disciplines.map((discipline) => <li key={discipline}>{discipline}</li>)}</ul>
        </FooterColumn>
      </div>

      <div className="studio-footer-contact">
        <p className="studio-footer-label">LET’S CREATE SOMETHING MEANINGFUL.</p>
        <div className="studio-footer-contact-details">
          <div><span className="studio-footer-label">EMAIL{studio.contact.email.placeholder ? ' / PLACEHOLDER' : ''}</span>
            {studio.contact.email.placeholder ? <span className="studio-footer-contact-value">{studio.contact.email.value}</span>
              : <a className="studio-footer-contact-value studio-footer-link" href={`mailto:${studio.contact.email.value}`}>{studio.contact.email.value}<Arrow /></a>}</div>
          <div><span className="studio-footer-label">PHONE{studio.contact.phone.placeholder ? ' / PLACEHOLDER' : ''}</span>
            {studio.contact.phone.href ? <a className="studio-footer-contact-value studio-footer-link" href={studio.contact.phone.href}>{studio.contact.phone.value}<Arrow /></a>
              : <span className="studio-footer-contact-value">{studio.contact.phone.value}</span>}</div>
        </div>
        <div className="studio-footer-inquiries">
          <Link className="studio-footer-link" to={studio.contact.businessPath}>Business inquiries<Arrow /></Link>
          <Link className="studio-footer-link" to={studio.contact.careerPath}>Career inquiries<Arrow /></Link>
        </div>
      </div>
    </div>

    <div className="studio-footer-lower">
      <div className="studio-footer-visual">
        <figure className="studio-footer-image-frame">
          <div className="studio-footer-image-depth">
            {photo.src ? <img className="studio-footer-image" src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" style={{ objectPosition: photo.objectPosition }} />
              : <div className="studio-footer-photo-pending" role="img" aria-label="Architecture photograph awaiting a supplied image">
                <span className="studio-footer-label">LIGHT / MATERIAL / PLACE</span><span className="studio-footer-photo-mark" aria-hidden="true">+</span>
                <span className="studio-footer-photo-note">Architecture photography<br />Image to be supplied.</span>
              </div>}
          </div>
          <figcaption>{photo.credit ? (photo.creditUrl ? <a href={photo.creditUrl} target="_blank" rel="noopener noreferrer">{photo.credit}</a> : photo.credit) : (photo.caption || 'THE SPACES WE MAKE. THE LIFE WITHIN.')}</figcaption>
        </figure>
      </div>
      <div className="studio-footer-location-social">
        <div className="studio-footer-location">
          <p className="studio-footer-label">STUDIO{studio.contact.location.placeholder ? ' / PROPOSED LOCATION' : ''}</p>
          {studio.contact.location.mapUrl ? <a className="studio-footer-location-name" href={studio.contact.location.mapUrl} target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true">⌖</span>{studio.contact.location.city}<Arrow /></a>
            : <Link className="studio-footer-location-name" to="/connect"><span aria-hidden="true">⌖</span>{studio.contact.location.city}<Arrow /></Link>}
          <p className="studio-footer-country">{studio.contact.location.country}</p>
        </div>
        <div className="studio-footer-socials">
          <p className="studio-footer-label">FOLLOW THE STUDIO</p>
          {socials.length ? <ul>{socials.map((item) => <li key={item.label}>
            <a className="studio-footer-link" href={item.url} target="_blank" rel="noopener noreferrer">{item.label}<Arrow /></a>
          </li>)}</ul> : <Link className="studio-footer-link" to="/news/insights">Notes from the studio<Arrow /></Link>}
        </div>
      </div>
      <div className="studio-footer-cta">
        <p className="studio-footer-label">START A CONVERSATION</p>
        <h3>A good place begins<br /><em>with a good question.</em></h3>
        <p>Have a project, collaboration or creative idea in mind? We’d love to hear from you.</p>
        <Link className="studio-footer-button" to="/connect">GET IN TOUCH<span aria-hidden="true">→</span></Link>
      </div>
    </div>

    <div className="studio-footer-bottom">
      <p>© {copyrightYear} {studio.name}. All Rights Reserved.</p>
      <span className="studio-footer-signature">Architecture · Interior · Spatial Design</span>
      <div>
        <button type="button" onClick={() => setNotice('privacy')}>Privacy</button>
        <button type="button" onClick={() => setNotice('terms')}>Terms</button>
        <button type="button" className="studio-footer-top" onClick={backToTop}>BACK TO TOP<span aria-hidden="true">↑</span></button>
      </div>
    </div>

    <dialog data-lenis-prevent="" ref={dialog} className="studio-footer-dialog" aria-labelledby="studio-footer-notice-title" onClose={() => setNotice(null)}
      onClick={(event) => { if (event.target === dialog.current) dialog.current.close() }}>
      {legal && <div className="studio-footer-dialog-content">
        <button type="button" className="studio-footer-dialog-close" onClick={() => dialog.current.close()} aria-label="Close notice">×</button>
        <p className="studio-footer-label">{legal.status}</p>
        <h2 id="studio-footer-notice-title">{legal.title}</h2><p>{legal.text}</p>
        <Link className="studio-footer-link" to="/connect" onClick={() => dialog.current.close()}>Contact the studio<Arrow /></Link>
      </div>}
    </dialog>
  </footer>
}




