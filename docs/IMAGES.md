# Architecture image collection

All live website image sections now use the user-supplied archive architecture-web images (2).zip. Images are copied unchanged; no image generation or third-party download is involved.

The catalog in src/data/architectureImages.js records meaningful asset paths, descriptive alt text, native dimensions and cropping positions. src/data/pageImagery.js assigns image collections to each secondary route. Home uses the same catalog for featured projects, selected work and its layered image story. The shared footer uses its existing supplied interior image.

Forty-three usable files are represented across the website. One duplicate JPG, a blank 300x150 graphic and a very small 234x416 construction thumbnail are omitted. Original project names and locations remain fictional concept data; the supplied images are labelled as visual references and do not establish studio authorship, actual project identity or awards. Existing SVG placeholders remain on disk but are no longer used by live sections.

All nine secondary pages retain their existing titles and descriptions and share a componentized image layout. Portfolio also reuses the existing functional selected-work collection. No backend, routes or dependencies were added. The 3D construction, colonnade and completed pavilion remain intact.

## Source mapping

| Catalog key | Supplied filename |
| --- | --- |
| daylight-living-room | 0178b48030a3a4ed7908fa249459dd47.jpg |
| chandelier-staircase | 0507142eb2701d0ceb719055be311a01.jpg |
| evening-atrium | 165e88b691b1a1d4e2a0492f3bd38ca4.jpg |
| curved-stair-hall | 2032cca2c04ebffbed5119befc8838a0.jpg |
| charcoal-kitchen | 26056f659930cdcd12f90a663d779de8.jpg |
| planted-atrium | 2cfa612e68c9df793eef66fe441533ea.jpg |
| illuminated-lounge | 3200cb03a21f8f0eabee93c1bc87fdd2.jpg |
| warm-lounge | 35bc9bad79866cb7200ee962258c0a4e.jpg |
| framed-residence | 35bfff298013206e05e5a53e90df25a9.jpg |
| marble-kitchen | 36bb2a0af13b5ad6bb8cfee13feecfd8.jpg |
| pebble-courtyard | 3bbef1069a1775e0ef59580568f0f221.jpg |
| terraced-residence | 3e5192f8cf572483cd6c5705da50eb34.jpg |
| sculptural-stair-lounge | 4cc3829c39b2925b73a7945ddee1440a.jpg |
| residence-plan | 50a2def7e224f476e4e32074400710de.jpg |
| chandelier-living-room | 5ad9871025d311d83157f25cd84abb6f.jpg |
| spiral-stair | 63eb49842a7db27c282cfa7867efb70d.jpg |
| footer-studio-interior | 658029a31b134a045200331b32976459.jpg |
| marble-stair | 65bbb46bd223f60b26a6b7b0a4e374aa.jpg |
| poolside-residence | 72e041cdc97711fd10e5352551fe7d7d.jpg |
| skylit-gallery | 80179c1949d1e132a0176f6e06743d3c.jpg |
| coastal-residence | 82ef1a91a957cb97bb8257580238051a.jpg |
| planted-hall | 8a4379de45f134e1bdff8d04e6cece80.jpg |
| timber-facade | 8bd6619539b5af65acec55f1a328909b.jpg |
| linear-lounge | 8da9f105ace494d11ccf3536d4e7e18e.jpg |
| garden-villa | 90f779058d525fd075777ea2beffee1c.jpg |
| night-lounge | 91a81d8345d6ca86a7426c06d7b035d3.jpg |
| sweeping-stair | 92268e491901c304948a6472c37f272b.jpg |
| courtyard-pool | 965ff4658cbdc92a81005d7c9d93d3d4.jpg |
| stone-glass-residence | 9db6b7d25ac254b8523a64b1ac8330d1.jpg |
| open-stair-atrium | c1eeff257b34a0a54a910da7fbe71bc8.jpg |
| palms-residence | c3691df253a82e73356bc55b72c6643a.jpg |
| garden-passage | cb80ae75071dae1f7db2b05758c2842d.jpg |
| double-height-lounge | cff591724b468716aa60d2462db86acf.jpg |
| geometric-pendant-lounge | d139457ad91290352cc6d9861c04a4d1.jpg |
| multilevel-residence | d3db7c480967233e0ee20951f8c7e639.jpg |
| classical-lounge | d8b774458a2e2e5748129ec4e2c2094e (1).jpg |
| kitchen-study | download (1).png |
| blue-atrium | download (3).png |
| daylight-atrium | download.png |
| luminous-gallery | e89a13c0caca73c7b4fb94e198b5cf56.jpg |
| sectional-interior-study | f82309ca768d44bd8d9607138be86555.jpg |
| atrium-view | fc8c7138e44f27ac429ebe3277528d84.jpg |
| evening-kitchen-frame | videoframe_19801.png |

## Editing

Change src/data/pageImagery.js to rearrange the page collections. Change individual catalog position values to adjust cover crops. Plans and sectional illustrations are tagged as diagram and display with contain, preserving their drawing content. Most images load lazily; each secondary-page opening image loads eagerly. Respect for reduced motion is maintained.

## Verification

Run npm run lint and npm run build. Check every route, native asset loads, mobile overflow, preserved Home 3D stages, the Portfolio filters, and diagram legibility. Real-device scrolling and color/framing review remain useful.


## Completed verification

Lint and production build pass. Headless Chrome checked all ten routes, decoded every displayed image and confirmed that all 43 catalog assets are used. All five Portfolio filters passed. Mobile overflow checks passed on every route. Drawing layouts use contain. Home's construction canvas, colonnade and final-building sections remain present, and the shared footer stays intact. No runtime errors were recorded. Representative desktop/mobile screenshots were reviewed.

## Files updated

Added: src/data/architectureImages.js; src/data/pageImagery.js; src/components/imagery/ImagePage.jsx; src/components/imagery/imagePage.css; docs/IMAGES.md; 42 files under public/images/architecture/.
Updated: src/pages/ourstory.jsx; src/pages/team.jsx; src/pages/portfolio.jsx; src/pages/career.jsx; src/pages/connect.jsx; src/pages/events.jsx; src/pages/press.jsx; src/pages/awards.jsx; src/pages/insights.jsx; src/components/home/projects.js; src/components/home/EditorialSections.jsx; src/components/home/SelectedWork.jsx; src/config/studio.js; docs/HOME_EXPERIENCE.md.
