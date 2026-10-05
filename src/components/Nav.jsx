import { Link, NavLink } from 'react-router-dom';
import { useBag } from '../lib/bag.jsx';
import { useGo } from '../lib/useGo.js';
import { LOGO } from '../data/images.js';

export default function Nav() {
  const { bag } = useBag();
  const go = useGo();
  return (
    <nav>
      <Link to="/" aria-label="BaggyBloom home" onClick={go('top')}>
        <img className="lg" alt="BaggyBloom" src={LOGO} width="77" height="54" />
      </Link>
      <div className="links">
        <a href="#rooms" onClick={go('rooms')}>Collections</a>
        <a href="#cat" onClick={go('cat')}>Objects</a>
        <NavLink className="st" to="/store">Store</NavLink>
        <a href="#story" onClick={go('story')}>Story</a>
        <button className="bagbtn" data-cursor="link" aria-label={`Bag, ${bag} items`}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#3A2A24" strokeWidth="1.6" aria-hidden="true">
            <path d="M5 9h16l1.5 14h-19zM9 9V7a4 4 0 018 0v2" />
          </svg>
          <b className={bag ? 'on' : ''}>{bag}</b>
        </button>
      </div>
    </nav>
  );
}
