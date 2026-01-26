import { useState } from "react";
import { UserStoreForm } from "./components/UserStoreForm";

export function UserForm() {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle');
    const [result, setResult] = useState(null);

    // eはイベントオブジェクトを指す
    const handleSubmit = async(e) => {
        // preventDefault()でリロードの動きを止める
        e.preventDefault();

        if (name.trim() === "") {
            setError('名前を入力してください');
            return;
        }

        if (name.length < 3) {
            setError('名前は3文字以上で入力してください');
            return;
        }

        setError(null);
        setStatus("loading");
        setResult(null);

        try {
            // バリデーション通過後にAPIリクエスト(JSON.stringifyでJSオブジェクトをJSON形式に変換する)
            const response = await fetch("https://jsonplaceholder.typicode.com/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            });

            if(!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            setStatus('success');
            setResult(data);
        } catch(error) {
            setError(error.message ?? '送信に失敗しました');
            setStatus('error');
        }
    };

    return (
        <div>
            <UserStoreForm
              name={name}
              onNameChange={setName}
              error={error}
              onSubmit={handleSubmit}
            />
            <hr />
            <p>status: {status}</p>
            <p>name: {name}</p>
            {result && (
                <>
                    <p>result:</p>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </>
            )}
        </div>
    )
}
