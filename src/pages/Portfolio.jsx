import { useEffect, useState } from 'react';
import { api } from '../api/client';
import ProjectCard from '../components/ProjectCard';

const categories = ['all', 'residential', 'commercial', 'renovation', 'infrastructure'];
const statuses = ['all', 'ongoing', 'completed'];

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = {};
    if (category !== 'all') params.category = category;
    if (status !== 'all') params.status = status;

    api
      .getProjects(params)
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [category, status]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <p className="font-display uppercase tracking-[0.3em] text-site-amber text-sm mb-4">
        Our Work
      </p>
      <h1 className="text-5xl mb-8">Project Portfolio</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-10 border-b border-site-concrete/30 pb-6">
        <div>
          <label className="block text-xs font-display uppercase tracking-widest text-site-concreteDark mb-2">
            Category
          </label>
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`text-xs font-display uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                  category === c
                    ? 'bg-blueprint-950 text-site-paper border-blueprint-950'
                    : 'border-site-concrete/40 text-blueprint-950/70 hover:border-blueprint-950'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-widest text-site-concreteDark mb-2">
            Status
          </label>
          <div className="flex gap-2 flex-wrap">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`text-xs font-display uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                  status === s
                    ? 'bg-site-amber text-blueprint-950 border-site-amber'
                    : 'border-site-concrete/40 text-blueprint-950/70 hover:border-site-amber'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading && <p className="text-blueprint-950/60">Loading projects…</p>}

      {error && (
        <p className="text-site-amberDark">
          Couldn't load projects — {error}. Make sure the backend is running at the URL set in
          your <code>.env</code>.
        </p>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="text-blueprint-950/60">
          No projects match these filters yet. Try a different category or status.
        </p>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
