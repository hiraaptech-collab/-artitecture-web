import { Suspense, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Image } from '@react-three/drei'
import { MathUtils } from 'three'
import { architectureImages } from '../../data/architectureImages'

const stone = '#ded0ba', timber = '#80624c', bronze = '#6a4e40'
export function Box({ at = [0,0,0], size = [1,1,1], color = stone, glass = false, ...props }) {
  return <mesh position={at} castShadow={!glass} receiveShadow {...props}>
    <boxGeometry args={size} />
    {glass ? <meshPhysicalMaterial color="#b5c9c1" transparent opacity={.32} roughness={.14} metalness={.12} depthWrite={false} />
      : <meshStandardMaterial color={color} roughness={.76} />}
  </mesh>
}
function Column({ at, height = 3, radius = .12, color = stone }) {
  return <mesh position={at} castShadow receiveShadow><cylinderGeometry args={[radius,radius,height,16]} /><meshStandardMaterial color={color} roughness={.8} /></mesh>
}
function Plant({ at, scale = 1 }) {
  return <group position={at} scale={scale}>
    <Column at={[0,.65,0]} height={1.3} radius={.05} color={timber} />
    <mesh position={[0,1.65,0]} scale={[1,.85,1]} castShadow><icosahedronGeometry args={[.65,1]} /><meshStandardMaterial color="#78856a" roughness={1} /></mesh>
    <Box at={[0,.15,0]} size={[.6,.3,.6]} color="#b6a48b" />
  </group>
}
function Reveal({ progress, start = 0, end = .8, children }) {
  const group = useRef(null)
  useFrame(() => {
    const amount = MathUtils.smoothstep(progress.current, start, end)
    group.current.scale.y = Math.max(.001, amount)
    group.current.visible = amount > .001
  })
  return <group ref={group}>{children}</group>
}
function Base({ size = [9,.18,7] }) { return <Box at={[0,-.15,0]} size={size} color="#c3b298" /> }

function Colonnade({ progress, controls }) {
  const roof = useRef(null)
  useFrame(() => { roof.current.position.y = controls.current.detail * 1.2 })
  return <group><Base />
    {Array.from({length:7},(_,i) => <Reveal key={i} progress={progress} start={i*.07} end={.3+i*.07}>
      {[-2,2].map(z => <Column key={z} at={[-3+i,1.6,z]} height={3.2} radius={.16} />)}
      <Box at={[-3+i,3.24,0]} size={[.4,.26,4.6]} color={timber} />
    </Reveal>)}
    <group ref={roof}><Reveal progress={progress} start={.55} end={.9}><Box at={[0,3.5,0]} size={[7.4,.12,4.7]} glass /></Reveal></group>
    <Box at={[0,.01,0]} size={[5.9,.04,2.6]} color="#96a69b" />
    <Plant at={[-3.8,0,-2.6]} /><Plant at={[3.8,0,2.6]} scale={.8} />
  </group>
}
function Studio({ progress, controls }) {
  const canopy = useRef(null)
  useFrame(() => { canopy.current.position.y = controls.current.detail * 1.1 })
  return <group><Base /><Box at={[0,.04,0]} size={[7.8,.12,5.8]} />
    <Box at={[0,1.6,-2.6]} size={[7.7,3.2,.16]} color="#e5d9c8" />
    <Box at={[-3.8,1.6,0]} size={[.15,3.2,5.4]} />
    <Reveal progress={progress} end={.45}><Box at={[0,.95,0]} size={[4.2,.14,1.6]} color={timber} />
      {[-1.6,1.6].map(x => <Box key={x} at={[x,.45,0]} size={[.12,.9,1.3]} color={bronze} />)}</Reveal>
    {[-1.3,0,1.3].map((x,i) => <Reveal key={x} progress={progress} start={.1+i*.15} end={.55+i*.15}>
      {[-1.3,1.3].map(z => <group key={z}><Box at={[x,.42,z]} size={[.65,.16,.65]} color="#a67e69" />
        <Box at={[x,.8,z*1.2]} size={[.65,.72,.1]} color="#a67e69" />
        <Column at={[x,.18,z]} height={.36} radius={.08} color={bronze} /></group>)}</Reveal>)}
    <group ref={canopy}><Box at={[0,3.3,-.7]} size={[8.1,.16,3.4]} color={timber} /></group>
    <Plant at={[3.25,0,-1.8]} /><Plant at={[-3.1,0,1.9]} />
    <Column at={[0,2.5,0]} height={1.2} radius={.035} color={bronze} />
    <mesh position={[0,1.85,0]}><sphereGeometry args={[.22,16,12]} /><meshStandardMaterial color="#fff3d2" emissive="#ffe1ac" emissiveIntensity={.5} /></mesh>
  </group>
}
function Residence({ progress, controls }) {
  const upper = useRef(null)
  useFrame(() => { upper.current.position.y = controls.current.detail * 1.5 })
  return <group><Base size={[10,.2,8]} />
    <Reveal progress={progress} end={.28}><Box at={[0,.08,0]} size={[7,.2,5.6]} color={timber} />
      <Box at={[-2.8,1.45,0]} size={[.25,2.7,4.6]} /><Box at={[0,1.45,-2.3]} size={[5.9,2.7,.2]} />
      <Box at={[.3,1.45,2.3]} size={[5.8,2.7,.04]} glass />
      {[-2.5,-.5,1.5,3].map(x => <Box key={x} at={[x,1.45,2.35]} size={[.055,2.7,.08]} color={bronze} />)}
      <Box at={[0,2.95,0]} size={[6.7,.22,5.3]} /></Reveal>
    <group ref={upper}><Reveal progress={progress} start={.2} end={.68}>
      <Box at={[-1.1,4,-.4]} size={[4.5,1.9,.045]} glass />
      <Box at={[-1.1,4,-1.6]} size={[4.5,1.9,.18]} />
      <Box at={[-3.25,4,-.9]} size={[.16,1.9,1.5]} />
      <Box at={[-1.1,5,-.85]} size={[4.9,.16,2.5]} color={timber} />
      {Array.from({length:10},(_,i) => <Box key={i} at={[1.6,3.95,-1.45+i*.24]} size={[.08,2.05,.07]} color={timber} />)}
    </Reveal></group>
    <Reveal progress={progress} start={.6} end={1}><Box at={[1.7,.02,3.1]} size={[4,.05,1.25]} color="#89a9a4" />
      <Plant at={[-4.1,0,-2.7]} /><Plant at={[4.1,0,1]} /><Plant at={[-4,0,2]} scale={.65} /></Reveal>
  </group>
}
function Module({ at, index, progress, controls }) {
  const group = useRef(null)
  useFrame(() => {
    const amount = (1-MathUtils.smoothstep(progress.current,.05,.85))*.95+controls.current.detail
    group.current.position.set(at[0]*(1+amount*.3),at[1]+amount*(index%2?.7:1.6),at[2]*(1+amount*.4))
    group.current.rotation.y = amount*(index%2?.12:-.12)
  })
  return <group ref={group}>
    <Box at={[0,1,0]} size={[1.7,2,.09]} glass />
    {[-.9,.9].map(x => <Box key={x} at={[x,1,0]} size={[.1,2.1,.12]} color={timber} />)}
    <Box at={[0,2.08,0]} size={[2,.14,1.6]} /><Box at={[0,-.01,0]} size={[2,.12,1.6]} />
  </group>
}
function Framework(props) {
  return <group><Base size={[8,.18,6]} />
    {Array.from({length:6},(_,i) => <Module key={i} at={[(i%3-1)*2.2,Math.floor(i/3)*2.3,0]} index={i} {...props} />)}
    <Plant at={[-3.1,0,2.1]} /><Plant at={[3.1,0,-2.1]} />
  </group>
}
function Threshold({ progress, controls, onExplore }) {
  const door = useRef(null), glow = useRef(null)
  useFrame(() => {
    const amount = Math.max(MathUtils.smoothstep(progress.current,.25,.8),controls.current.detail)
    door.current.rotation.y = -amount*Math.PI*.62
    glow.current.intensity = 4+amount*12
  })
  return <group><Base size={[8,.18,7]} /><Box at={[0,.04,-.5]} size={[6.5,.1,5.5]} />
    <Box at={[0,1.7,-2.9]} size={[6.5,3.4,.18]} /><Box at={[-3.1,1.7,-.4]} size={[.18,3.4,5]} />
    <Box at={[-2.1,1.7,2.1]} size={[2.2,3.4,.22]} /><Box at={[2.1,1.7,2.1]} size={[2.2,3.4,.22]} />
    <Box at={[0,3.25,2.1]} size={[2, .3,.25]} />
    <group ref={door} position={[-1,0,2.12]} onClick={(event) => { event.stopPropagation(); onExplore?.() }}
      onPointerOver={() => { document.body.style.cursor='pointer' }} onPointerOut={() => { document.body.style.cursor='' }}>
      <Box at={[.95,1.5,0]} size={[1.9,3,.12]} color={timber} />
      <Box at={[1.7,1.5,.1]} size={[.05,.45,.06]} color="#cfac6d" />
      {Array.from({length:12},(_,i) => <Box key={i} at={[.1+i*.15,1.5,.07]} size={[.022,2.95,.025]} color="#98765a" />)}
    </group>
    <Box at={[1.5,.45,-1.5]} size={[2.1,.65,.85]} color="#b7907a" /><Box at={[1.5,.85,-1.8]} size={[2.1,.45,.18]} color="#b7907a" />
    <Box at={[.9,.35,-.2]} size={[1.2,.2,.7]} color={timber} /><Box at={[1,.11,-.7]} size={[2.8,.025,2.6]} color="#eee1cc" />
    <Plant at={[-2.5,0,-2.2]} /><Plant at={[3.2,0,2.8]} />
    <pointLight ref={glow} position={[0,2.6,-.8]} color="#ffd6a0" distance={8} />
  </group>
}
function Amphitheatre({ progress }) {
  return <group><Base size={[10,.2,9]} />
    <mesh position={[0,.15,0]} receiveShadow><cylinderGeometry args={[1.2,1.2,.3,48]} /><meshStandardMaterial color={timber} roughness={.7} /></mesh>
    {[2,2.8,3.6].map((r,i) => <Reveal key={r} progress={progress} start={i*.18} end={.45+i*.18}>
      {Array.from({length:22},(_,j) => {
        const angle=.2+j/21*Math.PI*1.65
        return <group key={j} position={[Math.cos(angle)*r,.22+i*.32,Math.sin(angle)*r]} rotation={[0,-angle,0]}>
          <Box size={[.62,.35,.7]} color={i%2? '#cfbba0':stone} /><Box at={[0,.25,0]} size={[.6,.09,.65]} color={timber} />
        </group>
      })}
    </Reveal>)}
    <Reveal progress={progress} start={.55} end={.95}>
      <Column at={[-3.8,2,-2.5]} height={4} radius={.08} color={bronze} />
      <Column at={[3.8,2,-2.5]} height={4} radius={.08} color={bronze} />
      <Box at={[0,4,-2.5]} size={[7.8,.16,1.4]} color={timber} />
    </Reveal>
  </group>
}
function Photograph({ image }) {
  const ratio = image.width/image.height
  return <Suspense fallback={<Box at={[0,0,.065]} size={[Math.min(1.5,ratio*2.2),2.2,.025]} color="#c5b197" />}>
    <Image url={image.src} position={[0,0,.075]} scale={[Math.min(1.5,ratio*2.2),2.2]} toneMapped />
  </Suspense>
}
function Gallery({ progress, controls }) {
  return <group><Base size={[10,.18,6]} />
    {['linear-lounge','timber-facade','double-height-lounge','geometric-pendant-lounge'].map((id,i) =>
      <GalleryPanel key={id} image={architectureImages[id]} index={i} progress={progress} controls={controls} />)}
    <Box at={[0,.03,0]} size={[8.8,.05,.18]} color={bronze} />
  </group>
}
function GalleryPanel({ image, index, progress, controls }) {
  const group = useRef(null)
  useFrame(() => {
    const p=progress.current
    group.current.rotation.y = (1-p)*(.35-index*.12) + controls.current.detail*.15
    group.current.position.set((index-1.5)*2.15,1.6+Math.sin((p+index*.12)*Math.PI)*.2,(index%2?-.55:.55)*(1-controls.current.detail))
  })
  return <group ref={group}>
    <Box size={[1.8,2.7,.1]} color={timber} /><Photograph image={image} />
    <Column at={[0,-.92,-.05]} height={1.35} radius={.055} color={bronze} />
  </group>
}
function Tower({ progress, controls }) {
  return <group><Base size={[7,.18,7]} />
    {Array.from({length:12},(_,i) => <TowerLevel key={i} index={i} progress={progress} controls={controls} />)}
    <mesh position={[0,5.6,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.72,.035,8,48]} />
      <meshStandardMaterial color="#bd965c" metalness={.65} roughness={.28} /></mesh>
  </group>
}
function TowerLevel({ index, progress, controls }) {
  const group=useRef(null)
  useFrame(() => {
    const amount=MathUtils.smoothstep(progress.current,index*.045,.4+index*.045)
    group.current.scale.setScalar(Math.max(.001,amount))
    group.current.position.y=index*.42+controls.current.detail*index*.045
    group.current.rotation.y=index*.14+controls.current.detail*.25
  })
  return <group ref={group}><Box at={[0,.1,0]} size={[2.5,.18,2.5]} color={index%2? '#c6b094':stone} />
    {[-.82,.82].map(x => [-.82,.82].map(z => <Column key={x+':'+z} at={[x,.31,z]} height={.32} radius={.045} color={bronze} />))}
  </group>
}
function SectionLayer({ index, progress, controls }) {
  const group=useRef(null)
  useFrame(() => {
    const separation=MathUtils.smoothstep(progress.current,.12,.85)*.8+controls.current.detail*.8
    group.current.position.y = index*1.1+index*separation
    group.current.rotation.y = separation*(index-1)*.035
  })
  return <group ref={group}>
    <Box at={[0,.1,0]} size={[5,.18,3.9]} color={index===2?timber:stone} />
    {index<2 && <><Box at={[-2.3,.58,-.1]} size={[.16,.85,3.7]} />
      <Box at={[0,.58,-1.7]} size={[4.6,.85,.15]} />
      <Box at={[0,.58,1.7]} size={[4.6,.85,.03]} glass />
      <Box at={[.6,.38,-.5]} size={[1.5,.4,.65]} color="#ab866b" /></>}
    {index===2 && Array.from({length:12},(_,i)=><Box key={i} at={[-2.2+i*.4,.24,0]} size={[.08,.12,3.7]} color="#a78665" />)}
  </group>
}
function Section(props) { return <group><Base size={[8,.18,6]} />{[0,1,2].map(i=><SectionLayer key={i} index={i} {...props} />)}</group> }

export default function StudyModels({ study, ...props }) {
  const models = { colonnade: Colonnade, studio: Studio, residence: Residence, framework: Framework, threshold: Threshold,
    amphitheatre: Amphitheatre, gallery: Gallery, tower: Tower, section: Section }
  const Model = models[study.model]
  return <Model {...props} />
}
