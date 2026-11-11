import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp } from 'lucide-react';

const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-50 flex flex-col items-center space-y-3 pointer-events-auto">
      {/* WhatsApp Quick Order Button */}
      <a 
        href="https://wa.me/916202321756" 
        target="_blank" 
        rel="noreferrer" 
        aria-label="Order on WhatsApp"
        className="relative group w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-tr from-emerald-600 to-green-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-green-600/30 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <span className="absolute -inset-1 rounded-full bg-green-500/30 animate-ping opacity-75 pointer-events-none" />
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" className="relative z-10 sm:w-7 sm:h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.049a11.818 11.818 0 001.59 5.911L0 24l6.128-1.607a11.803 11.803 0 005.917 1.598h.006c6.637 0 12.05-5.414 12.053-12.052a11.85 11.85 0 00-3.486-8.53z"/>
        </svg>
        <span className="absolute right-full mr-3 px-3 py-1 bg-gray-900/90 backdrop-blur-md text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg hidden sm:block">
          WhatsApp Order
        </span>
      </a>

      {/* Direct Call Button */}
      <a 
        href="tel:6202321756" 
        aria-label="Call Bihar Bowl Helpline"
        className="relative group w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-tr from-amber-500 to-amber-400 text-brand-brown rounded-full flex items-center justify-center shadow-xl shadow-amber-500/30 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <Phone size={22} className="sm:w-6 sm:h-6" />
        <span className="absolute right-full mr-3 px-3 py-1 bg-gray-900/90 backdrop-blur-md text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg hidden sm:block">
          Call Helpline: +91 62023 21756
        </span>
      </a>

      {/* Smooth Scroll To Top */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop} 
          aria-label="Scroll to top"
          className="relative group w-11 h-11 sm:w-12 sm:h-12 bg-brand-brown/90 hover:bg-brand-orange text-white rounded-full flex items-center justify-center shadow-xl shadow-brand-brown/30 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-md border border-white/20"
        >
          <ArrowUp size={20} />
          <span className="absolute right-full mr-3 px-3 py-1 bg-gray-900/90 backdrop-blur-md text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg hidden sm:block">
            Back to Top
          </span>
        </button>
      )}
    </div>
  );
};

export default FloatingActions;
