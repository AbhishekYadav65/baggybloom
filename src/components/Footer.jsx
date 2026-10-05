import { Link } from 'react-router-dom';
import { useReveal } from '../lib/reveal.js';
import { useGo } from '../lib/useGo.js';

export default function Footer() {
  const ref = useReveal(0.25);
  const go = useGo();
  return (
    <footer id="ft" ref={ref}>
      <svg className="bow" viewBox="0 0 130 90" aria-hidden="true">
        <path pathLength="1" d="M65 45C40 5 5 15 14 42c8 24 40 6 51 3 11 3 43 21 51-3 9-27-26-37-51 3zM65 45C58 62 48 78 40 88M65 45C72 62 82 78 90 88" />
      </svg>
      <div className="wm" aria-label="BaggyBloom">
        {[...'BaggyBloom'].map((c, i) => (
          <span key={i} aria-hidden="true" style={{ '--i': i, '--r': `${(i % 2 ? 1 : -1) * (2 + (i % 3))}deg` }}>
            {c}
          </span>
        ))}
      </div>
      <h2>Carry a little wonder.</h2>
      <div className="fl">
        <a href="#rooms" onClick={go('rooms')}>Collections</a>
        <a href="#cat" onClick={go('cat')}>Objects</a>
        <Link to="/store">Store</Link>
        <a href="#story" onClick={go('story')}>Story</a>
        <a href="#top" onClick={(e) => e.preventDefault()}>Instagram (link to add)</a>
      </div>
      <p className="small" style={{ opacity: 0.7, marginTop: 30 }}>
        Frontend prototype · prices, materials and dimensions are placeholders until supplied
      </p>
    </footer>
  );
}
