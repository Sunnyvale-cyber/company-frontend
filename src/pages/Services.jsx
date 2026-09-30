import { useEffect, useRef, useState } from 'react';

const services = [
  {
    title: 'Residential Construction',
    desc: 'Custom homes, duplexes, and bungalows built from foundation to finish, tailored to family needs and budget.',
    accent: 'from-site-amber/10 via-white to-blueprint-950/5',
  },
  {
    title: 'Commercial Construction',
    desc: 'Office spaces, retail units, and mixed-use buildings delivered on schedule with commercial-grade materials.',
    accent: 'from-site-amber/10 via-site-paper to-blueprint-900/5',
  },
  {
    title: 'Renovation & Remodeling',
    desc: 'Structural upgrades, interior remodels, and additions to existing properties without disrupting daily life.',
    accent: 'from-blueprint-900/5 via-site-paper to-site-amber/10',
  },
  {
    title: 'Infrastructure & Site Works',
    desc: 'Access roads, drainage, fencing, and general site preparation ahead of a larger build.',
    accent: 'from-site-amber/10 via-white to-blueprint-900/5',
  },
];

export default function Services() {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleCards((prev) => (prev.includes(index) ? prev : [...prev, index]));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 font-display text-sm uppercase tracking-[0.3em] text-site-amberDark">
          What We Do
        </p>
        <h1 className="text-4xl md:text-5xl">Construction Services</h1>
        <p className="mt-4 text-lg leading-8 text-blueprint-950/70">
          Future-ready building solutions shaped by precision, technology, and a bold design sensibility.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((s, index) => (
          <div
            key={s.title}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            data-index={index}
              className={`group relative overflow-hidden border border-[rgba(0,0,0,0.08)] bg-site-paper p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] ${
              visibleCards.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <div className="absolute inset-y-0 left-0 w-1 bg-site-amberDark transition-all duration-300 group-hover:w-1.5 group-hover:bg-site-amber" />
            <div className="relative transition-transform duration-300">
              <div className="mb-5 flex items-center justify-between">
                <span className="font-display text-sm uppercase tracking-[0.3em] text-site-amberDark">
                  0{index + 1}
                </span>
              </div>
              <h2 className="mb-3 text-2xl transition-transform duration-300 group-hover:translate-x-1">
                {s.title}
              </h2>
              <p className="text-sm leading-7 text-blueprint-950/70 transition-all duration-300 group-hover:text-blueprint-950">
                {s.desc}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="absolute bottom-6 right-6 text-lg text-site-amberDark/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-site-amber"
            >
              &rarr;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
