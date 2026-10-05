/** Deterministic torn-paper polygon for clip-path (seeded so it never jumps between renders). */
export function torn(seed) {
  let s = seed;
  const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const p = [];
  for (let i = 0; i <= 20; i++) p.push(`${i * 5}% ${(r() * 2.6).toFixed(1)}%`);
  for (let i = 1; i <= 12; i++) p.push(`${(100 - r() * 2.6).toFixed(1)}% ${(i * 8.3).toFixed(1)}%`);
  for (let i = 20; i >= 0; i--) p.push(`${i * 5}% ${(100 - r() * 2.6).toFixed(1)}%`);
  for (let i = 11; i >= 1; i--) p.push(`${(r() * 2.6).toFixed(1)}% ${(i * 8.3).toFixed(1)}%`);
  return `polygon(${p.join(',')})`;
}
