import { fetchProducts } from '../../api/products';
import { ProductTable } from '../../components/Product/ProductTable';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductCreateForm } from '../../components/Product/ProductCreateForm';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function ProductsPage() {
  const [query, setQuery] = useLocalStorage('products_query', '');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const {
    data = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['products', { q: query, onlyInStock }],
    queryFn: ({ signal }) => fetchProducts({ q: query, onlyInStock, signal }),
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

      <ProductCreateForm />
      <ProductTable products={data} />
    </div>
  );
}
