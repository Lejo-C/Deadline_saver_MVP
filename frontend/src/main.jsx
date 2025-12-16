import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Service worker is now managed by NotificationSetup.jsx for FCM

createRoot(document.getElementById('root')).render(

    <App />

)
