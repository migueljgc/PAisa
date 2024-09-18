import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRouter } from '../router/AppRouter.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import '../router/AxiosConfig'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AppRouter />
    </Router>
  </StrictMode>,
)
