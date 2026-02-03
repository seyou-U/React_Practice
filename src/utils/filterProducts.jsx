// 受け取った値をフィルタリングして加工するのみ
export function filterProducts(products, query, onlyInStock) {
    const q = query.trim().toLowerCase();

    // 在庫あり表示にONが入ってかつその商品が在庫なしの場合もしくは検索条件に当てはまらない場合は除外する
    return products.filter(product => {
      if (onlyInStock && !product.stocked) return false;
      if (q && !product.name.toLowerCase().includes(q)) return false;
      return true;
    });
};
