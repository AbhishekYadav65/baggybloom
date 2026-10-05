import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { BagProvider } from './lib/bag.jsx';
import { reduced } from './hooks/useEnv.js';
import WordlessCursor from './components/WordlessCursor.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import ProductModal from './components/ProductModal.jsx';
import Home from './pages/Home.jsx';
import Store from './pages/Store.jsx';

export default function App() {
  const { pathname, state } = useLocation();

  // new page -> top (unless a nav link asked for a section)
  useEffect(() => {
    if (!state?.scroll) window.scrollTo(0, 0);
  }, [pathname, state]);

  // "line boil": re-seed the displacement filter at ~10fps so drawn lines feel hand-animated
  useEffect(() => {
    if (reduced()) return undefined;
    const bt = document.getElementById('bt');
    let s = 1;
    const id = setInterval(() => bt?.setAttribute('seed', String((s = (s % 9) + 1))), 100);
    return () => clearInterval(id);
  }, []);

  return (
    <BagProvider>
      <WordlessCursor />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <ProductModal />
    </BagProvider>
  );
}
