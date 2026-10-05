import { lazy, Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Intro from '../components/Intro.jsx';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import Collections from '../components/Collections.jsx';
import Catalogue from '../components/Catalogue.jsx';
import ProductFilm from '../components/ProductFilm.jsx';
import Story from '../components/Story.jsx';
import GoldenThread2D from '../components/GoldenThread2D.jsx';
import GLBoundary from '../components/GLBoundary.jsx';
import { useRevealAll } from '../lib/reveal.js';
import { useTier } from '../hooks/useEnv.js';

const Scene3D = lazy(() => import('../components/Scene3D.jsx')); // three.js only downloads on capable devices

export default function Home() {
  const tier = useTier();
  const [gl, setGl] = useState(false);
  const { state } = useLocation();
  useRevealAll();
  useEffect(() => {
    document.title = 'BaggyBloom — Carry a little wonder';
  }, []);
  useEffect(() => {
    if (!state?.scroll) return undefined;
    const t = setTimeout(() => {
      if (state.scroll === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.getElementById(state.scroll)?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
    return () => clearTimeout(t);
  }, [state]);

  return (
    <>
      <Intro />
      {tier !== 'C' && (
        <GLBoundary>
          <Suspense fallback={null}>
            <Scene3D tier={tier} onReady={() => setGl(true)} />
          </Suspense>
        </GLBoundary>
      )}
      <GoldenThread2D />
      <main id="top">
        <Hero gl={gl} />
        <Marquee cls="b" words={['made slowly, with love', 'bloom with every bag']} />
        <Collections />
        <Catalogue />
        <ProductFilm />
        <Story />
      </main>
    </>
  );
}
