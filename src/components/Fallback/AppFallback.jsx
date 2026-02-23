export function AppFallback({ error, resetErrorBoundary }) {
  const message = error?.message ?? (typeof error === 'string' ? error : JSON.stringify(error));
  return (
    <div role="alert" style={{ padding: 16 }}>
      <h1>エラーが発生しました</h1>
      <p>申し訳ございません。画面の表示に失敗しました。</p>

      <details style={{ marginTop: 12 }}>
        <summary>詳細</summary>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{message}</pre>
      </details>

      <button style={{ marginTop: 12 }} onClick={resetErrorBoundary}>
        もう一度試す
      </button>
    </div>
  );
}
