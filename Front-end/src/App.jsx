import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import StartScreen from './components/StartScreen/StartScreen.jsx'
import HomePage from './components/HomePage/HomePage.jsx';
import Products from './components/Products/Products.jsx';
import AddProduct from './components/Products/AddProduct.jsx';

function App() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogin = (userName) => {
    setName(userName);
    navigate('/home'); // Navega para a home após o login
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<StartScreen onLogin={handleLogin} />} />
        <Route path="/home" element={<HomePage name={name} />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<AddProduct />} />
      </Routes>
    </>
  )
}

export default App
