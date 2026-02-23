// ../context/AuthContextファイルと併せるためにpagesフォルダ配下に配置する
import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { LoginPage } from './LoginPage';
import { render, screen } from '@testing-library/react';
import { loginAs, setupLoginPage } from './test/loginPage.helpers';

const loginMock = vi.fn();
const navigationMock = vi.fn();

vi.mock('../contexts/AuthContext.jsx', () => ({
  useAuth: () => ({ login: loginMock }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigationMock,
  };
});

beforeEach(() => {
  loginMock.mockReset();
  navigationMock.mockReset();
});

describe('LoginPage', () => {
  it('未入力で送信すると必須エラーが表示される', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.click(screen.getByRole('button', { name: 'ログイン' }));

    expect(screen.getByText('メールは必須です')).toBeInTheDocument();
    expect(screen.getByText('パスワードは必須です')).toBeInTheDocument();
  });

  it('成功したらログインでき、/productsに遷移する', async () => {
    loginMock.mockResolvedValueOnce(undefined);

    const ctx = setupLoginPage();
    const values = await loginAs(ctx);

    expect(loginMock).toHaveBeenCalledWith(values);
    expect(navigationMock).toHaveBeenCalledWith('/products', { replace: true });
  });

  it('401エラーのとき「メールまたはパスワードが違います」と表示される', async () => {
    loginMock.mockRejectedValueOnce({ status: 401 });

    const ctx = setupLoginPage();
    await loginAs(ctx, { password: 'wrongpass' });

    expect(await screen.findByText('メールまたはパスワードが違います')).toBeInTheDocument();
  });

  it('401エラー以外の場合はエラーメッセージが表示される', async () => {
    loginMock.mockRejectedValueOnce({ status: 500 });

    const ctx = setupLoginPage();
    await loginAs(ctx);

    expect(await screen.findByText('ログインに失敗しました')).toBeInTheDocument();
  });
});
