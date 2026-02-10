const TOKEN_KEY = 'sanctum_pat';

export function getToken() {
  return localStorage.getToken(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

const API_BASE_URL = import.meta.env.API_BASE_URL ?? '';

export async function apiFetch(path, { method = 'GET', body } = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  const data = text ? safeJson(text) : null;

  if (!response.ok) {
    const error = new Error(data?.message ?? `Request failed: ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

function safeJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
