import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  User as UserIcon,
  LogIn,
  LogOut
} from 'lucide-react';

import { User } from '../types';

interface NavbarProps {
  cartCount: number;
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Navbar = ({ cartCount, user, onLoginClick, onLogout }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-xl py-3 shadow-2xl border-b border-brand-orange/20' 
        : 'bg-white/40 backdrop-blur-md py-5 border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative overflow-hidden rounded-2xl border-2 border-brand-orange shadow-2xl transition-all duration-500 group-hover:scale-110 bg-white h-16 w-16 md:h-20 md:w-20">
              <img 
                src="/logo.jpg" 
                alt="Bihar Bowl Logo" 
                className="h-full w-full object-cover" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-brand-orange font-display tracking-tighter leading-none drop-shadow-lg text-3xl md:text-4xl group-hover:text-brand-yellow transition-colors duration-500">BIHAR BOWL</span>
              <span className="text-brand-brown font-bold uppercase tracking-[0.2em] mt-1 font-accent text-[8px] md:text-[10px] opacity-80 group-hover:opacity-100 transition-opacity">Bihar Se Bharat Tak, Bharat Se World Tak</span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-2">
            {[
              { to: '/', label: 'Home' },
              { to: '/menu', label: 'Menu' },
              { to: '/about', label: 'About' },
              { to: '/franchise', label: 'Franchise' },
              { to: '/gallery', label: 'Gallery' },
              { to: '/docs', label: 'Documentation' },
              { to: '/locations', label: 'Outlets' },
            ].map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className="px-3 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all text-brand-brown hover:text-brand-orange hover:bg-brand-orange/10"
              >
                {link.label}
              </Link>
            ))}
            
            <div className="flex items-center space-x-3 border-l-2 border-brand-brown/10 ml-2 pl-4">
              <a href="tel:6202321756" className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-black transition-all shadow-lg text-[10px] bg-brand-orange text-white hover:bg-brand-brown transform hover:scale-105">
                <Phone size={14} />
                <span>Call Us</span>
              </a>
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link to="/dashboard" className="flex items-center space-x-2 font-bold text-[10px] text-brand-brown hover:text-brand-orange transition-colors">
                    <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange border border-brand-orange/20">
                      <UserIcon size={14} />
                    </div>
                    <div className="flex flex-col">
                      <span className="hidden xl:inline leading-none">{user.name}</span>
                      {user.role === 'admin' && (
                        <span className="text-[8px] text-brand-orange font-black uppercase tracking-tighter leading-none mt-0.5">Administrator</span>
                      )}
                    </div>
                  </Link>
                  <button onClick={onLogout} className="text-brand-brown/40 hover:text-red-500 transition-colors">
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={onLoginClick}
                  className="flex items-center space-x-2 transition-colors font-bold text-[10px] text-brand-brown hover:text-brand-orange"
                >
                  <LogIn size={16} />
                  <span>Login</span>
                </button>
              )}
              
              <Link to="/cart" className="relative p-2 text-brand-brown hover:text-brand-orange transition-colors">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-orange text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-lg border border-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
          
          <div className="lg:hidden flex items-center space-x-4">
            <Link to="/cart" className={`relative p-2 ${scrolled ? 'text-brand-brown' : 'text-brand-brown'}`}>
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-orange text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-brown">
              {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/90 backdrop-blur-xl border-b border-brand-orange/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <Link to="/" onClick={() => setIsOpen(false)} className="block text-lg font-black text-brand-brown hover:text-brand-orange transition-colors uppercase tracking-widest">Home</Link>
              <Link to="/menu" onClick={() => setIsOpen(false)} className="block text-lg font-black text-brand-brown hover:text-brand-orange transition-colors uppercase tracking-widest">Menu</Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="block text-lg font-black text-brand-brown hover:text-brand-orange transition-colors uppercase tracking-widest">About</Link>
              <Link to="/franchise" onClick={() => setIsOpen(false)} className="block text-lg font-black text-brand-brown hover:text-brand-orange transition-colors uppercase tracking-widest">Franchise</Link>
              <Link to="/gallery" onClick={() => setIsOpen(false)} className="block text-lg font-black text-brand-brown hover:text-brand-orange transition-colors uppercase tracking-widest">Gallery</Link>
              <Link to="/docs" onClick={() => setIsOpen(false)} className="block text-lg font-black text-brand-brown hover:text-brand-orange transition-colors uppercase tracking-widest">Documentation</Link>
              <Link to="/locations" onClick={() => setIsOpen(false)} className="block text-lg font-black text-brand-brown hover:text-brand-orange transition-colors uppercase tracking-widest">Outlets</Link>
              {user ? (
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-lg font-black text-brand-brown hover:text-brand-orange transition-colors uppercase tracking-widest">My Dashboard</Link>
              ) : (
                <button onClick={() => { setIsOpen(false); onLoginClick(); }} className="block w-full text-left text-lg font-black text-brand-brown hover:text-brand-orange transition-colors uppercase tracking-widest">Login / Register</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
