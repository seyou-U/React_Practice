import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function RequireAuth({ children }) {
  const { user, booting } = useAuth();

  if (booting) return <div>読み込み中...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export function RedirectIfAuthed({ children }) {
  const { user, booting } = useAuth();

  if (booting) return <div>読み込み中...</div>;
  if (user) return <Navigate to="/products" replace />;

  return children;
}

export function RootRedirect() {
  const { user, booting } = useAuth();

  if (booting) return <div>読み込み中...</div>;
  return <Navigate to={user ? '/products' : '/login'} replace />;
}
