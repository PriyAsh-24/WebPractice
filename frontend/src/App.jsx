import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Editore from './pages/Editore';

function App() {
  const isLoggedIn =localStorage.getItem("isLoggedIn");
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={isLoggedIn ?<Home /> : <Navigate to='/login'/>} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/editore/:ProjectID' element={isLoggedIn ?<Editore/> : <Navigate to='/login'/>}/>
            <Route path="*" element={isLoggedIn ?<NoPage />: <Navigate to='/login'/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
