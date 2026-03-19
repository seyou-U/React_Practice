import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import { RedirectIfAuthed, RequireAuth, RootRedirect } from './auth';
import { LoginPage } from '../pages/LoginPage';
import { productsRoutes } from './products';
import { lazy } from 'react';
import { CheckJob } from '../pages/CheckJob';
import { MemosPage } from '../pages/MemosPage';

const Mypage = lazy(() => import('../pages/MyPage').then(m => ({ default: m.Mypage })));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <RootRedirect /> },
      {
        path: 'login',
        element: (
          <RedirectIfAuthed>
            <LoginPage />
          </RedirectIfAuthed>
        ),
      },
      ...productsRoutes,
      {
        path: 'memos',
        element: (
          <RequireAuth>
            <MemosPage />
          </RequireAuth>
        ),
      },
      {
        path: 'me',
        element: (
          <RequireAuth>
            <Mypage />
          </RequireAuth>
        ),
      },
      {
        path: 'check-job',
        element: (
          <RequireAuth>
            <CheckJob />
          </RequireAuth>
        ),
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
