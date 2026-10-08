import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'

function Part({ position, size, color }) {
  return <mesh position={position} castShadow><boxGeometry args={size}/><meshStandardMaterial color={color} roughness={.85}/></mesh>
}
function Arm({ joint, elbow, side, color, tool }) {
  return <group ref={joint} position={[side*.26,1.27,0]}>
    <Part position={[0,-.17,0]} size={[.13,.34,.14]} color={color}/>
    <group ref={elbow} position={[0,-.34,0]}>
      <Part position={[0,-.13,0]} size={[.1,.26,.11]} color="#c19373"/>
      <mesh position={[0,-.29,0]}><sphereGeometry args={[.07,8,6]}/><meshStandardMaterial color="#c19373"/></mesh>
      {tool && <group position={[0,-.34,.08]}>
        {tool==='brick' ? <Part size={[.42,.18,.22]} color="#a66f50"/> : tool==='screed' ? <>
          <Part size={[.05,.5,.05]} color="#85634a"/><Part position={[0,-.25,0]} size={[.6,.045,.07]} color="#6c7170"/>
        </> : tool==='drill' ? <><Part size={[.19,.13,.3]} color="#6d3844"/><Part position={[0,0,.23]} size={[.035,.04,.2]} color="#747875"/></> : <>
          <Part size={[.045,.32,.045]} color="#956d49"/><Part position={[0,.16,0]} size={[.22,.07,.08]} color="#777b78"/>
        </>}
      </group>}
    </group>
  </group>
}
function Leg({ joint, x }) {
  return <group ref={joint} position={[x,.72,0]}>
    <Part position={[0,-.29,0]} size={[.17,.58,.18]} color="#534b43"/>
    <Part position={[0,-.61,.035]} size={[.19,.13,.28]} color="#3b342d"/>
  </group>
}
function Worker({ role, index, progress, reduced }) {
  const root=useRef(null),body=useRef(null)
  const leftArm=useRef(null),rightArm=useRef(null),leftElbow=useRef(null),rightElbow=useRef(null)
  const leftLeg=useRef(null),rightLeg=useRef(null)
  const colors=['#c99b61','#813e4b','#8b9178','#bf8067']
  useFrame(({clock}) => {
    const p=progress.current, t=reduced ? 0 : clock.elapsedTime
    const arrive=MathUtils.smoothstep(p,.035,.15)
    root.current.visible=p>.035
    if (!root.current.visible) return
    const finished=MathUtils.smoothstep(p,.86,1)
    const walking=p<.15 || (index===1 && p>.2 && p<.64)
    const working=!reduced && p>.14 && p<.91
    const cycle=t*3.2+index*1.8, swing=walking && !reduced ? Math.sin(cycle)*.55 : 0
    const arrivalX=[-6,6,6,-6][index], arrivalZ=[4.5,4.5,0,-1][index]
    let x=[-2.5,2.5,3.35,3.7][index], z=[2.9,3,1.1,-.4][index], y=.01
    if (index===1 && p>.2 && p<.64 && !reduced) { x=2.5+Math.sin(t*.85)*1.1; z=3.1+Math.cos(t*.85)*.3 }
    if (index===3) {
      const climb=MathUtils.smoothstep(p,.42,.5)*(1-MathUtils.smoothstep(p,.78,.91))
      x=MathUtils.lerp(3.7,1.9,climb); z=MathUtils.lerp(-.4,.1,climb); y=climb*3.17
    }
    x=MathUtils.lerp(x,[-3.7,-1.2,1.2,3.7][index],finished)
    z=MathUtils.lerp(z,3.35,finished)
    root.current.position.set(MathUtils.lerp(arrivalX,x,arrive),y,MathUtils.lerp(arrivalZ,z,arrive))
    root.current.rotation.y=finished>.8 ? .12 : [-.15,-.3,-Math.PI/2,.35][index]
    const crouch=index===0 && p>.15 && p<.32 ? .4 : 0
    body.current.position.y=-crouch*.55
    body.current.rotation.x=crouch
    leftLeg.current.rotation.x=swing+crouch*.45
    rightLeg.current.rotation.x=-swing+crouch*.45
    leftArm.current.rotation.x=walking ? -swing : working ? -.55+Math.sin(cycle)*.18 : 0
    rightArm.current.rotation.x=walking ? swing : working ? -.95+Math.sin(cycle)*.35 : -.12
    leftElbow.current.rotation.x=working ? -.45 : -.1
    rightElbow.current.rotation.x=index===1 && p<.65 ? -.9 : working ? -.65+Math.sin(cycle)*.3 : -.1
  })
  const color=colors[index]
  return <group ref={root} name={`construction-worker-${role}`} visible={false}>
    <Leg joint={leftLeg} x={-.105}/><Leg joint={rightLeg} x={.105}/>
    <group ref={body}>
      <Part position={[0,1.03,0]} size={[.43,.57,.24]} color={color}/>
      <Part position={[0,1.05,.13]} size={[.38,.035,.02]} color="#e8cf97"/>
      {[-.11,.11].map(x => <Part key={x} position={[x,1.07,.13]} size={[.035,.48,.02]} color="#e8cf97"/>)}
      <mesh position={[0,1.5,0]} castShadow><sphereGeometry args={[.17,12,10]}/><meshStandardMaterial color="#c19373"/></mesh>
      <mesh position={[0,1.64,0]} scale={[1,.58,1]} castShadow><sphereGeometry args={[.205,12,10]}/><meshStandardMaterial color="#d9ba76"/></mesh>
      <Part position={[0,1.61,.04]} size={[.44,.035,.4]} color="#d9ba76"/>
      <Arm joint={leftArm} elbow={leftElbow} side={-1} color={color}/>
      <Arm joint={rightArm} elbow={rightElbow} side={1} color={color} tool={['screed','brick','hammer','drill'][index]}/>
    </group>
  </group>
}
export default function ConstructionWorkers(props) {
  return <>{['foundation','materials','walls','roof'].map((role,index) => <Worker key={role} role={role} index={index} {...props}/>)}</>
}
