import { useCallback, useState } from "react";
import { useMemoBroadcast } from "../components/hocs/useMemoBroadcast";

export function MemosPage() {
  const [memos, setMemos] = useState([]);

  const handleCreated = useCallback((payload) => {
    setMemos((prev) => [{ id: payload.id, title: payload.title }, ...prev]);
    console.log('メモが作成されました', payload);
  }, []);

  useMemoBroadcast(handleCreated);

  return (
    <div>
      <h1>メモ一覧ページ</h1>
      <ul>
        {memos.map((memo) => {
          <li key={memo.id}>{memo.title}</li>
        })}
      </ul>
    </div>
  );
}
