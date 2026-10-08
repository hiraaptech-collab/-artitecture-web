# Home experience

This enhances the existing React/Vite app. Routing, navbar, package files and other pages are unchanged.

## Composition

Home connects the existing construction study to an introduction, three editorial featured projects, five design principles, a sticky three-image story, a separate colonnade study, a six-project filterable collection, the finished pavilion and a Connect CTA.

## Images and content

The projects are fictional original concepts, labelled as studies with supplied visual references. All live Home images now come from the user-provided architecture-web images (2).zip collection through src/data/architectureImages.js. Edit the catalog for image paths, alt text, dimensions and crops. Existing SVG placeholders remain on disk as unused fallback assets. No image establishes a real project location or studio authorship.

## Motion and scenes

- sequence.js defines construction stage labels and normalised timing.
- ArchitecturalModel.jsx extends the original pavilion. Stage groups build upward from the site.
- ArchitectureScene.jsx shares lighting and camera infrastructure across construction, colonnade and completed-pavilion presentations.
- ViewportScene.jsx lazy-loads and mounts only near the viewport, releasing offscreen WebGL contexts.
- useArchitectureScroll.js owns the construction ScrollTrigger; SmoothScrollProvider owns the app-wide Lenis instance.
- useHomeMotion.js owns scoped editorial reveals, image parallax and story transitions.
- SelectedWork.jsx sequences outgoing and incoming filter animations, with interaction locking and an accessible result count.
- All animation effects and listeners clean up on route exit. Reduced-motion users see complete models and all image-story panels without pinned scroll runways.
- No remote fonts, HDRIs, model assets or image requests are needed.

## Verification

Run npm run lint and npm run build. In a browser, check desktop and mobile framing, reverse construction scrolling, all five filters, reduced motion, keyboard links, route exit/re-entry and WebGL fallback. The 3D module remains substantial because it contains the rendering engine and Drei; it is loaded separately from the initial app bundle.

Headless Chrome verification passed: all Home sections and illustrations render; all five category filters complete with correct counts and active states; mobile has no horizontal overflow; reduced-motion panels are exposed; Our Story navigation and Home remount work; no runtime errors were recorded. Desktop and mobile screenshots were reviewed. Real-device scroll feel, Safari rendering and low-power GPU performance still need manual visual review.



