export function UserStoreForm({ name, onNameChange, error, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input value={name} onChange={e => onNameChange(e.target.value)} placeholder="ユーザー名" />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">送信</button>
    </form>
  );
}
