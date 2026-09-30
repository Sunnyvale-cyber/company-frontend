import { useEffect, useState } from 'react';
import { api } from '../../api/client';

const initialForm = {
  title: '',
  description: '',
  category: 'residential',
  status: 'ongoing',
  location: '',
  images: [],
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await api.getAdminProjects();
      setProjects(Array.isArray(data) ? data : data.projects || []);
    } catch (err) {
      setError(err.message || 'Unable to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const payload = {
        ...form,
        images: form.images.filter(Boolean),
      };

      if (editingId) {
        await api.updateProject(editingId, payload);
      } else {
        await api.createProject(payload);
      }

      setForm(initialForm);
      setEditingId(null);
      await loadProjects();
    } catch (err) {
      setError(err.message || 'Unable to save project');
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setForm({
      title: project.title || '',
      description: project.description || '',
      category: project.category || 'residential',
      status: project.status || 'ongoing',
      location: project.location || '',
      images: project.images || [],
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await api.deleteProject(id);
      await loadProjects();
    } catch (err) {
      setError(err.message || 'Unable to delete project');
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      setUploading(true);
      const fd = new FormData();
      files.forEach((file) => fd.append('files', file));
      const data = await api.uploadProjectImage(fd);
      const urls = Array.isArray(data?.urls) ? data.urls : [data?.url || data?.secure_url].filter(Boolean);
      setForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
    } catch (err) {
      setError(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 font-display text-sm uppercase tracking-[0.3em] text-site-amber">Projects</p>
        <h1 className="text-3xl md:text-4xl">Manage portfolio projects</h1>
      </div>

      {error ? <p className="text-site-amberDark">{error}</p> : null}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="space-y-4 border border-site-concrete/40 bg-site-paper p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-blueprint-950/70">Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-site-concrete/40 bg-white px-3 py-2 outline-none focus:border-site-amber"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-blueprint-950/70">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-site-concrete/40 bg-white px-3 py-2 outline-none focus:border-site-amber"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="renovation">Renovation</option>
                <option value="infrastructure">Infrastructure</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-blueprint-950/70">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows="4"
              className="w-full border border-site-concrete/40 bg-white px-3 py-2 outline-none focus:border-site-amber"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-blueprint-950/70">Location</label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full border border-site-concrete/40 bg-white px-3 py-2 outline-none focus:border-site-amber"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-blueprint-950/70">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-xl border border-site-concrete/25 px-3 py-2 outline-none focus:border-site-amber"
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-blueprint-950/70">Upload Images</label>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="w-full border border-dashed border-site-concrete/40 px-3 py-3" />
            {uploading ? <p className="mt-2 text-sm text-blueprint-950/60">Uploading…</p> : null}
          </div>

          {form.images.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {form.images.map((img, idx) => (
                <img key={`${img}-${idx}`} src={img} alt="Uploaded preview" className="h-20 w-24 rounded-lg object-cover" />
              ))}
            </div>
          ) : null}

          <div className="flex gap-3">
            <button type="submit" className="bg-blueprint-950 px-4 py-2 font-display uppercase tracking-[0.28em] text-site-paper">
              {editingId ? 'Update Project' : 'Add Project'}
            </button>
            {editingId ? (
              <button type="button" onClick={() => { setEditingId(null); setForm(initialForm); }} className="border border-site-concrete/40 px-4 py-2">
                Cancel
              </button>
            ) : null}
          </div>
        </form>

        <div className="border border-site-concrete/40 bg-site-paper p-6">
          <h2 className="mb-4 text-xl">Existing Projects</h2>
          {loading ? <p className="text-blueprint-950/60">Loading…</p> : null}
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id} className="border-t border-site-concrete/30 p-4 px-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-blueprint-950">{project.title}</p>
                    <p className="text-sm text-blueprint-950/60">{project.category} • {project.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(project)} className="text-sm text-site-amber">Edit</button>
                    <button onClick={() => handleDelete(project.id)} className="text-sm text-site-amberDark">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
