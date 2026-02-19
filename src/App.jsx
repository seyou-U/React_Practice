import './App.css';
import { ErrorBoundary } from 'react-error-boundary';
import { AppFallback } from './components/Fallback/AppFallback';
import { lazy, Suspense } from 'react';
import { AppLoading } from './components/Fallback/AppLoading';

const RootLayout = lazy(() => import("./routes/RootLayout"));

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={AppFallback}
      onError={(error, info) => console.error(error, info)}
    >
      <Suspense fallback={<AppLoading />}>
        <RootLayout />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
