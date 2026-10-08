import { categories } from '../components/home/projects'
import { architectureImages } from '../data/architectureImages'

// Replace placeholder values here before publishing. Never invent studio accounts.
export const studio = {
  name: 'ARCHITECTURE',
  description: 'An independent design practice working across architecture, interiors, spatial design and creative direction.',
  contact: {
    email: { value: 'hello@your-studio.example', placeholder: true },
    phone: { value: '+92 — phone to be confirmed', href: null, placeholder: true },
    location: { city: 'Karachi', country: 'Pakistan', placeholder: true, mapUrl: null },
    businessPath: '/connect',
    careerPath: '/career',
  },
  // User-supplied image from architecture-web images (2).zip; replace metadata here.
  photograph: { ...architectureImages['footer-studio-interior'], caption: 'ARCHITECTURE / MATERIAL / LIGHT', credit: '', creditUrl: null, objectPosition: '50% 50%' },
  socials: [
    { label: 'Instagram', url: null },
    { label: 'LinkedIn', url: null },
    { label: 'Behance', url: null },
    { label: 'Pinterest', url: null },
  ],
  disciplines: ['Architecture', 'Interior Architecture', 'Spatial Design', 'Art & Material', 'Creative Direction'],
  navigation: [
    { label: 'Explore', items: [
      { label: 'Home', to: '/' }, { label: 'Our Story', to: '/about/our-story' },
      { label: 'Team', to: '/about/team' }, { label: 'Portfolio', to: '/portfolio' },
      { label: 'Career', to: '/career' }, { label: 'Connect', to: '/connect' },
    ] },
    { label: 'News', items: [
      { label: 'Events', to: '/news/events' }, { label: 'Press', to: '/news/press' },
      { label: 'Awards', to: '/news/awards' }, { label: 'Insights', to: '/news/insights' },
    ] },
    { label: 'Portfolio', items: [
      { label: 'Curated Projects', to: '/#featured-projects' },
      ...categories.map((category) => ({
        label: category === 'All' ? 'All Projects' : category,
        to: '/?category=' + encodeURIComponent(category) + '#selected-work',
      })),
    ] },
  ],
  // Draft notices until the studio supplies its publishing policies.
  notices: {
    privacy: { title: 'Privacy', status: 'Studio notice · pending publication',
      text: 'Our full privacy notice is being prepared. For questions about information shared during a project enquiry, please contact the studio through our Connect page.' },
    terms: { title: 'Terms', status: 'Studio notice · pending publication',
      text: 'The projects presented on this website are original concept studies. A complete website terms notice will be published here. For project availability, commissions or permissions, please contact the studio.' },
  },
}



