import { useAuth } from '../contexts/AuthContext';

export function Mypage() {
  const { user, logout } = useAuth();
  const displayName = user?.name ?? '未登録';
  const phoneNumber = user?.phone ?? '未登録';

  const pageStyle = { maxWidth: 520, margin: '24px auto', padding: '0 16px' };
  const cardStyle = {
    border: '1px solid #e6e6e6',
    borderRadius: 12,
    padding: 16,
    background: '#fff',
  };
  const dlStyle = { display: 'grid', gap: 12, margin: 0 };
  const rowStyle = { display: 'flex', alignItems: 'baseline', gap: 12 };
  const labelStyle = { minWidth: 96, color: '#666', fontWeight: 600, margin: 0 };
  const valueStyle = { margin: 0, color: '#111' };

  return (
    <div style={pageStyle}>
      <h1>ログイン完了</h1>
      <section style={cardStyle}>
        <h2>ユーザー情報</h2>
        <dl style={dlStyle}>
          <div style={rowStyle}>
            <dt style={labelStyle}>お名前</dt>
            <dd style={valueStyle}>{displayName}</dd>
          </div>
          <div style={rowStyle}>
            <dt style={labelStyle}>電話番号</dt>
            <dd style={valueStyle}>{phoneNumber}</dd>
          </div>
        </dl>
      </section>

      <button onClick={logout}>ログアウト</button>
    </div>
  );
}
