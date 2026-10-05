import { useCallback, useEffect, useRef, useState } from 'react';
import { Img, Silhouette } from './Img.jsx';
import { has } from '../data/images.js';
import { FOCAL } from '../data/products.js';
import { useBag } from '../lib/bag.jsx';
import { finePointer, reduced } from '../hooks/useEnv.js';

const stitch = (on) => dispatchEvent(new CustomEvent('bb:stitch', { detail: on }));

/**
 * One product, two looks: variant "cat" (editorial catalogue) and "store" (plain grid).
 * "The inside story": the interior reveals automatically (hover/focus, touch dwell, idle breathe) — no label.
 * State is per card and only ever uses this product's own images.
 */
export default function ProductCard({ p, variant = 'store', cls = '', feat = false, sizes, clip, word, children }) {
  const { open, add } = useBag();
  const ph = useRef(null);
  const live = useRef({ touched: false, enter: 0, breathe: 0 }).current;
  const interior = [p.i, p.d].find(has);
  const exterior = has(p.e) ? p.e : null;
  const [inn, setInn] = useState(false);
  const [pt, setPt] = useState({ x: '50%', y: '50%' });
  const FINE = finePointer();
  const RM = reduced();

  const setIn = useCallback(
    (on, e) => {
      if (!interior || !ph.current) return;
      if (on) {
        const b = ph.current.getBoundingClientRect();
        setPt({ x: `${e ? e.clientX - b.left : b.width / 2}px`, y: `${e ? e.clientY - b.top : b.height / 2}px` });
      }
      setInn(on);
      if (FINE) stitch(on);
    },
    [interior, FINE],
  );
  const stop = () => {
    live.touched = true;
    clearInterval(live.breathe);
  };

  // touch: the card nearest the centre plays exterior -> interior -> exterior once after a 500ms dwell
  const node = useRef(null);
  useEffect(() => {
    if (!interior || FINE || RM) return undefined;
    let done = false, dwell = 0, back = 0;
    const io = new IntersectionObserver(
      ([en]) => {
        clearTimeout(dwell);
        if (en.isIntersecting && !done && !live.touched) {
          dwell = setTimeout(() => {
            done = true;
            setIn(true);
            back = setTimeout(() => !live.touched && setIn(false), 1500);
          }, 500);
        }
      },
      { threshold: 0.6 },
    );
    io.observe(node.current);
    return () => {
      io.disconnect();
      clearTimeout(dwell);
      clearTimeout(back);
    };
  }, [interior, FINE, RM, setIn, live]);

  // idle life on featured tiles: slow breathe until the first interaction
  useEffect(() => {
    if (!feat || !interior || RM) return undefined;
    const io = new IntersectionObserver(
      ([en]) => {
        clearInterval(live.breathe);
        if (en.isIntersecting && !live.touched) live.breathe = setInterval(() => setInn((v) => !v), 3000);
      },
      { threshold: 0.5 },
    );
    io.observe(node.current);
    return () => {
      io.disconnect();
      clearInterval(live.breathe);
    };
  }, [feat, interior, RM, live]);

  useEffect(
    () => () => {
      clearTimeout(live.enter);
      clearInterval(live.breathe);
    },
    [live],
  );

  const tilt = (e) => {
    if (e.pointerType !== 'mouse' || RM) return;
    const b = ph.current.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
    ph.current.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };
  const maskCls = p.mask === 'torn' ? '' : `m-${p.mask}`;
  const isCat = variant === 'cat';

  return (
    <figure
      ref={node}
      className={`card ${isCat ? '' : 'sc'} ${cls}${inn ? ' in' : ''}`}
      style={{ '--x': pt.x, '--y': pt.y }}
      data-word={word}
      tabIndex={0}
      role="button"
      aria-label={p.name}
      onPointerEnter={(e) => {
        if (e.pointerType !== 'mouse') return;
        stop();
        live.enter = setTimeout(() => setIn(true, e), 80);
      }}
      onPointerLeave={(e) => {
        clearTimeout(live.enter);
        if (e.pointerType === 'mouse') setIn(false);
        if (ph.current) ph.current.style.transform = '';
      }}
      onPointerMove={tilt}
      onFocus={() => {
        stop();
        setIn(true);
      }}
      onBlur={() => setIn(false)}
      onClick={(e) => {
        stop();
        if (!FINE && interior && !inn) setIn(true, e); // touch: first tap shows the inside, second opens
        else open(p.id);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(p.id);
        }
      }}
    >
      <div className="stage" data-cursor="product">
        <div className={`ph ${maskCls}`} ref={ph} style={clip ? { clipPath: clip } : undefined}>
          {exterior ? <Img k={exterior} alt={p.name} sizes={sizes} style={{ objectPosition: FOCAL[p.e] || '50% 50%' }} /> : <Silhouette />}
          {interior && (
            <div className="int">
              <Img k={interior} alt={`${p.name}, inside`} sizes={sizes} />
            </div>
          )}
          {interior && isCat && (
            <svg className="ct hd" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" d="M18 30C18 6 82 6 82 30L90 92H10Z" />
            </svg>
          )}
        </div>
        {!isCat && (
          <button
            className="qa"
            aria-label={`Add ${p.name} to bag`}
            data-cursor="link"
            onClick={(e) => {
              e.stopPropagation();
              add();
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <svg width="20" height="20" viewBox="0 0 26 26" fill="none" stroke="#3A2A24" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M5 9h16l1.5 14h-19zM9 9V7a4 4 0 018 0v2M13 13v6M10 16h6" />
            </svg>
          </button>
        )}
      </div>
      {isCat ? (
        <figcaption className="cap">
          <h3>{p.name}</h3>
          <span className="small">{p.category} · <span className="ph-note">price to be added</span></span>
        </figcaption>
      ) : (
        <figcaption>
          <h3>{p.name}</h3>
          <span className="small">{p.category}</span>
          <span className="small">{p.price || <span className="ph-note">Price to be added</span>}</span>
        </figcaption>
      )}
      {children}
    </figure>
  );
}
