import { useEffect, useState } from 'react';
import { api } from '../../api/client';

const statuses = ['new', 'contacted', 'in-progress', 'closed'];

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const data = await api.getAdminInquiries();
      setInquiries(Array.isArray(data) ? data : data.inquiries || []);
    } catch (err) {
      setError(err.message || 'Unable to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.updateInquiryStatus(id, status);
      await loadInquiries();
    } catch (err) {
      setError(err.message || 'Unable to update inquiry');
    }
  };

  const visibleInquiries = filter === 'all' ? inquiries : inquiries.filter((item) => item.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 font-display text-sm uppercase tracking-[0.3em] text-site-amber">Inquiries</p>
        <h1 className="text-3xl md:text-4xl">Review client submissions</h1>
      </div>

      {error ? <p className="text-site-amberDark">{error}</p> : null}

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilter('all')} className={`border px-3 py-1.5 text-sm ${filter === 'all' ? 'bg-blueprint-950 text-site-paper' : 'border-site-concrete/40 bg-white'}`}>
          All
        </button>
        {statuses.map((status) => (
          <button key={status} onClick={() => setFilter(status)} className={`border px-3 py-1.5 text-sm ${filter === status ? 'bg-site-amber text-blueprint-950' : 'border-site-concrete/40 bg-white'}`}>
            {status}
          </button>
        ))}
      </div>

      {loading ? <p className="text-blueprint-950/60">Loading inquiries…</p> : null}

      <div className="space-y-3">
        {visibleInquiries.map((item) => (
          <div key={item.id} className="border border-site-concrete/40 bg-site-paper p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="font-semibold text-blueprint-950">{item.name || item.clientName}</p>
                <p className="text-sm text-blueprint-950/60">{item.email}</p>
                <p className="mt-2 text-sm leading-7 text-blueprint-950/70">{item.message || item.projectDetails}</p>
              </div>
              <div className="min-w-[180px]">
                <label className="mb-2 block text-sm text-blueprint-950/60">Status</label>
                <select
                  value={item.status || 'new'}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  className="w-full border border-site-concrete/40 bg-white px-3 py-2 outline-none focus:border-site-amber"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
