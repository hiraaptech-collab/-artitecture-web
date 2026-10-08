import { architectureImages } from './architectureImages'

export const pageImagery = {
  story: { label: 'THE STUDIO / OUR STORY', images: ['skylit-gallery', 'pebble-courtyard', 'sculptural-stair-lounge', 'garden-passage'] },
  team: { label: 'THE STUDIO / OUR PEOPLE', images: ['daylight-living-room', 'spiral-stair', 'planted-hall', 'chandelier-staircase'] },
  portfolio: { label: 'THE COLLECTION / SPACES & PLACES', images: ['framed-residence', 'poolside-residence', 'stone-glass-residence', 'terraced-residence'] },
  career: { label: 'THE STUDIO / NEW PERSPECTIVES', images: ['planted-atrium', 'blue-atrium', 'open-stair-atrium', 'daylight-atrium'] },
  connect: { label: 'A CONVERSATION / A POSSIBILITY', images: ['footer-studio-interior', 'coastal-residence', 'palms-residence', 'multilevel-residence'] },
  events: { label: 'THE JOURNAL / GATHERINGS', images: ['chandelier-living-room', 'kitchen-study', 'marble-kitchen', 'marble-stair'] },
  press: { label: 'THE JOURNAL / PERSPECTIVES', images: ['linear-lounge', 'timber-facade', 'double-height-lounge', 'geometric-pendant-lounge'] },
  awards: { label: 'THE JOURNAL / DESIGN & DETAIL', images: ['curved-stair-hall', 'sweeping-stair', 'courtyard-pool', 'illuminated-lounge'] },
  insights: { label: 'THE JOURNAL / IDEAS & PROCESS', images: ['residence-plan', 'sectional-interior-study', 'atrium-view', 'evening-kitchen-frame'] },
}

export function getPageImages(page) {
  return pageImagery[page].images.map((id) => ({ id, ...architectureImages[id] }))
}

