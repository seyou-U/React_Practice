import { render, screen } from '@testing-library/react';
import { LoginPage } from '../LoginPage';
import userEvent from '@testing-library/user-event';

/**
 * ログイン画面を描画する、よく使用する要素を返す
 */
export function setupLoginPage() {
  const user = userEvent.setup();
  render(<LoginPage />);

  const email = screen.getByLabelText('メール');
  const password = screen.getByLabelText('パスワード');
  const button = screen.getByRole('button', { name: 'ログイン' });

  return { user, email, password, button };
}

/**
 * デフォルトの認証情報でログイン操作を行う
 * emailとpasswordは上書きすることができる
 */
export async function loginAs(ctx, overrides = {}) {
  const values = {
    email: 'test@example.com',
    password: 'password',
    ...overrides,
  };

  await ctx.user.clear(ctx.email);
  await ctx.user.type(ctx.email, values.email);

  await ctx.user.clear(ctx.password);
  await ctx.user.type(ctx.password, values.password);

  await ctx.user.click(ctx.button);

  return values;
}
