import { apiRequest } from './apiClient';

export function fetchProducts({ q = '', onlyInStock = false, signal } = {}) {
  const params = new URLSearchParams();
  if (q) {
    params.set('q', q);
  }
  if (onlyInStock) {
    params.set('onlyInStock', '1');
  }

  const query = params.toString();
  return apiRequest(`/products${query ? `?${query}` : ''}`, { signal });
}

export function createProduct(product) {
  return apiRequest('/products', { method: 'POST', body: product });
}
