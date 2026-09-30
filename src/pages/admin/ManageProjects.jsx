import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import AdminLayout from '../../components/admin/AdminLayout';

const emptyForm = {
  title: '',
  description: '',
  category: 'residential',
  location: '',
  status: 'completed',
  completionDate: '',
};

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // null = not editing, 'new' = creating
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const loadProjects = () => {
    setLoading(true);
    api
      .getProjects()
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(loadProjects, []);

  const startCreate = () => {
    setForm(emptyForm);
    setFiles([]);
    setError(null);
    setEditingId('new');
  };

  const startEdit = (project) => {
    setForm({
      title: project.title || '',
      description: project.description || '',
      category: project.category || 'residential',
      location: project.location || '',
      status: project.status || 'completed',
      completionDate: project.completionDate || '',
    });
    setFiles([]);
    setError(null);
    setEditingId(project.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFiles([]);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      files.forEach((file) => formData.append('images', file));

      if (editingId === 'new') {
        await api.createProject(formData);
      } else {
        await api.updateProject(editingId, formData);
      }
      cancelEdit();
      loadProjects();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    try {
      await api.deleteProject(id);
      loadProjects();
    } catch (err) {
      alert(`Failed to delete: ${err.message}`);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl">Manage Projects</h1>
        {editingId === null && (
          <button
            onClick={startCreate}
            className="bg-site-amber text-blueprint-950 font-display uppercase tracking-widest px-5 py-2.5 text-sm hover:bg-site-amberDark transition-colors"
          >
            + New Project
          </button>
        )}
      </div>

      {editingId !== null && (
        <form
          onSubmit={handleSubmit}
          className="plan-corners bg-white border border-site-concrete/30 p-6 mb-10 grid md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-2">
            <h2 className="text-xl mb-1">{editingId === 'new' ? 'New Project' : 'Edit Project'}</h2>
          </div>

          <div>
            <label className="block text-xs font-display uppercase tracking-widest text-site-concreteDark mb-1">
              Title
            </label>
            <input
              required
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border border-site-concrete/40 px-3 py-2 focus:border-site-amber outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-display uppercase tracking-widest text-site-concreteDark mb-1">
              Location
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border border-site-concrete/40 px-3 py-2 focus:border-site-amber outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-display uppercase tracking-widest text-site-concreteDark mb-1">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-site-concrete/40 px-3 py-2 focus:border-site-amber outline-none bg-white"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="renovation">Renovation</option>
              <option value="infrastructure">Infrastructure</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-display uppercase tracking-widest text-site-concreteDark mb-1">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-site-concrete/40 px-3 py-2 focus:border-site-amber outline-none bg-white"
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-display uppercase tracking-widest text-site-concreteDark mb-1">
              Completion Date
            </label>
            <input
              type="date"
              name="completionDate"
              value={form.completionDate || ''}
              onChange={handleChange}
              className="w-full border border-site-concrete/40 px-3 py-2 focus:border-site-amber outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-display uppercase tracking-widest text-site-concreteDark mb-1">
              Photos {editingId !== 'new' && '(uploading replaces existing photos)'}
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="w-full border border-site-concrete/40 px-3 py-2 text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-display uppercase tracking-widest text-site-concreteDark mb-1">
              Description
            </label>
            <textarea
              rows={4}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-site-concrete/40 px-3 py-2 focus:border-site-amber outline-none resize-none"
            />
          </div>

          {error && <p className="md:col-span-2 text-site-amberDark text-sm">{error}</p>}

          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-site-amber text-blueprint-950 font-display uppercase tracking-widest px-5 py-2.5 text-sm hover:bg-site-amberDark transition-colors disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save Project'}
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="border border-site-concrete/40 font-display uppercase tracking-widest px-5 py-2.5 text-sm hover:border-blueprint-950 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-blueprint-950/60">Loading…</p>
      ) : (
        <div className="border border-site-concrete/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blueprint-950 text-site-paper text-left">
                <th className="px-4 py-3 font-display uppercase tracking-widest text-xs">Title</th>
                <th className="px-4 py-3 font-display uppercase tracking-widest text-xs">Category</th>
                <th className="px-4 py-3 font-display uppercase tracking-widest text-xs">Status</th>
                <th className="px-4 py-3 font-display uppercase tracking-widest text-xs">Photos</th>
                <th className="px-4 py-3 font-display uppercase tracking-widest text-xs text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t border-site-concrete/20">
                  <td className="px-4 py-3">{p.title}</td>
                  <td className="px-4 py-3 capitalize">{p.category}</td>
                  <td className="px-4 py-3 capitalize">{p.status}</td>
                  <td className="px-4 py-3">{p.images?.length || 0}</td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button
                      onClick={() => startEdit(p)}
                      className="text-site-amberDark hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-700 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-blueprint-950/50">
                    No projects yet — click "New Project" to add one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
