import { useEffect, useMemo, useRef, useState } from 'react';
import { Img } from './Img.jsx';
import { has, src } from '../data/images.js';
import { ALL, FOCAL } from '../data/products.js';
import { useBag } from '../lib/bag.jsx';
import { reduced } from '../hooks/useEnv.js';

const ANN = { e: ['made slowly, with love.', [8, 12]], i: ['room for little essentials.', [10, 70]], d: ['thoughtfully stitched.', [10, 16]] };
const LABEL = { e: 'outside', i: 'inside', d: 'detail' };
const Ph = ({ v }) => (v ? v : <span className="ph-note">to be added</span>);

/** Digital object exhibition: auto-cycling gallery (outside → inside → detail), notes follow the visible image. */
export default function ProductModal() {
  const { openId, close, add } = useBag();
  const p = ALL.find((x) => x.id === openId);
  const views = useMemo(() => (p ? [['e', p.e], ['i', p.i], ['d', p.d]].filter((v) => has(v[1])) : []), [p]);
  const [idx, setIdx] = useState(0);
  const [hold, setHold] = useState(false);
  const [acted, setActed] = useState(false);
  const box = useRef(null);
  const closeBtn = useRef(null);

  useEffect(() => {
    setIdx(0);
    setHold(false);
    setActed(false);
    if (!p) return undefined;
    document.documentElement.style.overflow = 'hidden';
    closeBtn.current?.focus();
    if (box.current) box.current.scrollTop = 0;
    const esc = (e) => e.key === 'Escape' && close();
    addEventListener('keydown', esc);
    return () => {
      document.documentElement.style.overflow = '';
      removeEventListener('keydown', esc);
    };
  }, [openId]); // eslint-disable-line react-hooks/exhaustive-deps

  // auto-cycle after 2.5s of dwell, then every 3s; any interaction or "hold" stops it
  useEffect(() => {
    if (!p || views.length < 2 || hold || acted || reduced()) return undefined;
    let iv = 0;
    const t = setTimeout(() => (iv = setInterval(() => setIdx((i) => (i + 1) % views.length), 3000)), 2500);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  }, [p, views.length, hold, acted]);

  if (!p) return null;
  const [kind] = views[idx] || ['e'];
  const [note, [nx, ny]] = ANN[kind];
  const pick = (k) => {
    setActed(true);
    setIdx(k);
  };
  return (
    <div id="pv" className="show" role="dialog" aria-modal="true" aria-label={p.name} ref={box}>
      <button className="x" ref={closeBtn} aria-label="Close product" data-cursor="link" onClick={close}>
        <svg width="20" height="20" viewBox="0 0 20 20" stroke="#3A2A24" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M4 4l12 12M16 4L4 16" />
        </svg>
      </button>
      <div className="pbg" aria-hidden="true">{p.category.split(' ')[0].toLowerCase()}</div>
      <div className="pwrap">
        <div className="pimg" data-cursor="product">
          <div className="stage">
            <div className="ph m-arch" id="pph" onPointerDown={() => setActed(true)}>
              {views.map(([k, key], j) => (
                <Img
                  key={key}
                  k={key}
                  alt={`${p.name}, ${LABEL[k]}`}
                  eager
                  sizes="(max-width:860px) 100vw, 58vw"
                  className={j === idx ? 'on' : ''}
                  style={{ objectPosition: k === 'e' ? FOCAL[p.e] || '50% 50%' : '50% 50%' }}
                />
              ))}
              <div className="ann" key={`${p.id}-${kind}`}>
                <span className="hand" style={{ left: `${nx}%`, top: `${ny}%` }}>{note}</span>
                <svg className="dr hd on" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
                  <path pathLength="1" style={{ stroke: '#FAF4EA' }} d={`M${nx + 8} ${ny + 10}C${nx + 20} ${ny + 22} 40 ${ny + 26} 48 ${ny + 34}`} />
                </svg>
              </div>
            </div>
          </div>
          <div className="th">
            {views.map(([k, key], j) => (
              <button key={key} className={j === idx ? 'on' : ''} aria-label={`Show ${LABEL[k]} view`} onClick={() => pick(j)}>
                <img alt="" src={src(key, 480)} width="62" height="62" />
              </button>
            ))}
            <button className={`hold${hold ? ' on' : ''}`} aria-label="Hold this view" aria-pressed={hold} onClick={() => setHold((h) => !h)}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#3A2A24" strokeWidth="1.6" aria-hidden="true">
                <path d="M6 8h10l1 10H5zM8 8V6a3 3 0 016 0v2" />
              </svg>
            </button>
          </div>
        </div>
        <div className="pinfo">
          <h2>{p.name}</h2>
          <p className="hand">made slowly, with love.</p>
          <dl>
            <dt>Collection</dt><dd>{p.category}</dd>
            <dt>Price</dt><dd><Ph v={p.price} /></dd>
            <dt>Material</dt><dd><Ph v={p.material} /></dd>
            <dt>Dimensions</dt><dd><Ph v={p.dims} /></dd>
            <dt>Interior</dt><dd>{has(p.i) ? 'Photographed — see the inside view' : <Ph />}</dd>
          </dl>
          <button className="cta" data-cursor="link" onClick={() => { add(); close(); }}>ADD TO BAG →</button>
        </div>
      </div>
    </div>
  );
}

