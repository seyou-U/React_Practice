import { fetchProducts } from '../../api/products';
import { ProductTable } from '../../components/Product/ProductTable';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { useDeferredValue, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductCreateForm } from '../../components/Product/ProductCreateForm';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

export function ProductsPage() {
  const [query, setQuery] = useLocalStorage('products_query', '');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const debounceQuery = useDebouncedValue(query, 300);
  const isSearching = query !== debounceQuery;

  const {
    data = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['products', { q: debounceQuery, onlyInStock }],
    queryFn: ({ signal }) => fetchProducts({ q: debounceQuery, onlyInStock, signal }),
    staleTime: 30_000,
  });

  if (isPending) {
    return (
      <div>
        <h1>商品一覧</h1>
        <p>読み込み中...</p>
      </div>
    );
  } else if (isError) {
    return (
      <div>
        <h1>商品一覧</h1>
        <p>エラー: {String(error.message)}</p>
      </div>
    );
  }

  // 追加処理進行中もしくは必須項目が埋まっていない場合は追加ボタンを押下することはできない
  return (
    <div>
      <h1>商品一覧</h1>
      <SearchForm
        query={query}
        onlyInStock={onlyInStock}
        onChangeQuery={setQuery}
        onChangeOnlyInStock={setOnlyInStock}
      />

      {isSearching && <p style={{ marginTop: 8 }}>検索中...</p>}

      <ProductCreateForm />
      <ProductTable products={data} />
    </div>
  );
}
