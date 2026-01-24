import { useEffect, useState } from "react";

export function Counter() {
    const [count, setCount] = useState(0);

    //count が変わったときだけこのuseEffectを実行する
    // useEffect(() => {
    //     console.log('カウントが変わりました:', count);
    // }, [count]);

    // イベント解除やタイマー停止の際に使用されるuseEffect (画面が消える際に呼び出される)
    // 第二引数の依存配列を[]にすることで初回表示のみ実行される
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('1秒経過');
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div style={{ display: "grid", gap: 8 }}>
            <p>カウント : {count}</p>
            <button onClick={() => setCount(count + 1)}>プラス1</button>
            <button onClick={() => setCount(0)}>リセット</button>
        </div>
    );
}
