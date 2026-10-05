import { useEffect, useRef, useState } from 'react';
import { Img } from './Img.jsx';
import { ALL } from '../data/products.js';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p, a, b) => clamp((p - a) / (b - a));
const ease = (t) => t * t * (3 - 2 * t);
const A = ALL[0]; // patchwork tote: outside → inside → fabric
const B = ALL[9]; // lavender travel tote: next product
const OUTLINE = 'M18 30C18 6 82 6 82 30L90 92H10Z';
const SZ = '(max-width:860px) 70vw, 380px';

/** Scroll-driven product film: one pinned section, scrubbed by scroll position (no libraries). */
export default function ProductFilm() {
  const root = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!root.current) return;
        const r = root.current.getBoundingClientRect();
        setP(clamp(-r.top / (r.height - innerHeight)));
      });
    };
    on();
    addEventListener('scroll', on, { passive: true });
    addEventListener('resize', on);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('scroll', on);
      removeEventListener('resize', on);
    };
  }, []);

  const zoom = 1 + 0.2 * ease(seg(p, 0.08, 0.3)); // camera moves closer
  const line = seg(p, 0.14, 0.32); // outline traces the bag
  const iris = ease(seg(p, 0.32, 0.5)); // exterior -> interior
  const fab = ease(seg(p, 0.5, 0.66)); // fabric close-up fills the screen
  const info = ease(seg(p, 0.66, 0.76)); // name + price
  const slide = ease(seg(p, 0.8, 1)); // bag slides aside, next one enters
  const bob = Math.sin(p * 20) * 7;

  return (
    <section id="film" ref={root} aria-label="Product film">
      <div className="pin">
        <div className="fw hd" aria-hidden="true">inside</div>
        <div className="bag" style={{ transform: `translate3d(${-slide * 120}vw,${bob}px,0) scale(${zoom})` }}>
          <div className="fb">
            <div className="stage">
              <div className="ph m-arch">
                <div className="lay"><Img k={A.e} alt={A.name} sizes={SZ} style={{ objectPosition: '42% 50%' }} /></div>
                <div className="lay" style={{ clipPath: `circle(${iris * 150}% at 50% 55%)` }}><Img k={A.i} alt={`${A.name}, inside`} sizes={SZ} /></div>
              </div>
            </div>
            <svg className="out hd" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" style={{ strokeDashoffset: 1 - line }} d={OUTLINE} />
            </svg>
          </div>
        </div>
        <div className="bag" style={{ transform: `translate3d(${(1 - slide) * 120}vw,0,0)` }}>
          <div className="fb">
            <div className="stage">
              <div className="ph m-arch"><div className="lay"><Img k={B.e} alt={B.name} sizes={SZ} /></div></div>
            </div>
          </div>
        </div>
        <div className="fab" style={{ clipPath: `circle(${fab * 150}% at 50% 52%)` }} aria-hidden="true">
          <Img k={A.e} alt="" sizes="100vw" />
        </div>
        <div className="info" style={{ opacity: info * (1 - slide), transform: `translateY(${(1 - info) * 20}px)` }}>
          <h3>{A.name}</h3>
          <span className="small"><span className="ph-note">Price to be added</span></span>
        </div>
        <div className="info" style={{ opacity: slide, transform: `translateY(${(1 - slide) * 20}px)` }}>
          <h3>{B.name}</h3>
          <span className="small"><span className="ph-note">Price to be added</span></span>
        </div>
        <span className="hand note" style={{ opacity: 1 - seg(p, 0.1, 0.25) }}>made slowly, with love.</span>
      </div>
    </section>
  );
}
