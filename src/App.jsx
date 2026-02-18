import './App.css';
import { ErrorBoundary } from 'react-error-boundary';
import RootLayout from './routes/RootLayout';
import { AppFallback } from './components/Fallback/AppFallback';

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={AppFallback}
      onError={(error, info) => console.error(error, info)}
    >
      <RootLayout />
    </ErrorBoundary>
  );
}

export default App;
