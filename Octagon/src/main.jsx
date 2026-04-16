/**
 * Main Entry Point
 * Renders the React application into the DOM
 * Uses StrictMode for additional development checks and warnings
 */

// Import React StrictMode for development-time checks and warnings
import { StrictMode } from 'react'

// Import createRoot to render the React app into the DOM
import { createRoot } from 'react-dom/client'

// Import the main App component
import App from './App.jsx'

// Find the root DOM element and render the React application
createRoot(document.getElementById('root')).render(
  // StrictMode enables additional development checks and warnings
  <StrictMode>
    {/* Main App component - root of the application */}
    <App />
  </StrictMode>,
)