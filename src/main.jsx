import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// We removed <StrictMode> on purpose: in development it runs useMemo twice,
// which would make our demo counter confusing.
createRoot(document.getElementById('root')).render(<App />)
