import { Counter } from "../components/Counter";
import { Hello } from "../components/Hello";
import { ProfileCard } from "../components/ProfileCard";

export function Home() {
    return (
        <main style={{ padding: 16, display: "grid", gap: 16 }}>
            <h1>関数コンポーネントの練習</h1>
            <Hello/>
            <ProfileCard name="テスト太郎" job="バックエンドエンジニア" />
            <Counter />
        </main>
    )
}
