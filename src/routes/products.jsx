import { lazy } from 'react';
import { FavoritesProvider } from '../components/FavoritesProvider';
import { RequireAuth } from './auth';

const ProductsPage = lazy(() =>
  import('../pages/products/ProductsPage').then(m => ({ default: m.ProductsPage }))
);

const FavoritesPage = lazy(() =>
  import('../pages/products/FavoritesPage').then(m => ({ default: m.FavoritesPage }))
);

const ProductsConcurrentPage = lazy(() =>
  import('../pages/products/ProductsConcurrentPage').then(m => ({
    default: m.ProductsConcurrentPage,
  }))
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
    path: 'products-concurrent',
    element: (
      <RequireAuth>
        <FavoritesProvider>
          <ProductsConcurrentPage />
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
