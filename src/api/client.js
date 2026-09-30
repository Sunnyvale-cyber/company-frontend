const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function getAuthToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('fasat-admin-token');
}

async function request(path, options = {}) {
  const headers = {
    ...(options.body && !(options.body instanceof FormData)
      ? { 'Content-Type': 'application/json' }
      : {}),
    ...(getAuthToken() ? { Authorization: `Bearer ${getAuthToken()}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const text = await res.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const message = data?.message || data?.error || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data;
}

export const api = {
  getProjects: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/api/projects${qs ? `?${qs}` : ''}`);
  },
  getProject: (id) => request(`/api/projects/${id}`),
  submitInquiry: (payload) =>
    request('/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  loginAdmin: (payload) =>
    request('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getAdminMe: () => request('/api/admin/me'),
  getAdminDashboard: () => request('/api/admin/dashboard'),
  getAdminProjects: () => request('/api/admin/projects'),
  createProject: (payload) =>
    request('/api/admin/projects', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  updateProject: (id, payload) =>
    request(`/api/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  deleteProject: (id) =>
    request(`/api/admin/projects/${id}`, {
      method: 'DELETE',
    }),
  uploadProjectImage: (formData) =>
    request('/api/admin/projects/upload', {
      method: 'POST',
      body: formData,
    }),
  getAdminInquiries: () => request('/api/admin/inquiries'),
  updateInquiryStatus: (id, status) =>
    request(`/api/admin/inquiries/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  changePassword: (payload) =>
    request('/api/admin/change-password', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
};
