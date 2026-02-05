import { useState } from 'react';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { ProductTable } from '../../components/ProductTable/ProductTable';
import { useProducts } from '../../hooks/useProducts';

export function ProductsPage() {
  // const [state, dispatch] = useReducer(productsReducer, initialState);

  // const filtered = useMemo(() => {
  //   return filterProducts(PRODUCTS, state.query, state.onlyInStock);
  // }, [state.query, state.onlyInStock]);

  const [query, setQuery] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const { data = [], status, error } = useProducts({ q: query, onlyInStock });

  return (
    <div>
      <h1>商品一覧</h1>

      <SearchForm
        query={query}
        onlyInStock={onlyInStock}
        onChangeQuery={setQuery}
        onChangeOnlyInStock={setOnlyInStock}
      />

      {status === 'loading' && <p>読み込み中...</p>}
      {status === 'error' && <p>エラー : {error.message}</p>}
      {status === 'success' && <ProductTable products={data} />}
    </div>
  );
}
