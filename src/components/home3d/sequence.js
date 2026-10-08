export const stages = [
  'Empty site', 'Foundation', 'Structure', 'Walls', 'Floors', 'Roof',
  'Windows', 'Doors', 'Interior', 'Furniture', 'Lighting', 'Landscape', 'Complete',
]

export function stageProgress(progress, stage) {
  const value = Math.max(0, Math.min(1, progress * (stages.length - 1) - (stage - 1)))
  return value * value * (3 - 2 * value)
}

