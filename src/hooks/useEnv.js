import { useEffect, useState } from 'react';

const mq = (q) => typeof matchMedia !== 'undefined' && matchMedia(q).matches;
export const reduced = () => mq('(prefers-reduced-motion: reduce)');
export const finePointer = () => mq('(pointer: fine)');

/**
 * Capability tiers from the creative direction:
 *  A = desktop GPU (full 3D + cursor), B = phone/tablet with decent hardware (lighter 3D),
 *  C = CSS 2.5D + SVG thread only (reduced motion, no WebGL, or low-power device).
 */
export function detectTier() {
  if (reduced()) return 'C';
  try {
    const c = document.createElement('canvas');
    if (!(c.getContext('webgl2') || c.getContext('webgl'))) return 'C';
  } catch {
    return 'C';
  }
  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 4;
  if (cores <= 4 || mem <= 2) return 'C';
  return finePointer() && innerWidth >= 1024 ? 'A' : 'B';
}

export const useTier = () => {
  const [tier, setTier] = useState('C');
  useEffect(() => setTier(detectTier()), []);
  return tier;
};

export const storage = {
  get: (k) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set: (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* private mode etc. */
    }
  },
};
