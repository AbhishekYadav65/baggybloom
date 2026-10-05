import { useEffect, useRef } from 'react';

/** Adds `.on` to every .rv / .dr element on the page the first time it scrolls into view. */
export function useRevealAll() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('on');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.2 },
    );
    document.querySelectorAll('.rv,.dr').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Same, for a single element. */
export function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('on');
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}
