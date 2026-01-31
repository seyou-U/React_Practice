// データ加工や絞り込みは行わず、受け取った配列を表示させる
export function ProductTable({ products }) {
  // 該当の商品が存在しない場合
  if (!products.length) {
    return <p style={{ marginTop: 12 }}>該当する商品がありません</p>;
  }

  return (
    <ul style={{ marginTop: 12 }}>
      {products.map(product => (
        <li key={product.id}>
          {product.name} / {product.category} / ¥{product.price.toLocaleString()}{' '}
          {product.stocked ? '' : '(在庫なし)'}
        </li>
      ))}
    </ul>
  );
}
