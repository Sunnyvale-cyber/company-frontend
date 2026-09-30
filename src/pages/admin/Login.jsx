import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'admin@example.com', password: 'changeme123' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blueprint-950 px-6 py-20 text-site-paper">
      <div className="mx-auto flex max-w-md flex-col rounded-[2rem] border border-site-amber/20 bg-white/10 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur">
        <p className="mb-2 font-display text-sm uppercase tracking-[0.3em] text-site-amber">
          Admin Access
        </p>
        <h1 className="mb-8 text-3xl">Sign in to your workspace</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-site-paper/80">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-site-paper/20 bg-blueprint-950/60 px-4 py-3 outline-none focus:border-site-amber"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-site-paper/80">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-xl border border-site-paper/20 bg-blueprint-950/60 px-4 py-3 outline-none focus:border-site-amber"
            />
          </div>

          {error ? <p className="text-sm text-site-amber">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-site-amber px-4 py-3 font-display uppercase tracking-[0.28em] text-blueprint-950 transition-colors hover:bg-site-amberDark disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
