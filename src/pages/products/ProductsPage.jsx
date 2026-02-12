import { fetchProducts } from '../../api/products';
import { ProductTable } from '../../components/Product/ProductTable';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductCreateForm } from '../../components/Product/ProductCreateForm';

export function ProductsPage() {
  // コメントアウトしている箇所は学習用として記録しているためポートフォリオの実装などでは削除する

  // const [state, dispatch] = useReducer(productsReducer, initialState);

  // const filtered = useMemo(() => {
  //   return filterProducts(PRODUCTS, state.query, state.onlyInStock);
  // }, [state.query, state.onlyInStock]);

  const [query, setQuery] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // const { data = [], status, error } = useProducts({ q: query, onlyInStock });

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
      {/* {status === 'loading' && <p>読み込み中...</p>}
      {status === 'error' && <p>エラー : {error.message}</p>}
      {status === 'success' && <ProductTable products={data} />} */}
    </div>
  );
}
