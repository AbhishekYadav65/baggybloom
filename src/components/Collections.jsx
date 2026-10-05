import { useCallback, useEffect, useRef, useState } from 'react';
import { Img } from './Img.jsx';
import Split from './Split.jsx';
import { ROOMS, FOCAL } from '../data/products.js';

/** Corridor of eight arched doors. The door nearest the centre opens by itself; the room recolours the section. */
export default function Collections() {
  const [cur, setCur] = useState(0);
  const strip = useRef(null);
  const doors = useRef([]);

  const nearest = useCallback(() => {
    const c = strip.current.getBoundingClientRect();
    const mid = c.left + c.width / 2;
    let best = 0, bd = Infinity;
    doors.current.forEach((d, i) => {
      const b = d.getBoundingClientRect();
      const x = Math.abs(b.left + b.width / 2 - mid);
      if (x < bd) {
        bd = x;
        best = i;
      }
    });
    setCur(best);
  }, []);
  useEffect(() => nearest(), [nearest]);

  const room = ROOMS[cur];
  useEffect(() => {
    document.body.style.setProperty('--acc', `var(--${room.acc})`); // tints the cursor flower
  }, [room]);

  let off = 0;
  return (
    <section id="rooms" style={{ '--room': `var(--${room.acc})` }}>
      <h2 className="head rv">Explore our little universe.</h2>
      <div id="strip" ref={strip} onScroll={nearest} data-cursor="drag" role="list">
        {ROOMS.map((r, i) => (
          <button
            key={r.name}
            ref={(el) => (doors.current[i] = el)}
            className={`door${i === cur ? ' open' : ''}`}
            data-cursor="collection"
            role="listitem"
            aria-label={r.name}
            style={{ '--acc': `var(--${r.acc})` }}
            onClick={(e) => {
              e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
              setCur(i);
            }}
            onPointerEnter={() => setCur(i)}
            onFocus={(e) => {
              setCur(i);
              e.currentTarget.scrollIntoView({ inline: 'center', block: 'nearest' });
            }}
          >
            <span className="fr">
              <Img k={r.img} alt={r.name} sizes="(max-width:860px) 46vw, 24vw" style={{ objectPosition: FOCAL[r.img] || '50% 50%' }} />
              <i className="pl" />
              <i className="pr" />
            </span>
            <span className={`deco ${r.deco}`} />
            <span className="nm">{r.name}</span>
          </button>
        ))}
      </div>
      <p id="roomLine" className="on" key={cur} aria-live="polite">
        {room.line.map(([t, em], j) => {
          const node = em ? <em key={j}><Split t={t} i0={off} /></em> : <Split key={j} t={t} i0={off} />;
          off += t.replace(/\s/g, '').length;
          return node;
        })}
      </p>
    </section>
  );
}
