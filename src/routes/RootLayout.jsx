import { NavLink, Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div style={{ padding: 16 }}>
      <header>
        <nav style={{ display: 'flex', gap: 12 }}>
          <NavLink to="/products">商品一覧</NavLink>
          <NavLink to="/favorites">お気に入り</NavLink>
          <NavLink to="/me">マイページ</NavLink>
        </nav>
        <hr />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
