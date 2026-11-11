import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Youtube,
  ArrowRight,
  ArrowUp,
  Check,
  Copy,
  Sparkles,
  Clock,
  Flame,
  Award,
  MessageCircle,
  ExternalLink,
  Heart,
  Send,
  Ticket
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copiedType, setCopiedType] = useState<'phone' | 'email' | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      toast.error('Please enter a valid email address!');
      return;
    }
    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      setIsSubscribed(true);
      toast.success('🎉 Welcome to the Bihar Bowl VIP Club! Use code BIHAR100 for ₹100 OFF.');
    }, 600);
  };

  const copyToClipboard = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    toast.success(`${type === 'phone' ? 'Phone number' : 'Email address'} copied to clipboard!`);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const trustHighlights = [
    {
      icon: Flame,
      title: '100% Charcoal Roasted',
      desc: 'Authentic wood & coal roasted litti'
    },
    {
      icon: Award,
      title: 'Pure Desi Cow Ghee',
      desc: 'Lavishly dipped in golden A2 cow ghee'
    },
    {
      icon: MapPin,
      title: '50+ Outlets Nationwide',
      desc: 'Patna • Delhi • Mumbai & growing fast'
    },
    {
      icon: Clock,
      title: 'Open Every Single Day',
      desc: '11:00 AM - 11:30 PM hot doorstep service'
    }
  ];

  const quickLinks = [
    { name: 'Our Royal Menu', to: '/menu', badge: '🔥 Hot' },
    { name: 'Our Heritage Story', to: '/about', badge: 'Since 2020' },
    { name: 'Franchise Opportunity', to: '/franchise', badge: '💼 High ROI' },
    { name: 'Foodie Moments & Gallery', to: '/gallery', badge: '50+ Feasts' },
    { name: 'Branch Locations', to: '/locations', badge: '50+ Cities' },
    { name: 'Culinary Guidelines & Docs', to: '/docs' }
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/sk.unscriptedvlogs?igsh=c2Z1YWJ3a21remVp',
      hoverColor: 'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent',
      label: '@sk.unscriptedvlogs'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      href: 'http://www.youtube.com/@journeywithsinghaniyavlogs',
      hoverColor: 'hover:bg-[#FF0000] hover:text-white hover:border-transparent',
      label: '@journeywithsinghaniyavlogs'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://www.facebook.com/profile.php?id=100092344142079&mibextid=ZbWKwL',
      hoverColor: 'hover:bg-[#1877F2] hover:text-white hover:border-transparent',
      label: 'Bihar Bowl Official'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: 'https://wa.me/916202321756?text=Hi%20Bihar%20Bowl!%20I%20want%20to%20order%20or%20inquire%20about%20a%20franchise.',
      hoverColor: 'hover:bg-[#25D366] hover:text-white hover:border-transparent',
      label: '+91 62023 21756'
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#241208] via-[#1A0C05] to-[#120803] text-brand-earth overflow-hidden border-t-4 border-brand-orange/40">
      {/* Decorative Mithila-inspired subtle pattern orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none" />

      {/* TOP VALUE STRIP / TRUST HIGHLIGHTS */}
      <div className="border-b border-white/10 bg-black/25 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-brand-orange/40 hover:bg-white/[0.07] transition-all group cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-orange/20 to-brand-brown/40 border border-brand-orange/30 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-brand-orange/30 transition-all shadow-md">
                    <Icon size={22} className="text-brand-orange group-hover:text-brand-yellow transition-colors" />
                  </div>
                  <div>
                    <h5 className="font-black text-sm text-white font-display tracking-tight leading-snug group-hover:text-brand-yellow transition-colors">
                      {item.title}
                    </h5>
                    <p className="text-xs text-brand-earth/60 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* COLUMN 1: Brand & Founder Story (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-3.5">
              <Link to="/" className="group flex items-center space-x-3.5">
                <div className="h-16 w-16 rounded-2xl border-2 border-brand-orange/60 bg-white p-1 overflow-hidden shadow-xl shadow-brand-orange/10 group-hover:scale-105 group-hover:border-brand-yellow transition-all">
                  <img 
                    src="/logo.jpg" 
                    alt="Bihar Bowl Logo" 
                    className="h-full w-full object-cover rounded-xl" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-amber-300 to-brand-orange tracking-tight">
                    BIHAR BOWL
                  </h3>
                  <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-brand-orange">
                    Bihar Se Bharat Tak, Bharat Se World Tak
                  </p>
                </div>
              </Link>
            </div>

            <p className="text-brand-earth/75 text-sm leading-relaxed pr-2">
              Bihar Bowl is India's premier authentic food-chain, founded in 2020 by visionary entrepreneur <strong className="text-white font-bold">Saurabh Singhaniya</strong>. Bringing the smoky royal tradition of Mithila & Magadh straight to your earthen platter.
            </p>

            {/* Live Kitchen Status Beacon */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>All 50+ Kitchens Open Now</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">Closes 11:30 PM</span>
            </div>

            {/* Interactive Social Media Icons */}
            <div className="pt-2">
              <p className="text-xs font-black uppercase tracking-wider text-brand-yellow/80 mb-3">
                Connect With Us
              </p>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.name}
                      className={`w-10 h-10 rounded-xl bg-white/[0.07] border border-white/15 flex items-center justify-center text-brand-earth/80 transition-all shadow-md ${social.hoverColor} group cursor-pointer`}
                      title={`${social.name} (${social.label})`}
                    >
                      <Icon size={18} className="group-hover:scale-110 transition-transform" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* COLUMN 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-black mb-6 text-brand-yellow uppercase tracking-widest flex items-center gap-2 border-b border-brand-orange/20 pb-3">
              <Sparkles size={16} className="text-brand-orange" />
              <span>Quick Navigation</span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.to} 
                    className="group flex items-center justify-between text-sm text-brand-earth/75 hover:text-white transition-all py-1.5 px-2 rounded-xl hover:bg-white/[0.06]"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange group-hover:w-3 group-hover:bg-brand-yellow transition-all" />
                      <span className="group-hover:translate-x-1 transition-transform font-medium">
                        {link.name}
                      </span>
                    </span>
                    {link.badge && (
                      <span className="text-[10px] font-bold text-brand-orange bg-brand-orange/15 px-2 py-0.5 rounded-md border border-brand-orange/25 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* COLUMN 3: Head Office & Live Contacts (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-black mb-6 text-brand-yellow uppercase tracking-widest flex items-center gap-2 border-b border-brand-orange/20 pb-3">
              <MapPin size={16} className="text-brand-orange" />
              <span>Head Office & Help</span>
            </h4>
            
            <div className="space-y-4">
              {/* Address Card */}
              <a 
                href="https://maps.google.com/?q=Bihar+Bowl+Boring+Road+Patna" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-orange/40 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-orange/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-orange group-hover:text-white text-brand-orange transition-colors">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-brand-yellow uppercase tracking-wider block mb-0.5">
                      Flagship Hub
                    </span>
                    <span className="text-xs text-brand-earth/80 group-hover:text-white transition-colors leading-relaxed block">
                      1st Floor, Food Craft Square, Boring Road, Patna, Bihar - 800001
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-orange mt-1 group-hover:underline">
                      <span>Open in Maps</span>
                      <ExternalLink size={10} />
                    </span>
                  </div>
                </div>
              </a>

              {/* Phone Helpline with One-Click Copy */}
              <div className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-orange/40 transition-all flex items-center justify-between">
                <a 
                  href="tel:+916202321756"
                  className="flex items-center gap-3 text-brand-earth/85 hover:text-white transition-colors flex-1"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-orange/20 flex items-center justify-center shrink-0 text-brand-orange">
                    <Phone size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-brand-earth/60 uppercase tracking-wider block">
                      Direct Helpline
                    </span>
                    <span className="text-xs font-bold text-white tracking-wide">
                      +91 62023 21756
                    </span>
                  </div>
                </a>
                <button
                  onClick={() => copyToClipboard('+916202321756', 'phone')}
                  aria-label="Copy phone number"
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-brand-orange text-white/70 hover:text-white transition-colors ml-2"
                  title="Copy Phone"
                >
                  {copiedType === 'phone' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Email with One-Click Copy */}
              <div className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-orange/40 transition-all flex items-center justify-between">
                <a 
                  href="mailto:contact@biharbowl.com"
                  className="flex items-center gap-3 text-brand-earth/85 hover:text-white transition-colors flex-1"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-orange/20 flex items-center justify-center shrink-0 text-brand-orange">
                    <Mail size={15} />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-bold text-brand-earth/60 uppercase tracking-wider block">
                      Official Inquiries
                    </span>
                    <span className="text-xs font-bold text-white tracking-wide truncate block">
                      contact@biharbowl.com
                    </span>
                  </div>
                </a>
                <button
                  onClick={() => copyToClipboard('contact@biharbowl.com', 'email')}
                  aria-label="Copy email address"
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-brand-orange text-white/70 hover:text-white transition-colors ml-2"
                  title="Copy Email"
                >
                  {copiedType === 'email' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>
          
          {/* COLUMN 4: Interactive VIP Taste Club (2 cols / full on mobile) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-black mb-6 text-brand-yellow uppercase tracking-widest flex items-center gap-2 border-b border-brand-orange/20 pb-3">
              <Ticket size={16} className="text-brand-orange" />
              <span>VIP Taste Club</span>
            </h4>

            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <p className="text-xs text-brand-earth/75 leading-relaxed">
                    Join our VIP Club for secret dish drops, festival invites, and get <strong className="text-brand-yellow font-black">₹100 OFF</strong> on your first order!
                  </p>

                  <form onSubmit={handleNewsletterSubmit} className="space-y-2.5">
                    <div className="relative">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email" 
                        required
                        className="bg-white/[0.08] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-brand-earth/40 w-full focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubscribing}
                      className="w-full bg-gradient-to-r from-brand-orange via-[#E85D04] to-brand-brown hover:from-brand-yellow hover:to-brand-orange text-white text-xs font-black py-2.5 px-4 rounded-xl shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                    >
                      {isSubscribing ? (
                        <span>Activating...</span>
                      ) : (
                        <>
                          <Send size={13} />
                          <span>Get ₹100 Coupon</span>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-black/60 border border-emerald-500/40 text-center space-y-2.5"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check size={20} />
                  </div>
                  <h5 className="font-black text-sm text-white">You're on the VIP List!</h5>
                  <div className="p-2 rounded-lg bg-black/60 border border-dashed border-brand-yellow/60">
                    <span className="text-[10px] text-brand-earth/60 block uppercase font-bold">Use Coupon Code:</span>
                    <span className="text-base font-black text-brand-yellow tracking-widest font-mono">BIHAR100</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsSubscribed(false);
                      setEmail('');
                    }}
                    className="text-[10px] text-brand-earth/50 hover:text-white underline cursor-pointer"
                  >
                    Add another email
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Direct WhatsApp Ordering Pill */}
            <div className="mt-5 pt-4 border-t border-white/10">
              <a 
                href="https://wa.me/916202321756?text=Hi%20Bihar%20Bowl!%20I%20would%20like%20to%20order%20food."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 transition-all text-xs font-bold shadow-md cursor-pointer"
              >
                <MessageCircle size={15} className="group-hover:rotate-12 transition-transform" />
                <span>Instant WhatsApp Order</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* BOTTOM LEGAL & COPYRIGHT BAR */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-earth/60">
          <div className="flex flex-wrap items-center gap-2 text-center md:text-left">
            <span>© {new Date().getFullYear()} <strong className="text-white font-bold">Bihar Bowl.com</strong></span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span>All rights reserved.</span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="inline-flex items-center gap-1 text-brand-orange font-bold">
              <span>Crafted with</span>
              <Heart size={12} className="fill-brand-orange text-brand-orange animate-pulse" />
              <span>for Bihar</span>
            </span>
          </div>

          <div className="flex items-center space-x-6 text-brand-earth/70">
            <Link to="/about" className="hover:text-brand-yellow transition-colors">About Us</Link>
            <Link to="/franchise" className="hover:text-brand-yellow transition-colors">Franchise Terms</Link>
            <Link to="/docs" className="hover:text-brand-yellow transition-colors">Privacy</Link>
            
            {/* Interactive Scroll to Top Button */}
            <motion.button 
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-brand-orange text-white text-xs font-bold border border-white/15 transition-all shadow-md cursor-pointer ml-2"
              title="Back to Top"
            >
              <span>Top</span>
              <ArrowUp size={13} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
