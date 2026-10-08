import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { pageContent } from '../../data/pageContent'
import ArchitecturalStudy from '../experience/ArchitecturalStudy'
import CinematicHero from './CinematicHero'
import { PageFeatures, PageProcess, PageQuestions, PageClosing } from './PageEditorial'
import ProjectEnquiry from './ProjectEnquiry'
import StoryConstruction from '../story/StoryConstruction'
import './imagePage.css'

gsap.registerPlugin(ScrollTrigger)
export default function ImagePage({ title, collection, children }) {
  const root=useRef(null)
  const content=pageContent[collection]
  useEffect(() => {
    const media=gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)',() => {
      const scope=gsap.context(() => {
        gsap.utils.toArray('[data-page-media]').forEach(figure => {
          const mask=figure.querySelector('.image-page-image-mask')
          gsap.fromTo(mask,{clipPath:'inset(8% 0 10% 0)',y:24,rotateY:3,transformPerspective:1400},
            {clipPath:'inset(0% 0 0% 0)',y:0,rotateY:0,duration:1.2,ease:'power3.out',scrollTrigger:{trigger:figure,start:'top 91%',once:true}})
          if (!figure.classList.contains('is-diagram')) gsap.fromTo(figure.querySelector('img'),{scale:1.08,yPercent:3},
            {scale:1.02,yPercent:-3,ease:'none',scrollTrigger:{trigger:figure,start:'top bottom',end:'bottom top',scrub:.8}})
        })
        gsap.utils.toArray('.page-feature-copy,.editorial-section-head').forEach(copy => {
          gsap.fromTo(copy,{opacity:0,y:18,filter:'blur(2px)'},{opacity:1,y:0,filter:'blur(0px)',duration:.9,
            scrollTrigger:{trigger:copy,start:'top 91%',once:true}})
        })
      },root)
      return () => scope.revert()
    })
    return () => media.revert()
  },[collection])
  const earlyProcess=collection==='career' || collection==='events'
  return <main ref={root} className={`image-page image-page--${collection}`}>
    <CinematicHero title={title} content={content}/>
    {collection==='story' && <StoryConstruction/>}
    {collection==='connect' && <ProjectEnquiry/>}
    {earlyProcess && <PageProcess content={content}/>}
    {collection!=='story' && <ArchitecturalStudy collection={collection}/>}
    {children}
    <PageFeatures content={content} collection={collection}/>
    {collection==='story' && <ArchitecturalStudy collection={collection}/>}
    {!earlyProcess && <PageProcess content={content}/>}
    <PageQuestions content={content}/>
    <PageClosing content={content}/>
  </main>
}
