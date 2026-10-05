import { useEffect, useRef } from 'react';

/** Hand-drawn SVG Golden Thread: drawn progressively with scroll, runs from the hero to the footer bow. */
export default function GoldenThread2D() {
  const svg = useRef(null);
  const path = useRef(null);
  useEffect(() => {
    const draw = () => {
      if (!path.current || !svg.current) return;
      const H = document.body.offsetHeight, W = document.body.clientWidth;
      svg.current.setAttribute('viewBox', `0 0 ${W} ${H}`);
      let d = `M${W * 0.5} 0`, y = 0, sg = 1;
      while (y < H - 700) {
        const x = sg > 0 ? W * 0.9 : W * 0.08;
        d += `C${W * 0.5} ${y + 150},${x} ${y + 120},${x} ${y + 330}S${W * 0.5} ${y + 560},${W * 0.5} ${y + 700}`;
        y += 700;
        sg = -sg;
      }
      path.current.setAttribute('d', `${d}L${W / 2} ${H - 340}`);
    };
    const prog = () => {
      if (!path.current) return;
      const H = document.body.offsetHeight;
      path.current.style.strokeDashoffset = String(Math.max(0, 1 - Math.min(1, (scrollY + innerHeight * 0.7) / (H - 300))));
    };
    const ro = new ResizeObserver(() => {
      draw();
      prog();
    });
    ro.observe(document.body); // body height is content-only (thread is clipped), so this can shrink as well as grow
    addEventListener('scroll', prog, { passive: true });
    draw();
    prog();
    return () => {
      ro.disconnect();
      removeEventListener('scroll', prog);
    };
  }, []);
  return (
    <svg id="thread" ref={svg} preserveAspectRatio="none" aria-hidden="true">
      <path ref={path} pathLength="1" strokeDasharray="1" strokeDashoffset="1" />
    </svg>
  );
}
