import { createContext, useContext, useEffect, useState } from 'react';
import { login as doLogin, logout as doLogout } from '../features/auth/auth';
import { apiFetch } from '../lib/api';

const AuthContext = createContext(null);

// ログイン状態と認証操作をアプリ全体で共有するために存在する
export function AuthProvider({ children }) {
  // booting : 起動直後にログイン復元中かどうか
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);

  // (async () => { ... })();の即時実行関数で})();が実装されている
  useEffect(() => {
    (async () => {
      try {
        const user = await apiFetch('api/users/me');
        setUser(user);
      } catch {
        setUser(null);
      } finally {
        setBooting(false);
      }
    })();
  }, []);

  const login = async values => {
    const user = await doLogin(values);
    setUser(user);
  };

  const logout = () => {
    doLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, booting, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
