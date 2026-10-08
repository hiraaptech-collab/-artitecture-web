import { createContext, useContext } from 'react'

export const SmoothScrollContext = createContext(null)

export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}

