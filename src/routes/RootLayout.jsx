import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';

export default function RootLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ padding: 16 }}>
      <header>
        <span>テーマ: {theme}</span>
        <button onClick={toggleTheme}>切り替え</button>
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
