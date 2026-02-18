export function Fallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <h2>エラーが発生しました</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>もう一度試す</button>
    </div>
  );
}
