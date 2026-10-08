import { Component, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'

// A light entrance study, deliberately separate from the larger page scenes.
function Entrance({ progress, reduced, onReady }) {
  const frame = useRef(null)
  const ready = useRef(false)
  const invalidate = useThree((state) => state.invalidate)
  useEffect(() => {
    let previous = -1
    const tick = () => { if (previous !== progress.current) { previous = progress.current; invalidate() } }
    gsap.ticker.add(tick)
    invalidate()
    return () => gsap.ticker.remove(tick)
  }, [progress, invalidate])
  useFrame(({ camera, size }) => {
    const p = reduced ? .5 : progress.current
    const angle = .3 + p * .18
    const radius = Math.max(12, 10 / Math.max(size.width / size.height, .4))
    camera.position.set(Math.sin(angle) * radius, 5 - p * .35, Math.cos(angle) * radius)
    camera.lookAt(0, 1.5, 0)
    frame.current.rotation.y = -.09 + p * .12
    if (!ready.current) { ready.current = true; onReady() }
  })
  return <>
    <ambientLight intensity={1.3} /><directionalLight position={[-3,7,5]} intensity={2} color="#ffefd8" />
    <group ref={frame}>
      {[-2,2].map(x => <mesh key={x} position={[x,2,0]}>
        <boxGeometry args={[.16,4,.18]} /><meshStandardMaterial color="#f6e8d0" transparent opacity={.45} />
      </mesh>)}
      <mesh position={[0,4,0]}><boxGeometry args={[4.2,.16,.24]} /><meshStandardMaterial color="#f6e8d0" transparent opacity={.45} /></mesh>
      {[-1.1,1.1].map(z => <mesh key={z} position={[0,4,z]}>
        <boxGeometry args={[4.2,.04,.045]} /><meshStandardMaterial color="#f6e8d0" transparent opacity={.32} />
      </mesh>)}
      <mesh position={[0,-.1,0]}><boxGeometry args={[5.3,.08,3.3]} /><meshStandardMaterial color="#ead6b5" transparent opacity={.13} depthWrite={false} /></mesh>
      {[-.8,-.4,0,.4,.8].map(z => <mesh key={z} position={[0,4.02,z]}><boxGeometry args={[4.2,.025,.028]} /><meshStandardMaterial color="#f6e8d0" transparent opacity={.32} /></mesh>)}
    </group>
  </>
}
class EntryBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}
export default function EntryScene(props) {
  return <EntryBoundary><Canvas frameloop="demand" dpr={[1,1.25]} camera={{fov:42,near:.1,far:60,position:[3,5,12]}}
    gl={{alpha:true,antialias:true}} fallback={null}><Entrance {...props} /></Canvas></EntryBoundary>
}
