import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes/Routes.jsx'
import './css/index.css'
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
)
