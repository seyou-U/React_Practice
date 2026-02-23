import { useQuery } from '@tanstack/react-query';
import { useMemo, useState, useTransition } from 'react';
import { fetchProducts } from '../../api/products';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { ProductTable } from '../../components/Product/ProductTable';

function heavyFilter(products, q, onlyInStock) {
  let out = products;
  if (onlyInStock) out = out.filter(p => p.stocked);

  // 練習用にわざと重たい処理を記述する
  const qq = q.trim().toLowerCase();
  for (let i = 0; i < 80; i++) {
    out = out.filter(p => p.name.toLowerCase().includes(qq));
  }
  return out;
}

export function ProductsConcurrentPage() {
  const [inputQuery, setInputQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const [isPending, startTransition] = useTransition();

  const {
    data: products = [],
    isPending: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ['productsAll'],
    queryFn: ({ signal }) => fetchProducts({ signal }),
    staleTime: 30_000,
  });

  const filtered = useMemo(() => {
    return heavyFilter(products, filterQuery, onlyInStock);
  }, [products, filterQuery, onlyInStock]);

  if (loading) return <p>読み込み中...</p>;
  if (isError) return <p>エラー: {String(error.message)}</p>;

  return (
    <div>
      <h1>練習</h1>

      <SearchForm
        query={inputQuery}
        onlyInStock={onlyInStock}
        onChangeQuery={next => {
          setInputQuery(next);

          startTransition(() => {
            setFilterQuery(next);
          });
        }}
        onChangeOnlyInStock={checked => {
          startTransition(() => setOnlyInStock(checked));
        }}
      />
      {isPending && <p style={{ marginTop: 8 }}>絞り込み中...</p>}

      <ProductTable products={filtered} />
    </div>
  );
}
