import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { User } from '../types';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

const LoginModal = ({ onClose, onLoginSuccess }: LoginModalProps) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    let endpoint = '/api/auth/login';
    if (mode === 'register') endpoint = '/api/auth/register';
    if (mode === 'forgot') endpoint = '/api/auth/forgot-password';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (data.success) {
        if (mode === 'forgot') {
          toast.success(data.message);
          setMode('login');
        } else {
          onLoginSuccess(data.user);
          toast.success(mode === 'register' ? "Account created!" : "Welcome back!");
          onClose();
        }
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-brown/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-brand-orange" />
        <button onClick={onClose} className="absolute top-6 right-6 text-brand-brown/40 hover:text-brand-brown transition-colors">
          <X size={24} />
        </button>
        
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-brand-orange shadow-xl overflow-hidden transition-transform hover:scale-110 duration-500">
            <img src="/logo.jpg" alt="Logo" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <h3 className="text-4xl font-black text-brand-brown font-display uppercase tracking-tighter leading-none mb-2">
            {mode === 'login' && 'Welcome Back'}
            {mode === 'register' && 'Create Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h3>
          <p className="text-brand-brown/60 mt-2 font-medium">
            {mode === 'forgot' ? 'Enter your email to reset' : 'Join the Bihar Bowl family'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-brown/70 uppercase ml-1">Full Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Saurabh Singhaniya"
                className="w-full bg-brand-earth/50 border border-brand-brown/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange transition-all"
              />
            </div>
          )}
          <div className="space-y-1">
            <label className="text-xs font-bold text-brand-brown/70 uppercase ml-1">Email Address</label>
            <input 
              required
              type="email" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              placeholder="saurabh@foodcraft.com"
              className="w-full bg-brand-earth/50 border border-brand-brown/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange transition-all"
            />
          </div>
          {mode !== 'forgot' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-brown/70 uppercase ml-1">Password</label>
              <input 
                required
                type="password" 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                className="w-full bg-brand-earth/50 border border-brand-brown/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange transition-all"
              />
            </div>
          )}
          
          {mode === 'login' && (
            <div className="text-right">
              <button type="button" onClick={() => setMode('forgot')} className="text-xs font-bold text-brand-orange hover:underline">
                Forgot Password?
              </button>
            </div>
          )}
          
          <button 
            disabled={isLoading}
            className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold shadow-lg hover:bg-brand-orange/90 transition-all mt-4 transform active:scale-95 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : (
              mode === 'login' ? 'Sign In' : mode === 'register' ? 'Sign Up' : 'Send Reset Link'
            )}
          </button>
        </form>

        <div className="mt-8 text-center space-y-2">
          {mode !== 'login' && (
            <button 
              onClick={() => setMode('login')}
              className="block w-full text-sm font-bold text-brand-brown/60 hover:text-brand-orange transition-colors"
            >
              Back to Login
            </button>
          )}
          {mode === 'login' && (
            <button 
              onClick={() => setMode('register')}
              className="block w-full text-sm font-bold text-brand-brown/60 hover:text-brand-orange transition-colors"
            >
              Don't have an account? Sign Up
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginModal;
