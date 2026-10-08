import { lazy, Suspense, useEffect, useRef, useState } from 'react'

const ArchitectureScene = lazy(() => import('./ArchitectureScene'))

// Release WebGL contexts outside the viewport rather than running three canvases.
export default function ViewportScene(props) {
  const host = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '150px' })
    observer.observe(host.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={host} className="architecture-canvas" aria-hidden="true">
    {visible && <Suspense fallback={<div className="architecture-fallback">Preparing the architectural study…</div>}>
      <ArchitectureScene {...props} />
    </Suspense>}
  </div>
}

