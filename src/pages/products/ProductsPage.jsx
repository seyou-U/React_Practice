import { createProduct, fetchProducts } from '../../api/products';
import { ProductTable } from '../../components/ProductTable/ProductTable';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function ProductsPage() {
  // コメントアウトしている箇所は学習用として記録しているためポートフォリオの実装などでは削除する

  // const [state, dispatch] = useReducer(productsReducer, initialState);

  // const filtered = useMemo(() => {
  //   return filterProducts(PRODUCTS, state.query, state.onlyInStock);
  // }, [state.query, state.onlyInStock]);

  const [query, setQuery] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stocked, setStocked] = useState(true);

  // const { data = [], status, error } = useProducts({ q: query, onlyInStock });
  const queryClient = useQueryClient();

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

  // useMutation: POSTアクションのAPIを実行するためのフック
  // invalidateQueries: 更新後に一覧を再取得する
  const addProduct = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setName('');
      setCategory('');
      setPrice('');
      setStocked(true);
    },
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

  // Number.isFiniteでは値が有限な数値かどうかを判定している → 文字列だとfalseになる
  const priceValue = Number(price);
  const canSubmit = name.trim() && category.trim() && Number.isFinite(priceValue) && priceValue >= 0;

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

      <form
        onSubmit={e => {
          e.preventDefault();
          if (!name.trim() || !category.trim() || !price) return;
          addProduct.mutate({
            name: name.trim(),
            category: category.trim(),
            price: Number(price),
            stocked,
          });
        }}
        style={{ margin: '12px 0' }}
      >
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="商品名"
          style={{ marginRight: 8 }}
        />
        <input
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder="カテゴリ"
          style={{ marginRight: 8 }}
        />
        <input
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="価格"
          style={{ marginRight: 8 }}
        />
        <label style={{ marginRight: 8 }}>
          <input
            type="checkbox"
            checked={stocked}
            onChange={e => setStocked(e.target.checked)}
          />
          在庫あり
        </label>
        <button type="submit" disabled={!canSubmit || addProduct.isPending}>
          {addProduct.isPending ? '追加中...' : '追加'}
        </button>
        {addProduct.isError && (
          <p style={{ marginTop: 8 }}>
            追加エラー: {String(addProduct.error.message)}
          </p>
        )}
      </form>

      <ProductTable products={data} />
      {/* {status === 'loading' && <p>読み込み中...</p>}
      {status === 'error' && <p>エラー : {error.message}</p>}
      {status === 'success' && <ProductTable products={data} />} */}
    </div>
  );
}
