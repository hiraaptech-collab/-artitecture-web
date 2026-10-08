import { architectureImages } from '../../data/architectureImages'
import { EditorialLink } from './CinematicHero'
import './pageEditorial.css'

export function PageFeatures({ content, collection }) {
  return <section id="page-features" className={`page-features editorial-section layout--${collection}`} aria-labelledby="feature-heading">
    <div className="editorial-section-head"><p className="editorial-eyebrow">A CLOSER LOOK / SPACE & PURPOSE</p><h2 id="feature-heading">{content.sectionTitle}</h2></div>
    <div className="page-feature-grid">{content.cards.map(([id,title,tag,paragraph,detail], index) => {
      const image = architectureImages[id]
      return <article className="page-feature" key={id}>
        <figure className={`image-page-media${image.kind === 'diagram' ? ' is-diagram' : ''}`} data-page-media>
          <div className="image-page-image-mask"><img src={image.src} alt={image.alt} width={image.width} height={image.height} style={{ objectPosition:image.position }} loading="lazy" decoding="async" /></div>
          <figcaption>{String(index+1).padStart(2,'0')} / {image.kind === 'diagram' ? 'DESIGN DRAWING' : 'SUPPLIED SPATIAL REFERENCE'}</figcaption>
        </figure>
        <div className="page-feature-copy"><p className="editorial-eyebrow">{tag}</p><h3>{title}</h3><p>{paragraph}</p><p>{detail}</p></div>
      </article>
    })}</div>
  </section>
}
export function PageProcess({ content }) {
  return <section id="page-process" className="page-process editorial-section">
    <div className="editorial-section-head"><p className="editorial-eyebrow">THINK / DISCUSS / MAKE</p><h2>{content.processTitle}</h2></div>
    <ol className="page-process-grid">{content.process.map(([title, text],index) => <li key={title}><span className="process-number">0{index+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
  </section>
}
export function PageQuestions({ content }) {
  return <section className="page-questions editorial-section">
    <div><p className="editorial-eyebrow">USEFUL TO KNOW</p><h2>A little more clarity.</h2></div>
    <div>{content.questions.map(([question,answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
  </section>
}
export function PageClosing({ content }) {
  return <section className="page-closing editorial-section"><p className="editorial-eyebrow">THE NEXT CONVERSATION</p><h2>{content.closing[0]}</h2><p>{content.closing[1]}</p><EditorialLink to={content.closing[3]}>{content.closing[2]}</EditorialLink></section>
}
export function HomeServices() {
  const services = [
    ['Architecture & residential planning','From site and spatial brief to plans, sections and coordinated details. We consider arrival, privacy, daylight and the connection to outdoor life.'],
    ['Interior architecture & materials','Layouts, joinery, finishes and lighting developed as one language. A room should feel coherent at the scale of a view and at the scale of a touch.'],
    ['3D studies & design exploration','Spatial models make options easier to compare. Explore proportion, material relationships and movement before committing to a direction.'],
    ['Landscape & environmental thinking','Shaded thresholds, useful planting and adaptable spaces. Climate and maintenance belong in the design conversation from the beginning.'],
  ]
  return <section className="home-services editorial-section"><div className="editorial-section-head"><p className="editorial-eyebrow">DESIGN AS A CONNECTED PROCESS</p><h2>One home. Many considered decisions.</h2></div>
    <div className="home-services-grid">{services.map(([title,text],i) => <article key={title}><span className="process-number">0{i+1}</span><h3>{title}</h3><p>{text}</p><EditorialLink to="/connect">Discuss your scope</EditorialLink></article>)}</div></section>
}
