import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { stageProgress } from './sequence'

function Block({ position, size, color = '#e4d9c9', glass = false, rounded = false }) {
  const material = glass
    ? <meshPhysicalMaterial color="#cbd8d1" roughness={0.08} metalness={0.1} transparent opacity={0.28} depthWrite={false} clearcoat={1} />
    : <meshStandardMaterial color={color} roughness={0.78} />
  return rounded ? (
    <RoundedBox position={position} args={size} radius={0.045} smoothness={2} castShadow receiveShadow>{material}</RoundedBox>
  ) : (
    <mesh position={position} castShadow={!glass} receiveShadow>
      <boxGeometry args={size} />{material}
    </mesh>
  )
}

function BuildStage({ stage, progress, children }) {
  const group = useRef()
  useFrame(() => {
    const amount = stageProgress(progress.current, stage)
    group.current.visible = amount > 0.001
    group.current.scale.y = Math.max(0.001, amount)
  })
  return <group ref={group} visible={false}>{children}</group>
}

function InteriorLight({ progress }) {
  const light = useRef()
  const strip = useRef()
  const stripMesh = useRef()
  useFrame(() => {
    const amount = stageProgress(progress.current, 10)
    light.current.intensity = amount * 18
    strip.current.emissiveIntensity = amount * 2.5
    stripMesh.current.visible = amount > 0.001
  })
  return <>
    <pointLight ref={light} position={[0.2, 2.2, 0.6]} color="#ffd2a0" intensity={0} distance={8} />
    <mesh ref={stripMesh} visible={false} position={[0, 2.8, 1.85]}>
      <boxGeometry args={[5.6, 0.03, 0.04]} />
      <meshStandardMaterial ref={strip} color="#dfc5a0" emissive="#ffc778" emissiveIntensity={0} />
    </mesh>
  </>
}

function Tree({ position, scale = 1 }) {
  return <group position={position} scale={scale}>
    <mesh position={[0, 0.85, 0]} castShadow>
      <cylinderGeometry args={[0.055, 0.1, 1.7, 10]} />
      <meshStandardMaterial color="#77604a" />
    </mesh>
    {[[-0.22, 1.7, 0], [0.2, 2, 0.1], [0, 2.3, -0.12]].map((p, i) => (
      <mesh key={i} position={p} scale={[1, 0.8, 0.85]} castShadow>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial color={i === 1 ? '#7c876c' : '#64725c'} roughness={1} />
      </mesh>
    ))}
  </group>
}

function PavilionDoor({ progress }) {
  const door = useRef()
  useFrame(() => { door.current.rotation.y = -stageProgress(progress.current, 8) * Math.PI * .45 })
  return <group ref={door} position={[1.575, .3, 2]}>
    <Block position={[.625, 1.1, 0]} size={[1.25, 2.2, .09]} color="#80604a" />
    <Block position={[.195, 1.05, .07]} size={[.025, .35, .045]} color="#c9aa76" />
  </group>
}

// The original pavilion, enriched with joinery, a terrace and a second roof plane.
export default function ArchitecturalModel({ progress }) {
  return <group>
    <Block position={[0, -0.2, 0]} size={[10, 0.3, 8]} color="#d6cbb9" rounded />
    <BuildStage stage={1} progress={progress}>
      <Block position={[0, 0.12, 0]} size={[6.4, 0.24, 4.8]} color="#ab9580" />
      <Block position={[0.35, 0.04, 2.65]} size={[5.4, 0.08, 1.1]} color="#c4b39d" />
    </BuildStage>
    <BuildStage stage={2} progress={progress}>
      {[-2.9, -1.6, 1.5, 2.9].map((x) => (
        <Block key={x} position={[x, 1.5, 2]} size={[0.1, 2.6, 0.12]} color="#654c40" />
      ))}
      <Block position={[0, 2.8, 2]} size={[6, 0.18, 0.2]} color="#654c40" />
      <Block position={[0, 2.8, -2]} size={[6, 0.18, 0.2]} color="#654c40" />
    </BuildStage>
    <BuildStage stage={3} progress={progress}>
      <Block position={[0, 1.5, -2]} size={[6, 2.6, 0.18]} />
      <Block position={[-2.9, 1.5, 0]} size={[0.2, 2.6, 4]} />
      <Block position={[2.9, 1.5, -0.9]} size={[0.2, 2.6, 2.2]} />
      <Block position={[-2.35, 1.5, 2]} size={[1.3, 2.6, 0.18]} />
      {Array.from({ length: 9 }, (_, i) => (
        <Block key={i} position={[-2.35 + i * 0.14, 1.5, 2.11]} size={[0.025, 2.55, 0.025]} color="#c9bba8" />
      ))}
    </BuildStage>
    <BuildStage stage={4} progress={progress}>
      <Block position={[0, 0.3, 0]} size={[6, 0.12, 4]} color="#cbb398" />
      {Array.from({ length: 13 }, (_, i) => (
        <Block key={i} position={[-2.7 + i * 0.43, 0.345, 0]} size={[0.012, 0.012, 3.9]} color="#b19c84" />
      ))}
    </BuildStage>
    <BuildStage stage={5} progress={progress}>
      <Block position={[0, 2.95, 0]} size={[6.7, 0.22, 4.7]} color="#6b5145" />
      <Block position={[-1.95, 3.11, -0.25]} size={[2.5, 0.1, 4.25]} color="#d3c4b0" />
      {Array.from({ length: 10 }, (_, i) => (
        <Block key={i} position={[0.1 + i * 0.29, 3.08, -0.1]} size={[0.06, 0.08, 4.2]} color="#80644e" />
      ))}
    </BuildStage>
    <BuildStage stage={6} progress={progress}>
      <Block position={[-0.05, 1.55, 2]} size={[3, 2.45, 0.035]} glass />
      <Block position={[2.9, 1.55, 1.1]} size={[0.035, 2.45, 1.8]} glass />
      <Block position={[-0.05, 0.35, 2.025]} size={[3.1, 0.04, 0.06]} color="#483b32" />
      <Block position={[-0.05, 2.75, 2.025]} size={[3.1, 0.04, 0.06]} color="#483b32" />
      <Block position={[-0.05, 1.55, 2.025]} size={[0.045, 2.45, 0.06]} color="#483b32" />
    </BuildStage>
    <BuildStage stage={7} progress={progress}>
      <PavilionDoor progress={progress} />
    </BuildStage>
    <BuildStage stage={8} progress={progress}>
      <Block position={[-0.4, 1.35, -0.8]} size={[0.12, 2.1, 2.2]} color="#bd9c7b" />
      <Block position={[1.4, 0.7, -1.5]} size={[2.2, 0.7, 0.65]} color="#80604a" />
      <Block position={[1.4, 1.07, -1.5]} size={[2.25, 0.05, 0.7]} color="#ede1d0" />
    </BuildStage>
    <BuildStage stage={9} progress={progress}>
      <Block position={[-1.5, 0.6, 0.3]} size={[1.8, 0.5, 0.8]} color="#ad8274" rounded />
      <Block position={[-1.5, 0.95, -0.05]} size={[1.8, 0.4, 0.18]} color="#ad8274" rounded />
      <Block position={[-1.1, 0.55, 1.15]} size={[1, 0.25, 0.55]} color="#6b5145" rounded />
      <Block position={[-1.4, 0.37, 0.8]} size={[2.3, 0.025, 1.8]} color="#e4d6c4" />
    </BuildStage>
    <InteriorLight progress={progress} />
    <BuildStage stage={11} progress={progress}>
      <Tree position={[-3.9, 0, -1.8]} />
      <Tree position={[3.9, 0, -1.8]} scale={0.85} />
      <Tree position={[-4, 0, 1.5]} scale={0.65} />
      <Block position={[0, 0, 3.1]} size={[2.2, 0.08, 1.7]} color="#eee4d5" />
      <Block position={[3.4, 0, 1.3]} size={[0.55, 0.05, 3]} color="#828570" />
      {Array.from({ length: 5 }, (_, i) => (
        <Block key={i} position={[2.6, 0.05, 2.55 + i * 0.25]} size={[1.45, 0.06, 0.16]} color="#b6a38e" />
      ))}
    </BuildStage>
  </group>
}

