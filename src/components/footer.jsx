import { Link } from 'react-router-dom';

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About us' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Our work' },
  { to: '/contact', label: 'Start a project' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 isolate mt-12 border-t border-white/15 bg-blueprint-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 text-xs md:grid-cols-[1.4fr_1fr_0.8fr] md:gap-8 md:py-10 md:text-sm">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <img
              src="/logo.svg"
              alt="FASAT Construction"
              className="h-9 w-auto object-contain"
            />
            <p className="font-display text-xs font-bold tracking-wider text-white sm:text-sm">
              FASAT CONSTRUCTION
            </p>
          </div>
          <p className="max-w-sm leading-5 text-white">
            Construction management, residential builds, and commercial fit-outs across Lagos, delivered with clear planning and accountable site leadership.
          </p>
        </div>
        <div>
          <p className="mb-2 font-display text-xs font-bold uppercase tracking-wider text-white">Contact</p>
          <address className="space-y-2 not-italic leading-5">
            <p className="text-white">2, Sefiu Rahmon Street<br />Ibeju-Lekki, Lagos State, Nigeria</p>
            <a className="block font-medium text-white underline-offset-4 transition-colors hover:text-site-amber hover:underline focus-visible:text-site-amber focus-visible:underline" href="mailto:info@fasatintegratedservices.com">info@fasatintegratedservices.com</a>
            <a className="block font-medium text-white underline-offset-4 transition-colors hover:text-site-amber hover:underline focus-visible:text-site-amber focus-visible:underline" href="tel:+2349135211613">+234 913 521 1613</a>
          </address>
        </div>
        <div className="border-t border-white/15 pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <p className="mb-2 font-display text-xs font-bold uppercase tracking-wider text-white">Site Map</p>
          <nav aria-label="Footer navigation" className="grid gap-1.5">
            {footerLinks.map((link) => (
              <Link key={link.to} to={link.to} className="font-medium text-white underline-offset-4 transition-colors hover:text-site-amber hover:underline focus-visible:text-site-amber focus-visible:underline">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-white/15 px-6 py-3 text-xs text-white sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} FASAT Construction. All rights reserved.</span>
        <span>Built for work that lasts.</span>
      </div>
    </footer>
  );
}
