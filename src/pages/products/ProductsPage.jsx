import { useMemo, useReducer, useState } from 'react';
import { PRODUCTS } from '../../../data/products';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { ProductTable } from '../../components/ProductTable/ProductTable';
import { initialState, productsReducer } from '../../reducers/productsReducer';
import { filterProducts } from '../../utils/filterProducts';

export function ProductsPage() {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const filtered = useMemo(() => {
    return filterProducts(PRODUCTS, state.query, state.onlyInStock);
  }, [state.query, state.onlyInStock]);

  return (
    <div>
      <h1>商品一覧</h1>

      <SearchForm
        query={state.query}
        onlyInStock={state.onlyInStock}
        onChangeQuery={(value) => dispatch({type: 'setQuery', value})}
        onChangeOnlyInStock={(checked) => dispatch({type: 'toggleInStockOnly', value: checked})}
      />

      <ProductTable products={filtered} />
    </div>
  );
}
