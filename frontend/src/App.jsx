import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import Login from './pages/Login.jsx'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route path='/'  element={<Navigate to="/login" replace />}></Route>
        <Route path='/login'  element={<Login/>}></Route>
        <Route path='/register'  element={<Register/>}></Route>
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
