export function SearchForm({ query, onlyInStock, onChangeQuery, onChangeOnlyInStock }) {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <input value={query} onChange={e => onChangeQuery(e.target.value)} placeholder="検索" />

      <label style={{ display: 'block', marginTop: 8 }}>
        <input
          type="checkbox"
          checked={onlyInStock}
          onChange={e => onChangeOnlyInStock(e.target.checked)}
        />
        在庫あり商品のみ表示
      </label>
    </form>
  );
}
