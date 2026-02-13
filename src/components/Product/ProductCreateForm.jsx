import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../../api/products';
import { useState } from 'react';

// データ加工や絞り込みは行わず、受け取った配列を表示させる
export function ProductCreateForm() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stocked, setStocked] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  const queryClient = useQueryClient();

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

  const priceValue = Number(price);
  const canSubmit =
    name.trim() && category.trim() && Number.isFinite(priceValue) && priceValue >= 0;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const errors = {};

        if (!name.trim()) errors.name = '商品名は必須です';
        if (!category.trim()) errors.category = 'カテゴリは必須です';

        if (!price || (!Number.isFinite(priceValue) && priceValue < 0)) {
          errors.price = '価格は0以上の数値で入力してください';
        }

        setFormErrors(errors);
        if (Object.keys(errors).length > 0) return;

        addProduct.mutate({
          name: name.trim(),
          category: category.trim(),
          price: Number(price),
          stocked,
        });
      }}
      style={{ margin: '12px 0' }}
    >
      {formErrors.name && <p style={{ color: 'red' }}>{formErrors.name}</p>}
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="商品名"
        style={{ marginRight: 8 }}
      />
      {formErrors.category && <p style={{ color: 'red' }}>{formErrors.category}</p>}
      <input
        value={category}
        onChange={e => setCategory(e.target.value)}
        placeholder="カテゴリ"
        style={{ marginRight: 8 }}
      />
      {formErrors.price && <p style={{ color: 'red' }}>{formErrors.price}</p>}
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
        <input type="checkbox" checked={stocked} onChange={e => setStocked(e.target.checked)} />
        在庫あり
      </label>
      <button type="submit" disabled={!canSubmit || addProduct.isPending}>
        {addProduct.isPending ? '追加中...' : '追加'}
      </button>
      {addProduct.isError && (
        <p style={{ marginTop: 8 }}>追加エラー: {String(addProduct.error.message)}</p>
      )}
    </form>
  );
}
