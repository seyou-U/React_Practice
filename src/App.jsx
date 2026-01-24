import './App.css'
import { Home } from './pages/Home'
import { Header } from './Header';
import { Footer } from './Footer';

// Appは親コンポーネントであり画面の設計図
// どの部品をの順番で並べるかについて整理している
function App() {
  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  )
}

export default App
