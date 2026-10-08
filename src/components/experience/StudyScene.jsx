import { Component, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { MathUtils, Vector3 } from 'three'
import gsap from 'gsap'
import StudyModels from './StudyModels'

function CameraAndFrames({ study, progress, controls, reduced, intro }) {
  const invalidate = useThree((state) => state.invalidate)
  const target = useMemo(() => new Vector3(), [])
  useEffect(() => {
    let previous = ''
    const tick = () => {
      const value = [progress.current, controls.current.turn, controls.current.detail].join(':')
      if (value !== previous) { previous = value; invalidate() }
    }
    gsap.ticker.add(tick)
    invalidate()
    return () => { gsap.ticker.remove(tick); document.body.style.cursor = '' }
  }, [progress, controls, invalidate])
  useFrame(({ camera, size }) => {
    const p = reduced ? 1 : progress.current
    const detail = controls.current.detail
    const angle = MathUtils.lerp(study.angle[0], study.angle[1], p) + controls.current.turn
    const aspect = size.width / Math.max(size.height,1)
    // Fit a sphere around each complete composition using the tighter field of view.
    // This also keeps exploded layers inside short landscape and narrow portrait canvases.
    const bounds = {
      colonnade: [1.8, 6.3], studio: [1.8, 6.4], residence: [2.8, 7.2],
      framework: [3, 6.5], threshold: [1.6, 6], amphitheatre: [1.5, 6.5],
      gallery: [1.6, 6], tower: [3, 5.6], section: [3, 6.3],
    }[study.model]
    const verticalFov = MathUtils.degToRad(camera.fov)
    const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * aspect)
    const distance = bounds[1] / Math.sin(Math.min(verticalFov, horizontalFov) / 2) * (1.12 - p * .035)
    const elevation = study.model === 'amphitheatre' ? .58 + detail * .45 : .48 - p * .08
    const orbitRadius = Math.cos(elevation) * distance
    target.set(0, bounds[0] + (study.model === 'residence' ? detail * .4 : 0), study.model === 'threshold' ? -p * .4 : 0)
    camera.position.set(Math.sin(angle) * orbitRadius, target.y + Math.sin(elevation) * distance, target.z + Math.cos(angle) * orbitRadius)
    if (intro) camera.position.sub(target).multiplyScalar(.9).add(target)
    camera.lookAt(target)
  })
  return null
}
function World({ study, progress, controls, reduced, intro, onExplore }) {
  const sun=useRef(null)
  useFrame(() => { sun.current.intensity=2.1-progress.current*.45 })
  return <>
    <ambientLight intensity={.7} /><hemisphereLight args={['#fff3df','#a38d72',1.4]} />
    <directionalLight ref={sun} position={[-4,10,6]} intensity={2.1} castShadow
      shadow-mapSize={[1024,1024]} shadow-camera-left={-9} shadow-camera-right={9}
      shadow-camera-top={9} shadow-camera-bottom={-9} shadow-normalBias={.04} />
    <Environment frames={1} resolution={64}>
      <Lightformer intensity={2} color="#fff3db" position={[0,6,0]} rotation={[Math.PI/2,0,0]} scale={[10,10,1]} />
      <Lightformer intensity={1} color="#cedacc" position={[6,3,0]} rotation={[0,-Math.PI/2,0]} scale={[5,4,1]} />
    </Environment>
    <StudyModels study={study} progress={progress} controls={controls} onExplore={onExplore} />
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.27,0]} receiveShadow><planeGeometry args={[60,60]} /><shadowMaterial opacity={.16} /></mesh>
    <CameraAndFrames study={study} progress={progress} controls={controls} reduced={reduced} intro={intro} />
  </>
}
function Fallback() { return <div className="spatial-loading">The interactive study requires WebGL. Explore the architectural photographs and notes below.</div> }
class SceneBoundary extends Component {
  state={failed:false}
  static getDerivedStateFromError() { return {failed:true} }
  render() { return this.state.failed ? <Fallback /> : this.props.children }
}
export default function StudyScene(props) {
  return <SceneBoundary><Canvas onCreated={props.onReady} shadows frameloop="demand" dpr={[1,1.5]} camera={{fov:42,near:.1,far:100,position:[8,6,10]}}
    gl={{alpha:true,antialias:true,powerPreference:'default'}} fallback={<Fallback />}>
    <World {...props} />
  </Canvas></SceneBoundary>
}
