const BASE = '/api';

async function request(method, path, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  });
  // If the server returns HTML (e.g. a catch-all SPA redirect when no backend is running),
  // treat it as a failed request rather than saving {} into localStorage.
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('application/json')) throw new Error('Backend unavailable');
  const data = await res.json().catch(() => { throw new Error('Backend unavailable'); });
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// Auth
export const apiLogin          = (u, p)          => request('POST', '/auth/login',          { username: u, password: p });
export const apiLogout         = ()              => request('POST', '/auth/logout');
export const apiChangePassword = (cur, newP)     => request('POST', '/auth/change-password', { currentPassword: cur, newPassword: newP });
export const apiResetPassword  = (key, newP)     => request('POST', '/auth/reset-password',  { recoveryKey: key, newPassword: newP });
export const apiChangeKey      = (newKey)        => request('POST', '/auth/change-recovery-key', { newRecoveryKey: newKey });

// Quotes
export const apiSubmitQuote  = (data)      => request('POST', '/quotes', data);
export const apiGetQuotes    = ()          => request('GET',  '/quotes');
export const apiUpdateQuote  = (id, data)  => request('PUT',  `/quotes/${id}`, data);
export const apiDeleteQuote  = (id)        => request('DELETE', `/quotes/${id}`);

// Site data
export const apiGetSite  = (key)        => request('GET', `/site/${key}`);
export const apiSaveSite = (key, value) => request('PUT', `/site/${key}`, { value });

// Image upload
export const apiUploadImage = async (file) => {
  const form = new FormData();
  form.append('image', file);
  const res = await fetch(`${BASE}/upload`, { method: 'POST', credentials: 'include', body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Upload failed');
  return data;
};
