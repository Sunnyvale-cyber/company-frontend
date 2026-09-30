import { useState } from 'react';
import { api } from '../api/client';

const initialForm = { name: '', email: '', phone: '', message: '' };

function getFriendlyError(err) {
  const raw = err?.message || '';

  if (!raw) {
    return 'Something went wrong while sending your message. Please try again in a moment.';
  }

  if (raw.includes('Failed to fetch') || raw.includes('NetworkError') || raw.includes('ERR_FAILED')) {
    return 'We could not reach the server right now. Please try again in a moment or call us directly.';
  }

  if (raw.includes('404')) {
    return 'The contact service is currently unavailable. Please call us directly instead.';
  }

  return raw;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError(null);

    try {
      await api.submitInquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
        source: 'general',
      });
      setStatus('sent');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setError(getFriendlyError(err));
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
      <p className="mb-4 text-sm font-display uppercase tracking-[0.3em] text-site-amber">
        Get In Touch
      </p>
      <h1 className="mb-4 text-4xl sm:text-5xl">Start a Conversation</h1>
      <p className="mb-10 max-w-xl text-blueprint-950/70 sm:mb-12">
        Share your project details and we’ll follow up with a site visit, consultation, or a tailored plan.
      </p>

      <div className="grid gap-8 md:grid-cols-5 md:gap-10">
        <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
          <div>
            <label htmlFor="contact-name" className="mb-1 block text-xs font-display uppercase tracking-widest text-site-concreteDark">
              Name
            </label>
            <input
              required
              id="contact-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              className="w-full rounded-md border border-site-concrete/40 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-site-amber focus:ring-2 focus:ring-site-amber/25"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-1 block text-xs font-display uppercase tracking-widest text-site-concreteDark">
              Email
            </label>
            <input
              required
              type="email"
              id="contact-email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              className="w-full rounded-md border border-site-concrete/40 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-site-amber focus:ring-2 focus:ring-site-amber/25"
            />
          </div>
          <div>
            <label htmlFor="contact-phone" className="mb-1 block text-xs font-display uppercase tracking-widest text-site-concreteDark">
              Phone (optional)
            </label>
            <input
              type="tel"
              id="contact-phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
              className="w-full rounded-md border border-site-concrete/40 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-site-amber focus:ring-2 focus:ring-site-amber/25"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-1 block text-xs font-display uppercase tracking-widest text-site-concreteDark">
              Message
            </label>
            <textarea
              required
              rows={5}
              id="contact-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full resize-none rounded-md border border-site-concrete/40 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-site-amber focus:ring-2 focus:ring-site-amber/25"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-md bg-site-amber px-6 py-3 font-display uppercase tracking-widest text-blueprint-950 transition-colors hover:bg-site-amberDark disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>

          {status === 'sent' && (
            <div className="rounded border border-site-amber bg-site-amber/15 px-4 py-3 text-sm text-blueprint-900">
              <p className="font-semibold">Message sent successfully.</p>
              <p className="mt-1">We’ll be in touch shortly.</p>
            </div>
          )}
          {status === 'error' && (
            <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <p className="font-semibold">We couldn’t send your message right now.</p>
              <p className="mt-1">{error}</p>
            </div>
          )}
        </form>

        <div className="relative isolate overflow-hidden bg-blueprint-900 p-6 text-site-paper plan-corners md:col-span-2 sm:p-8">
          <div className="relative z-10">
            <img
              src="/logo.svg"
              alt="FASAT Construction"
              className="mx-auto mb-6 h-20 w-20 object-contain md:h-24 md:w-24"
            />
            <h2 className="mb-4 text-2xl">Reach Us Directly</h2>
            <p className="mb-1 font-display text-xs uppercase tracking-[0.2em] text-site-amber">Address</p>
            <address className="mb-4 text-sm not-italic text-site-paper/80">
              2, Sefiu Rahmon Street, Ibeju-Lekki, Lagos State, Nigeria
            </address>
            <p className="mb-1 font-display text-xs uppercase tracking-[0.2em] text-site-amber">Website</p>
            <a
              href="https://fasatintegratedservices.com"
              target="_blank"
              rel="noreferrer"
              className="mb-4 block text-sm text-site-paper/80 transition-colors hover:text-site-amber"
            >
              fasatintegratedservices.com
            </a>
            <p className="mb-1 font-display text-xs uppercase tracking-[0.2em] text-site-amber">Phone</p>
            <a
              href="tel:+2349135211613"
              className="block text-sm text-site-paper/80 transition-colors hover:text-site-amber"
            >
              +234 913 521 1613
            </a>
            <div className="mt-6 rounded border border-white/20 bg-white/10 px-4 py-3 text-sm">
              <p className="font-semibold">Preferred contact times</p>
              <p className="mt-1 text-site-paper/80">Monday–Friday • 8:00 AM – 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
