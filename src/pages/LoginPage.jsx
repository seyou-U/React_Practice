import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  });

  const onSubmit = async values => {
    try {
      await login(values);
      navigate('/products', { replace: true });
    } catch (error) {
      if (error.status === 401) {
        setError('root', { message: 'メールまたはパスワードが違います' });
      } else {
        setError('root', { message: error.message ?? 'ログインに失敗しました' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="email">メール</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'メールは必須です',
          })}
        />
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            required: 'パスワードは必須です',
            minLength: { value: 8, message: '8文字以上にしてください' },
          })}
        />
        {errors.password && <p role="alert">{errors.password.message}</p>}
      </div>

      {errors.root && <p role="alert">{errors.root.message}</p>}

      <button disabled={isSubmitting}>{isSubmitting ? '送信中...' : 'ログイン'}</button>
    </form>
  );
}
