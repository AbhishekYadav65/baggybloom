import { useLocation, useNavigate } from 'react-router-dom';

/** Smooth-scroll to a section on the home page, navigating there first when needed. */
export function useGo() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  return (id) => (e) => {
    e.preventDefault();
    if (pathname === '/') {
      if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else nav('/', { state: { scroll: id } });
  };
}
