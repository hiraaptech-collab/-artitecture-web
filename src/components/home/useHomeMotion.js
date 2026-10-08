import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useHomeMotion(root) {
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const scope = gsap.context(() => {
        gsap.fromTo('.hero-reveal', { y: 24, opacity: 0, filter: 'blur(5px)', clipPath: 'inset(100% 0 0 0)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', clipPath: 'inset(0% 0 0 0)', duration: 1.3, stagger: 0.13, ease: 'power3.out', delay: 0.15 })
        gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
          gsap.fromTo(group.querySelectorAll('[data-reveal]'), { y: 35, opacity: 0, filter: 'blur(3px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, stagger: 0.14, ease: 'power3.out',
              scrollTrigger: { trigger: group, start: 'top 86%', toggleActions: 'play none none none' } })
        })
        gsap.utils.toArray('.editorial-media').forEach((mediaElement, index) => {
          gsap.fromTo(mediaElement, { clipPath: 'inset(14% 8% 14% 8%)', y: 45 },
            { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 1.5, ease: 'power3.out',
              scrollTrigger: { trigger: mediaElement, start: 'top 88%' } })
          gsap.fromTo(mediaElement.querySelector('img'), { filter: 'blur(3px)' },
            { filter: 'blur(0px)', duration: 1.3, ease: 'power2.out', scrollTrigger: { trigger: mediaElement, start: 'top 88%' } })
          gsap.fromTo(mediaElement.querySelector('img'), { scale: 1.12, yPercent: 5, xPercent: index % 2 ? -2 : 2 },
            { scale: 1.02, yPercent: -4, xPercent: 0, ease: 'none',
              scrollTrigger: { trigger: mediaElement, start: 'top bottom', end: 'bottom top', scrub: 1 } })
        })
        gsap.utils.toArray('.principle').forEach((item, index) => {
          gsap.fromTo(item.querySelector('.principle-word'), { x: index % 2 ? 35 : -35, opacity: 0.2 },
            { x: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: item, start: 'top 85%', end: 'top 40%', scrub: 0.8 } })
        })
        const story = root.current.querySelector('.image-story')
        const layers = gsap.utils.toArray('.story-layer')
        const captions = gsap.utils.toArray('.story-caption')
        gsap.set(layers.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set(captions.slice(1), { autoAlpha: 0 })
        const timeline = gsap.timeline({ scrollTrigger: { trigger: story, start: 'top top+=92', end: 'bottom bottom', scrub: 0.8, invalidateOnRefresh: true } })
        layers.forEach((layer, i) => {
          timeline.fromTo(layer.querySelector('img'), { scale: 1.12 }, { scale: 1, duration: 1.4, ease: 'none' }, i)
          if (i > 0) {
            timeline.to(layer, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power2.inOut' }, i)
            timeline.to(captions[i - 1], { autoAlpha: 0, y: -12, duration: 0.25 }, i)
            timeline.fromTo(captions[i], { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6 }, i + 0.3)
          }
        })
      }, root)
      return () => scope.revert()
    })
    return () => media.revert()
  }, [root])
}

