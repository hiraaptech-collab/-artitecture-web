import { Component, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { MathUtils, Vector3 } from 'three'
import gsap from 'gsap'
import ArchitecturalModel from '../home3d/ArchitecturalModel'
import ConstructionWorkers from './ConstructionWorkers'

function SiteDetails({ progress }) {
  const supplies=useRef(null),ladder=useRef(null)
  useFrame(() => { supplies.current.visible=progress.current>.08 && progress.current<.93; ladder.current.visible=progress.current>.32 && progress.current<.94 })
  return <>
    <group ref={supplies} visible={false} position={[4.15,.03,2.25]}>
      {Array.from({length:12},(_,i) => <mesh key={i} position={[(i%3)*.28,Math.floor(i/6)*.2,.3*Math.floor((i%6)/3)]} castShadow><boxGeometry args={[.25,.18,.25]}/><meshStandardMaterial color="#ad8061"/></mesh>)}
    </group>
    <group ref={ladder} visible={false} position={[3.55,0,-.4]} rotation={[0,0,-.15]}>
      {[-.25,.25].map(x => <mesh key={x} position={[x,1.6,0]}><boxGeometry args={[.065,3.2,.07]}/><meshStandardMaterial color="#89725b"/></mesh>)}
      {Array.from({length:10},(_,i) => <mesh key={i} position={[0,.22+i*.29,0]}><boxGeometry args={[.55,.055,.07]}/><meshStandardMaterial color="#b49b7c"/></mesh>)}
    </group>
  </>
}
function ConstructionWorld({ progress, reduced }) {
  const houseProgress=useRef(0)
  const invalidate=useThree(state => state.invalidate)
  const target=useMemo(() => new Vector3(0,1.35,0),[])
  useEffect(() => {
    let previous=-1,last=0
    const tick=() => {
      const now=performance.now(),p=progress.current
      // Render moving makers at 30 fps only while the visible story is being built.
      if (p!==previous || (!reduced && p>.035 && p<.96 && now-last>32 && !document.hidden)) {
        previous=p;last=now;invalidate()
      }
    }
    gsap.ticker.add(tick); invalidate()
    return () => gsap.ticker.remove(tick)
  },[progress,reduced,invalidate])
  useFrame(({camera,size}) => {
    const p=progress.current
    // Hold the completed roof until the openings chapter, then develop the interior.
    const anchors=[[0,0],[.1,0],[.22,1/12],[.42,4/12],[.5,5/12],[.62,5/12],[.78,7/12],[.9,10/12],[1,1]]
    const interval=anchors.findIndex((point,index) => index<anchors.length-1 && p>=point[0] && p<=anchors[index+1][0])
    const a=anchors[Math.max(0,interval)],b=anchors[Math.max(0,interval)+1]
    houseProgress.current=MathUtils.lerp(a[1],b[1],MathUtils.clamp((p-a[0])/(b[0]-a[0]),0,1))
    const aspect=size.width/Math.max(1,size.height)
    const vfov=MathUtils.degToRad(camera.fov),hfov=2*Math.atan(Math.tan(vfov/2)*aspect)
    const distance=(7.2-p*.5)/Math.sin(Math.min(vfov,hfov)/2)*(1.12-p*.07)
    const angle=.32+p*.65, elevation=.5-p*.12
    camera.position.set(Math.sin(angle)*Math.cos(elevation)*distance,target.y+Math.sin(elevation)*distance,Math.cos(angle)*Math.cos(elevation)*distance)
    camera.lookAt(target)
  },-1)
  return <>
    <ambientLight intensity={.65}/><hemisphereLight args={['#fff1d9','#ad9479',1.6]}/>
    <directionalLight position={[-5,10,7]} intensity={2.2} castShadow shadow-mapSize={[1024,1024]} shadow-camera-left={-9} shadow-camera-right={9} shadow-camera-top={9} shadow-camera-bottom={-9} shadow-normalBias={.04}/>
    <Environment frames={1} resolution={64}><Lightformer color="#fff0d9" intensity={2} position={[0,7,0]} rotation={[Math.PI/2,0,0]} scale={[12,12,1]}/></Environment>
    <ArchitecturalModel progress={houseProgress}/>
    <ConstructionWorkers progress={progress} reduced={reduced}/>
    <SiteDetails progress={progress}/>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.36,0]} receiveShadow><planeGeometry args={[80,80]}/><shadowMaterial opacity={.15}/></mesh>
  </>
}
function Fallback() { return <div className="spatial-loading">This construction scene needs WebGL. Follow the seven design chapters with the controls and explore the architectural references below.</div> }
class ConstructionBoundary extends Component {
  state={failed:false}
  static getDerivedStateFromError() {return {failed:true}}
  render() {return this.state.failed ? <Fallback/> : this.props.children}
}
export default function ConstructionScene(props) {
  return <ConstructionBoundary><Canvas onCreated={props.onReady} shadows frameloop="demand" dpr={[1,1.5]} camera={{fov:42,near:.1,far:140}} gl={{alpha:true,antialias:true}} fallback={<Fallback/>}>
    <ConstructionWorld {...props}/>
  </Canvas></ConstructionBoundary>
}
