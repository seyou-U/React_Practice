// 状態更新ロジックの切り出し
export const initialState = {
  query: '',
  onlyInStock: false,
};

export function productsReducer(state, action) {
  switch (action.type) {
    case 'setQuery':
      return { ...state, query: action.value };
    case 'toggleInStockOnly':
      return { ...state, onlyInStock: action.value };
    default:
      return state;
  }
}
