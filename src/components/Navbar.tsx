import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  User as UserIcon,
  LogIn,
  LogOut,
  Flame,
  Home as HomeIcon,
  Sparkles,
  Store,
  Images,
  FileText,
  MapPin,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

import { User } from '../types';

interface NavbarProps {
  cartCount: number;
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, user, onLoginClick, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home', icon: HomeIcon },
    { to: '/menu', label: 'Menu', icon: Flame, badge: 'Popular' },
    { to: '/about', label: 'About', icon: Sparkles },
    { to: '/franchise', label: 'Franchise', icon: Store },
    { to: '/gallery', label: 'Gallery', icon: Images },
    { to: '/docs', label: 'Docs', icon: FileText },
    { to: '/locations', label: 'Outlets', icon: MapPin },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Sleek Glassmorphic Navbar Container with Reduced Height */}
      <nav 
        className={`transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-2xl shadow-lg shadow-black/5 border-b border-white/40 py-1' 
            : 'bg-white/70 backdrop-blur-xl shadow-md shadow-brand-orange/5 border-b border-white/50 py-1.5 md:py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-0.5">
            
            {/* Logo: Click leads directly to front page and smooth scrolls to top */}
            <Link 
              to="/" 
              onClick={handleLogoClick}
              className="flex items-center group cursor-pointer focus:outline-none transition-transform duration-200 active:scale-95 py-0.5"
              title="Bihar Bowl - Home"
            >
              <img 
                src="/logo.png" 
                alt="Bihar Bowl Logo" 
                className="h-16 sm:h-20 md:h-24 lg:h-26 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md" 
                referrerPolicy="no-referrer" 
              />
            </Link>

            {/* Desktop Navigation Links with Frosted Glassmorphism Dock */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 bg-white/50 backdrop-blur-xl p-1 rounded-full border border-white/80 shadow-[0_4px_24px_0_rgba(255,107,53,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)]">
              {navLinks.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link 
                    key={link.to}
                    to={link.to} 
                    onClick={() => {
                      if (link.to === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`relative px-3.5 xl:px-4 py-1.5 rounded-full text-xs xl:text-sm font-extrabold uppercase tracking-wide transition-all duration-300 flex items-center space-x-1.5 ${
                      active 
                        ? 'bg-gradient-to-r from-brand-orange to-amber-500 text-white shadow-md shadow-brand-orange/30 scale-102' 
                        : 'text-brand-brown/85 hover:text-brand-orange hover:bg-white/60 hover:backdrop-blur-md'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && !active && (
                      <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-brand-red text-white leading-none">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-extrabold uppercase tracking-wide transition-all duration-300 flex items-center space-x-1 ${
                    isActive('/admin')
                      ? 'bg-brand-brown text-white shadow-md'
                      : 'text-brand-red hover:bg-white/60'
                  }`}
                >
                  <ShieldCheck size={14} />
                  <span>Admin</span>
                </Link>
              )}
            </div>

            {/* Desktop Right Side CTA Actions */}
            <div className="hidden lg:flex items-center space-x-2.5">
              {/* Call to Order Button */}
              <a 
                href="tel:6202321756" 
                className="group relative flex items-center space-x-1.5 px-4 py-2 rounded-full font-extrabold text-xs xl:text-sm text-white bg-gradient-to-r from-brand-orange via-amber-500 to-brand-orange bg-[length:200%_auto] hover:bg-right shadow-md shadow-brand-orange/25 hover:shadow-lg hover:shadow-brand-orange/40 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Phone size={14} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>Call To Order</span>
              </a>

              {/* Cart Button with Count Badge */}
              <Link 
                to="/cart" 
                className="relative p-2 rounded-full bg-white/60 backdrop-blur-md text-brand-brown hover:bg-brand-orange hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 group shadow-sm border border-white/80"
                title="View Cart"
              >
                <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-brand-red to-brand-orange text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-lg ring-2 ring-white animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Authentication Status */}
              {user ? (
                <div className="flex items-center space-x-2 pl-1 border-l border-brand-brown/15">
                  <Link 
                    to="/dashboard" 
                    className="flex items-center space-x-2 p-1 pr-3 rounded-full bg-white/60 backdrop-blur-md hover:bg-white/90 border border-white/80 transition-colors shadow-sm"
                  >
                    <div className="w-7 h-7 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-sm">
                      <UserIcon size={14} />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-extrabold text-brand-brown leading-tight">
                        {user.name.split(' ')[0]}
                      </span>
                      {user.role === 'admin' ? (
                        <span className="text-[8px] text-brand-red font-black uppercase tracking-tight">Admin</span>
                      ) : (
                        <span className="text-[8px] text-brand-orange font-bold uppercase tracking-tight">Member</span>
                      )}
                    </div>
                  </Link>
                  <button 
                    onClick={onLogout} 
                    className="p-1.5 rounded-full text-brand-brown/40 hover:text-red-600 hover:bg-red-50 transition-all"
                    title="Logout"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={onLoginClick}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full font-extrabold text-xs xl:text-sm text-brand-brown hover:text-brand-orange bg-white/60 backdrop-blur-md hover:bg-white/90 border border-white/80 shadow-sm transition-all"
                >
                  <LogIn size={14} />
                  <span>Login</span>
                </button>
              )}
            </div>

            {/* Mobile Actions: Cart & Menu Toggle */}
            <div className="lg:hidden flex items-center space-x-2">
              <Link 
                to="/cart" 
                className="relative p-2 rounded-full bg-white/60 backdrop-blur-md text-brand-brown border border-white/80 shadow-sm"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-brand-red to-brand-orange text-white text-[10px] font-black rounded-full h-4.5 w-4.5 flex items-center justify-center shadow-md ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="p-2 rounded-xl bg-white/60 backdrop-blur-md hover:bg-white/90 text-brand-brown border border-white/80 shadow-sm transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X size={22} className="text-brand-orange" /> : <MenuIcon size={22} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Drawer with Glassmorphism */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden bg-white/85 backdrop-blur-2xl border-b border-white/60 shadow-2xl overflow-hidden mt-1.5"
            >
              <div className="px-4 pt-3 pb-6 space-y-2">
                {/* Mobile Links */}
                <div className="grid grid-cols-1 gap-1">
                  {navLinks.map((link) => {
                    const active = isActive(link.to);
                    const Icon = link.icon;
                    return (
                      <Link 
                        key={link.to}
                        to={link.to} 
                        onClick={() => {
                          setIsOpen(false);
                          if (link.to === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
                        }} 
                        className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-extrabold text-sm tracking-wide transition-all ${
                          active 
                            ? 'bg-gradient-to-r from-brand-orange to-amber-500 text-white shadow-md shadow-brand-orange/20' 
                            : 'text-brand-brown bg-white/40 hover:bg-white/80 backdrop-blur-md border border-white/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon size={18} className={active ? 'text-white' : 'text-brand-orange'} />
                          <span>{link.label}</span>
                        </div>
                        {link.badge && !active && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-brand-red text-white">
                            {link.badge}
                          </span>
                        )}
                        <ChevronRight size={16} className={`opacity-60 ${active ? 'text-white' : 'text-brand-brown'}`} />
                      </Link>
                    );
                  })}

                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 rounded-xl font-extrabold text-sm text-brand-red bg-brand-red/10 border border-brand-red/20"
                    >
                      <div className="flex items-center space-x-3">
                        <ShieldCheck size={18} />
                        <span>Admin Dashboard</span>
                      </div>
                      <ChevronRight size={16} />
                    </Link>
                  )}
                </div>

                {/* Mobile Action Bar */}
                <div className="pt-3 mt-2 border-t border-brand-brown/10 space-y-2">
                  <a 
                    href="tel:6202321756" 
                    className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-brand-orange to-brand-red shadow-lg shadow-brand-orange/20"
                  >
                    <Phone size={16} />
                    <span>Call To Order: +91 6202321756</span>
                  </a>

                  {user ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/60 backdrop-blur-md border border-white/80 shadow-sm">
                      <Link 
                        to="/dashboard" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-2.5 font-bold text-sm text-brand-brown"
                      >
                        <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center">
                          <UserIcon size={16} />
                        </div>
                        <div>
                          <p className="leading-tight font-extrabold">{user.name}</p>
                          <p className="text-[10px] text-brand-orange uppercase font-bold">{user.role}</p>
                        </div>
                      </Link>
                      <button 
                        onClick={() => { setIsOpen(false); onLogout(); }} 
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => { setIsOpen(false); onLoginClick(); }} 
                      className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl font-extrabold text-sm text-brand-brown bg-white/60 hover:bg-white/90 backdrop-blur-md border border-white/80 shadow-sm transition-colors"
                    >
                      <LogIn size={16} />
                      <span>Login / Register</span>
                    </button>
                  )}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
