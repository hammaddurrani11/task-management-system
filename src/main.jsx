import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DataContext from './context/employeeContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataContext>
  </StrictMode>,
)
