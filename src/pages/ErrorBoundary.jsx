import React from 'react';

export class ErrorBoundary extends React.Component {
  // コンポーネントが作成されたタイミングで初期設定をする
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  // エラーが起きたら「エラーが起きた状態」を作る
  static getDerivedStateFromError(error) {
    return { error };
  }

  // エラーをキャッチした後に呼び出す。追加でログを残したいときに使う
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div role="alert" style={{ padding: 12 }}>
          <h2>エラーが発生しました</h2>
          <p>お手数ですが、ページを再読み込みしてください。</p>
          <details>
            <summary>詳細</summary>
            <pre>{String(this.state.error.message || this.state.error)}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
