import { useState } from 'react'
import useAutomaticProgress from '../experience/useAutomaticProgress'
import useReducedMotion from '../experience/useReducedMotion'
import { stages } from './sequence'

// Keep the existing Home hook API while replacing its scroll controller.
export default function useArchitectureScroll(section) {
  const [stage, setStage] = useState(0)
  const reducedMotion = useReducedMotion()
  const { progress, onReady } = useAutomaticProgress(section, {
    duration: 24, reduced: reducedMotion, selector: '.architecture-canvas',
    onUpdate: (amount) => setStage(Math.min(stages.length - 1, Math.floor(amount * (stages.length - 1) + .001))),
  })
  return { progress, stage, reducedMotion, onReady }
}
