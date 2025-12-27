import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import StartScreen from './components/StartScreen/StartScreen.jsx'
import HomePage from './components/HomePage/HomePage.jsx';
import Products from './components/Products/Products.jsx';
import AddProduct from './components/Products/AddProduct.jsx';
import ProductDetails from './components/Products/ProductDetails.jsx';
import EditProduct from './components/Products/EditProduct.jsx';
import Sales from './components/Sales/Sales.jsx';
import AddSale from './components/Sales/AddSale.jsx';
import SaleDetails from './components/Sales/SaleDetails.jsx';
import EditSale from './components/Sales/EditSale.jsx';
import Stock from './components/Stock/Stock.jsx';
import AddSupply from './components/Stock/AddSupply.jsx';
import EditSupply from './components/Stock/EditSupply.jsx';

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
        <Route path="/products/edit/:id" element={<EditProduct />} />
        <Route path="/products/details/:id" element={<ProductDetails />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/sales/new" element={<AddSale />} />
        <Route path="/sales/details/:id" element={<SaleDetails />} />
        <Route path="/sales/edit/:id" element={<EditSale />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/stock/new" element={<AddSupply />} />
        <Route path="/stock/edit/:id" element={<EditSupply />} />
      </Routes>
    </>
  )
}

export default App
