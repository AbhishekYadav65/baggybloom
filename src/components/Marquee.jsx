import { Fragment, useEffect, useRef } from 'react';
import { reduced } from '../hooks/useEnv.js';

const Star = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="#3A2A24" strokeWidth="2" aria-hidden="true">
    <path d="M20 3l4 12 13 1-10 8 4 13-11-7-11 7 4-13L3 16l13-1z" />
  </svg>
);

/** Typographic interlude. Speed and skew respond to scroll velocity. */
export default function Marquee({ words, dir = 1, cls = '' }) {
  const wrap = useRef(null);
  const track = useRef(null);
  useEffect(() => {
    if (reduced()) return undefined;
    let x = 0, last = scrollY, vel = 0, raf = 0, vis = true;
    const io = new IntersectionObserver(([e]) => (vis = e.isIntersecting));
    io.observe(wrap.current);
    const loop = () => {
      if (!track.current) return; // unmounted between a ref detach and the effect cleanup
      vel += (scrollY - last - vel) * 0.15;
      last = scrollY;
      if (vis) {
        x -= (0.6 + Math.abs(vel) * 0.12) * dir;
        const w = track.current.scrollWidth / 4;
        if (x < -w) x += w;
        if (x > 0) x -= w;
        track.current.style.transform = `translateX(${x}px) skewX(${Math.max(-12, Math.min(12, -vel * 0.5))}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [dir]);
  const one = words.flatMap((w, i) => [<span key={`w${i}`}>{w}</span>, <Star key={`s${i}`} />]);
  return (
    <div className={`mq ${cls}`} ref={wrap} aria-hidden="true">
      <div ref={track}>
        {[0, 1, 2, 3].map((n) => (
          <Fragment key={n}>{one}</Fragment>
        ))}
      </div>
    </div>
  );
}
