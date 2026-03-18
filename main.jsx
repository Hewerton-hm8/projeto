import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import AdminLogin from './admin/pages/Login.jsx'
import AdminDashboard from './admin/pages/Dashboard.jsx'
import AdminDiagnosticos from './admin/pages/Diagnosticos.jsx'
import PrivateRoute from './admin/components/PrivateRoute.jsx'
import './index.css'
import './admin/admin.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Site público */}
        <Route path="/" element={<App />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/diagnosticos" element={<PrivateRoute><AdminDiagnosticos /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
