import { useMemo, useState } from 'react';
import { PRODUCTS } from '../../../data/products';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { ProductTable } from '../../components/ProductTable/ProductTable';

export function ProductsPage() {
  const [query, setQuery] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();

    // 在庫あり表示にONが入ってかつその商品が在庫なしの場合もしくは検索条件に当てはまらない場合は除外する
    return PRODUCTS.filter(product => {
      if (onlyInStock && !product.stocked) return false;
      if (q && !product.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, onlyInStock]);

  return (
    <div>
      <h1>商品一覧</h1>

      <SearchForm
        query={query}
        onlyInStock={onlyInStock}
        onChangeQuery={setQuery}
        onChangeOnlyInStock={setOnlyInStock}
      />

      <ProductTable products={filteredProducts} />
    </div>
  );
}
