import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import AdminLayout from '../../components/admin/AdminLayout';

const statusOptions = ['new', 'contacted', 'closed'];
const statusColors = {
  new: 'bg-site-amber text-blueprint-950',
  contacted: 'bg-blueprint-800 text-site-paper',
  closed: 'bg-site-concrete text-white',
};

export default function ManageInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    api
      .getInquiries(filter === 'all' ? {} : { status: filter })
      .then(setInquiries)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [filter]);

  const handleStatusChange = async (id, status) => {
    try {
      await api.updateInquiryStatus(id, status);
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    } catch (err) {
      alert(`Failed to update: ${err.message}`);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl mb-6">Manage Inquiries</h1>

      <div className="flex gap-2 mb-6">
        {['all', ...statusOptions].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs font-display uppercase tracking-widest px-3 py-1.5 border transition-colors ${
              filter === s
                ? 'bg-blueprint-950 text-site-paper border-blueprint-950'
                : 'border-site-concrete/40 text-blueprint-950/70 hover:border-blueprint-950'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {error && <p className="text-site-amberDark mb-4">{error}</p>}

      {loading ? (
        <p className="text-blueprint-950/60">Loading…</p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((i) => (
            <div
              key={i.id}
              className="plan-corners bg-white border border-site-concrete/30 p-5 grid md:grid-cols-4 gap-4"
            >
              <div className="md:col-span-3">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg">{i.name}</h3>
                  <span
                    className={`text-xs font-display uppercase tracking-widest px-2 py-0.5 ${
                      statusColors[i.status] || 'bg-site-concrete text-white'
                    }`}
                  >
                    {i.status}
                  </span>
                </div>
                <p className="text-sm text-site-concreteDark mb-2">
                  {i.email} {i.phone && `· ${i.phone}`}
                </p>
                <p className="text-sm text-blueprint-950/80">{i.message}</p>
                <p className="text-xs text-site-concreteDark mt-2">
                  {new Date(i.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex md:flex-col gap-2 md:items-end justify-start">
                <label className="text-xs font-display uppercase tracking-widest text-site-concreteDark md:sr-only">
                  Update status
                </label>
                <select
                  value={i.status}
                  onChange={(e) => handleStatusChange(i.id, e.target.value)}
                  className="border border-site-concrete/40 px-3 py-2 text-sm bg-white focus:border-site-amber outline-none"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
          {inquiries.length === 0 && (
            <p className="text-blueprint-950/50">No inquiries match this filter.</p>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
