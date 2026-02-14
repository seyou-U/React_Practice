// コメントアウトしている箇所については学習記録用として一時的に残しており本来の実装では削除すること
import './App.css';
import RootLayout from './routes/RootLayout';

// function Crashy() {
//   // throw new Error("描画中にクラッシュしました");
// }

// const HeavyChild = memo(function HeavyChild({ label }: { label:string}) {
//     console.log('HeavyChild : render');
//     // 重い処理がある想定

//     return <div>子: {label}</div>
// });

// // CSS-in-JS(styled-components)でスタイルを注入
// const Button = styled.button`
//   padding: 10px 14px;
//   border-radius: 8px;
//   border: 1px solid #ccc;
//   background: ${p => (p.$variant === 'primary' ? 'red' : 'white')};
//   color: ${p => (p.$variant === 'primary' ? 'white' : 'red')};
//   cursor: pointer;
// `;

// // CSS-in-JS(Emotion)でスタイルを注入
// const buttonStyle = variant => css`
//   padding: 10px 14px;
//   border-radius: 8px;
//   border: 1px solid ${variant === 'primary' ? '#111' : '#ccc'};
//   background: ${variant === 'primary' ? '#111' : 'white'};
//   color: ${variant === 'primary' ? 'white' : '#111'};
//   cursor: pointer;
// `;

// Appは親コンポーネントであり画面の設計図
// どの部品をの順番で並べるかについて整理している
function App() {
return (
  <>
    <RootLayout />
  </>
);

  // return <ContactForm />;

  // const [text, setText] = useState('');

  // // 今回は親(APP)は再レンダリングされるが、子(HeavyChild)はサイレンダリンングされない
  // return (
  //     <>
  //         <input value={text} onChange={(e) => setText(e.target.value)} />
  //         <p>親の入力 : {text}</p>

  //         <HeavyChild label='固定のラベル' />
  //     </>
  // );

  // return <Form/>;
  // const [count, setCount] = useState(0);
  // const [text, setText] = useState("");

  // // UIで切り切り替えられるようにする
  // const [useCb, setUseCallback] = useState(false);

  // // useCallbackを使用する際の関数
  // const handleAddWithCallback = useCallback(() => {
  //     setCount((count) => count + 1);
  // }, []);

  // // useCallbackを使用しない時の関数 (毎回新しい関数が生成される)
  // const handleAddNoCallback = () => {
  //     setCount((count) => count + 1);
  // };

  // const onAdd = useMemo(() => {
  //     return useCb ? handleAddWithCallback : handleAddNoCallback;
  // }, [useCallback, handleAddWithCallback, handleAddNoCallback]);

  // console.log("%cParent: render", "font-weight: bold;");

  // return (
  //     <div style={{ padding: 16, maxWidth: 520 }}>
  //         <h2>React.memoとuseCallbackの動作確認</h2>
  //         <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
  //             <label>
  //                 <input
  //                   type='checkbox'
  //                   checked={useCb}
  //                   onChange={(e) => setUseCallback(e.target.checked)}
  //                 />
  //                 useCallbackを使う
  //             </label>
  //             <button onClick={() => setCount(0)}>countリセット</button>
  //         </div>
  //         <hr />
  //         <p>count : {count}</p>
  //         <div style={{ marginBottom: 12 }}>
  //             <p>親のstate(text)を更新</p>
  //             <input
  //               value={text}
  //               onChange={(e) => setText(e.target.value)}
  //               placeholder='ここに入力すると親が再レンダリング'
  //               style={{ width: "100%", padding: 8 }}
  //             />
  //         </div>

  //         <Child onAdd={onAdd} />
  //     </div>
  // );
}

export default App;
