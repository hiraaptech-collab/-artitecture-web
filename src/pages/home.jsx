import { useRef } from 'react'
import { Link } from 'react-router-dom'
import ViewportScene from '../components/home3d/ViewportScene'
import useArchitectureScroll from '../components/home3d/useArchitectureScroll'
import { stages } from '../components/home3d/sequence'
import useHomeMotion from '../components/home/useHomeMotion'
import { Introduction, FeaturedProjects, DesignPhilosophy, ArchitectureImageStory, FinalCTA } from '../components/home/EditorialSections'
import { ArchitecturalShowcase, FinalArchitecturalMoment } from '../components/home/SceneMoments'
import SelectedWork from '../components/home/SelectedWork'
import CinematicHero from '../components/imagery/CinematicHero'
import { HomeServices } from '../components/imagery/PageEditorial'
import { pageContent } from '../data/pageContent'
import '../components/home3d/home3d.css'
import '../components/home/home.css'

export default function Home() {
  const root = useRef(null)
  const section = useRef(null)
  const { progress, stage, reducedMotion, onReady } = useArchitectureScroll(section)
  useHomeMotion(root)

  return <main ref={root} id="home-top" className="home">
    <CinematicHero title={pageContent.home.title} content={pageContent.home}/>
    <section ref={section} className={`architecture-story${reducedMotion ? ' is-reduced' : ''}`}
      aria-label="An architectural study, from site to completed pavilion">
      <div className="architecture-sticky">
        <div className="hero-content">
          <p className="hero-eyebrow hero-reveal">ARCHITECTURE · INTERIORS · DESIGN</p>
          <h2 className="construction-title"><span className="hero-line hero-reveal">From the ground</span><span className="hero-line hero-reveal"><em>to possibility.</em></span></h2>
          <p className="hero-description hero-reveal">We create thoughtful architectural spaces where material, light and human experience come together.</p>
          <Link className="hero-button hero-reveal" to="/portfolio">Explore Our Work <span aria-hidden="true">↗</span></Link>
          <p className="architecture-scroll-note hero-reveal">{reducedMotion ? 'The completed architectural study' : 'Scroll to follow the architecture'} <span aria-hidden="true">↓</span></p>
        </div>
        <div className="architecture-visual">
          <div className="hero-model-label"><span>A STUDY IN MAKING</span><span>31° 33′ N / 74° 21′ E</span></div>
          <ViewportScene progress={progress} reducedMotion={reducedMotion} onReady={onReady} />
          <div className="architecture-caption">
            <span>STUDY 01 / THE PAVILION</span>
            <span>{String(stage + 1).padStart(2, '0')} / {stages.length} — {stages[stage]}</span>
          </div>
          <div className="architecture-track" aria-hidden="true">
            {stages.map((name, index) => <span key={name} className={index <= stage ? 'is-active' : ''} />)}
          </div>
        </div>
      </div>
    </section>
    <Introduction />
    <HomeServices />
    <FeaturedProjects />
    <DesignPhilosophy />
    <ArchitectureImageStory />
    <ArchitecturalShowcase reducedMotion={reducedMotion} />
    <SelectedWork />
    <FinalArchitecturalMoment reducedMotion={reducedMotion} />
    <FinalCTA />
  </main>
}

