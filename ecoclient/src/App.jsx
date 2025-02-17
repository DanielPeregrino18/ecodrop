import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {Toaster} from 'react-hot-toast';
import {useState} from 'react';
//rutas
import Login from './pages/Login';
import Registro from './pages/Registro';
import Index from './pages/Index';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  const [isAuthenticated, setIsAuthenticate ]= useState(Boolean(localStorage.getItem('token')));

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setIsAuthenticate={setIsAuthenticate} />} />
        <Route path='/registro' element={<Registro setIsAuthenticate={setIsAuthenticate} />} />
        <Route path='/index' element={isAuthenticated ? <Index /> : <Navigate to="/login" />}/>
      </Routes>
      <Toaster />
      <Footer />
    </BrowserRouter>
  )
}

export default App;