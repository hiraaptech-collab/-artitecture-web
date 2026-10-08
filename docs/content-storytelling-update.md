# Content and cinematic storytelling update

This update extends the completed React/Vite project. All ten routes, the first-visit 3D entry, shared Lenis scrolling, existing architectural scenes, Home construction, project filters and reusable footer remain in the application. No dependencies, package scripts, routes, backend or supplied image files were changed.

## What visitors experience

Every route opens with a supplied architectural photograph, readable editorial text and a relevant CTA. The background has a gentle zoom while visible. As the visitor scrolls, that same photograph moves and shrinks into an introduction card; the opening text yields to the explanation behind the image. Mirrored compositions, framing and page-specific photographs vary the openings. Short portrait screens use a stacked handoff; landscape and larger screens keep image and text side by side.

The nine secondary pages now have purpose-specific introductory copy, three illustrated editorial articles, a four-part process, expandable supporting questions and a closing CTA. Team, Events and Awards use compact article grids; other routes use alternating image/text compositions. Insights keeps its two supplied drawings uncropped. The current imagery is presented as visual reference material rather than falsely attributed completed commissions.

Home adds this cinematic opening and four service explanations. Its original construction sequence is now a dedicated chapter immediately after the opening, with a secondary heading. The existing featured concepts, image story, philosophy, showcase, filters, final pavilion and CTA remain.

Our Story adds a second, distinct construction experience before its editorial articles. The original colonnade remains farther down the page. Four procedural Three.js workers have articulated arms and legs, helmets, workwear and distinct tools. They arrive, prepare the foundation, carry materials, work along the walls and climb to the roof. The house develops through foundation, structure, walls, floors, roof, openings, interiors, furniture, lighting and landscape. Glazing follows the roof chapter. The final scene gathers all four workers around the complete house. Chapter text connects making with the studio's design philosophy and collaboration.

Connect adds a validated local enquiry brief. Visitors can edit, copy and save the resulting text. No information is submitted or stored on a server. Real email, telephone and address details are still awaiting confirmation in the existing studio configuration. Once a real email is configured with its placeholder flag disabled, the form also offers an email draft.

## Exact file changes

| File | Change and purpose |
| --- | --- |
| src/components/navbar.jsx | Makes Home a visible primary link with exact active matching. Moves requested dropdown focus to the frame after the open state is committed. Preserves all existing dropdown, mobile, route and keyboard behavior. |
| src/components/navbar.css | Shows Home on desktop, adjusts gaps at intermediate widths and makes open-menu visibility immediate so keyboard focus works while opacity and perspective still animate. |
| src/pages/home.jsx | Adds the cinematic opening and services. Retains the original construction and all following Home sections; changes the construction heading to h2 so the page has one h1. |
| src/refinements.css | Adds responsive typography for the dedicated Home construction heading. |
| src/components/imagery/ImagePage.jsx | Composes the new hero, illustrated page content, process, supporting questions and CTAs. Keeps the existing architectural study and Portfolio children. Integrates Story construction and Connect's enquiry. Retains masked/parallax image reveals. |
| src/data/pageContent.js | Centralizes substantive, route-specific copy and image choices for all ten pages. Distinguishes concept references and pending business information from verified claims. |
| src/components/imagery/CinematicHero.jsx | Implements the single-image scroll handoff, introductory copy, CTAs, subtle visible-hero zoom and GSAP lifecycle cleanup. Uses existing supplied assets. |
| src/components/imagery/cinematicHero.css | Provides photographic backgrounds, readable overlays, mirrored compositions, responsive handoff geometry and static reduced-motion openings. |
| src/components/imagery/PageEditorial.jsx | Reusable illustrated articles, process steps, supporting questions, closing CTAs and Home service content. |
| src/components/imagery/pageEditorial.css | Varied article layouts, bounded image sizes, process grids, supporting-information layouts and responsive typography. |
| src/components/imagery/ProjectEnquiry.jsx | Validated enquiry form, honest configured contact information, editable brief, clipboard copy, text-file download and conditional email-draft link. |
| src/components/imagery/projectEnquiry.css | Responsive contact/form layout, readable inputs, clear actions and a brief-review area. |
| src/components/story/storyChapters.js | Seven construction chapters connecting the build with beginning, collaboration, design, construction, craft, interiors and future vision. |
| src/components/story/StoryConstruction.jsx | Scroll controller, active chapter copy, stage controls, reduced-motion inspection and viewport-based lazy scene mounting. |
| src/components/story/ConstructionWorkers.jsx | Four genuine articulated 3D figures with role-specific tools, arrival/walking motion, working poses, material carrying, roof climbing and final gathering. |
| src/components/story/ConstructionScene.jsx | R3F construction world using the existing architectural model, staged progress mapping, cinematic camera, site materials and ladder. Demand rendering refreshes workers at up to 30 fps while the visible build is active. Includes WebGL fallback. |
| src/components/story/storyConstruction.css | Responsive sticky story layout, chapter hierarchy, scene canvas, controls and static reduced-motion presentation. |
| docs/content-storytelling-update.md | This implementation and verification record. |

## Route content

| Route | Editorial focus | Preserved 3D experience |
| --- | --- | --- |
| / | Residential design, interiors, 3D studies and landscape services | Original construction, portico showcase and final pavilion |
| /about/our-story | Beginning, philosophy, collaboration, craftsmanship and future thinking | Original colonnade, plus the new four-worker build |
| /about/team | Architecture, interiors and technical coordination | Shared studio workspace |
| /portfolio | Landscape, material contrast and sectional planning, alongside the existing filtered concepts | Layered residence |
| /career | Observation, communication, detail and preparing a portfolio | Modular framework |
| /connect | New homes, renovation, early spatial questions and a local project brief | Interactive architectural threshold |
| /news/events | Design reviews, material conversations and spatial discussions; no unconfirmed event dates | Amphitheatre |
| /news/press | Editorial themes and preparing a media request; no invented publication coverage | Photographic 3D gallery |
| /news/awards | Design criteria, context, resolution and longevity; no fabricated awards | Rising tower |
| /news/insights | Planning, sections, 3D visualisation, materials and lighting | Exploded sectional study |

## Verification

- npm run lint passes without warnings.
- npm run build passes.
- All ten routes checked for content hierarchy, supplied images, visible desktop Home navigation and the single-image hero-to-card transition.
- Responsive content checked on all ten routes at 320×568, 390×844, 768×1024, 1024×768, 1440×1000, 2560×1440, 3440×1440, 3840×2160 and 844×390. No horizontal overflow or clipped hero content was found after corrections.
- Normal-motion image handoffs checked on all ten routes at 320×568, 390×844, 768×1024 and 844×390. The photograph settles beside or beneath readable copy without overlap.
- All nine existing secondary-route scenes render through WebGL; their perspective and detail controls remain available.
- Story checked from empty site through foundation, walls, roof, openings, interior and complete house. Four visible scene objects, changing limb poses/material carrying, roof-worker height and final gathering were checked in the running R3F scene. The refined roof chapter has a complete roof before glazing appears.
- Reduced-motion visitors can inspect individual construction stages with the chapter controls.
- The existing photographic/3D intro still precedes main content. Desktop dropdown keyboard focus and Escape behavior were checked.
- All five Portfolio filters preserve the existing category counts and query state. Mobile Home navigation closes the drawer and restores scrolling. Original Home construction reaches Complete and the final pavilion still rotates.
- Contact rejects missing required fields, prepares an accurate local brief, copies the reviewed text to the clipboard and downloads it as a text file.
- Browser checks run in headless Chrome using software WebGL. Physical phones, TVs and projectors were not available for hardware testing.

The production build retains the existing large initial 3D-runtime bundle warning (approximately 1.41 MB minified / 406 KB gzip). The new construction scene loads separately near its viewport; existing scenes retain their viewport mounting behavior.
