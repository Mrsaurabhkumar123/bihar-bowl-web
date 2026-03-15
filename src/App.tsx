import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

// --- Components ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import Home from './components/Home';
import Menu from './components/Menu';
import Cart from './components/Cart';
import UserDashboard from './components/UserDashboard';
import Franchise from './components/Franchise';
import About from './components/About';
import Gallery from './components/Gallery';
import StoreLocator from './components/StoreLocator';
import Documentation from './components/Documentation';
import DesignGuide from './components/DesignGuide';
import AdminDashboard from './components/AdminDashboard';
import FloatingActions from './components/FloatingActions';

// --- Types ---
import { MenuItem, CartItem } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        toast.success(`Increased ${item.name} quantity`);
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      toast.success(`Added ${item.name} to cart`);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.error("Item removed from cart");
  };

  const clearCart = () => setCart([]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
  };

  return (
    <Router>
      <div className="min-h-screen bg-brand-earth/20 font-sans selection:bg-brand-orange selection:text-white">
        <Toaster position="top-center" />
        
        <Navbar 
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
          user={user}
          onLoginClick={() => setShowLogin(true)}
          onLogout={handleLogout}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu addToCart={addToCart} user={user} />} />
          <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} user={user} />} />
          <Route path="/dashboard" element={<UserDashboard user={user} />} />
          <Route path="/franchise" element={<Franchise />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/locations" element={<StoreLocator />} />
          <Route path="/docs" element={<Documentation user={user} />} />
          <Route path="/design" element={<DesignGuide />} />
          <Route path="/admin/*" element={<AdminDashboard user={user} />} />
        </Routes>

        <Footer />
        <FloatingActions />

        {showLogin && (
          <LoginModal 
            onClose={() => setShowLogin(false)} 
            onLoginSuccess={(userData) => {
              setUser(userData);
              localStorage.setItem('user', JSON.stringify(userData));
              setShowLogin(false);
            }} 
          />
        )}
      </div>
    </Router>
  );
};

export default App;
