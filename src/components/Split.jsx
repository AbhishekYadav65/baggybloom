/** Per-character entrance. Wrap in an element that gets `.on` (see lib/reveal.js). `i0` offsets the stagger. */
export default function Split({ t, i0 = 0 }) {
  let i = i0;
  return t.split(/(\s+)/).map((w, k) =>
    /^\s*$/.test(w) ? (
      w
    ) : (
      <span className="w" key={k}>
        {[...w].map((c, j) => (
          <span className="u" key={j} style={{ '--i': i++ }}>
            {c}
          </span>
        ))}
      </span>
    ),
  );
}
