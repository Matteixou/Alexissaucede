import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/barlow-condensed/latin-900.css'
import '@fontsource/barlow-condensed/latin-900-italic.css'
import '@fontsource/rajdhani/latin-500.css'
import '@fontsource/rajdhani/latin-600.css'
import '@fontsource/rajdhani/latin-700.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/permanent-marker/latin-400.css'
import './index.css'
import App from './App'

const container = document.getElementById('root')
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

// Hydrate only when the HTML was pre-rendered for this exact route (see scripts/prerender.mjs);
// other paths receive the home markup through the SPA rewrite and must be rendered from scratch.
const path = window.location.pathname.replace(/(.)\/$/, '$1')
if (container.dataset.prerendered === path) {
  hydrateRoot(container, app)
} else {
  container.textContent = ''
  createRoot(container).render(app)
}
