import { FavoritesProvider } from '../components/FavoritesProvider';
import { FavoritesPage } from '../pages/products/FavoritesPage';
import { ProductsPage } from '../pages/products/ProductsPage';
import { RequireAuth } from './auth';

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
