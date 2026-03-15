import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Youtube 
} from 'lucide-react';

const Footer = () => (
  <footer className="bg-brand-brown/95 text-brand-earth pt-20 pb-10 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-16 w-16 rounded-full border-2 border-brand-yellow/50 bg-white overflow-hidden">
              <img src="/logo.jpg" alt="Logo" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <h3 className="text-3xl font-black font-display text-brand-yellow tracking-tighter">BIHAR BOWL</h3>
          </div>
          <p className="text-brand-earth/70 leading-relaxed">
            Bihar Bowl Is A Rapidly Growing Food-Chain, Founded In 2020 By Young & Passionate Entrepreneur – Saurabh Singhaniya.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.youtube.com/redirect?event=channel_description&redir_token=QUFFLUhqbFlYRkxldlpkRjF0LWl6STZVNGNLS3p2VmpUQXxBQ3Jtc0tuaE9Nbm9rZk03Mjl2Y2ZNVmJjVTRDMUxWd2NkYzA3SUk0d29zUVRxazhKSnB6d0YwSXc2SzNDQnB4dWhydXNDYzVTRHJVZWt3bUZNd3dtak9UYTA0QjhVbkpuTkNDSXg1dmVLWEZ2UmdNTDl6Yk0ybw&q=https%3A%2F%2Fwww.instagram.com%2Fsk.unscriptedvlogs%3Figsh%3Dc2Z1YWJ3a21remVp" className="hover:text-brand-yellow transition-colors"><Instagram size={20} /></a>
            <a href="https://www.youtube.com/redirect?event=channel_description&redir_token=QUFFLUhqazIyUm1pYy1sMGdKVzlUQ2VaUmpxTjdfZzc2UXxBQ3Jtc0ttV0JKbHF3VUxXek5leHdHenZkdnJlcUoybnNxR1JWVjZGUmtxOGZvd0pVY1dfX0t1MkozWkZkOTlDeEhUa2FvQVliM1NhdnFBa3d2VWhtMTlEWUw0WDRxcWgxNGRxbVBUXzlBNEJBTWlmTXJ3Zng4NA&q=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100092344142079%26mibextid%3DZbWKwL" className="hover:text-brand-yellow transition-colors"><Facebook size={20} /></a>
            <a href="http://www.youtube.com/@journeywithsinghaniyavlogs" className="hover:text-brand-yellow transition-colors"><Youtube size={20} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-6 text-brand-yellow uppercase tracking-widest">Quick Links</h4>
          <ul className="space-y-4 text-brand-earth/70">
            <li><Link to="/menu" className="hover:text-brand-yellow transition-colors">Our Menu</Link></li>
            <li><Link to="/about" className="hover:text-brand-yellow transition-colors">Our Story</Link></li>
            <li><Link to="/franchise" className="hover:text-brand-yellow transition-colors">Franchise</Link></li>
            <li><Link to="/gallery" className="hover:text-brand-yellow transition-colors">Gallery</Link></li>
            <li><Link to="/docs" className="hover:text-brand-yellow transition-colors">Documentation</Link></li>
            <li><Link to="/locations" className="hover:text-brand-yellow transition-colors">Locations</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-6 text-brand-yellow uppercase tracking-widest">Head Office</h4>
          <ul className="space-y-4 text-brand-earth/70">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-brand-yellow mt-1 shrink-0" />
              <span>1st Floor, Food Craft Square, Boring Road, Patna, Bihar- 800001</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-brand-yellow shrink-0" />
              <span>+91 62023 21756</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-brand-yellow shrink-0" />
              <span>info www.biharbowl.com</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-6 text-brand-yellow uppercase tracking-widest">Follow Us</h4>
          <p className="text-sm text-brand-earth/70 mb-6">Bihar Bowl Is A Rapidly Growing Food-Chain, Founded In 2020 By Young & Passionate Entrepreneur – Saurabh Singhaniya.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:border-brand-yellow"
            />
            <button className="bg-brand-orange text-white px-4 py-2 rounded-r-lg hover:bg-brand-orange/90 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10 pt-8 text-center text-sm text-brand-earth/50">
        <p>© 2024 Bihar Bowl. All rights reserved. Crafted with love for Bihar.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
