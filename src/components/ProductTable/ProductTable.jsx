import { useFavorites } from "../FavoritesProvider";

// データ加工や絞り込みは行わず、受け取った配列を表示させる
export function ProductTable({ products }) {
  const {favoriteIds, toggleFavorite} = useFavorites();

  // 該当の商品が存在しない場合
  if (!products.length) {
    return <p style={{ marginTop: 12 }}>該当する商品がありません</p>;
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>ProductsPage（商品一覧）</h2>
      <ul style={{ marginTop: 12 }}>
        {products.map((product) => {
          const isFavorite = favoriteIds.includes(product.id);
          return (
            <li key={product.id}>
              {product.name} / {product.category} / ¥{product.price.toLocaleString()}{' '}
              {product.stocked ? '' : '(在庫なし)'}
              <button style={{ marginLeft: 8 }} onClick={() => toggleFavorite(product.id)}>
                {isFavorite ? 'お気に入りから外す' : 'お気に入りに追加'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
