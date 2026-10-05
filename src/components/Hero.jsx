import { useEffect, useRef } from 'react';
import Split from './Split.jsx';
import { Img } from './Img.jsx';
import { useGo } from '../lib/useGo.js';
import { finePointer, reduced } from '../hooks/useEnv.js';

/** `gl` = the WebGL layer is running, so the CSS stand-in shapes (Tier C look) are skipped. */
export default function Hero({ gl }) {
  const root = useRef(null);
  const go = useGo();

  // per-layer pointer parallax + spring tilt on the bag (desktop only)
  useEffect(() => {
    if (!finePointer() || reduced()) return undefined;
    const layers = [...root.current.querySelectorAll('.dl[data-d]')];
    const ph = root.current.querySelector('#heroPh');
    let mx = 0, my = 0, tx = 0, ty = 0, raf = 0;
    const mv = (e) => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
    };
    addEventListener('pointermove', mv, { passive: true });
    const loop = () => {
      tx += (mx - tx) * 0.07;
      ty += (my - ty) * 0.07;
      layers.forEach((d) => {
        const k = Number(d.dataset.d);
        d.style.transform = `translate(${-tx * 50 * k}px,${-ty * 36 * k}px)`;
      });
      ph.style.transform = `rotateY(${tx * 14}deg) rotateX(${-ty * 12}deg)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', mv);
    };
  }, [gl]);

  return (
    <section id="hero" ref={root}>
      <div className="giant hd" aria-hidden="true">wonder.</div>
      <div className="copy">
        <h1 className="rv">
          <Split t="Carry a little " />
          <em>
            <Split t="wonder." i0={12} />
            <svg className="dr hd" viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" d="M4 20C60 6 120 26 180 12S270 8 296 14" />
            </svg>
          </em>
        </h1>
        <p className="sub rv">Handmade objects for the beautiful chaos of everyday life.</p>
        <div className="rv">
          <a className="cta" href="#rooms" onClick={go('rooms')} data-cursor="link">EXPLORE THE COLLECTION →</a>
          <a className="lnk" href="#story" onClick={go('story')} data-cursor="link">Discover our world</a>
        </div>
      </div>
      <div className="depth" id="depth">
        {!gl && (
          <>
            <div className="dl blob" data-d="-.5" style={{ width: 210, height: 200, left: '6%', top: '8%' }} />
            <div className="dl ringo" data-d="-.35" style={{ width: 170, height: 170, right: '4%', top: '2%' }} />
            <div className="dl paper" data-d="-.2" style={{ width: 150, height: 170, left: '12%', bottom: '6%', rotate: '5deg' }} />
          </>
        )}
        <div className="dl sub" data-d="0" data-cursor="product">
          <div className="stage">
            <div className="ph m-arch" id="heroPh">
              <Img k={22} eager alt="Patchwork tote bag" sizes="(max-width:860px) 66vw, 36vw" style={{ objectPosition: '42% 50%' }} />
              <div className="rim" />
            </div>
          </div>
          <div className="gsh" />
        </div>
        <svg className="dl dr hd" data-d="1.3" viewBox="0 0 200 200" style={{ width: 130, right: '8%', bottom: '10%' }} aria-hidden="true">
          <circle cx="100" cy="100" r="80" pathLength="1" style={{ strokeDasharray: 1 }} />
          <path pathLength="1" d="M100 52l9 28 29 1-23 18 8 29-23-17-24 17 8-29-23-18 29-1z" />
        </svg>
        <span className="hand note dl" data-d="1.5" style={{ left: '2%', bottom: '30%' }}>made slowly, with love.</span>
      </div>
    </section>
  );
}
