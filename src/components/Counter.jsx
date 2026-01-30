import { useReducer } from 'react';

// sateは現在の状態、actionはどんな操作をしたいを表すオブジェクト
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

export function Counter() {
  // const [count, setCount] = useState(0);

  // dispatchはuseStateのset関数のようなもの
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>カウント: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>＋</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>－</button>
      <button onClick={() => dispatch({ type: 'reset' })}>リセット</button>
    </div>
  );

  //count が変わったときだけこのuseEffectを実行する
  // useEffect(() => {
  //     console.log('カウントが変わりました:', count);
  // }, [count]);

  // イベント解除やタイマー停止の際に使用されるuseEffect (画面が消える際に呼び出される)
  // 第二引数の依存配列を[]にすることで初回表示のみ実行される
  // useEffect(() => {
  //     const timer = setInterval(() => {
  //         console.log('1秒経過');
  //     }, 1000);

  //     return () => {
  //         clearInterval(timer);
  //     };
  // }, []);

  // return (
  //     <div style={{ display: "grid", gap: 8 }}>
  //         <p>カウント : {count}</p>
  //         <button onClick={() => setCount(count + 1)}>プラス1</button>
  //         <button onClick={() => setCount(0)}>リセット</button>
  //     </div>
  // );
}
