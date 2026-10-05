import { useEffect, useState } from 'react';
import { reduced, storage } from '../hooks/useEnv.js';
import { LOGO } from '../data/images.js';

/** 1–2s: pencil sketches a bag, the logo reveals, then it's gone. Skipped on repeat visits / reduced motion / any input. */
export default function Intro() {
  const [show, setShow] = useState(() => !(reduced() || storage.get('bb-intro')));
  const [step, setStep] = useState(0);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    if (!show) return undefined;
    const end = () => {
      setGone(true);
      storage.set('bb-intro', '1');
      timers.push(setTimeout(() => setShow(false), 800));
    };
    const timers = [setTimeout(() => setStep(1), 30), setTimeout(() => setStep(2), 950), setTimeout(end, 1900)];
    const ev = ['keydown', 'pointerdown', 'wheel', 'touchstart'];
    ev.forEach((e) => addEventListener(e, end, { once: true, passive: true }));
    return () => {
      timers.forEach(clearTimeout);
      ev.forEach((e) => removeEventListener(e, end));
    };
  }, [show]);
  if (!show) return null;
  return (
    <div id="intro" className={`${step >= 1 ? 's1 ' : ''}${step >= 2 ? 's2 ' : ''}${gone ? 'gone' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 400 460">
        <path pathLength="1" d="M130 180C130 70 270 70 270 180M96 180L304 180L330 400L70 400Z" />
      </svg>
      <img className="lg" alt="" src={LOGO} />
    </div>
  );
}
