import { useCallback, useEffect, useState } from 'react';

export function Fetch({ url, options, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    fetch(url, options)
      .then(res => {
        if (!res.ok) throw new Error('通信に失敗しました');
        return res.json();
      })
      .then(json => {
        if (!active) return;
        setData(json);
        setError(null);
      })
      .catch(err => {
        if (!active) return;
        setError(err);
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [url, options]);

  const refetch = useCallback(() => {
    setLoading(true);
    fetch(url, options)
      .then(res => {
        if (!res.ok) throw new Error('通信に失敗しました');
        return res.json();
      })
      .then(json => {
        setData(json);
        setError(null);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [url, options]);
  return children({ data, loading, error, refetch});
}
