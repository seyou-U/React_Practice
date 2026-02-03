import { useState } from 'react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    // フォーム送信でのページリロードを防ぐ
    e.preventDefault();
    setError(null);

    if (name.trim() === '' || message.trim() === '') {
      setError('名前とメッセージは必須です');
      return;
    }

    try {
      setStatus('sending');
      // 擬似的な送信処理
      await new Promise(r => setTimeout(r, 600));
      setStatus('sent');
    } catch (error) {
      setError('送信に失敗しました');
      setStatus('error');
      console.log(error);
    }
  };

  const canSubmit = status === 'sending' && name.trim() === '' && message.trim() === '';

  return (
    <form onSubmit={handleSubmit}>
      <h2>お問い合わせ</h2>
      <label>
        お名前:
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="お名前を入力してください"
        />
      </label>
      <label>
        メッセージ:
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="メッセージを入力してください"
        />
      </label>

      {error && <p role="alert">{error}</p>}

      <button type="submit" disabled={canSubmit}>
        {status === 'sending' ? '送信中' : '送信する'}
      </button>

      {status === 'sent' && <p>送信しました!</p>}
    </form>
  );
}
