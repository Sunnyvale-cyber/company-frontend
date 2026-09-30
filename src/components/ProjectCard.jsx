const statusColors = {
  ongoing: 'bg-site-amber text-blueprint-950',
  completed: 'bg-site-concrete text-white',
};

function getImageUrl(image) {
  if (!image) return null;
  if (typeof image === 'string') return image;
  if (typeof image === 'object') {
    return image.secure_url || image.url || image.publicUrl || null;
  }
  return null;
}

export default function ProjectCard({ project }) {
  const cover = getImageUrl(project.coverImage) || getImageUrl(project.image) || project.images?.map(getImageUrl).find(Boolean);

  return (
    <article className="plan-corners group border border-site-concrete/50 bg-site-paper">
      <div className="aspect-[4/3] bg-blueprint-900 overflow-hidden">
        {cover ? (
          <img
            src={cover}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full blueprint-bg flex items-center justify-center">
            <span className="font-display text-sm tracking-widest text-site-paper/50">
              PROJECT RECORD / IMAGE PENDING
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-display uppercase tracking-widest text-site-concreteDark">
            {project.category}
          </span>
          <span
              className={`px-2 py-0.5 text-xs font-display uppercase tracking-widest ${
              statusColors[project.status] || 'bg-site-concrete text-white'
            }`}
          >
            {project.status}
          </span>
        </div>
        <h3 className="mb-1 text-2xl">{project.title}</h3>
        <p className="text-sm text-blueprint-950/70 line-clamp-2">{project.description}</p>
        {project.location && (
          <p className="mt-2 text-xs text-site-concreteDark">SITE / {project.location}</p>
        )}
      </div>
    </article>
  );
}
