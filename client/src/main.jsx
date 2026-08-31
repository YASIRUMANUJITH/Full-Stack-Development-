import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BoardsProvider } from './context/BoardsContext'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BoardsProvider>
        <App />
      </BoardsProvider>
    </AuthProvider>
  </StrictMode>,
)
