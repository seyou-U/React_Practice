import React from 'react'
import './App.css'
import { StrictModeLog } from './components/StrictModelog';
import { Home } from './pages/Home'

function App() {
  return (
    <>
      <StrictModeLog />
      <Home />
    </>
  )
}

export default App
