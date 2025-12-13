import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Register service worker for push notifications
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(registration => {
            console.log('✅ Service Worker registered:', registration);
        })
        .catch(error => {
            console.error('❌ Service Worker registration failed:', error);
        });
}

createRoot(document.getElementById('root')).render(

    <App />

)
