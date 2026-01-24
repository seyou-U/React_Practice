import { Hello } from "../components/Hello";
import { ProfileCard } from "../components/ProfileCard";
import { SampleButton } from "../components/SampleButton";
import { TodoList } from "../components/TodoList";

export function Home() {
    return (
        <main style={{ padding: 16, display: "grid", gap: 16 }}>
            <h1>関数コンポーネントの練習</h1>
            <Hello/>
            <ProfileCard name="テスト太郎" job="バックエンドエンジニア" />
            <SampleButton />
            <TodoList todos={[
                { id: 1, title: '買い物' },
                { id: 2, title: 'プログラミング学習' },
            ]} />
        </main>
    )
}
