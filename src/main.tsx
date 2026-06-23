import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FerProvider } from '@/lib/FerContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FerProvider>
        <App />
      </FerProvider>
    </BrowserRouter>
  </StrictMode>,
)
