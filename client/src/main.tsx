import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, RouterProvider, Route, Routes, useLocation } from 'react-router-dom';
import App from './App'
import './index.css'
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Signup } from './pages/Signup';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile/:id'element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
