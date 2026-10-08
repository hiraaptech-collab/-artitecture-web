# Immersive architecture extension

The existing ten routes, Home construction sequence, editorial sections, supplied image catalogue, selected-work filters, shared Lenis instance and footer are preserved.

## New foundations

- ExperienceEntry: short first-visit cover with a supplied architectural photograph and a lightweight, genuine R3F entrance scene. The application mounts after the cover finishes, so Home animations cannot play behind it. Session storage prevents repeated covers while navigating. Enter button supports immediate entry; reduced motion shortens the sequence.
- ArchitecturalStudy: shared viewport lifecycle, sticky scroll progression, chapter descriptions and keyboard/touch controls. Every secondary route selects a different model and camera path from architecturalStudies.
- StudyModels: nine procedural compositions, including a hinged door, modular assembly, terraced residence, exploded section and real photographs displayed as textures in a spatial gallery.
- StudyScene: demand rendering, capped pixel ratio, adaptive camera framing, procedural environment lighting, local error boundary and WebGL fallback. Scenes unmount outside the nearby viewport.
- Navbar: four primary choices, Studio/Journal dropdowns, keyboard navigation, mobile drawer and shared scroll pause.
- PageTransition: route-opening perspective animation; query-only filter changes preserve component state.
- refinements.css: shared responsive heading hierarchy, bounded layouts for large screens, compact portrait and landscape compositions.

All procedural models are architectural concepts, not representations of actual completed studio projects. No external model, HDRI or image service is required. The supplied photos remain the visual source across the site.

## Extension points

Replace individual model components with licensed GLTF assets later without changing routing, scroll progress or controls. The concept scene interface is study / progress ref / controls ref. Keep built-project claims and real studio details in the existing content/configuration files. Avoid adding a second Lenis instance.

## Verification

Run npm run lint and npm run build. Browser checks should cover first-visit sequencing, all ten routes, nine unique secondary scenes, rotation/detail controls, desktop and mobile navigation, portfolio filters, supplied image loading, reduced-motion preferences and responsive viewport sizes. Simulated viewport checks do not substitute for physical touch-device or TV testing.

## Files changed and why

| File | Change |
| --- | --- |
| src/App.jsx | Wrap the preserved router in the first-visit entry and page transitions; load shared typography refinements. |
| src/components/experience/ExperienceEntry.jsx | Add the short, skippable intro, supplied photograph, true 3D entrance and session-based sequencing. |
| src/components/experience/EntryScene.jsx | Render the critical intro entrance with a small mesh composition, capped pixel ratio and no large scene collection or environment capture. |
| src/components/experience/useReducedMotion.js | Share a live media-query subscription for accessible motion preferences. |
| src/components/experience/ArchitecturalStudy.jsx | Add viewport loading, scroll chapters, 360-degree rotation and detail controls to secondary pages. |
| src/components/experience/StudyScene.jsx | Add the R3F runtime, adaptive sphere-based camera framing, procedural lighting, demand rendering and fallback. |
| src/components/experience/StudyModels.jsx | Add nine distinct architectural compositions, photo textures, hinged entry, modular assembly and exploded layers. |
| src/components/experience/experience.css | Style the intro and spatial studies, including portrait, landscape, large-screen and reduced-motion layouts. |
| src/data/architecturalStudies.js | Define each route's model, camera path, chapters, descriptions and interaction. |
| src/components/navbar.jsx | Replace the crowded link row and inert Menu button with four main choices, functional disclosures and mobile navigation. |
| src/components/navbar.css | Add refined dropdown styling, restrained motion, focus states and a scrollable mobile drawer. |
| src/components/SmoothScrollProvider.jsx | Expose pause/resume on the existing shared Lenis instance for mobile navigation. |
| src/components/pagetransition.jsx | Implement perspective entry motion without transforming sticky scene ancestors or remounting query-only filters. |
| src/components/imagery/ImagePage.jsx | Extend all nine existing secondary pages with their route-specific scene and perspective image reveals. |
| src/components/imagery/imagePage.css | Remove obsolete navbar overrides that conflict with the new shared navigation. |
| src/components/home/home.css | Remove obsolete Home-specific navbar overrides; preserve existing editorial styling. |
| src/components/home3d/ArchitecturalModel.jsx | Extend the existing staged pavilion with a hinged door that opens during the interior reveal. |
| src/components/home3d/ArchitectureScene.jsx | Extend camera and demand-frame updates to support the final pavilion's manual orbit. |
| src/components/home/SceneMoments.jsx | Add a touch/keyboard-accessible 360-degree control to the completed Home pavilion. |
| src/refinements.css | Refine headings throughout the site, bound large-screen compositions and adapt short-screen Home layouts. |
| docs/immersive-experience.md | Document the extension, file changes, concepts and verification. |

The existing page modules, image files/catalogue, portfolio data/filter implementation, footer content/configuration and package setup remain in use.

## Spatial stories

| Route | Composition | Interaction |
| --- | --- | --- |
| / | Existing staged pavilion, colonnade and completed building | Construction scroll, opening door, final 360-degree orbit |
| /about/our-story | Unfolding colonnade and reflecting courtyard | Roof separation |
| /about/team | Shared workspace and table | Canopy lift |
| /portfolio | Terraced glass-and-stone residence | Full scroll orbit and separated upper volume |
| /career | Modular structural framework | Assembly and separated modules |
| /connect | Threshold and furnished room | Scroll-opening and clickable hinged door |
| /news/events | Amphitheatre and stage | Rising seating and overhead perspective |
| /news/press | Photographs in a spatial gallery | Panel alignment and gallery perspective |
| /news/awards | Twisting sculptural tower | Full scroll orbit and silhouette study |
| /news/insights | Architectural section | Exploded material and structural layers |

Reduced-motion rotation controls step through quarter-turn perspectives, allowing every side to be explored without a continuous orbit. The intro entrance is critical-path 3D; larger Home and secondary-page scenes remain lazy-loaded and release outside the nearby viewport.

## Verification results

- npm run lint passes without warnings.
- npm run build passes. Vite reports a size warning for the initial rendering bundle (1.37 MB minified / 392 KB gzip), which includes the engine for the genuine 3D intro. Scene geometry and environment helpers remain split into later chunks. Scenes use capped DPR, demand rendering and viewport loading; the short entrance warms the engine before Home.
- Browser checks cover all ten routes and all nine distinct secondary-page models.
- All 43 catalog images remain represented and load from the supplied local assets.
- The first-visit audit confirms the photograph and real 3D entrance appear before main content; intro/main overlap is absent. Session dismissal and keyboard entry work.
- Home construction reaches its final stage; its completed pavilion completes a 360-degree orbit; the offscreen construction canvas releases.
- All nine secondary-page scroll stories advance through their middle and final chapters. Camera-state and rendered-image checks confirm actual Three.js orbit changes.
- Desktop dropdown keyboard navigation, Escape/focus restoration, mobile menu closing/scroll restoration, and all five portfolio filters pass.
- Reduced-motion controls step through four quarter-turn perspectives instead of running a continuous orbit; this works on both secondary studies and the completed Home pavilion.
- All ten routes were checked for horizontal overflow and visible heading bounds at 320x568, 390x844, 768x1024, 1024x768, 1440x900, 2560x1440, 3440x1440, 3840x2160 and 844x390. Scene/controls fit was additionally checked in portrait, ultrawide and short landscape layouts.
- Browser motion, entry and final control suites report no console/runtime errors.

These are headless Chrome viewport simulations, including software WebGL rendering, plus visual screenshot review. Physical phones, tablets, TVs and projectors have not been tested. Models are procedural architectural studies; a later licensed GLTF asset can replace any study through the existing scene interface.
