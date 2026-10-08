import { Link } from 'react-router-dom'
import { principles, projects } from './projects'
import { architectureImages } from '../../data/architectureImages'

export function Introduction() {
  return <section className="home-introduction home-section" data-reveal-group>
    <div className="section-heading-row">
      <p className="section-label" data-reveal>01 / OUR APPROACH</p>
      <p className="small-note" data-reveal>Architecture · Interiors · Landscape</p>
    </div>
    <h2 className="editorial-heading">
      <span className="line-mask"><span data-reveal>Architecture begins</span></span>
      <span className="line-mask"><span data-reveal>with a feeling.</span></span>
      <span className="line-mask"><em data-reveal>Then it finds its form.</em></span>
    </h2>
    <div className="intro-bottom">
      <span className="drawing-mark" aria-hidden="true">+</span>
      <p data-reveal>We work at the meeting point of architecture, interiors and the landscape.
        Listening to the context of a place, we shape spaces through material, light and the rhythms of human life.</p>
      <p data-reveal>Our ambition is simple: places that invite you to slow down, feel connected,
        and discover something new each time you return.</p>
    </div>
  </section>
}

export function FeaturedProjects() {
  return <section id="featured-projects" className="featured-projects home-section" aria-labelledby="featured-title">
    <div className="section-heading-row" data-reveal-group>
      <div>
        <p className="section-label" data-reveal>02 / FEATURED CONCEPTS</p>
        <h2 id="featured-title" className="section-display" data-reveal>Places with<br /><em>a point of view.</em></h2>
      </div>
      <p className="section-aside" data-reveal>Original studies with supplied visual references.<br />Different contexts. One considered approach.</p>
    </div>
    {projects.slice(0, 3).map((project, i) => <article key={project.id} className={`featured-project featured-project--${i + 1}`}>
      <figure className="editorial-media">
        <img src={project.image} alt={project.alt} width={project.width} height={project.height} style={{ objectPosition: project.imagePosition }} loading="lazy" decoding="async" />
        <figcaption>CONCEPT / VISUAL REFERENCE {String(i + 1).padStart(2, '0')}</figcaption>
      </figure>
      <div className="featured-copy" data-reveal-group>
        <p className="project-index" data-reveal>{String(i + 1).padStart(2, '0')} / {project.category}</p>
        <h3 data-reveal>{project.name}</h3>
        <p className="project-meta" data-reveal>{project.location} <span> / </span> {project.year}</p>
        <p className="project-description" data-reveal>{project.description}</p>
        <Link className="text-link" to="/connect" data-reveal>Discuss a similar project <span aria-hidden="true">↗</span></Link>
      </div>
    </article>)}
    <div className="featured-end" data-reveal-group>
      <p data-reveal>From a private retreat to a shared urban space.</p>
      <a className="text-link" href="#selected-work" data-reveal>Explore the collection <span aria-hidden="true">↓</span></a>
    </div>
  </section>
}

export function DesignPhilosophy() {
  return <section className="design-philosophy home-section" aria-labelledby="philosophy-title">
    <div className="section-heading-row" data-reveal-group>
      <p className="section-label" data-reveal>03 / THE DESIGN LANGUAGE</p>
      <h2 id="philosophy-title" className="visually-hidden">Our design philosophy</h2>
      <p className="section-aside" data-reveal>Five principles.<br />An endless conversation.</p>
    </div>
    {principles.map(([word, title, description], i) => <div className="principle" key={word}>
      <span className="principle-number">0{i + 1}</span>
      <h3 className="principle-word">{word}</h3>
      <div className="principle-copy" data-reveal-group>
        <h4 data-reveal>{title}</h4>
        <p data-reveal>{description}</p>
      </div>
    </div>)}
  </section>
}

function storyImage(id) {
  const image = architectureImages[id]
  return { image: image.src, alt: image.alt, width: image.width, height: image.height, position: image.position }
}

const story = [
  { ...storyImage('night-lounge'), word: 'Arrival.', text: 'A threshold between the world outside and a world of your own.' },
  { ...storyImage('warm-lounge'), word: 'Stillness.', text: 'Daylight moves through the room. The architecture gives it space.' },
  { ...storyImage('pebble-courtyard'), word: 'Belonging.', text: 'Materials become familiar. A place becomes part of your story.' },
]

export function ArchitectureImageStory() {
  return <section className="image-story" aria-label="A visual story: arrival, stillness and belonging">
    <div className="image-story-sticky">
      <div className="story-images">
        {story.map((item, i) => <figure className={`story-layer story-layer--${i + 1}`} key={item.word}>
          <img src={item.image} alt={item.alt} width={item.width} height={item.height} style={{ objectPosition: item.position }} loading="lazy" decoding="async" />
          <figcaption className="visually-hidden">{item.word} {item.text}</figcaption>
        </figure>)}
        <div className="story-shade" />
      </div>
      <div className="story-top"><span>04 / A SENSE OF PLACE</span><span>THREE MOMENTS, ONE JOURNEY</span></div>
      <div className="story-captions" aria-hidden="true">
        {story.map((item, i) => <div className="story-caption" key={item.word}>
          <p>0{i + 1} / THE SPATIAL EXPERIENCE</p><h2>{item.word}</h2><span>{item.text}</span>
        </div>)}
      </div>
    </div>
  </section>
}

export function FinalCTA() {
  return <>
    <section className="home-cta home-section" data-reveal-group>
      <p className="section-label" data-reveal>08 / BEGIN A CONVERSATION</p>
      <h2 className="editorial-heading">
        <span className="line-mask"><span data-reveal>A place worth</span></span>
        <span className="line-mask"><em data-reveal>imagining together.</em></span>
      </h2>
      <div className="cta-bottom">
        <p data-reveal>Tell us about your site, your vision, or simply<br />the way you want a space to feel.</p>
        <Link to="/connect" className="cta-link" data-reveal>Let’s create something <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  </>
}



