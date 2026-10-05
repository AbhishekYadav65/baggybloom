# BaggyBloom — React prototype (Vite)

Frontend-only ecommerce prototype for BaggyBloom. React 18, React Router (hash routes), React Three Fiber + three.js. No backend.

Requires Node 20.19+ or 22.12+ (Vite 8).

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the build locally
```

> Don't run `npm audit fix --force`: it can swap in incompatible major versions. The pinned set below installs with 0 audit findings.

The build uses `base: './'` and hash routes (`/#/store`), so `dist/` works on any static host or sub-folder.

## Structure

```
index.html                 fonts, hero image preload, line-boil SVG filter
public/images/<collection>/*.webp   all photos, compressed (480 / 800 / 1200 px WebP)
public/brand/              logo (transparent), creator photo
src/
  main.jsx, App.jsx        entry, routes (/ and /store), shared nav/footer/cursor/product view
  pages/Home.jsx           intro, hero, collections, catalogue, product film, story
  pages/Store.jsx          category chips, colour/pattern/detail filters, search, sort
  components/              Hero, Collections, Catalogue, ProductCard, ProductModal, ProductFilm,
                           Scene3D (lazy), GoldenThread2D, WordlessCursor, Marquee, ...
  data/products.js         collections + products  <-- edit prices, materials, dimensions here
  data/images.js           image map + responsive srcset helpers (generated from the photos)
  hooks/useEnv.js          capability tiers A/B/C, reduced-motion, storage
  lib/                     bag context, reveal observers, section navigation, torn-paper mask
  styles/                  base, home, store, film, responsive, mobile (loaded in that order)
```

## Performance and mobile
- Images: WebP at up to three widths with `srcset`/`sizes`, so a phone downloads the ~25 KB 480 px file, not the 1200 px one. The hero image is preloaded; everything below the fold is lazy.
- three.js and the 3D scene are a separate lazy chunk: only devices that pass the tier check (WebGL available, more than 4 cores, not reduced-motion) download it. Everyone else gets the CSS layers + SVG thread.
- Tier A (desktop): full scene. Tier B (phones/tablets): fewer objects, lower pixel ratio, rendering on demand after the intro.
- `src/styles/mobile.css` caps image heights and aspect ratios on small screens.

## Placeholders
Prices, materials, dimensions and the Instagram link are marked "to be added". Set `price` on a product and the store shows a price range filter and price sorting automatically. Colour/pattern tags were read from the photos; correct them in `data/products.js`.

## Not built yet
Ceramic pedestal, transmission-material glass and post-processing (grain/DoF) in the 3D layer, the textile section, testimonials, and per-room unique compositions. State management is plain React context (no zustand), animation is CSS + small rAF loops (no GSAP/Lenis).
