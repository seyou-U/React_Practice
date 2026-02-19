import { useMemo } from 'react';
import { Fetch } from '../Fetch';

export default function RenderPropsDemo() {
  // useMemoでoptionsを固定にすることで不要な再レンダリングを防止することができる
  const options = useMemo(
    () => ({
      headers: { Accept: 'application/json' },
    }),
    []
  );
  return (
    <div>
      <h1>Render Props Demo</h1>
      <Fetch url="https://jsonplaceholder.typicode.com/users" options={options}>
        {({ data, loading, error, refetch }) => {
          if (loading) return <p>読み込み中...</p>;
          if (error) return <p>エラー: {error.message}</p>;

          return (
            <div>
              <button onClick={refetch}>再読み込み</button>
              <ul>
                {data.map(user => (
                  <li key={user.id}>{user.name}</li>
                ))}
              </ul>
            </div>
          );
        }}
      </Fetch>
    </div>
  );
}
