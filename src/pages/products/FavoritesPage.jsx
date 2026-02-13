import { PRODUCTS } from '../../../data/products';
import { useFavorites } from '../../components/FavoritesProvider';

export function FavoritesPage() {
  const { favoriteIds, toggleFavorite, clearFavorites } = useFavorites();

  const favoritesProducts = PRODUCTS.filter(p => favoriteIds.includes(p.id));

  return (
    <>
      <div style={{ padding: 16 }}>
        <h2>お気に入りページ</h2>
        <p>お気に入りの数 : {favoriteIds.length}</p>
        <button onClick={clearFavorites} disabled={favoriteIds.length === 0}>
          お気に入りを全て解除
        </button>
        <hr />
        {favoriteIds.length === 0 ? (
          <p>お気に入りはまだありません</p>
        ) : (
          <ul>
            {favoritesProducts.map(p => (
              <li key={p.id} style={{ marginBottom: 8 }}>
                {p.name}
                <button style={{ marginLeft: 8 }} onClick={() => toggleFavorite(p.id)}>
                  お気に入りから外す
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
