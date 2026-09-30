import { useState } from 'react';
import { api } from '../../api/client';

export default function Settings() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (form.newPassword !== form.confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    if (form.newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      await api.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setMessage('Password updated successfully.');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.message || 'Unable to change password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <p className="mb-2 font-display text-sm uppercase tracking-[0.3em] text-site-amber">Settings</p>
        <h1 className="text-3xl md:text-4xl">Change Password</h1>
        <p className="mt-3 text-blueprint-950/70">
          Update your admin password securely from here.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-[1.5rem] border border-site-concrete/25 bg-white p-6 shadow-sm space-y-4">
        <div>
          <label className="mb-2 block text-sm text-blueprint-950/70">Current Password</label>
          <input
            type="password"
            value={form.currentPassword}
            onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
            className="w-full rounded-xl border border-site-concrete/25 px-3 py-2 outline-none focus:border-site-amber"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-blueprint-950/70">New Password</label>
          <input
            type="password"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            className="w-full rounded-xl border border-site-concrete/25 px-3 py-2 outline-none focus:border-site-amber"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-blueprint-950/70">Confirm New Password</label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            className="w-full rounded-xl border border-site-concrete/25 px-3 py-2 outline-none focus:border-site-amber"
            required
          />
        </div>

        {error ? <p className="text-sm text-site-amberDark">{error}</p> : null}
        {message ? <p className="text-sm text-green-700">{message}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-blueprint-950 px-4 py-2 font-display uppercase tracking-[0.28em] text-site-paper hover:bg-blueprint-900 disabled:opacity-70"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}
