import { Component, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, RoundedBox } from '@react-three/drei'
import { Color, MathUtils, Vector3 } from 'three'
import gsap from 'gsap'
import ArchitecturalModel from './ArchitecturalModel'

function SceneInvalidation({ progress, turn }) {
  const invalidate = useThree((state) => state.invalidate)
  useEffect(() => {
    let previous = -1
    const tick = () => {
      const value = progress.current + (turn?.current || 0)
      if (value !== previous) { previous = value; invalidate() }
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [progress, turn, invalidate])
  return null
}

function CameraRig({ progress, variant, turn }) {
  const target = useMemo(() => new Vector3(0, 1, 0), [])
  useFrame(({ camera, size }) => {
    const p = progress.current
    const showcase = variant === 'showcase'
    // Remain on the glazed side of the pavilion throughout the orbit.
    const baseAngle = showcase ? 0.6 + p * 0.65 : variant === 'final' ? 0.85 + p * 0.35 : 0.58 + p * 0.72
    const angle = baseAngle + (turn?.current || 0)
    const aspect = size.width / size.height
    const portrait = aspect < 1
    const framingRadius = Math.max(portrait ? 16.5 : 12.5, 16 / Math.max(aspect, 0.45))
    const radius = framingRadius - p * (showcase ? 1 : 2)
    camera.position.set(Math.cos(angle) * radius, 7.5 - p * 2.6, Math.sin(angle) * radius)
    target.set(0, showcase ? 1.2 : 0.9, 0)
    camera.lookAt(target)
  })
}

function Portico({ progress }) {
  const group = useRef()
  useFrame(() => {
    group.current.rotation.y = -0.12 + progress.current * 0.24
    group.current.position.y = Math.sin(progress.current * Math.PI) * 0.12
  })
  return <group ref={group}>
    <RoundedBox args={[7.5, 0.3, 5]} position={[0, 0, 0]} radius={0.05} smoothness={2} receiveShadow>
      <meshStandardMaterial color="#c3af93" roughness={0.85} />
    </RoundedBox>
    {[-2.6, -1.3, 0, 1.3, 2.6].map((x, i) => (
      <group key={x} position={[x, 0, 0]}>
        {[-1.6, 1.6].map((z) => (
          <mesh key={z} position={[0, 1.5, z]} castShadow receiveShadow>
            <cylinderGeometry args={[0.15, 0.19, 2.8, 16]} />
            <meshStandardMaterial color="#e2d5bf" roughness={0.8} />
          </mesh>
        ))}
        <mesh position={[0, 3, 0]} castShadow>
          <boxGeometry args={[0.32, 0.3, 4.15]} />
          <meshStandardMaterial color={i % 2 ? '#ad9377' : '#dbceb7'} roughness={0.8} />
        </mesh>
      </group>
    ))}
    <mesh position={[0, 3.21, 0]} receiveShadow>
      <boxGeometry args={[6.2, 0.09, 4.1]} />
      <meshPhysicalMaterial color="#c4d2c5" transparent opacity={0.28} roughness={0.1} depthWrite={false} />
    </mesh>
    <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[5.5, 2.5]} />
      <meshStandardMaterial color="#8b9b93" roughness={0.2} metalness={0.35} />
    </mesh>
  </group>
}

function SceneContent({ progress, variant, turn }) {
  const complete = useMemo(() => ({ current: 1 }), [])
  const building = useRef()
  const sun = useRef()
  const daylight = useMemo(() => new Color('#fff0d9'), [])
  const dusk = useMemo(() => new Color('#ffd4a3'), [])
  useFrame(() => {
    if (variant === 'final') {
      building.current.rotation.y = -0.08 + progress.current * 0.16
      sun.current.intensity = MathUtils.lerp(2.3, 1.3, progress.current)
      sun.current.color.copy(daylight).lerp(dusk, progress.current)
    }
  })
  return <>
    <ambientLight intensity={0.6} />
    <hemisphereLight args={['#fff5e6', '#b19a80', 1.3]} />
    <directionalLight ref={sun} position={[-3, 9, 6]} intensity={2.3} castShadow
      shadow-mapSize={[1024, 1024]} shadow-camera-left={-9} shadow-camera-right={9}
      shadow-camera-top={9} shadow-camera-bottom={-9} shadow-normalBias={0.03} />
    <Environment frames={1} resolution={64}>
      <Lightformer intensity={2} color="#fff3df" position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[10, 10, 1]} />
      <Lightformer intensity={1} color="#d7decd" position={[5, 2, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[5, 4, 1]} />
    </Environment>
    <group ref={building}>
      {variant === 'showcase' ? <Portico progress={progress} /> : <ArchitecturalModel progress={variant === 'final' ? complete : progress} />}
    </group>
    <mesh position={[0, -0.37, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <shadowMaterial opacity={0.16} />
    </mesh>
    <CameraRig progress={progress} variant={variant} turn={turn} /><SceneInvalidation progress={progress} turn={turn} />
  </>
}

function Fallback() {
  return <div className="architecture-fallback">
    <p>The architectural study</p>
    <span>This interactive view needs WebGL. Continue below to explore our spaces.</span>
  </div>
}

class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <Fallback /> : this.props.children }
}

export default function ArchitectureScene({ progress, variant = 'construction', turn, onReady }) {
  return <SceneBoundary>
    <Canvas onCreated={onReady} shadows dpr={[1, 1.5]} camera={{ position: [9, 7, 9], fov: 42, near: 0.1, far: 250 }}
      frameloop="demand"
      gl={{ antialias: true, alpha: true }} fallback={<Fallback />}>
      <SceneContent progress={progress} variant={variant} turn={turn} />
    </Canvas>
  </SceneBoundary>
}

