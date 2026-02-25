import { useMemo, useState } from 'react';

function Child({ onClick }) {
  console.log('%cChild render', 'color: #0a0; font-wight: bold;');
  return (
    <button onClick={onClick} style={{ padding: 8, border: '1px solid #ccc' }}>
      +1
    </button>
  );
}

function Heavy({ query }) {
  console.log('%cHeavy render', 'color: #a50; font-weight: bold;');

  const result = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < 2_000_00; i++) return (sum += i);
    return sum;
  }, []);

  return (
    <div style={{ marginTop: 12 }}>
      query: {query}
      <div>heavy result: {result}</div>
    </div>
  );
}

export function ReactCompilerDemo() {
  console.log('%cPage render', 'color: #00a; font-weight: bold;');

  const [text, setText] = useState('');
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: 16 }}>
      <h1>React Compiler Demo</h1>

      <label style={{ display: 'block', marginTop: 12 }}>
        これを入力すると親が再レンダリングされる:
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          style={{ display: 'block', padding: 8, width: 320, marginTop: 6 }}
        />
      </label>
      <div style={{ marginTop: 12 }}>カウント: {count}</div>
      <Child onClick={() => setCount(c => c + 1)} />
      <Heavy query={text} />
    </div>
  );
}
