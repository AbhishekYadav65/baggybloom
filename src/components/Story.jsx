import { CREATOR } from '../data/images.js';
import Split from './Split.jsx';

export default function Story() {
  return (
    <section id="story">
      <div className="pic rv">
        <div className="stage">
          <div className="ph m-arch">
            <img src={CREATOR} alt="Portrait supplied for the creator story" width="347" height="440" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
      <h2 className="rv">
        <Split t="Not made by machines. Made with " />
        <em><Split t="intention." i0={26} /></em>
      </h2>
      <span className="hand rv">a little about us, stitched slowly.</span>
      <a className="cta rv" style={{ gridColumn: '7/13', justifySelf: 'start' }} href="#story" onClick={(e) => e.preventDefault()} data-cursor="link">A LITTLE ABOUT US →</a>
    </section>
  );
}
