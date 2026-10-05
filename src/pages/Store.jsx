import { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { ALL, CATS } from '../data/products.js';
import { has } from '../data/images.js';
import { useRevealAll } from '../lib/reveal.js';

const SW = { red: '#C93A3A', pink: '#F0A9B8', blue: '#8FB3D9', orange: '#EE8A3C', green: '#A9C08E', lavender: '#BDA9DB', multi: 'conic-gradient(#C93A3A,#3F5F86,#D6A445,#A9C08E,#C93A3A)' };
const count = (f) => ALL.filter(f).length;
const COLS = [...new Set(ALL.map((p) => p.col))];
const PATS = [...new Set(ALL.map((p) => p.pat))].sort();
const HAS_PRICE = ALL.some((p) => p.price); // price filter appears once prices exist in data/products.js
const flip = (set, v) => {
  const n = new Set(set);
  if (n.has(v)) n.delete(v);
  else n.add(v);
  return n;
};
const SORTS = {
  az: (a, b) => a.name.localeCompare(b.name),
  za: (a, b) => b.name.localeCompare(a.name),
  lo: (a, b) => a.price - b.price,
  hi: (a, b) => b.price - a.price,
};

export default function Store() {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const [cols, setCols] = useState(new Set());
  const [pats, setPats] = useState(new Set());
  const [inn, setInn] = useState(false);
  const [sort, setSort] = useState('f');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [panel, setPanel] = useState(false);
  useRevealAll();
  useEffect(() => {
    document.title = 'Store — BaggyBloom';
  }, []);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase(), lo = Number(min) || 0, hi = Number(max) || Infinity;
    const r = ALL.filter(
      (p) =>
        (cat === 'All' || p.category === cat) &&
        (!s || `${p.name} ${p.category} ${p.pat} ${p.col}`.toLowerCase().includes(s)) &&
        (!cols.size || cols.has(p.col)) &&
        (!pats.size || pats.has(p.pat)) &&
        (!inn || has(p.i)) &&
        (!HAS_PRICE || ((Number(p.price) || 0) >= lo && (Number(p.price) || 0) <= hi)),
    );
    return SORTS[sort] ? [...r].sort(SORTS[sort]) : r;
  }, [cat, q, cols, pats, inn, sort, min, max]);

  const clear = () => {
    setCat('All');
    setQ('');
    setCols(new Set());
    setPats(new Set());
    setInn(false);
    setSort('f');
    setMin('');
    setMax('');
  };

  return (
    <main id="top">
      <section id="store">
        <h1 className="head rv">The store.</h1>
        <div id="cats" role="group" aria-label="Category">
          {['All', ...CATS].map((c) => (
            <button key={c} className={`chip${cat === c ? ' on' : ''}`} aria-pressed={cat === c} data-cursor="link" onClick={() => setCat(c)}>
              {c}
              <span>{c === 'All' ? ALL.length : count((p) => p.category === c)}</span>
            </button>
          ))}
        </div>
        <div className="stools">
          <input id="q" type="search" placeholder="Search bags" aria-label="Search bags" data-cursor="text" value={q} onChange={(e) => setQ(e.target.value)} />
          <select id="sort" aria-label="Sort by" data-cursor="text" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="f">Featured</option>
            <option value="az">Name A–Z</option>
            <option value="za">Name Z–A</option>
            {HAS_PRICE && <option value="lo">Price: low to high</option>}
            {HAS_PRICE && <option value="hi">Price: high to low</option>}
          </select>
          <button id="ftog" aria-expanded={panel} aria-controls="fp" onClick={() => setPanel((o) => !o)}>Filters</button>
        </div>
        <div className="swrap">
          <aside id="fp" className={panel ? 'open' : ''} aria-label="Filters">
            <fieldset>
              <legend>Colour</legend>
              <div className="sws">
                {COLS.map((c) => (
                  <button
                    key={c}
                    className={`sw${cols.has(c) ? ' on' : ''}`}
                    aria-pressed={cols.has(c)}
                    aria-label={c === 'multi' ? 'multicolour' : c}
                    title={c === 'multi' ? 'multicolour' : c}
                    style={{ background: SW[c] }}
                    data-cursor="link"
                    onClick={() => setCols(flip(cols, c))}
                  />
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Pattern</legend>
              {PATS.map((x) => (
                <label key={x}>
                  <input type="checkbox" checked={pats.has(x)} onChange={() => setPats(flip(pats, x))} />
                  {x}
                  <span>{count((p) => p.pat === x)}</span>
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>Details</legend>
              <label>
                <input type="checkbox" checked={inn} onChange={(e) => setInn(e.target.checked)} />
                Interior photographed
                <span>{count((p) => has(p.i))}</span>
              </label>
            </fieldset>
            {HAS_PRICE ? (
              <fieldset>
                <legend>Price</legend>
                <input type="number" min="0" placeholder="Min" aria-label="Minimum price" value={min} onChange={(e) => setMin(e.target.value)} />{' '}
                <input type="number" min="0" placeholder="Max" aria-label="Maximum price" value={max} onChange={(e) => setMax(e.target.value)} />
              </fieldset>
            ) : (
              <p className="small ph-note">Price filter appears once prices are added.</p>
            )}
            <button className="lnk2" data-cursor="link" onClick={clear}>Clear all</button>
          </aside>
          <div>
            <p className="small" aria-live="polite">{list.length} of {ALL.length} bags</p>
            <div id="sgrid">
              {list.map((p) => (
                <ProductCard key={p.id} p={p} variant="store" sizes="(max-width:860px) 46vw, 22vw" />
              ))}
            </div>
            {!list.length && (
              <p id="empty">
                No bags match these filters. <button className="lnk2" onClick={clear}>Clear filters</button>
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
