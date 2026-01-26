import { useState } from "react";
import { UserStoreForm } from "./components/UserStoreForm";

export function UserForm() {
    const [name, setName] = useState("");
    const [error, setError] = useState(null);

    // eはイベントオブジェクトを指す
    const handleSubmit = (e) => {

        // preventDefault()でリロードの動きを止める
        e.preventDefault();

        if (name.trim() === "") {
            setError('名前を入力してください');
            return;
        }

        if (name.length() < 3) {
            setError('名前は3文字以上で入力してください');
            return;
        }

        setError(null);

        // バリデーション通過後にAPIリクエスト(JSON.stringifyでJSオブジェクトをJSON形式に変換する)
        fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });

        alert("送信しました");
    };

    return (
        <UserStoreForm
          name={name}
          onNameChange={setName}
          error={error}
          onSubmit={handleSubmit}
        />
    )
}
