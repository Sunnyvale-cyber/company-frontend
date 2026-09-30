export default function About() {
  return (
    <div className="px-6 py-20 text-blueprint-950">
      <div className="mx-auto max-w-4xl">
      <p className="font-display uppercase tracking-[0.3em] text-site-amber text-sm mb-4">
        About Us
      </p>
      <h1 className="text-5xl mb-8">Built On Reputation</h1>
      <div className="prose-none text-justify text-lg leading-relaxed text-blueprint-950/80 space-y-6">
        <p>
         Fasat Integrated Services Limited is a premier
real estate and construction firm dedicated to
transforming the African housing landscape by
turning property into place, and buildings into
homes. We specialize in end-to-end property
solutions encompassing residential and
commercial construction, expert project
management and site supervision, strategic
land acquisition, property sales, and
comprehensive after-sales support. Driven by
a commitment to modern design, accessibility,
and uncompromised professionalism, Fasat
delivers high-quality, inclusive living spaces
tailored for discerning clients . By
bridging the gap between affordability and
contemporary architecture, we do not just build
structures; we create lasting, human-centric
environments across the continent.
        </p>
        <p>
          Our approach favors clear timelines and honest budgeting over the
          surprises that plague so many builds. Every project — residential,
          commercial, or renovation — gets the same site discipline and the same
          attention to detail.
        </p>
      </div>

      <div className="grid gap-6 mt-16 sm:grid-cols-3">
        <div className="border border-site-concrete/30 p-6 plan-corners">
          <span className="font-display text-4xl text-site-amber block mb-1">10+</span>
          <span className="text-sm uppercase tracking-widest text-site-concreteDark">
            Years Building
          </span>
        </div>
        <div className="border border-site-concrete/30 p-6 plan-corners">
          <span className="font-display text-4xl text-site-amber block mb-1">40+</span>
          <span className="text-sm uppercase tracking-widest text-site-concreteDark">
            Projects Delivered
          </span>
        </div>
        <div className="border border-site-concrete/30 p-6 plan-corners">
          <span className="font-display text-4xl text-site-amber block mb-1">100%</span>
          <span className="text-sm uppercase tracking-widest text-site-concreteDark">
            On-Site Supervision
          </span>
        </div>
      </div>
      </div>
    </div>
  );
}
