import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/inquiries', label: 'Inquiries' },
  { to: '/admin/settings', label: 'Settings' },
];

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-site-paper">
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between border-b border-blueprint-900/10 bg-site-paper px-4 py-4 md:hidden">
        <p className="font-display text-lg tracking-wider text-blueprint-950">
          FASAT <span className="text-site-amber">ADMIN</span>
        </p>
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="border border-blueprint-900/15 px-3 py-2 font-display text-xs uppercase tracking-widest text-blueprint-950"
          aria-expanded={menuOpen}
          aria-controls="admin-navigation"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </header>
      <aside
          id="admin-navigation"
          className={`${menuOpen ? 'flex' : 'hidden'} absolute inset-x-0 top-[65px] z-40 flex-col bg-blueprint-950 text-site-paper shadow-xl md:static md:flex md:w-60 md:shrink-0 md:shadow-none`}
      >
        <div className="hidden border-b border-blueprint-line px-6 py-6 md:block">
          <p className="font-display text-lg tracking-wider">
            FASAT <span className="text-site-amber">ADMIN</span>
          </p>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 font-display uppercase tracking-widest text-sm transition-colors ${
                  isActive
                    ? 'bg-site-amber text-blueprint-950'
                    : 'text-site-paper/70 hover:text-site-amber'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-blueprint-line px-4 py-6">
          <p className="mb-3 truncate text-xs text-site-paper/60">{user?.email}</p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mb-3 block px-3 py-2 font-display text-sm uppercase tracking-widest text-site-paper/70 transition-colors hover:text-site-amber"
          >
            View Site
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 text-left font-display text-sm uppercase tracking-widest text-site-paper/70 transition-colors hover:text-site-amber"
          >
            Log Out
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 overflow-y-auto px-4 pb-4 pt-20 sm:px-6 md:p-8">{children}</main>
    </div>
  );
}
