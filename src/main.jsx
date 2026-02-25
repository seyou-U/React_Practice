import './index.css';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './components/ThemeContext';
import { router } from './routes';
import { createContainer, dump, render as renderToMyRenderer } from './my-renderer';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

if (import.meta.env.DEV) {
  const container = createContainer();

  renderToMyRenderer(
    <div>
      <h1>カスタムレンダーのテスト</h1>
      <p>こんにちは</p>
      <button type="button">ボタン</button>
    </div>,
    container
  );

  dump(container);
}
