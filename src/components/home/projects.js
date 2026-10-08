import { architectureImages } from '../../data/architectureImages'

// Original sample concepts illustrated with supplied architectural visual references.
function projectImage(id) {
  const photo = architectureImages[id]
  return { image: photo.src, alt: photo.alt, width: photo.width, height: photo.height, imagePosition: photo.position }
}
export const categories = ['All', 'Hospitality', 'Residential', 'Office', 'Retail / F&B']

export const projects = [
  { id: 'salt-house', name: 'The Salt House', location: 'Muscat, Oman', year: '2026', category: 'Hospitality',
    ...projectImage('garden-villa'),
    description: 'A coastal retreat shaped by shaded courtyards, quiet water and the texture of local stone.' },
  { id: 'courtyard-residence', name: 'Courtyard No. 08', location: 'Lahore, Pakistan', year: '2025', category: 'Residential',
    ...projectImage('stone-glass-residence'),
    description: 'An inward-looking home where a garden becomes the centre of everyday life.' },
  { id: 'atelier-office', name: 'The Common Ground', location: 'Dubai, UAE', year: '2026', category: 'Office',
    ...projectImage('luminous-gallery'),
    description: 'A workplace conceived as a neighbourhood: open, connected and filled with natural light.' },
  { id: 'ochre-table', name: 'The Ochre Table', location: 'Karachi, Pakistan', year: '2025', category: 'Retail / F&B',
    ...projectImage('charcoal-kitchen'),
    description: 'An intimate dining room that pairs generous hospitality with a restrained material palette.' },
  { id: 'dune-retreat', name: 'Dune & Still', location: 'AlUla, Saudi Arabia', year: '2026', category: 'Hospitality',
    ...projectImage('evening-atrium'),
    description: 'Low-slung volumes and sheltered passages draw a quiet line through a desert landscape.' },
  { id: 'garden-room', name: 'The Garden Room', location: 'Islamabad, Pakistan', year: '2025', category: 'Residential',
    ...projectImage('classical-lounge'),
    description: 'A family pavilion that dissolves the boundary between the living room and the landscape.' },
]

export const principles = [
  ['Light', 'Let daylight lead.', 'We begin with the sun: how it enters, where it rests, and how a room changes through the day.'],
  ['Material', 'Honest in every detail.', 'Stone, timber and metal are chosen for their character, their ageing, and the way they meet the hand.'],
  ['Form', 'Clarity over excess.', 'Every proportion has a reason. Structure and detail work together to make a building feel inevitable.'],
  ['Space', 'Room to breathe.', 'Movement, pause and discovery shape a sequence of spaces, rather than a collection of rooms.'],
  ['Experience', 'Designed around life.', 'The final measure of a place is how it feels to inhabit it, from a first arrival to a familiar daily ritual.'],
]

