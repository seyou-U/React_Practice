import { useState } from "react";

export function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div style={{ display: "grid", gap: 8 }}>
            <p>カウント : {count}</p>
            <button onClick={() => setCount(count + 1)}>プラス1</button>
            <button onClick={() => setCount(0)}>リセット</button>
        </div>
    );
}
