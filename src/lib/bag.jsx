import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { storage } from '../hooks/useEnv.js';

const Ctx = createContext(null);
export const useBag = () => useContext(Ctx);

/** Bag count (persisted in localStorage) + which product is open in the product view. */
export function BagProvider({ children }) {
  const [bag, setBag] = useState(() => Number(storage.get('bb-bag')) || 0);
  const [openId, setOpenId] = useState(null);
  useEffect(() => storage.set('bb-bag', String(bag)), [bag]);
  const add = useCallback(() => setBag((b) => b + 1), []);
  const close = useCallback(() => setOpenId(null), []);
  const value = useMemo(() => ({ bag, add, openId, open: setOpenId, close }), [bag, add, openId, close]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
