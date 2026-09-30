import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';

export default function Dashboard() {
  const [stats, setStats] = useState({ totalProjects: 0, ongoingProjects: 0, newInquiries: 0 });
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const data = await api.getAdminDashboard();
        setStats({
          totalProjects: data.totalProjects || data.total || 0,
          ongoingProjects: data.ongoingProjects || data.ongoing || 0,
          newInquiries: data.newInquiries || data.inquiries || 0,
        });
        setActivity(data.recentActivity || data.activity || []);
      } catch (err) {
        setError(err.message || 'Unable to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 font-display text-sm uppercase tracking-[0.3em] text-site-amber">Dashboard</p>
        <h1 className="text-3xl md:text-4xl">Overview</h1>
      </div>

      {error ? <p className="text-site-amberDark">{error}</p> : null}

      {loading ? (
        <p className="text-blueprint-950/70">Loading dashboard…</p>
      ) : (
        <>
          <div className="grid gap-px border border-site-concrete/40 bg-site-concrete/40 md:grid-cols-3">
            <Link to="/admin/projects" className="bg-site-paper p-5 transition-colors hover:bg-white">
              <p className="font-display text-xs uppercase tracking-[0.2em] text-blueprint-950/60">Project records</p>
              <p className="mt-3 text-3xl font-semibold text-blueprint-950">{stats.totalProjects}</p>
              <p className="mt-3 text-xs uppercase tracking-widest text-site-amberDark">Open register →</p>
            </Link>
            <Link to="/admin/projects" className="bg-site-paper p-5 transition-colors hover:bg-white">
              <p className="font-display text-xs uppercase tracking-[0.2em] text-blueprint-950/60">Active sites</p>
              <p className="mt-3 text-3xl font-semibold text-blueprint-950">{stats.ongoingProjects}</p>
              <p className="mt-3 text-xs uppercase tracking-widest text-site-amberDark">View projects →</p>
            </Link>
            <Link to="/admin/inquiries" className="bg-site-paper p-5 transition-colors hover:bg-white">
              <p className="font-display text-xs uppercase tracking-[0.2em] text-blueprint-950/60">New inquiries</p>
              <p className="mt-3 text-3xl font-semibold text-blueprint-950">{stats.newInquiries}</p>
              <p className="mt-3 text-xs uppercase tracking-widest text-site-amberDark">Review queue →</p>
            </Link>
          </div>

          <div className="border border-site-concrete/40 bg-site-paper p-6">
            <h2 className="mb-4 text-xl">Recent Activity</h2>
            {activity.length === 0 ? (
              <p className="text-blueprint-950/60">No activity yet.</p>
            ) : (
              <ul className="space-y-3">
                {activity.map((item, index) => (
                  <li key={`${item.title}-${index}`} className="border-t border-site-concrete/30 px-1 py-3 text-sm text-blueprint-950/70">
                    <p className="font-medium text-blueprint-950">{item.title}</p>
                    <p className="mt-1">{item.description || item.message || item.status || 'Updated recently'}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
