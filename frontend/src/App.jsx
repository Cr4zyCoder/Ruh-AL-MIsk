import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import ProductForm from './components/ProductForm';
import ProductDetails from './pages/ProductDetails';
import AdminOrders from './pages/AdminOrders';
import MyOrders from './pages/MyOrders';
import AdminAnalytics from './pages/AdminAnalytics';
import OudGuide from './pages/OudGuide';
import Blog from './pages/Blog';
import WhatsAppFloating from './components/WhatsAppFloating';
import './App.css';

// Configure Axios Defaults
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app-wrapper">
            <Navbar />
            <CartDrawer />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/oud-guide" element={<OudGuide />} />
                <Route path="/blog" element={<Blog />} />

                {/* Admin Routes */}
                <Route element={<ProtectedRoute adminOnly={true} />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/product/new" element={<ProductForm />} />
                  <Route path="/admin/product/edit/:id" element={<ProductForm />} />
                  <Route path="/admin/orders" element={<AdminOrders />} />
                  <Route path="/admin/analytics" element={<AdminAnalytics />} />
                </Route>
              </Routes>
            </main>
            <WhatsAppFloating />
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
