import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary によってキャッチされました:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h2>エラーが発生しました</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            もう一度試す
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
