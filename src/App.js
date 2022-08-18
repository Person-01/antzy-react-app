import React from 'react';
import Login from "./pages/Login";
import Products from "./pages/Products";
import Product from "./pages/Product";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route exact path="/product/:id" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
