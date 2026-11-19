import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Production only, so it doesn't repeat on every dev reload.
if (import.meta.env.PROD) {
  console.info(
    'Looking under the hood? This site is React, Vite and Tailwind, with content in Sanity. The contact section on the main page is the quickest way to reach me.',
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
