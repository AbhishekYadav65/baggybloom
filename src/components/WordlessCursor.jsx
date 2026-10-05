import { useEffect, useMemo, useRef } from 'react';
import { finePointer, reduced } from '../hooks/useEnv.js';

/**
 * Wordless cursor: pearl + lagging ring + thread trail. No text, ever.
 * State comes from `data-cursor` on the hovered element (product | collection | drag | link | text).
 * Interior reveals dispatch a `bb:stitch` event so the ring can draw itself as a dashed stitch circle.
 */
export default function WordlessCursor() {
  const cv = useRef(null);
  const pearl = useRef(null);
  const ring = useRef(null);
  const on = useMemo(() => finePointer() && !reduced(), []);

  useEffect(() => {
    if (!on) return undefined;
    document.body.classList.add('fine');
    const g = cv.current.getContext('2d');
    const fit = () => {
      cv.current.width = innerWidth;
      cv.current.height = innerHeight;
    };
    fit();
    let X = -99, Y = -99, RX = X, RY = Y, rect = null, raf = 0;
    const pts = Array.from({ length: 12 }, () => ({ x: -99, y: -99 }));

    const move = (e) => {
      X = e.clientX;
      Y = e.clientY;
      const t = e.target.closest?.('[data-cursor],a,button');
      const c = t ? t.dataset.cursor || 'link' : '';
      document.body.dataset.c = c;
      rect = c === 'link' && t ? t.getBoundingClientRect() : null;
    };
    const stitch = (e) => {
      if (!ring.current) return;
      ring.current.classList.toggle('stitch', e.detail);
      ring.current.style.setProperty('--p', e.detail ? '360deg' : '0deg');
    };
    const tick = () => {
      if (!pearl.current || !ring.current || !cv.current) return;
      RX += (X - RX) * 0.2;
      RY += (Y - RY) * 0.2;
      pearl.current.style.transform = `translate(${X}px,${Y}px)`;
      const rg = ring.current.style;
      if (rect) {
        const w = rect.width + 14, h = rect.height + 10;
        Object.assign(rg, { width: `${w}px`, height: `${h}px`, margin: `${-h / 2}px ${-w / 2}px`, borderRadius: '999px', transform: `translate(${rect.left + rect.width / 2}px,${rect.top + rect.height / 2}px)` });
      } else {
        Object.assign(rg, { width: '', height: '', margin: '', borderRadius: '', transform: `translate(${RX}px,${RY}px)` });
      }
      pts[0].x = X;
      pts[0].y = Y;
      for (let i = 1; i < 12; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.35;
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.35;
      }
      g.clearRect(0, 0, cv.current.width, cv.current.height);
      for (let i = 1; i < 12; i++) {
        g.strokeStyle = `rgba(58,42,36,${0.5 * (1 - i / 12)})`;
        g.lineWidth = 1;
        g.beginPath();
        g.moveTo(pts[i - 1].x, pts[i - 1].y);
        g.lineTo(pts[i].x, pts[i].y);
        g.stroke();
      }
      raf = requestAnimationFrame(tick);
    };
    addEventListener('pointermove', move, { passive: true });
    addEventListener('resize', fit);
    addEventListener('bb:stitch', stitch);
    tick();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', move);
      removeEventListener('resize', fit);
      removeEventListener('bb:stitch', stitch);
      document.body.classList.remove('fine');
      delete document.body.dataset.c;
    };
  }, [on]);

  if (!on) return null;
  return (
    <>
      <canvas id="trail" ref={cv} />
      <div id="pearl" ref={pearl}>
        <svg viewBox="-20 -20 40 40" aria-hidden="true">
          <g id="fl" fill="none" strokeWidth="1.6">
            {[0, 60, 120].flatMap((a) => [
              <ellipse key={`${a}a`} cx="0" cy="-9" rx="4" ry="9" transform={`rotate(${a})`} />,
              <ellipse key={`${a}b`} cx="0" cy="9" rx="4" ry="9" transform={`rotate(${a})`} />,
            ])}
          </g>
        </svg>
      </div>
      <div id="ring" ref={ring}>
        <i /><i /><i /><i />
      </div>
    </>
  );
}
