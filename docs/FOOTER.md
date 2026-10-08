# Shared studio footer

Footer is mounted once below Routes in App.jsx. The former Home-only footer is removed; all ten routes share the same component and data.

## Configuration

Edit src/config/studio.js to set the studio name, confirmed email and telephone, actual location/map URL, social URLs, legal notices and photograph metadata. Contact and location defaults are explicitly marked as placeholders. Only configured social links render.

The footer now uses public/images/footer-studio-interior.jpg, copied unchanged from architecture-web images/658029a31b134a045200331b32976459.jpg in the user-supplied architecture-web images (2).zip archive. Descriptive alt text, dimensions and crop are configured centrally. No project identity, photographer credit or license has been inferred. Replace photograph.src and its metadata to change the visual.

Privacy and Terms open accessible native dialogs containing clearly marked notices awaiting publication. Replace those notices with the studio's approved text before publishing.

## Navigation and motion

Explore and News links use the existing routes. Curated Projects targets Home's featured section. The existing All, Hospitality, Residential, Office and Retail / F&B collection filters are addressable through category query parameters and the selected-work anchor.

SmoothScrollProvider owns one Lenis instance for the whole app. Home keeps its construction timeline. RouteScroll refreshes ScrollTrigger after navigation and handles anchor destinations. Back to top uses the shared Lenis controller and returns keyboard focus to the page heading after scrolling. Reduced-motion users receive immediate scroll and no entrance/parallax effects.

Footer motion is scoped to its own component and reverts when routes or motion preferences change. Mobile navigation uses native details/summary accordions, with open columns on desktop.


## Validation and changed files

Lint and build pass. Headless Chrome verified all ten route destinations, all five collection categories and their scroll anchors, Curated Projects, Privacy/Terms opening and Escape dismissal, smooth back-to-top and focus restoration, mobile accordions, and no horizontal overflow. No runtime errors were recorded. Real-device scrolling and real-photo framing still need visual review.

Changed: src/App.jsx; src/components/footer.jsx; src/components/home/EditorialSections.jsx; src/components/home/SelectedWork.jsx; src/components/home/home.css; src/components/home3d/useArchitectureScroll.js; docs/HOME_EXPERIENCE.md.
Added: src/config/studio.js; src/lib/smoothScroll.js; src/components/SmoothScrollProvider.jsx; src/components/RouteScroll.jsx; src/components/footer.css; docs/FOOTER.md.

