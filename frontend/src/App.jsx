import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage'; 
import HomePage from './Pages/HomePage'; 
import ProductPage from './Pages/ProductPage';
import ShopcartPage from './Pages/ShopcartPage';
import CategoryPage from './Pages/CategoryPage';
import PaymentPage from './Pages/PaymentPage';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/product/:id" element={<ProductPage />} /> 
        <Route path="/shopcart" element={<ShopcartPage />} /> 
        <Route path="/category/:category" element={<CategoryPage />} /> 
        <Route path="/payment" element={<PaymentPage />} /> 



      </Routes>
    </BrowserRouter>
  );
};

export default App;