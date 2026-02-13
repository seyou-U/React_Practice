import { NavLink, Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div style={{ padding: 16 }}>
      <header>
        <nav style={{ display: 'flex', gap: 12 }}>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
        <hr />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
