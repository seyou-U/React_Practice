import { Hello } from "../components/Hello";
import { ProfileCard } from "../components/ProfileCard";
import { SampleButton } from "../components/SampleButton";

export function Home() {
    return (
        <main style={{ padding: 16, display: "grid", gap: 16 }}>
            <h1>関数コンポーネントの練習</h1>
            <Hello/>
            <ProfileCard name="テスト太郎" job="バックエンドエンジニア" />
            <SampleButton />
        </main>
    )
}
