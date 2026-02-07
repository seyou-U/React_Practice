import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div>
      <h1>エラーが発生しました</h1>
      <p>{error?.statusText || error?.message}</p>
      <Link to="/">Homeへ戻る</Link>
    </div>
  );
}
