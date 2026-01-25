import './App.css'
import { ErrorBoundary } from "./pages/ErrorBoundary";
import { Home } from './pages/Home'
import { Header } from './Header';
import { Footer } from './Footer';

function Crashy() {
  // throw new Error("描画中にクラッシュしました");
}

// Appは親コンポーネントであり画面の設計図
// どの部品をの順番で並べるかについて整理している
function App() {
  return (
    <div>
      <Header />

      <ErrorBoundary>
        <Crashy />
      </ErrorBoundary>

      <Footer />
    </div>
  )
}

export default App
