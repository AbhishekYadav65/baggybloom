import { has, src, srcSet } from '../data/images.js';

/** Responsive WebP <img>. `sizes` must describe the real rendered width so phones pick the small file. */
export function Img({ k, alt, sizes = '100vw', eager = false, ...rest }) {
  if (!has(k)) return null;
  return (
    <img
      src={src(k, 800)}
      srcSet={srcSet(k)}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={eager ? 'high' : undefined}
      draggable="false"
      {...rest}
    />
  );
}

/** Hand-drawn silhouette used when a product photo is missing (never shows another product's image). */
export function Silhouette() {
  return (
    <svg viewBox="0 0 100 120" fill="none" stroke="#3A2A24" strokeWidth="2" style={{ width: '50%', margin: 'auto' }} aria-hidden="true">
      <path d="M32 45C32 8 68 8 68 45M20 45h60l8 66H12z" />
    </svg>
  );
}
