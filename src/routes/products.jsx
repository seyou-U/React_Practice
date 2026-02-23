import { lazy } from 'react';
import { FavoritesProvider } from '../components/FavoritesProvider';
import { RequireAuth } from './auth';

const ProductsPage = lazy(() =>
  import('../pages/products/ProductsPage').then((m) => ({ default: m.ProductsPage }))
);

const FavoritesPage = lazy(() =>
  import('../pages/products/FavoritesPage').then((m) => ({ default: m.FavoritesPage }))
);

export const productsRoutes = [
  {
    path: 'products',
    element: (
      <RequireAuth>
        <FavoritesProvider>
          <ProductsPage />
        </FavoritesProvider>
      </RequireAuth>
    ),
  },
  {
    path: 'favorites',
    element: (
      <RequireAuth>
        <FavoritesProvider>
          <FavoritesPage />
        </FavoritesProvider>
      </RequireAuth>
    ),
  },
];
