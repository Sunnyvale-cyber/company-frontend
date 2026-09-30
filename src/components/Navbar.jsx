import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-blueprint-950/20 bg-site-paper/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <NavLink
            to="/"
            className="flex shrink-0 items-center gap-3 transition-transform hover:-translate-y-0.5"
          >
    "
              alt="FASAT Construction"
              className="h-9 w-40 object-contain md:h-10 md:w-48"
            />
            <span className="hidden border-l border-blueprint-950/20 pl-3 font-display text-[10px] uppercase tracking-[0.2em] text-blueprint-950/60 sm:block">Built in Lagos</span>
          </NavLink>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center border border-blueprint-950/40 text-blueprint-950 transition-colors hover:border-site-amber hover:text-site-amber md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls="public-navigation"
          >
            <div className="flex flex-col gap-1.5">
              <span className="h-[2px] w-5 rounded-full bg-current" />
              <span className="h-[2px] w-5 rounded-full bg-current" />
              <span className="h-[2px] w-5 rounded-full bg-current" />
            </div>
          </button>
        </div>

        <ul id="public-navigation" className={`${open ? 'mt-4 flex' : 'hidden'} flex-col gap-3 border-t border-blueprint-950/20 pt-4 font-display text-[11px] uppercase tracking-[0.28em] text-blueprint-950/80 md:mt-0 md:flex md:flex-row md:gap-8 md:border-t-0 md:pt-0 md:text-sm`}>
          {links.map((link) => (
            <li key={link.to} className="shrink-0">
              <NavLink
                to={link.to}
                onClick={() => setOpen(false)}
                end={link.to === '/'}I
                className={({ isActive }) =>
                  `block border-b-2 pb-1 transition-colors ${
                    isActive
                      ? 'border-site-amber text-site-amber'
                      : 'border-transparent hover:text-site-amber'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
