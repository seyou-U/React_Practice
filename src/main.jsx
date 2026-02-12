import './index.css';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import About from './pages/About';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import NotFound from './pages/NotFound';
import RootLayout from './routes/RootLayout';
import Users, { loader as usersLoader } from './pages/users/components/Users';
import UserDetail from './pages/users/components/UserDetail';
import { AuthProvider } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';
// import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <RootLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       { index: true, element: <App /> },
//       { path: 'about', element: <About /> },
//       { path: 'users', element: <Users />, loader: usersLoader },
//       { path: 'users/:userId', element: <UserDetail /> },
//       { path: '*', element: <NotFound /> },
//     ],
//   },
// ]);

// const query = new QueryClient();

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <QueryClientProvider client={query}>
  //     <RouterProvider router={router} />
  //     {/* 学習用および開発用にDevtoolsを導入 */}
  //     {/* <ReactQueryDevtoolsPanel initialIsOpen={false} /> */}
  //   </QueryClientProvider>
  // </StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
