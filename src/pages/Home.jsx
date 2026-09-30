import { Link } from 'react-router-dom';

const process = [
  { step: '01', title: 'Site Survey', desc: 'We assess the land, terrain, and client requirements before any design work begins.' },
  { step: '02', title: 'Design & Planning', desc: 'Architectural drawings and material specs are finalized and agreed with the client.' },
  { step: '03', title: 'Construction', desc: 'Our crews execute the build with regular progress updates and quality checks.' },
  { step: '04', title: 'Handover', desc: 'Final inspection, documentation, and keys handed over to the client.' },
];

const highlights = [
  {
    title: 'Precision Planning',
    desc: 'Every detail is mapped early so your build stays on budget, on schedule, and aligned with your vision.',
  },
  {
    title: 'Quality Craftsmanship',
    desc: 'We combine modern execution with careful attention to finish, durability, and long-term value.',
  },
  {
    title: 'Transparent Delivery',
    desc: 'Clear updates, realistic milestones, and dependable project leadership from day one to handover.',
  },
];

export default function Home() {
  return (
    <div className="pb-20">
      <section className="hero-panel text-blueprint-950">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              
              <p className="mb-6 font-display text-sm uppercase tracking-[0.32em] text-site-amber">FASAT Integrated Services / Lagos</p>
              <h1 className="mb-6 max-w-3xl text-5xl leading-[0.95] md:text-7xl">
                Serious work.<br /><span className="text-site-amber">Solid results.</span>
              </h1>
              <p className="mb-8 max-w-xl text-lg text-blueprint-950/80">
                Construction management, residential builds, and commercial fit-outs delivered with practical planning and a visible chain of responsibility.
              </p>
              <div className="mb-8 flex flex-wrap gap-4">
                <Link
                  to="/portfolio"
                  className="rounded-full bg-site-amber px-6 py-3 font-display uppercase tracking-[0.24em] text-blueprint-950 transition-colors hover:bg-site-amberDark"
                >
                  View Our Work
                </Link>
                <Link
                  to="/contact"
                  className="rounded-full border border-site-paper/40 px-6 py-3 font-display uppercase tracking-[0.24em] text-site-paper transition-colors hover:border-site-amber hover:text-site-amber"
                >
                  Get a Quote
                </Link>
              </div>
              <div className="grid max-w-xl grid-cols-3 border-t border-site-paper/20 pt-5 text-xs uppercase tracking-[0.2em] text-site-paper/65">
                <span>Residential</span>
                <span>Commercial</span>
                <span>Renovation</span>
              </div>
            </div>

            <div className="section-card border-blueprint-950/15 bg-white/60 p-8 text-blueprint-950">
              <p className="font-display text-sm uppercase tracking-[0.28em] text-site-amber">At a glance</p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-blueprint-950/10 bg-white/50 p-4">
                  <p className="font-display text-3xl text-site-amber">01</p>
                  <p className="mt-1 text-sm text-blueprint-950/70">Clear point of contact from brief to handover</p>
                </div>
                <div className="rounded-2xl border border-blueprint-950/10 bg-white/50 p-4">
                  <p className="font-display text-3xl text-site-amber">04</p>
                  <p className="mt-1 text-sm text-blueprint-950/70">Practical stages: survey, plan, build, handover</p>
                </div>
                <div className="rounded-2xl border border-blueprint-950/10 bg-white/50 p-4">
                  <p className="font-display text-3xl text-site-amber">LAG</p>
                  <p className="mt-1 text-sm text-blueprint-950/70">Working across Lagos and surrounding areas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-site-amber">Why Clients Choose Us</p>
            <h2 className="text-3xl md:text-4xl">Built with discipline, clarity, and craftsmanship.</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="section-card p-8">
              <h3 className="mb-3 text-xl">{item.title}</h3>
              <p className="text-blueprint-950/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-10">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-site-amber">How We Build</p>
          <h2 className="text-3xl md:text-4xl">A clear path from concept to handover.</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-4">
          {process.map((p) => (
            <div key={p.step} className="plan-corners section-card border-site-concrete/30 p-6 transition-transform duration-300 hover:-translate-y-1">
              <span className="mb-3 block font-display text-5xl text-site-amber">{p.step}</span>
              <h3 className="mb-2 text-xl">{p.title}</h3>
              <p className="text-sm text-blueprint-950/70">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-blueprint-950 p-8 text-site-paper md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 font-display text-sm uppercase tracking-[0.3em] text-site-amber">Ready to begin?</p>
              <h2 className="text-3xl md:text-4xl">Have a project in mind?</h2>
            </div>
            <Link
              to="/contact"
              className="inline-flex rounded-full bg-site-amber px-6 py-3 font-display uppercase tracking-[0.24em] text-blueprint-950 transition-colors hover:bg-site-amberDark"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
