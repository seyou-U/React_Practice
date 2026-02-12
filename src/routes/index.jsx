import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import { RedirectIfAuthed, RequireAuth, RootRedirect } from "./auth";
import { LoginPage } from "../pages/LoginPage";
import { Mypage } from "../pages/MyPage";
import { productsRoutes } from "./products";

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
        path: 'me',
        element: (
          <RequireAuth>
            <Mypage />
          </RequireAuth>
        ),
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
