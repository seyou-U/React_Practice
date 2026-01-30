import { memo, useEffect } from 'react';

function Child({ onAdd }) {
  console.log('%cChild: render', 'font-weight: bold;');

  useEffect(() => {
    console.log('%cChild: mounted', 'font-weight: bold;');
    return () => console.log('%cChild: unmounted', 'font-weight: bold;');
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: 12, borderRadius: 8 }}>
      <p>子 コンポーネント</p>
      <button onClick={onAdd}>Childから渡された関数</button>
    </div>
  );
}

// コンポーネントそのものの再レンダリングを省く
// 子に渡されるpropsが変わらない場合は再レンダリングはスキップする
export default memo(Child);
