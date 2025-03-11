import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='*' element={<div className='flex justify-center items-center h-[100vh]'>Nahh, nothing here... i just made one page application for one route</div>} />
    </Routes>
  </BrowserRouter>,
)
