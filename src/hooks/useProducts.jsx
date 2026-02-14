import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';

export function useProducts({ q, onlyInStock }) {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortControllerは何かを中断する処理の実装手段
    const controller = new AbortController();

    // signal: abortで中断する処理を決める、AbortSignalのインスタンス
    fetchProducts({ q, onlyInStock, signal: controller.signal })
      .then(items => {
        setData(items);
        setStatus('success');
      })
      .catch(e => {
        // キャンセルはエラーとして扱わない
        if (e.name === 'AbortError') return;
        setError(e);
        setStatus('error');
      });

    return () => controller.abort();
  }, [q, onlyInStock]);

  return { data, status, error };
}
