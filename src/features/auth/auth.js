import { apiFetch, clearToken, setToken } from '../../lib/api';

export async function login({ email, password }) {
  const data = await apiFetch('/api/users/login', {
    method: 'POST',
    body: { email, password },
  });

  const token = data?.token;
  if (!token) throw new Error('tokenが取得されませんでした');

  setToken(token);

  // 認証が通ることを確認し、ユーザーを取得する
  const user = await apiFetch('api/users/me');
  return user;
}

export function logout() {
  // サーバーサイドでのログアウトAPI実装について追加し修正すること
  clearToken();
}
