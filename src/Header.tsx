import { Link } from 'react-router-dom';

export function Header() {
  return (
    <nav style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
      <Link to="/products">商品一覧</Link>
      <Link to="/favorites">お気に入り</Link>
      <Link to="/me">マイページ</Link>
    </nav>
  );
}
