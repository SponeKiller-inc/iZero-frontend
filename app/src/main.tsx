import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify';
import './index.css'

import './locales/i18n.ts';
import AppProviders from './context/AppProviders.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
      <ToastContainer />
  </StrictMode>,
)
