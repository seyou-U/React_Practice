const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiRequest(path, { method = 'GET', body, signal } = {}) {
  const url = `${BASE_URL}${path}`;

  const headers = {
    'Content-Type': 'application/json',
    // 認証が必要な場合はここに記述する
  };

  // 第二引数にparamsを取る
  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  // HTTPエラーを扱う
  if (!response.ok) {
    let message = `HTTP error! status: ${response.status}`;
    try {
      const data = await response.json();
      if (data?.message) {
        message = data.message;
      }
    } catch {
      // JSONの取得に失敗した場合は無視する
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
