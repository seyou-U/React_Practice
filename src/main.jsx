import { createRoot } from 'react-dom/client';
import './index.css';
// import App from './App.jsx'
import RootLayout from './routes/RootLayout';
import ErrorPage from './pages/ErrorPage';
import { Home } from './Home';
import About from './pages/About';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import Users, { loader as usersLoader } from './pages/users/components/Users';
import UserDetail from './pages/users/components/UserDetail';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "users", element: <Users />, loader: usersLoader },
      { path: "users/:userId", element: <UserDetail /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>,
);
