import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard.jsx';
import Marquee from './Marquee.jsx';
import { FEATURED } from '../data/products.js';
import { torn } from '../lib/torn.js';

// catalogue rhythm (repeats every 6): feature, tall, small, wide, tilted, pill
const SIZES = [
  '(max-width:860px) 92vw, 58vw',
  '(max-width:860px) 46vw, 33vw',
  '(max-width:860px) 46vw, 25vw',
  '(max-width:860px) 92vw, 62vw',
  '(max-width:860px) 46vw, 40vw',
  '(max-width:860px) 46vw, 30vw',
];

export default function Catalogue() {
  const clips = useMemo(() => FEATURED.map((_, k) => torn(k * 7 + 3)), []);
  const items = [];
  FEATURED.forEach((p, k) => {
    if (k && k % 6 === 0) items.push(<Marquee key={`m${k}`} words={['objects to fall for', 'little details']} dir={-1} />);
    const r = k % 6;
    items.push(
      <ProductCard
        key={p.id}
        p={p}
        variant="cat"
        cls={`r${r}`}
        feat={k === 0}
        sizes={SIZES[r]}
        clip={p.mask === 'torn' ? clips[k] : undefined}
        word={r === 3 ? p.category.split(' ')[0].toLowerCase() : undefined}
      >
        {k === 0 && <span className="hand hnote" style={{ right: '-2%', top: '8%' }}>room for everything.</span>}
        {r === 1 && <span className="hand hnote" style={{ left: '-12%', top: '30%' }}>and little secrets.</span>}
      </ProductCard>,
    );
  });
  return (
    <section id="cat">
      <h2 className="head rv">Objects to fall for.</h2>
      <div className="grid">{items}</div>
      <p style={{ textAlign: 'center', marginTop: 70 }}>
        <Link className="cta" to="/store" data-cursor="link">SHOP THE STORE →</Link>
      </p>
    </section>
  );
}
