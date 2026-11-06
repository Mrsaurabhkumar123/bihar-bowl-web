import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Star, 
  TrendingUp, 
  CreditCard, 
  MapPin, 
  Award, 
  CheckCircle2,
  ArrowRight,
  Building2,
  Phone,
  Mail,
  User,
  Sparkles,
  Send,
  ShieldCheck,
  Flame,
  CheckCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  IndianRupee,
  Quote,
  HeartHandshake,
  Heart,
  Camera,
  X,
  ShoppingBag,
  Clock,
  Maximize2,
  Eye
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface MenuItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
  is_veg: number;
}

const popularDishes = [
  {
    id: 1,
    name: "Classic Sattu Litti",
    category: "veg",
    tagline: "Authentic Charcoal Wood-Fired",
    description: "Traditional roasted whole-wheat balls filled with spiced Bihar Chana Sattu, served with smoky baingan bharta, aloo chokha, and zesty mint chutney.",
    price: 120,
    image_url: "/littichokha.png",
    rating: "4.9",
    reviews: "1.4k+",
    is_veg: 1,
    badge: "👑 All-Time Bestseller",
    badgeColor: "from-amber-500 to-orange-500",
    prepTime: "12 mins",
    serves: "1-2 Persons",
    tags: ["Wood Charcoal", "Pure Chana Sattu", "Smoky Chokha"]
  },
  {
    id: 2,
    name: "Royal Desi Ghee Litti",
    category: "veg",
    tagline: "Lavishly Dipped in A2 Cow Ghee",
    description: "Crisp-roasted golden littis cracked open and drenched lavishly in warm desi cow ghee. A melt-in-mouth heritage experience with baingan chokha and dal.",
    price: 150,
    image_url: "/gallery2.jpg",
    rating: "5.0",
    reviews: "2.1k+",
    is_veg: 1,
    badge: "🧈 100% Desi Cow Ghee",
    badgeColor: "from-amber-500 to-yellow-600",
    prepTime: "15 mins",
    serves: "1-2 Persons",
    tags: ["A2 Pure Ghee", "Melt-In-Mouth", "Royal Recipe"]
  },
  {
    id: 3,
    name: "Smoky Paneer Tikka Litti",
    category: "veg",
    tagline: "Tandoori Spiced Paneer & Sattu",
    description: "A gourmet fusion featuring rich char-grilled paneer cubes infused with ajwain, kalonji, spiced roasted gram flour, and smoky tandoor spices.",
    price: 180,
    image_url: "/menu_paneer_tikka.png",
    rating: "4.8",
    reviews: "980+",
    is_veg: 1,
    badge: "🔥 Chef's Special",
    badgeColor: "from-rose-500 to-orange-600",
    prepTime: "15 mins",
    serves: "1-2 Persons",
    tags: ["Tandoori Paneer", "Herb Infused", "High Protein"]
  },
  {
    id: 4,
    name: "Bihar Bowl Special Thali",
    category: "combos",
    tagline: "Grand Mithila & Magadh Feast",
    description: "The complete royal spread: 2 hot Ghee Littis, Baingan Chokha, Aloo Chokha, Spiced Dal Tadka, Kesariya Kheer, salad, and signature pickles.",
    price: 250,
    image_url: "/combo_thali.jpg",
    rating: "4.9",
    reviews: "1.9k+",
    is_veg: 1,
    badge: "🍱 Complete Royal Feast",
    badgeColor: "from-amber-600 to-yellow-600",
    prepTime: "18 mins",
    serves: "1-2 Persons",
    tags: ["Grand Thali", "Kesariya Kheer", "Dal Tadka"]
  },
  {
    id: 5,
    name: "Champaran Handi Mutton Litti",
    category: "nonveg",
    tagline: "Slow-Cooked in Sealed Clay Pot",
    description: "Tender goat meat slow-simmered in rustic earthenware with whole garlic pods and mustard oil, served alongside wood-fired crispy sattu littis.",
    price: 350,
    image_url: "/menu_mutton.png",
    rating: "4.9",
    reviews: "1.7k+",
    is_veg: 0,
    badge: "🍗 Ahuna Claypot Meat",
    badgeColor: "from-red-600 to-orange-600",
    prepTime: "20 mins",
    serves: "1-2 Persons",
    tags: ["Ahuna Handi", "Tender Mutton", "Mustard Oil Gravy"]
  },
  {
    id: 6,
    name: "Sizzling 4-Flavor Platter",
    category: "combos",
    tagline: "Assorted Mini Gourmet Littis",
    description: "Party platter featuring 4 varieties: Classic Sattu, Paneer Tikka, Corn Cheese, and Mushroom Litti served with 4 artisanal dips and chutneys.",
    price: 320,
    image_url: "/combo_platter.png",
    rating: "4.8",
    reviews: "820+",
    is_veg: 1,
    badge: "🎉 Perfect for Sharing",
    badgeColor: "from-orange-500 to-pink-500",
    prepTime: "16 mins",
    serves: "2-3 Persons",
    tags: ["4 Mini Flavors", "Cheese & Paneer", "4 Chutneys"]
  }
];

const Home = () => {
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [franchiseForm, setFranchiseForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    area: '',
    address: '',
    budget: 'Budget Rs. 10-15 Lacs',
    message: ''
  });
  const [franchiseLoading, setFranchiseLoading] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [isFoodieHovered, setIsFoodieHovered] = useState(false);
  const [activeFoodieCard, setActiveFoodieCard] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<null | {
    id: number;
    img: string;
    title: string;
    cat: string;
    likes: string;
  }>(null);
  const [popularCategory, setPopularCategory] = useState<'all' | 'veg' | 'nonveg' | 'combos'>('all');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Video Section Player Controls
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const toggleVideoMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setFeaturedItems(data.slice(0, 3)));
  }, []);

  const handleFranchiseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!franchiseForm.name.trim() || !franchiseForm.phone.trim()) {
      toast.error('Please enter your name and contact number');
      return;
    }
    setFranchiseLoading(true);
    try {
      const res = await fetch('/api/franchise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: franchiseForm.name,
          phone: franchiseForm.phone,
          email: franchiseForm.email,
          city: franchiseForm.city,
          budget: franchiseForm.budget,
          message: `${franchiseForm.area ? `Area: ${franchiseForm.area}. ` : ''}${franchiseForm.address ? `Address: ${franchiseForm.address}. ` : ''}${franchiseForm.message}`
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Franchise application submitted! Our team will contact you within 24 hours.');
        setFranchiseForm({
          name: '',
          phone: '',
          email: '',
          city: '',
          area: '',
          address: '',
          budget: 'Budget Rs. 10-15 Lacs',
          message: ''
        });
      } else {
        toast.error('Failed to submit application. Please try again.');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setFranchiseLoading(false);
    }
  };

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* High-res cinematic palace background positioned to keep building on the right */}
          <img 
            src="/fullbg.png" 
            alt="Bihar Bowl Grand Heritage" 
            className="w-full h-full object-cover object-[75%_center] md:object-center scale-105"
          />
          {/* Deep dark gradient on left half so text is 100% legible without clashing with the building logo */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 via-45% to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>
        
        {/* Decorative Mithila Elements */}
        <div className="absolute top-20 right-0 w-96 h-96 mithila-pattern opacity-10 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl lg:max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-orange to-amber-600 px-4 py-1.5 rounded-full mb-6 shadow-xl border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-200 animate-ping" />
              <span className="text-white font-extrabold text-xs uppercase tracking-[0.2em]">
                Authentic Taste of Bihar
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-[1.1] font-display uppercase tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              Hold The <span className="text-amber-400 italic font-display">Kulhad</span>, <br />
              Savor The <span className="bg-gradient-to-r from-brand-orange to-amber-400 bg-clip-text text-transparent">Litti</span>
            </h1>

            <p className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed max-w-lg font-medium drop-shadow-lg">
              With over 1 Lakh Litti plates served every day, we brew the perfect experience of happiness. India's fastest-growing authentic Bihar food chain.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Link 
                to="/menu" 
                className="bg-gradient-to-r from-brand-orange via-amber-500 to-brand-orange bg-[length:200%_auto] hover:bg-right text-white px-8 py-3.5 rounded-xl text-base font-extrabold shadow-xl shadow-brand-orange/40 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 border border-white/30"
              >
                <span>Order Now</span>
                <ChevronRight size={20} />
              </Link>
              <Link 
                to="/franchise" 
                className="bg-white/15 hover:bg-white/25 backdrop-blur-xl text-white px-8 py-3.5 rounded-xl text-base font-extrabold shadow-lg border border-white/30 hover:scale-105 active:scale-95 transition-all"
              >
                Partner With Us
              </Link>
            </div>

            {/* Quick Trust Highlights directly under buttons (leaves palace completely unobstructed) */}
            <div className="flex items-center gap-6 sm:gap-8 pt-6 border-t border-white/15">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-amber-400">50+</p>
                <p className="text-[11px] text-white/70 font-bold uppercase tracking-wider">Outlets</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div>
                <p className="text-2xl sm:text-3xl font-black text-amber-400">20+</p>
                <p className="text-[11px] text-white/70 font-bold uppercase tracking-wider">Cities</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div>
                <p className="text-2xl sm:text-3xl font-black text-amber-400">1M+</p>
                <p className="text-[11px] text-white/70 font-bold uppercase tracking-wider">Happy Souls</p>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Luxury Franchise & Brand Story Showcase Section */}
      <section className="py-28 bg-gradient-to-b from-[#240F04] via-[#351607] to-[#240F04] text-white relative overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-orange/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-500/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 opacity-5 mithila-pattern pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-black uppercase tracking-[0.25em] mb-4 shadow-lg">
              <Sparkles size={14} className="text-amber-300" />
              <span>Join The Success Story • Franchise 2026</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white mb-5 leading-tight">
              Expand The Legacy of <br />
              <span className="bg-gradient-to-r from-amber-300 via-brand-orange to-amber-200 bg-clip-text text-transparent">
                Bihar Bowl®
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/80 font-medium leading-relaxed">
              Partner with India's fastest-growing traditional food network. Experience high profit margins, standardized kitchen SOPs, and zero culinary risk.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Brand Video & Value Pillars (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Cinema Grade Video Showcase */}
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 via-brand-orange to-red-600 rounded-[2.5rem] blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />
                <div className="relative rounded-[2.2rem] overflow-hidden shadow-2xl border-2 border-white/20 bg-black aspect-video">
                  <video 
                    className="w-full h-full object-cover"
                    src="/advertising.mp4"
                    controls
                    muted
                    loop
                    playsInline
                  />
                </div>
              </div>

              {/* 3 Franchise Highlights / Value Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-amber-400/40 hover:bg-white/10 transition-all shadow-lg group">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <TrendingUp size={20} />
                  </div>
                  <h3 className="font-black text-white text-base mb-1">High ROI Model</h3>
                  <p className="text-xs text-white/70 leading-relaxed font-medium">Quick 12-18 months breakeven with strong daily footfalls.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-brand-orange/40 hover:bg-white/10 transition-all shadow-lg group">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/20 text-brand-orange flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Flame size={20} />
                  </div>
                  <h3 className="font-black text-white text-base mb-1">Authentic Taste</h3>
                  <p className="text-xs text-white/70 leading-relaxed font-medium">Central supply of pure Chana Sattu & wood-fired secret masalas.</p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-emerald-400/40 hover:bg-white/10 transition-all shadow-lg group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="font-black text-white text-base mb-1">Complete Support</h3>
                  <p className="text-xs text-white/70 leading-relaxed font-medium">Site audit, staff training, POS tech & pan-India marketing.</p>
                </div>
              </div>

            </div>
            
            {/* Right Column: Luxury Glassmorphic Inquiry Form (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative bg-white/10 backdrop-blur-2xl p-7 sm:p-9 rounded-[2.5rem] border border-white/20 shadow-2xl shadow-black/50 overflow-hidden">
                
                {/* Decorative Form Corner Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-bl-full pointer-events-none" />

                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-orange to-amber-500 flex items-center justify-center text-white shadow-lg shadow-brand-orange/30">
                    <Building2 size={22} />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight leading-tight">
                      Get Franchise Details!
                    </h3>
                    <p className="text-xs text-amber-200/80 font-medium">
                      Fill the form to receive our official deck & profit sheet.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleFranchiseSubmit} className="space-y-3.5">
                  
                  {/* Name Input */}
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown/50" />
                    <input 
                      type="text" 
                      required
                      placeholder="Your Full Name *" 
                      value={franchiseForm.name}
                      onChange={(e) => setFranchiseForm({ ...franchiseForm, name: e.target.value })}
                      className="w-full bg-white/95 focus:bg-white text-brand-brown font-medium placeholder-brand-brown/50 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none transition-all shadow-sm"
                    />
                  </div>

                  {/* Phone & Email (2 Cols) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown/50" />
                      <input 
                        type="tel" 
                        required
                        placeholder="Contact No. *" 
                        value={franchiseForm.phone}
                        onChange={(e) => setFranchiseForm({ ...franchiseForm, phone: e.target.value })}
                        className="w-full bg-white/95 focus:bg-white text-brand-brown font-medium placeholder-brand-brown/50 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none transition-all shadow-sm"
                      />
                    </div>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown/50" />
                      <input 
                        type="email" 
                        placeholder="Your Email" 
                        value={franchiseForm.email}
                        onChange={(e) => setFranchiseForm({ ...franchiseForm, email: e.target.value })}
                        className="w-full bg-white/95 focus:bg-white text-brand-brown font-medium placeholder-brand-brown/50 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Target City & Preferred Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown/50" />
                      <input 
                        type="text" 
                        placeholder="Target City" 
                        value={franchiseForm.city}
                        onChange={(e) => setFranchiseForm({ ...franchiseForm, city: e.target.value })}
                        className="w-full bg-white/95 focus:bg-white text-brand-brown font-medium placeholder-brand-brown/50 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none transition-all shadow-sm"
                      />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Preferred Location/Area" 
                      value={franchiseForm.area}
                      onChange={(e) => setFranchiseForm({ ...franchiseForm, area: e.target.value })}
                      className="w-full bg-white/95 focus:bg-white text-brand-brown font-medium placeholder-brand-brown/50 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none transition-all shadow-sm"
                    />
                  </div>

                  {/* Investment Budget */}
                  <div className="relative">
                    <select 
                      value={franchiseForm.budget}
                      onChange={(e) => setFranchiseForm({ ...franchiseForm, budget: e.target.value })}
                      className="w-full bg-white/95 focus:bg-white text-brand-brown font-bold rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none transition-all shadow-sm cursor-pointer"
                    >
                      <option value="Budget Rs. 10-15 Lacs">💰 Investment Budget: ₹10 - 15 Lakhs</option>
                      <option value="Budget Rs. 15-25 Lacs">💰 Investment Budget: ₹15 - 25 Lakhs</option>
                      <option value="Budget Rs. 25-50 Lacs">💰 Investment Budget: ₹25 - 50 Lakhs</option>
                      <option value="Budget Rs. 50 Lacs+">💰 Investment Budget: ₹50 Lakhs+ (Master Franchise)</option>
                    </select>
                  </div>

                  {/* Message / Remarks */}
                  <textarea 
                    placeholder="Tell us about your business background or queries (optional)..." 
                    value={franchiseForm.message}
                    onChange={(e) => setFranchiseForm({ ...franchiseForm, message: e.target.value })}
                    className="w-full bg-white/95 focus:bg-white text-brand-brown font-medium placeholder-brand-brown/50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-orange focus:outline-none transition-all shadow-sm h-20 resize-none"
                  />

                  {/* Submit CTA Button */}
                  <button 
                    type="submit" 
                    disabled={franchiseLoading}
                    className="w-full bg-gradient-to-r from-brand-orange via-amber-500 to-brand-orange bg-[length:200%_auto] hover:bg-right text-white py-4 rounded-xl font-black uppercase tracking-wider text-sm shadow-xl shadow-brand-orange/40 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
                  >
                    {franchiseLoading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Franchise Inquiry</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-white/60 font-medium pt-1">
                    🔒 Your details are 100% confidential. No spam guaranteed.
                  </p>

                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Untold Story Section (CSB & Heritage Brand Story Style) */}
      <section className="py-28 bg-gradient-to-b from-[#FDFBF7] via-white to-[#FDFBF7] relative overflow-hidden">
        {/* Subtle decorative Mithila background motif */}
        <div className="absolute inset-0 opacity-[0.035] mithila-pattern pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-brand-orange/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 -left-32 w-96 h-96 bg-amber-400/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Founder Photo Card with Floating Badges (5 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative max-w-md mx-auto">
                {/* Ambient Soft Glow Behind Photo */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-brand-orange/30 via-amber-400/20 to-brand-brown/20 rounded-[3rem] blur-2xl -z-10" />

                {/* Double Bordered Luxury Card */}
                <div className="p-3 bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border-2 border-brand-orange/20 relative">
                  
                  {/* Floating Estd. Badge */}
                  <div className="absolute -top-3.5 -right-3.5 bg-gradient-to-r from-brand-orange to-amber-600 text-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-1.5 border-2 border-white text-xs font-black tracking-wider uppercase z-20">
                    <Sparkles size={14} className="text-yellow-200" />
                    <span>Estd. 2020</span>
                  </div>

                  {/* Main Portrait with Rich Lighting */}
                  <div className="aspect-[3/4] sm:aspect-[4/5] rounded-[2rem] overflow-hidden relative group">
                    <img 
                      src="/foundersk1.png" 
                      alt="Saurabh Singhaniya - Founder Bihar Bowl" 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer" 
                    />
                    
                    {/* Dark Vignette Gradient for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    {/* Forbes-Style Founder Card Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-white/20 shadow-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-black text-xl sm:text-2xl leading-tight tracking-tight">
                            Saurabh Singhaniya
                          </p>
                          <p className="text-amber-400 font-extrabold uppercase tracking-wider text-[11px] sm:text-xs mt-1 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Founder & Visionary, Bihar Bowl®
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-orange to-amber-500 flex items-center justify-center text-white shadow-lg shadow-brand-orange/40 shrink-0">
                          <Award size={20} />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
            
            {/* Right Column: Story Narrative, Quote & Highlights (7 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-7"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-black uppercase tracking-[0.25em] mb-4 shadow-sm">
                  <Sparkles size={13} className="text-brand-orange" />
                  <span>The Untold Story</span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-brown leading-[1.15] font-display tracking-tight">
                  Bihar Bowl — <br />
                  <span className="bg-gradient-to-r from-brand-orange via-amber-600 to-brand-brown bg-clip-text text-transparent italic font-serif">
                    The Untold Story
                  </span>
                </h2>
                <p className="text-sm font-bold text-brand-orange uppercase tracking-widest mt-2">
                  From A Humble Dream to India's Cultural Food Revolution
                </p>
              </div>
              
              {/* Stylized Quote Card with Big Quotation Accent */}
              <div className="relative bg-gradient-to-br from-amber-50/90 via-white to-amber-50/50 p-6 sm:p-7 rounded-3xl border-l-[6px] border-brand-orange shadow-xl shadow-brand-brown/5 border-t border-r border-b border-brand-brown/10">
                <Quote size={52} className="absolute top-4 right-5 text-brand-orange/15 pointer-events-none" />
                <p className="text-base sm:text-lg text-brand-brown/90 leading-relaxed italic font-medium relative z-10">
                  “I still remember the initial days of Bihar Bowl when each new customer brought immense joy and smiles to our faces. Whenever someone praised our authentic wood-fired Litti, the earthy aroma of our kulhad chai, or the traditional ambience, we were on cloud nine. At Bihar Bowl, we fuel that fire in every member and cherish every smile. Today, I'm honored to share our cultural flavors with patrons across the nation.”
                </p>
                <div className="mt-4 pt-3 border-t border-brand-brown/10 flex items-center justify-between text-xs text-brand-brown/60 font-bold uppercase tracking-wider">
                  <span>— Saurabh Singhaniya, Founder</span>
                  <span className="text-brand-orange font-black">Patna, Bihar</span>
                </div>
              </div>
              
              <p className="text-base sm:text-lg text-brand-brown/75 leading-relaxed font-medium">
                We are India's fastest-growing Bihar-food chain and franchise that started its journey back in 2020. We envision blending the wholesome nutritional benefits of pure Chana Sattu with the timeless, charcoal-roasted taste of authentic <strong className="text-brand-brown font-extrabold">Litti Chokha</strong>. Hailing from the cultural heart of Bihar, we take pride in authentic flavors, strict hygiene standards, and world-class hospitality.
              </p>

              {/* 3 Quick Value Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                <div className="flex items-center space-x-3.5 p-3.5 rounded-2xl bg-white border border-brand-orange/20 shadow-md shadow-brand-orange/5 hover:border-brand-orange hover:-translate-y-0.5 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                    <Flame size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-brand-brown uppercase tracking-wider">100% Traditional</p>
                    <p className="text-[11px] text-brand-brown/65 font-medium leading-tight">Wood-Fired & Desi Ghee</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5 p-3.5 rounded-2xl bg-white border border-amber-500/20 shadow-md shadow-amber-500/5 hover:border-amber-500 hover:-translate-y-0.5 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-brand-brown uppercase tracking-wider">Pure Sattu</p>
                    <p className="text-[11px] text-brand-brown/65 font-medium leading-tight">Nutrient-Rich Superfood</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5 p-3.5 rounded-2xl bg-white border border-emerald-500/20 shadow-md shadow-emerald-500/5 hover:border-emerald-500 hover:-translate-y-0.5 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-brand-brown uppercase tracking-wider">50+ Outlets</p>
                    <p className="text-[11px] text-brand-brown/65 font-medium leading-tight">Expanding Across India</p>
                  </div>
                </div>
              </div>
              
              {/* Dual CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link 
                  to="/about" 
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-brand-brown via-[#5A2E16] to-brand-brown hover:from-brand-orange hover:to-amber-600 text-white px-8 py-4 rounded-xl font-extrabold text-sm shadow-xl shadow-brand-brown/25 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
                >
                  <span>Read Our Full Story</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <Link
                  to="/franchise"
                  className="inline-flex items-center space-x-2 bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange border border-brand-orange/30 px-6 py-4 rounded-xl font-extrabold text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Sparkles size={16} />
                  <span>Explore Franchise Model</span>
                </Link>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Values / Core Pillars Section */}
      <section className="py-28 bg-[#FBF8F2] relative overflow-hidden border-t border-b border-brand-orange/15">
        {/* Subtle decorative glow and motif */}
        <div className="absolute inset-0 opacity-[0.035] mithila-pattern pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-black uppercase tracking-[0.25em] mb-4 shadow-sm">
              <Sparkles size={14} className="text-brand-orange" />
              <span>Our Core Pillars</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-brown leading-[1.15] font-display tracking-tight mb-4">
              The Soul Behind <br />
              <span className="bg-gradient-to-r from-brand-orange via-amber-600 to-brand-brown bg-clip-text text-transparent italic font-serif">
                Every Single Kulhad
              </span>
            </h2>
            <p className="text-base sm:text-lg text-brand-brown/75 font-medium leading-relaxed max-w-2xl mx-auto">
              We didn’t just build a restaurant chain — we revived an ancient culinary art with deep respect for authentic taste, modern hygiene, and grassroots communities.
            </p>
          </div>

          {/* 3 Pillar Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
            
            {/* Pillar 01: Authenticity */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 border-2 border-brand-orange/20 shadow-xl shadow-brand-brown/5 hover:shadow-2xl hover:border-brand-orange/50 hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-6 right-8 text-5xl font-black font-serif text-brand-orange/10 group-hover:text-brand-orange/20 transition-colors pointer-events-none">
                01
              </div>
              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-orange to-amber-500 text-white flex items-center justify-center shadow-lg shadow-brand-orange/35 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 mb-6">
                  <Flame size={32} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full inline-block mb-3">
                  Traditional Preparation
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-brand-brown mb-3 font-display">
                  Authentic Heritage
                </h3>
                <p className="text-brand-brown/75 text-sm sm:text-base leading-relaxed font-medium mb-6">
                  Preserving the real taste of Bihar through authentic wood-fired and charcoal-roasted methods. Basted in aromatic, pure Desi Cow Ghee for an unmistakably rustic culinary experience.
                </p>
                <ul className="space-y-2.5 pt-2 border-t border-brand-brown/10 text-xs sm:text-sm font-bold text-brand-brown/85">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-brand-orange shrink-0" />
                    <span>100% Wood-Fired & Charcoal Roasted</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-brand-orange shrink-0" />
                    <span>Pure Aromatic Desi Cow Ghee</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-brand-orange shrink-0" />
                    <span>Zero Artificial Preservatives or Colors</span>
                  </li>
                </ul>
              </div>
              <div className="h-1.5 w-full bg-gradient-to-r from-brand-orange to-amber-500 rounded-full mt-8 group-hover:scale-x-105 transition-transform" />
            </motion.div>

            {/* Pillar 02: Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 border-2 border-amber-500/20 shadow-xl shadow-brand-brown/5 hover:shadow-2xl hover:border-amber-500/50 hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-6 right-8 text-5xl font-black font-serif text-amber-500/10 group-hover:text-amber-500/20 transition-colors pointer-events-none">
                02
              </div>
              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/35 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 mb-6">
                  <Sparkles size={32} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full inline-block mb-3">
                  Modern Quick Service
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-brand-brown mb-3 font-display">
                  Culinary Innovation
                </h3>
                <p className="text-brand-brown/75 text-sm sm:text-base leading-relaxed font-medium mb-6">
                  Transforming centuries-old Bihari comfort food into standardized, hygienic quick-service bowls designed for the global, health-conscious urban palate.
                </p>
                <ul className="space-y-2.5 pt-2 border-t border-brand-brown/10 text-xs sm:text-sm font-bold text-brand-brown/85">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                    <span>Strict Kitchen SOPs & FSSAI Standards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                    <span>High-Protein Pure Chana Sattu Blends</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                    <span>Consistent Taste Across 50+ Outlets</span>
                  </li>
                </ul>
              </div>
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mt-8 group-hover:scale-x-105 transition-transform" />
            </motion.div>

            {/* Pillar 03: Community */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 border-2 border-emerald-500/20 shadow-xl shadow-brand-brown/5 hover:shadow-2xl hover:border-emerald-500/50 hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-6 right-8 text-5xl font-black font-serif text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors pointer-events-none">
                03
              </div>
              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/35 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 mb-6">
                  <HeartHandshake size={32} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full inline-block mb-3">
                  Grassroots Impact
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-brand-brown mb-3 font-display">
                  Soil & Community
                </h3>
                <p className="text-brand-brown/75 text-sm sm:text-base leading-relaxed font-medium mb-6">
                  Empowering rural pottery artisans, sustainable clay pot creators, and local farmers throughout Bihar. Every kulhad served honors our cultural roots and creates sustainable livelihoods.
                </p>
                <ul className="space-y-2.5 pt-2 border-t border-brand-brown/10 text-xs sm:text-sm font-bold text-brand-brown/85">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>Uplifting 500+ Local Clay Potters</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>100% Earth-Friendly Biodegradable Kulhads</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>Direct Farm-to-Kitchen Sourcing</span>
                  </li>
                </ul>
              </div>
              <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full mt-8 group-hover:scale-x-105 transition-transform" />
            </motion.div>

          </div>

          {/* Bottom Ribbon / Brand Motto Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 sm:mt-16 bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl border-2 border-brand-orange/20 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center space-x-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0 shadow-inner">
                <Award size={24} />
              </div>
              <div>
                <p className="text-xs font-black text-brand-orange uppercase tracking-widest">The Bihar Bowl Motto</p>
                <p className="text-lg sm:text-xl font-black text-brand-brown font-display tracking-tight">
                  "Bihar Se Bharat Tak, Bharat Se World Tak"
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-brand-brown text-xs font-extrabold border border-amber-200">
                🏆 India's #1 Litti Chain
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-extrabold border border-emerald-200">
                🌿 100% Desi Cow Ghee
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-50 text-brand-orange text-xs font-extrabold border border-orange-200">
                🍲 1M+ Bowls Served
              </span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Soulful Memories (Testimonials) Section */}
      <section className="py-28 sm:py-32 bg-gradient-to-b from-[#1C0B03] via-[#2A1005] to-[#1C0B03] text-white relative overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-orange/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-500/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] mithila-pattern pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header & Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-black uppercase tracking-[0.25em] mb-4 shadow-lg">
                <Sparkles size={14} className="text-amber-300" />
                <span>Soulful Memories & Reviews</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display leading-[1.15] text-white tracking-tight">
                What Our <br />
                <span className="bg-gradient-to-r from-amber-300 via-brand-orange to-amber-200 bg-clip-text text-transparent italic font-serif">
                  Community Says
                </span>
              </h2>
              <p className="text-white/70 text-base sm:text-lg font-medium mt-3 leading-relaxed">
                Over 1,000,000+ kulhads cuddled, loved, and remembered across India. Here is what our guests and partners have to say.
              </p>
            </div>

            {/* Slider Navigation Buttons + Pagination Indicators */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setTestimonialIdx((prev) => (prev === 0 ? 1 : 0))}
                className="w-14 h-14 rounded-full bg-white/5 hover:bg-brand-orange border border-white/20 hover:border-brand-orange text-white flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer group"
                aria-label="Previous testimonials"
              >
                <ChevronRight size={22} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <div className="flex items-center space-x-2 px-3 py-2 rounded-full bg-white/5 border border-white/10">
                <span className={`h-3 rounded-full transition-all duration-300 ${testimonialIdx === 0 ? 'bg-amber-400 w-7' : 'bg-white/30 w-3'}`} />
                <span className={`h-3 rounded-full transition-all duration-300 ${testimonialIdx === 1 ? 'bg-amber-400 w-7' : 'bg-white/30 w-3'}`} />
              </div>

              <button 
                onClick={() => setTestimonialIdx((prev) => (prev === 0 ? 1 : 0))}
                className="w-14 h-14 rounded-full bg-white/5 hover:bg-brand-orange border border-white/20 hover:border-brand-orange text-white flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer group"
                aria-label="Next testimonials"
              >
                <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* 3 Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Anjali Sharma",
                role: "Food & Lifestyle Blogger",
                outlet: "Patna Flagship",
                initials: "AS",
                rating: 5,
                title: "Unmatched Authentic Taste",
                text: "The most authentic Litti Chokha I've tasted outside of home! The wood-fired charcoal aroma and pure desi cow ghee transport you straight to the rustic roots of Bihar.",
                gradient: "from-amber-500 to-brand-orange"
              },
              {
                name: "Rahul Verma",
                role: "Franchise Partner",
                outlet: "Pune & Mumbai Hub",
                initials: "RV",
                rating: 5,
                title: "Best ROI & Turnkey Support",
                text: "Partnering with Bihar Bowl was our best business decision. Kitchen SOPs are standardized, customer loyalty is phenomenal, and we hit operational breakeven in record time.",
                gradient: "from-brand-orange to-red-500"
              },
              {
                name: "Priya Singh",
                role: "Regular Customer",
                outlet: "Darbhanga Outlet",
                initials: "PS",
                rating: 5,
                title: "Soulful Weekend Ritual",
                text: "Holding the earthen Kulhad chai paired with steaming hot Litti Chokha and Baingan Bharta is my favorite family ritual. Pure comfort food at its best!",
                gradient: "from-amber-600 to-yellow-500"
              },
              {
                name: "Dr. Arvind Kumar",
                role: "Nutritionist & Foodie",
                outlet: "Bengaluru South",
                initials: "AK",
                rating: 5,
                title: "Clean Indian Superfood",
                text: "Finally, an Indian food chain celebrating pure Chana Sattu as a powerhouse protein source. Delicious, gut-friendly, and 100% natural without artificial additives.",
                gradient: "from-emerald-500 to-teal-600"
              },
              {
                name: "Neha & Rohit Gupta",
                role: "Food Enthusiasts",
                outlet: "Kolkata Hub",
                initials: "NG",
                rating: 5,
                title: "Ambience & Hospitality 10/10",
                text: "The royal Mithila artwork, soothing folk music, and warm kulhad service make dining here unforgettable. World-class hospitality with true desi heart.",
                gradient: "from-amber-500 to-brand-orange"
              },
              {
                name: "Siddharth Mehta",
                role: "Franchise Partner",
                outlet: "Lucknow Central",
                initials: "SM",
                rating: 5,
                title: "Seamless Supply Chain",
                text: "Bihar Bowl's central spice formulations and digital POS tech make operating effortless. The brand pull among youth and families is simply extraordinary.",
                gradient: "from-brand-brown-light to-amber-600"
              }
            ].slice(testimonialIdx * 3, testimonialIdx * 3 + 3).map((item, i) => (
              <motion.div
                key={`${testimonialIdx}-${i}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-gradient-to-b from-white/10 via-white/[0.06] to-white/[0.03] backdrop-blur-xl p-8 sm:p-9 rounded-[2.5rem] border border-white/15 hover:border-brand-orange/50 hover:bg-white/[0.12] transition-all duration-500 shadow-2xl group flex flex-col justify-between"
              >
                {/* Background Quote Watermark */}
                <Quote size={52} className="absolute top-6 right-7 text-amber-400/15 group-hover:text-amber-400/30 transition-colors pointer-events-none" />

                <div>
                  {/* Rating Stars & Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center space-x-1 text-amber-400">
                      {[...Array(item.rating)].map((_, idx) => (
                        <Star key={idx} size={17} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-300/90 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                      {item.outlet}
                    </span>
                  </div>

                  {/* Title & Quote */}
                  <h4 className="text-xl font-black text-white font-display mb-3 tracking-tight">
                    "{item.title}"
                  </h4>
                  <p className="text-base text-white/80 leading-relaxed font-medium italic mb-8">
                    "{item.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-4 pt-5 border-t border-white/10">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${item.gradient} flex items-center justify-center text-white font-extrabold text-base shadow-lg border-2 border-white/30 shrink-0`}>
                    {item.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-extrabold text-white text-base leading-tight">{item.name}</p>
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    </div>
                    <p className="text-amber-300/80 text-xs font-bold uppercase tracking-wider mt-0.5">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Trust & Review CTA Strip */}
          <div className="mt-14 sm:mt-16 bg-white/5 backdrop-blur-xl p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-sm font-bold text-white/90">
              <span className="flex items-center gap-2">
                <span className="text-amber-400 font-black text-lg">★ 4.9</span>
                <span className="text-white/70">Google Reviews (12K+)</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 hidden sm:inline-block" />
              <span className="flex items-center gap-2">
                <span className="text-red-400 font-black text-lg">♥ 4.8</span>
                <span className="text-white/70">Zomato Foodies (18K+)</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 hidden sm:inline-block" />
              <span className="flex items-center gap-2">
                <span className="text-emerald-400 font-black text-lg">✔ 100%</span>
                <span className="text-white/70">Authentic Wood-Fired Taste</span>
              </span>
            </div>

            <Link
              to="/reviews"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-orange to-amber-500 hover:from-amber-500 hover:to-brand-orange text-white px-6 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-brand-orange/30 hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
            >
              <span>View All Community Reviews</span>
              <ChevronRight size={16} />
            </Link>
          </div>

        </div>
      </section>

      {/* Why Choose Us (Luxury Bento Grid) */}
      <section className="py-28 sm:py-32 bg-[#FAF6EE] relative overflow-hidden border-t border-b border-brand-orange/15">
        {/* Subtle decorative background glow and motif */}
        <div className="absolute inset-0 opacity-[0.035] mithila-pattern pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-black uppercase tracking-[0.25em] mb-4 shadow-sm">
              <Sparkles size={14} className="text-brand-orange" />
              <span>Why Choose Bihar Bowl?</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-brand-brown leading-[1.15] tracking-tight mb-4">
              Partner With India's <br />
              <span className="bg-gradient-to-r from-brand-orange via-amber-600 to-brand-brown bg-clip-text text-transparent italic font-serif">
                Most Loved Food Network
              </span>
            </h2>
            <p className="text-base sm:text-lg text-brand-brown/75 font-medium leading-relaxed max-w-2xl mx-auto">
              High profit margins, standardized kitchen SOPs, zero master-chef dependency, and 360° operational training from Day 1.
            </p>
          </div>
          
          {/* Luxury Harmonious Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-7">
            
            {/* Bento Card 1 (Flagship Dark Chocolate & Gold Card - 7 cols) */}
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="md:col-span-7 bg-gradient-to-br from-[#2D1306] via-[#3B1908] to-[#250D04] rounded-[2.5rem] p-8 sm:p-11 text-white relative overflow-hidden group border-2 border-brand-orange/30 shadow-2xl flex flex-col justify-between min-h-[380px]"
            >
              <div className="absolute inset-0 opacity-10 mithila-pattern pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-brand-orange/25 rounded-full blur-3xl group-hover:bg-brand-orange/40 transition-all duration-700 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-orange to-amber-500 text-white flex items-center justify-center shadow-lg shadow-brand-orange/40 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <TrendingUp size={28} />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/10 text-amber-300 border border-white/20">
                    <Sparkles size={13} className="text-amber-300" />
                    <span>High Profitability</span>
                  </span>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-5xl sm:text-6xl font-black font-display text-amber-300">65% - 70%</span>
                    <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Gross Margin</span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black font-display text-white mb-3">
                    Massive Margins & Sustainable Scale
                  </h4>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed font-medium">
                    Our centralized supply chain and bulk raw-material procurement from Bihar eliminate ingredient wastage and guarantee high margins with minimal kitchen overhead.
                  </p>
                </div>
              </div>

              {/* 3 Quick Value Bullets */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/15">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-amber-300 text-xs font-black">Zero Chef Risk</p>
                  <p className="text-[11px] text-white/70 font-medium">Pre-mixed SOPs</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-amber-300 text-xs font-black">Direct Supply</p>
                  <p className="text-[11px] text-white/70 font-medium">Direct from Bihar</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-amber-300 text-xs font-black">Digital Tech</p>
                  <p className="text-[11px] text-white/70 font-medium">Automated POS</p>
                </div>
              </div>
            </motion.div>

            {/* Bento Card 2 (Terracotta Amber Sunset Card - 5 cols) */}
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="md:col-span-5 bg-gradient-to-br from-brand-orange via-[#E85926] to-[#C94717] rounded-[2.5rem] p-8 sm:p-10 text-white relative overflow-hidden group border-2 border-white/20 shadow-2xl flex flex-col justify-between min-h-[380px]"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-300/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <CreditCard size={28} />
                  </div>
                  <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-black/20 text-yellow-200 border border-white/20">
                    Quick Breakeven
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl sm:text-5xl font-black font-display text-white">12 – 18</span>
                  <span className="text-sm font-black uppercase tracking-wider text-yellow-200">Months ROI</span>
                </div>
                <h4 className="text-2xl font-black font-display text-white mb-3">High ROI Model</h4>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed font-medium">
                  Tested and proven unit economics. Designed for rapid payback through high daily order volume and compact kitchen footprints.
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between text-xs font-bold text-white/90">
                <span>💰 Min. ₹10-15 Lakhs</span>
                <span>📐 250 - 1000 Sq.Ft Format</span>
              </div>
            </motion.div>

            {/* Bento Card 3 (Warm Honey Ivory Card - 4 cols) */}
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="md:col-span-4 bg-gradient-to-br from-white via-[#FCFAF5] to-[#F5ECE0] rounded-[2.5rem] p-8 sm:p-9 text-brand-brown relative overflow-hidden group border-2 border-amber-400/30 shadow-xl flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 bg-amber-500/10 px-3 py-1 rounded-full">
                  Footprint
                </span>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-brand-brown font-display mb-1">50+ Outlets</div>
                <p className="text-xs uppercase tracking-widest font-black text-brand-orange mb-3">20+ Cities & Growing</p>
                <p className="text-brand-brown/75 text-sm leading-relaxed font-medium">
                  Proven acceptance across both metro centers and tier-2 cultural capitals, with high repeat diner rates.
                </p>
              </div>

              <div className="pt-4 border-t border-brand-brown/10 mt-6 text-xs font-black text-brand-brown/80 flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-brand-orange" />
                <span>Metro & Tier-2 Ready</span>
              </div>
            </motion.div>

            {/* Bento Card 4 (Royal Heritage Card - 4 cols) */}
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="md:col-span-4 bg-gradient-to-br from-white via-[#FCFAF5] to-[#F5ECE0] rounded-[2.5rem] p-8 sm:p-9 text-brand-brown relative overflow-hidden group border-2 border-brand-orange/30 shadow-xl flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Award size={24} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full">
                  Brand Equity
                </span>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-brand-brown font-display mb-1">India's #1</div>
                <p className="text-xs uppercase tracking-widest font-black text-brand-orange mb-3">Bihar-Food Chain</p>
                <p className="text-brand-brown/75 text-sm leading-relaxed font-medium">
                  High customer recall, emotional cultural connection, and celebrity food blogger coverage across India.
                </p>
              </div>

              <div className="pt-4 border-t border-brand-brown/10 mt-6 text-xs font-black text-brand-brown/80 flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-brand-orange" />
                <span>Over 1M+ Bowls Served</span>
              </div>
            </motion.div>

            {/* Bento Card 5 (360 Support Card - 4 cols) */}
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="md:col-span-4 bg-gradient-to-br from-white via-[#FCFAF5] to-[#F5ECE0] rounded-[2.5rem] p-8 sm:p-9 text-brand-brown relative overflow-hidden group border-2 border-emerald-500/30 shadow-xl flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <ShieldCheck size={24} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-500/10 px-3 py-1 rounded-full">
                  Turnkey SOPs
                </span>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-brand-brown font-display mb-1">360° Support</div>
                <p className="text-xs uppercase tracking-widest font-black text-emerald-700 mb-3">Launch To Operations</p>
                <p className="text-brand-brown/75 text-sm leading-relaxed font-medium">
                  Complete assistance with store location, architectural design, kitchen setup, staff hiring & POS training.
                </p>
              </div>

              <div className="pt-4 border-t border-brand-brown/10 mt-6 text-xs font-black text-brand-brown/80 flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600" />
                <span>Dedicated Operations Manager</span>
              </div>
            </motion.div>

          </div>
          
          {/* Bottom Call To Action Banner */}
          <div className="mt-16 sm:mt-20 bg-gradient-to-r from-brand-brown via-[#5A2E16] to-brand-brown text-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-brand-orange/30">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-black uppercase tracking-widest mb-2 border border-white/15">
                <Sparkles size={14} className="text-amber-300" />
                <span>Limited City Slots Available for 2026</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white mb-2">
                Ready To Own A Bihar Bowl Franchise?
              </h3>
              <p className="text-sm sm:text-base text-white/80 max-w-xl font-medium">
                Join India's fastest-growing ethnic QSR franchise. Speak directly with our expansion leadership team.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link 
                to="/franchise" 
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-brand-orange to-amber-500 hover:from-amber-500 hover:to-brand-orange text-white px-8 py-5 rounded-2xl text-sm font-black uppercase tracking-wider shadow-xl shadow-brand-orange/40 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
              >
                <span>Request Franchise Consultation</span>
                <ChevronRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Video Section (Experience The Living Tradition) */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-[#2B1206] via-[#1D0B03] to-[#2B1206] relative overflow-hidden border-t border-b border-brand-orange/20">
        {/* Ambient atmospheric glows */}
        <div className="absolute inset-0 opacity-[0.06] mithila-pattern pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-orange/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Interactive Video Player (7 cols on desktop) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="relative group p-2 sm:p-2.5 rounded-[2.5rem] bg-gradient-to-tr from-brand-orange/40 via-amber-500/20 to-white/10 shadow-[0_25px_60px_-15px_rgba(255,107,53,0.35)] backdrop-blur-sm border border-brand-orange/30">
                
                {/* Glow ring on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange via-amber-400 to-brand-orange rounded-[2.7rem] blur-xl opacity-25 group-hover:opacity-45 transition-opacity duration-700 pointer-events-none" />

                <div className="rounded-[2rem] overflow-hidden aspect-video relative bg-[#130702] border border-white/10">
                  <video 
                    ref={videoRef}
                    src="/advertising.mp4" 
                    className="w-full h-full object-cover cursor-pointer"
                    autoPlay 
                    muted={isVideoMuted}
                    loop 
                    playsInline
                    onClick={toggleVideoPlay}
                  />

                  {/* Gradient shadow overlay for controls legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40 pointer-events-none" />

                  {/* Top Bar inside Video: Live Badge & Sound Toggle */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-black tracking-widest uppercase">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span>Official Brand Film</span>
                    </div>

                    <button
                      type="button"
                      onClick={toggleVideoMute}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
                      title={isVideoMuted ? "Click to unmute sound" : "Click to mute sound"}
                    >
                      {isVideoMuted ? (
                        <>
                          <VolumeX size={15} className="text-amber-400" />
                          <span className="text-[11px] uppercase tracking-wider">Unmute Sound</span>
                        </>
                      ) : (
                        <>
                          <Volume2 size={15} className="text-emerald-400 animate-pulse" />
                          <span className="text-[11px] uppercase tracking-wider text-emerald-400">Audio On</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Center Play/Pause button overlay */}
                  <div 
                    onClick={toggleVideoPlay}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                  >
                    {!isVideoPlaying && (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-orange/90 text-white flex items-center justify-center shadow-2xl shadow-brand-orange/50 hover:scale-110 active:scale-95 transition-transform backdrop-blur-md border-2 border-white/30">
                        <Play size={30} className="ml-1 text-white fill-white" />
                      </div>
                    )}
                  </div>

                  {/* Bottom Bar inside Video */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20 text-white">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={toggleVideoPlay}
                        className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer border border-white/20"
                        title={isVideoPlaying ? "Pause Video" : "Play Video"}
                      >
                        {isVideoPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                      </button>
                      <div>
                        <p className="text-xs sm:text-sm font-extrabold text-white drop-shadow">The Bihar Bowl Journey</p>
                        <p className="text-[10px] sm:text-[11px] text-amber-300 font-medium">Authentic Flavors & Culture</p>
                      </div>
                    </div>

                    <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 text-[11px] font-bold text-white/80">
                      <Sparkles size={12} className="text-amber-400" />
                      <span>HD Commercial</span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

            {/* Right Column: Narrative & Heritage Details (5 cols on desktop) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-6 sm:space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-amber-300 text-xs font-black uppercase tracking-[0.2em] mb-4">
                  <Sparkles size={14} className="text-brand-orange" />
                  <span>Cinematic Heritage</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-black font-display text-white leading-[1.12] tracking-tight">
                  Experience The <br />
                  <span className="bg-gradient-to-r from-amber-300 via-brand-orange to-yellow-200 bg-clip-text text-transparent italic font-serif">
                    Living Tradition
                  </span>
                </h2>
              </div>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed font-medium">
                Watch how we bring the soulful, royal flavors of Bihar to life. From hand-roasted sattu kneaded in pure cold-pressed mustard oil to wood-smoked litti tossed in fragrant desi ghee—every frame is a tribute to our timeless heritage.
              </p>

              {/* 2 Heritage Highlight Points */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-orange/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/20 border border-brand-orange/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Flame size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Earthen Wood-Fired Craft</h4>
                    <p className="text-xs text-white/70 leading-relaxed">Slow-baked over sacred wood and cow-dung embers for that signature rustic smoky depth.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-orange/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">100% Pure Desi Ghee & Spices</h4>
                    <p className="text-xs text-white/70 leading-relaxed">Direct farm-sourced ingredients and hand-pounded masalas without artificial additives.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link 
                  to="/about"
                  className="inline-flex items-center space-x-2.5 bg-gradient-to-r from-brand-orange to-amber-500 hover:from-amber-500 hover:to-brand-orange text-white px-7 py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-brand-orange/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Explore Our Story</span>
                  <ChevronRight size={16} />
                </Link>

                <Link 
                  to="/menu"
                  className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-6 py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>View Our Menu</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* Taste the Tradition Section */}
      <section className="py-20 sm:py-28 lg:py-32 bg-gradient-to-b from-[#FAF6EE] via-[#FFFDF9] to-[#F5ECE0] relative overflow-hidden border-t border-b border-brand-orange/15">
        {/* Subtle decorative glow & Mithila pattern */}
        <div className="absolute inset-0 opacity-[0.035] mithila-pattern pointer-events-none" />
        <div className="absolute top-1/3 -left-32 w-80 sm:w-96 h-80 sm:h-96 bg-brand-orange/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 -right-32 w-80 sm:w-96 h-80 sm:h-96 bg-amber-400/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Narrative, 4 Feature Micro-Cards, CTAs (7 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6 sm:space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/25 text-brand-orange text-xs font-black uppercase tracking-[0.25em] mb-4 shadow-sm">
                  <Flame size={14} className="text-brand-orange animate-pulse" />
                  <span>Taste The Heritage • Estd. 2020</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-brand-brown leading-[1.15] font-display tracking-tight">
                  Authentic <span className="bg-gradient-to-r from-brand-orange via-amber-600 to-brand-brown bg-clip-text text-transparent italic font-serif">Bihar</span> <br className="hidden sm:inline" />
                  On Your Plate
                </h2>
                <p className="text-xs sm:text-sm font-bold text-brand-orange uppercase tracking-widest mt-2 flex items-center gap-2">
                  <Sparkles size={15} />
                  <span>Wood-Fired • 100% Desi Cow Ghee • Pure Chana Sattu</span>
                </p>
              </div>

              <p className="text-base sm:text-lg text-brand-brown/80 leading-relaxed font-medium">
                We bring you the timeless soul of Bihar through our authentic heritage recipes. From the smoky charcoal-roasted Litti dipped in pure cow ghee to refreshing earthen-pot Sattu Sharbat, every single bite is a soulful journey back to our cultural roots.
              </p>

              {/* 4 Feature Micro-Cards (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="flex items-center space-x-3.5 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-brand-orange/20 shadow-md shadow-brand-brown/5 hover:border-brand-orange hover:-translate-y-0.5 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-orange to-amber-500 flex items-center justify-center text-white shadow-md shadow-brand-orange/25 shrink-0">
                    <Flame size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-brand-brown uppercase tracking-wider">100% Desi Ghee</h4>
                    <p className="text-xs text-brand-brown/65 font-medium">Pure cow ghee dip for rich aroma</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-amber-500/20 shadow-md shadow-brand-brown/5 hover:border-amber-500 hover:-translate-y-0.5 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-500 flex items-center justify-center text-white shadow-md shadow-amber-500/25 shrink-0">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-brand-brown uppercase tracking-wider">Wood-Fired Roasting</h4>
                    <p className="text-xs text-brand-brown/65 font-medium">Slow-charred over open coal embers</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-emerald-500/20 shadow-md shadow-brand-brown/5 hover:border-emerald-500 hover:-translate-y-0.5 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-green-500/25 shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-brand-brown uppercase tracking-wider">Superfood Sattu</h4>
                    <p className="text-xs text-brand-brown/65 font-medium">100% roasted chana, zero adulteration</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-brand-brown/20 shadow-md shadow-brand-brown/5 hover:border-brand-brown hover:-translate-y-0.5 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-brown to-brand-brown-light flex items-center justify-center text-white shadow-md shadow-brand-brown/25 shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-brand-brown uppercase tracking-wider">Authentic Chokha</h4>
                    <p className="text-xs text-brand-brown/65 font-medium">Wood-smoked baingan & mustard oil</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link 
                  to="/menu" 
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-brand-brown via-[#5A2E16] to-brand-brown hover:from-brand-orange hover:to-amber-600 text-white px-8 py-4 rounded-xl font-extrabold text-sm sm:text-base shadow-xl shadow-brand-brown/25 hover:scale-105 active:scale-95 transition-all group"
                >
                  <span>Explore Full Menu</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <Link
                  to="/locations"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange border border-brand-orange/30 px-6 py-4 rounded-xl font-extrabold text-sm sm:text-base hover:scale-105 active:scale-95 transition-all"
                >
                  <MapPin size={16} />
                  <span>Find 50+ Outlets</span>
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Luxury Card Showcase with Floating Elements (5 cols) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative max-w-md mx-auto">
                {/* Ambient Soft Glow Behind Photo */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-brand-orange/30 via-amber-400/25 to-brand-brown/20 rounded-[3rem] blur-2xl -z-10" />

                {/* Double Bordered Luxury Card */}
                <div className="p-3 sm:p-4 bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border-2 border-brand-orange/20 relative group">
                  
                  {/* Floating Luxury Badge (Replaces old clunky neon circle) */}
                  <div className="absolute -top-3 -right-2 sm:-top-3.5 sm:-right-3.5 bg-gradient-to-r from-brand-orange to-amber-600 text-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-1.5 border-2 border-white text-xs font-black tracking-wider uppercase z-20 animate-float">
                    <Sparkles size={14} className="text-yellow-200" />
                    <span>Bihar's Pride</span>
                  </div>

                  {/* Main Visual */}
                  <div className="aspect-[2/3] rounded-[2rem] overflow-hidden relative">
                    <img 
                      src="/littichokhaads.png" 
                      alt="Traditional Bihar Bowl Litti Chokha" 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                      referrerPolicy="no-referrer" 
                    />
                    
                    {/* Dark gradient at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* Luxury Overlay Badge at bottom */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/65 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-2xl text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-black text-lg sm:text-xl leading-tight">
                            Swaad Bihar Ka!
                          </p>
                          <p className="text-amber-400 font-bold uppercase tracking-wider text-[11px] mt-1 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            1 Lakh+ Plates Served Daily
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-orange to-amber-500 flex items-center justify-center text-white shadow-lg shadow-brand-orange/40 shrink-0">
                          <Flame size={20} />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Featured Dish: The Soul of Bihar (Litti Chokha Showcase) */}
      <section className="py-20 sm:py-28 bg-[#FFFDF9] relative overflow-hidden">
        {/* Subtle decorative Mithila elements & ambient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] mithila-pattern pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Main Showcase Card with Double-layered Luxury Border */}
          <div className="relative rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-10 lg:p-14 bg-gradient-to-br from-[#FFFDF9] via-[#FAF6EE] to-[#F5ECE0] border-2 border-brand-orange/25 shadow-2xl">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Full Uncropped Portrait Poster in Exact 2:3 Frame (5 cols) */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-5 relative flex justify-center"
              >
                <div className="relative w-full max-w-[360px] sm:max-w-[400px]">
                  {/* Ambient Glow behind frame */}
                  <div className="absolute -inset-3 bg-gradient-to-tr from-brand-orange/25 via-amber-400/20 to-brand-brown/15 rounded-[2.5rem] blur-xl -z-10" />

                  {/* Picture Frame with subtle double border */}
                  <div className="p-2 sm:p-2.5 bg-white/95 backdrop-blur-md rounded-[2.2rem] sm:rounded-[2.5rem] shadow-2xl border-2 border-brand-orange/20 relative group">
                    {/* Exact 2:3 aspect ratio matching the 1024x1536 resolution: Zero Crop, Full Image Display */}
                    <div className="aspect-[2/3] w-full rounded-[1.8rem] sm:rounded-[2rem] overflow-hidden relative bg-black/5">
                      <img 
                        src="/littichokhaads.png" 
                        alt="Bihar Bowl - Swaad Bihar Ka, Bihar Bowl Se!" 
                        className="w-full h-full object-cover rounded-[1.8rem] sm:rounded-[2rem] transform group-hover:scale-102 transition-transform duration-700 block"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Culinary Details, 4 Pillars, CTAs (7 cols) */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 space-y-6 sm:space-y-7"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/25 text-brand-orange text-xs font-black uppercase tracking-[0.25em] mb-3 shadow-sm">
                    <Sparkles size={14} className="text-brand-orange" />
                    <span>Featured Dish • Signature Special</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-brown font-display tracking-tight leading-[1.15]">
                    The Soul of Bihar: <br />
                    <span className="bg-gradient-to-r from-brand-orange via-amber-600 to-brand-brown bg-clip-text text-transparent italic font-serif">
                      Litti Chokha
                    </span>
                  </h2>
                </div>

                <p className="text-base sm:text-lg text-brand-brown/80 leading-relaxed font-medium">
                  Litti is a traditional dish from the Indian state of Bihar. It is made of whole wheat flour, stuffed with sattu (roasted chickpea flour) mixed with herbs and spices and then roasted over coal or wood then it is tossed with much ghee. Served hot with authentic smoky roasted eggplant-potato chokha.
                </p>

                {/* 4 Feature Micro-Cards in a 2x2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {[
                    { title: 'Authentic Sattu', desc: 'Spiced roasted chickpea flour', icon: Sparkles },
                    { title: 'Wood-fired', desc: 'Traditional wood & coal roasting', icon: Flame },
                    { title: 'Desi Ghee', desc: 'Pure desi cow ghee dip', icon: Award },
                    { title: 'Smoky Chokha', desc: 'Fire-roasted eggplant & aloo mash', icon: CheckCircle2 }
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-start space-x-3.5 p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-brand-orange/20 shadow-sm hover:border-brand-orange hover:-translate-y-0.5 transition-all"
                    >
                      <div className="mt-0.5 w-9 h-9 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                        <item.icon size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-brown text-sm sm:text-base leading-tight">{item.title}</h4>
                        <p className="text-xs text-brand-brown/65 font-medium mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link 
                    to="/menu" 
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-brand-brown via-[#5A2E16] to-brand-brown hover:from-brand-orange hover:to-amber-600 text-white px-8 py-4 rounded-xl font-extrabold text-sm sm:text-base shadow-xl shadow-brand-brown/25 hover:scale-105 active:scale-95 transition-all group"
                  >
                    <span>Explore Menu</span>
                    <ChevronRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                  </Link>

                  <Link 
                    to="/locations" 
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange border border-brand-orange/30 px-6 py-4 rounded-xl font-extrabold text-sm sm:text-base hover:scale-105 active:scale-95 transition-all"
                  >
                    <MapPin size={16} />
                    <span>Locate Nearest Branch</span>
                  </Link>
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </section>

      {/* Foodie Moments & Community Feasts (Interactive Cluster & Spread Floating Showcase) */}
      <section className="py-20 sm:py-28 lg:py-32 bg-gradient-to-b from-[#FAF6EE] via-white to-[#FAF6EE] relative overflow-hidden border-b border-brand-orange/15">
        <div className="absolute inset-0 opacity-[0.03] mithila-pattern pointer-events-none" />
        
        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header with Enlarged Prominent Typography */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/25 text-brand-orange text-xs sm:text-sm font-black uppercase tracking-[0.25em] mb-4 shadow-sm">
              <Camera size={16} className="text-brand-orange" />
              <span>Community • #BiharBowlFoodie</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-brown font-display tracking-tight leading-tight">
              Foodie <span className="bg-gradient-to-r from-brand-orange via-amber-600 to-brand-brown bg-clip-text text-transparent italic">Moments</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-brand-brown/80 font-medium mt-4 max-w-2xl mx-auto leading-relaxed">
              Real smiles, steaming earthen kulhads, and unforgettable feasts captured across our 50+ branches nationwide.
            </p>
          </div>
          
          {/* Interactive Floating Canvas (Clusters on idle, separates on cursor hover) */}
          <div 
            onMouseEnter={() => setIsFoodieHovered(true)}
            onMouseLeave={() => { setIsFoodieHovered(false); setActiveFoodieCard(null); }}
            onTouchStart={() => setIsFoodieHovered(!isFoodieHovered)}
            className="relative w-full min-h-[520px] sm:min-h-[620px] lg:min-h-[680px] flex items-center justify-center my-6 rounded-3xl bg-brand-orange/[0.02] border border-brand-orange/10 p-4 transition-colors hover:bg-brand-orange/[0.04] cursor-pointer"
          >
            {/* 8 Floating Cards */}
            {[
              {
                id: 1,
                img: '/menu1.jpg',
                title: 'Vintage Menu Board',
                cat: 'Menu Sheet',
                likes: '3.1k',
                clusterX: -34,
                clusterY: -22,
                clusterRot: -9,
                spreadX: -360,
                spreadY: -110,
                spreadRot: -5,
                floatDuration: 4.2
              },
              {
                id: 2,
                img: '/menu3.png',
                title: 'Mithila Traditional Menu',
                cat: 'Heritage Menu',
                likes: '2.6k',
                clusterX: 28,
                clusterY: -25,
                clusterRot: 7,
                spreadX: -180,
                spreadY: -150,
                spreadRot: 3,
                floatDuration: 5.1
              },
              {
                id: 3,
                img: '/combo_thali.jpg',
                title: 'Royal Bihar Thali',
                cat: 'Grand Feast',
                likes: '4.2k',
                clusterX: 0,
                clusterY: 0,
                clusterRot: -1,
                spreadX: 40,
                spreadY: -140,
                spreadRot: -2,
                floatDuration: 4.6
              },
              {
                id: 4,
                img: '/combo_platter.png',
                title: 'Bihari Sizzling Platter',
                cat: 'Chef Special',
                likes: '2.8k',
                clusterX: -22,
                clusterY: 22,
                clusterRot: -4,
                spreadX: 250,
                spreadY: -100,
                spreadRot: 5,
                floatDuration: 5.4
              },
              {
                id: 5,
                img: '/menu_mushroom.png',
                title: 'Mushroom & Sattu Masala',
                cat: 'Vegetarian',
                likes: '1.9k',
                clusterX: 30,
                clusterY: 18,
                clusterRot: 6,
                spreadX: -270,
                spreadY: 120,
                spreadRot: 4,
                floatDuration: 4.8
              },
              {
                id: 6,
                img: '/menu_chicken_keema.png',
                title: 'Champaran Handi Special',
                cat: 'Regional Non-Veg',
                likes: '3.4k',
                clusterX: -12,
                clusterY: -12,
                clusterRot: 3,
                spreadX: -70,
                spreadY: 140,
                spreadRot: -4,
                floatDuration: 5.2
              },
              {
                id: 7,
                img: '/menu_mutton.png',
                title: 'Slow-Cooked Mutton Litti',
                cat: 'Royal Feast',
                likes: '3.9k',
                clusterX: 18,
                clusterY: -6,
                clusterRot: -5,
                spreadX: 130,
                spreadY: 130,
                spreadRot: 3,
                floatDuration: 4.4
              },
              {
                id: 8,
                img: '/menu_egg.png',
                title: 'Desi Egg Masala Platter',
                cat: 'Comfort Food',
                likes: '2.1k',
                clusterX: -8,
                clusterY: 12,
                clusterRot: 5,
                spreadX: 330,
                spreadY: 110,
                spreadRot: -3,
                floatDuration: 5.7
              }
            ].map((card) => {
              const scaleFactor = windowWidth < 640 ? 0.38 : windowWidth < 1024 ? 0.65 : 1.0;
              const targetX = (isFoodieHovered ? card.spreadX : card.clusterX) * scaleFactor;
              const targetY = (isFoodieHovered ? card.spreadY : card.clusterY) * scaleFactor;
              const targetRot = isFoodieHovered ? card.spreadRot : card.clusterRot;
              const isCurrentActive = activeFoodieCard === card.id;

              return (
                <motion.div
                  key={card.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhoto(card);
                  }}
                  onMouseEnter={(e) => { e.stopPropagation(); setActiveFoodieCard(card.id); }}
                  onMouseLeave={(e) => { e.stopPropagation(); setActiveFoodieCard(null); }}
                  animate={{
                    x: targetX,
                    y: isFoodieHovered ? [targetY - 8, targetY + 8, targetY - 8] : [targetY - 5, targetY + 5, targetY - 5],
                    rotate: isCurrentActive ? 0 : targetRot,
                    scale: isCurrentActive ? 1.15 : isFoodieHovered ? 1.0 : 0.94,
                    zIndex: isCurrentActive ? 50 : isFoodieHovered ? 20 : 30 - card.id
                  }}
                  transition={{
                    x: { type: "spring", stiffness: 90, damping: 14 },
                    rotate: { type: "spring", stiffness: 90, damping: 14 },
                    scale: { duration: 0.3 },
                    y: {
                      repeat: Infinity,
                      duration: card.floatDuration,
                      ease: "easeInOut"
                    }
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto"
                >
                  <div className="w-40 sm:w-52 lg:w-60 p-1.5 sm:p-2.5 bg-white/95 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl border-2 border-brand-orange/20 hover:border-brand-orange transition-colors">
                    <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden relative bg-black">
                      <img 
                        src={card.img} 
                        alt={card.title} 
                        className="w-full h-full object-cover transform hover:scale-108 transition-transform duration-700 block"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Gradient for caption legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                      {/* Top Tag Badge */}
                      <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 text-[10px] sm:text-xs font-bold text-amber-300">
                        {card.cat}
                      </div>

                      {/* Bottom Info with Like count */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between">
                        <p className="text-white font-black text-xs sm:text-sm leading-tight pr-1 truncate">
                          {card.title}
                        </p>
                        <div className="flex items-center gap-1 text-xs font-bold text-white/90 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full shrink-0">
                          <Heart size={12} className="text-rose-400 fill-rose-400" />
                          <span>{card.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* View Full Gallery CTA */}
          <div className="mt-8 text-center">
            <Link 
              to="/gallery" 
              className="inline-flex items-center space-x-3 bg-white hover:bg-brand-orange text-brand-brown hover:text-white border-2 border-brand-orange/30 hover:border-brand-orange px-8 py-3.5 rounded-xl font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all group"
            >
              <span>Explore Full Photo Gallery (50+ Moments)</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

        </div>

        {/* Fullscreen Photo Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-8 cursor-zoom-out"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full max-h-[90vh] bg-[#1C0B03] rounded-3xl sm:rounded-[2.5rem] p-3 sm:p-5 border-2 border-brand-orange/40 shadow-2xl flex flex-col items-center cursor-default overflow-hidden"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedPhoto(null)}
                  aria-label="Close photo preview"
                  className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-brand-orange text-white flex items-center justify-center border border-white/20 shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
                >
                  <X size={22} />
                </button>

                {/* Full Image Display */}
                <div className="w-full flex-1 max-h-[70vh] rounded-2xl overflow-hidden relative bg-black flex items-center justify-center">
                  <img 
                    src={selectedPhoto.img} 
                    alt={selectedPhoto.title} 
                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Bottom Details Bar */}
                <div className="w-full pt-4 px-2 sm:px-4 flex flex-wrap items-center justify-between gap-3 text-white">
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-amber-300 text-xs font-black uppercase tracking-wider mb-1.5">
                      {selectedPhoto.cat}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black font-display text-white">
                      {selectedPhoto.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-sm font-bold text-white">
                      <Heart size={16} className="text-rose-400 fill-rose-400" />
                      <span>{selectedPhoto.likes} Likes</span>
                    </div>

                    <button 
                      onClick={() => setSelectedPhoto(null)}
                      className="px-5 py-2 rounded-xl bg-white/15 hover:bg-brand-orange text-white text-xs sm:text-sm font-bold border border-white/20 transition-all cursor-pointer"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Moments at Bihar Bowl (Continuous Infinite Looping Rotating Marquee Carousel) */}
      <section className="py-20 sm:py-28 bg-[#FAF6EE] relative overflow-hidden border-b border-brand-orange/15">
        <div className="absolute inset-0 opacity-[0.035] mithila-pattern pointer-events-none" />
        
        {/* Soft background palace watermark */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/fullbg.png')" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10 sm:mb-14">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/25 text-brand-orange text-xs sm:text-sm font-black uppercase tracking-[0.25em] mb-3 shadow-sm">
                <Sparkles size={14} className="text-brand-orange" />
                <span>Live Dining Feed • #BiharBowlMoments</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-brown font-display tracking-tight leading-tight">
                Moments at <span className="bg-gradient-to-r from-brand-orange via-amber-600 to-brand-brown bg-clip-text text-transparent italic font-serif">Bihar Bowl</span>
              </h2>
              <p className="text-base sm:text-lg text-brand-brown/75 font-medium mt-2 leading-relaxed">
                Our customers share their love for authentic Bihari flavors. Join the community!
              </p>
            </div>

            <Link 
              to="/gallery" 
              className="inline-flex items-center space-x-2 text-brand-orange hover:text-brand-brown font-black text-sm sm:text-base group transition-colors"
            >
              <span>View Full Gallery</span>
              <ChevronRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Looping Rotating Photos Track (Pauses on cursor hover!) */}
        <div className="relative w-full overflow-hidden group">
          {/* Edge gradient fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF6EE] to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF6EE] to-transparent z-20" />

          {/* Continuous scrolling marquee track */}
          <div className="flex space-x-6 sm:space-x-8 w-max animate-marquee group-hover:[animation-play-state:paused] py-4">
            {[
              { id: 101, img: '/gallery1.jpg', title: 'Wood-Fired Litti Bowl', cat: 'Signature Dish', likes: '2.9k' },
              { id: 102, img: '/gallery2.jpg', title: 'Traditional Earthen Platter', cat: 'Royal Feast', likes: '3.4k' },
              { id: 103, img: '/gallery3.jpg', title: 'Charcoal Smoked Litti', cat: 'Wood-Fired', likes: '4.1k' },
              { id: 104, img: '/gallery4.jpg', title: 'Grand Bihari Thali Feast', cat: 'Special Thali', likes: '3.7k' },
              { id: 105, img: '/gallery_full1.jpg', title: 'Authentic Dining Ambiance', cat: 'Outlet Experience', likes: '2.5k' },
              { id: 106, img: '/gallery_full2.png', title: 'Earthen Kulhad Service', cat: 'Desi Hospitality', likes: '3.2k' },
              { id: 107, img: '/gallery_full3.png', title: 'Crisp Golden Crust Litti', cat: 'Fresh Roast', likes: '2.8k' },
              { id: 108, img: '/gallery_full4.png', title: 'Festive Family Gathering', cat: 'Community Love', likes: '3.6k' },
              // Duplicate set for seamless infinite loop
              { id: 201, img: '/gallery1.jpg', title: 'Wood-Fired Litti Bowl', cat: 'Signature Dish', likes: '2.9k' },
              { id: 202, img: '/gallery2.jpg', title: 'Traditional Earthen Platter', cat: 'Royal Feast', likes: '3.4k' },
              { id: 203, img: '/gallery3.jpg', title: 'Charcoal Smoked Litti', cat: 'Wood-Fired', likes: '4.1k' },
              { id: 204, img: '/gallery4.jpg', title: 'Grand Bihari Thali Feast', cat: 'Special Thali', likes: '3.7k' },
              { id: 205, img: '/gallery_full1.jpg', title: 'Authentic Dining Ambiance', cat: 'Outlet Experience', likes: '2.5k' },
              { id: 206, img: '/gallery_full2.png', title: 'Earthen Kulhad Service', cat: 'Desi Hospitality', likes: '3.2k' },
              { id: 207, img: '/gallery_full3.png', title: 'Crisp Golden Crust Litti', cat: 'Fresh Roast', likes: '2.8k' },
              { id: 208, img: '/gallery_full4.png', title: 'Festive Family Gathering', cat: 'Community Love', likes: '3.6k' },
            ].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => setSelectedPhoto(item)}
                className="w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80 rounded-[2rem] overflow-hidden relative shadow-xl hover:shadow-2xl border-2 border-brand-orange/20 hover:border-brand-orange transition-all duration-500 hover:scale-105 shrink-0 cursor-pointer group/card bg-black"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover/card:scale-110 transition-transform duration-700 block"
                  referrerPolicy="no-referrer"
                />
                
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Category Pill at top */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 text-xs font-bold text-amber-300">
                  {item.cat}
                </div>

                {/* Bottom Title & Heart likes */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <p className="text-white font-black text-sm sm:text-base leading-tight pr-2">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white/90 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full shrink-0">
                    <Heart size={13} className="text-rose-400 fill-rose-400" />
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Menu Section */}
      <section className="py-24 bg-gradient-to-b from-[#FAF6EE] via-[#F4EDE0] to-[#FAF6EE] relative overflow-hidden">
        {/* Subtle decorative background blur orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-brown/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-black uppercase tracking-widest mb-3 shadow-sm">
              <Sparkles size={14} className="text-brand-orange" />
              <span>Chef's Handpicked Favorites</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-brown font-display tracking-tight mb-4">
              Popular on the <span className="text-brand-orange italic font-serif">Menu</span>
            </h2>
            <p className="text-brand-brown/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Steaming wood-charcoal embers, freshly spiced chana sattu, and pure cow desi ghee. Handcrafted favorites that our customers can't get enough of.
            </p>

            {/* Trending Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
              {[
                { id: 'all', label: '👑 All Bestsellers' },
                { id: 'veg', label: '🥬 Pure Veg Specials' },
                { id: 'nonveg', label: '🍗 Royal Non-Veg' },
                { id: 'combos', label: '🍱 Grand Combos' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setPopularCategory(tab.id as any)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer ${
                    popularCategory === tab.id
                      ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30 scale-105 ring-2 ring-brand-orange/30'
                      : 'bg-white text-brand-brown/80 hover:bg-white/95 hover:text-brand-orange border border-brand-brown/10 shadow-sm'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Trending Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9">
            <AnimatePresence mode="popLayout">
              {popularDishes
                .map(dish => {
                  const fromApi = featuredItems.find(f => f.name.toLowerCase() === dish.name.toLowerCase());
                  return fromApi ? { ...dish, price: fromApi.price } : dish;
                })
                .filter(item => popularCategory === 'all' ? true : item.category === popularCategory)
                .slice(0, popularCategory === 'all' ? 3 : 6)
                .map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    key={item.id}
                    whileHover={{ y: -10 }}
                    className="bg-white/95 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-[0_25px_50px_-12px_rgba(255,107,53,0.22)] border-2 border-brand-brown/10 hover:border-brand-orange/40 group flex flex-col justify-between transition-all duration-500"
                  >
                    {/* Uncropped Photo Container with High Quality Framing */}
                    <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-[#FFF5E5] via-[#FBF0DD] to-[#ECE0CC] rounded-t-[2.3rem] flex items-center justify-center p-2.5 sm:p-3.5 group/img">
                      {/* Inner frame */}
                      <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-inner bg-black/5">
                        <img 
                          src={item.image_url} 
                          alt={item.name} 
                          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/littichokha.png';
                          }}
                        />
                        {/* Subtle atmospheric vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      </div>

                      {/* Floating Bestseller / Signature Badge */}
                      <div className={`absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-gradient-to-r ${item.badgeColor} text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg border border-white/30 backdrop-blur-sm`}>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                        </span>
                        <span>{item.badge}</span>
                      </div>

                      {/* Price Tag in luxury dark glass pill */}
                      <div className="absolute top-4 right-4 z-10 bg-[#2D1609]/90 hover:bg-[#2D1609] backdrop-blur-md px-3.5 py-1.5 rounded-full text-white font-black text-sm sm:text-base shadow-xl border border-white/20 flex items-center gap-1">
                        <span className="text-brand-orange text-xs font-bold">₹</span>
                        <span>{item.price}</span>
                      </div>

                      {/* Fullscreen Photo Lightbox Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedPhoto({
                            id: item.id,
                            img: item.image_url,
                            title: item.name,
                            cat: item.badge,
                            likes: item.reviews
                          });
                        }}
                        aria-label="View full food photo"
                        className="absolute bottom-4 right-4 z-10 bg-black/65 hover:bg-brand-orange text-white px-2.5 py-1.5 rounded-xl backdrop-blur-md transition-all shadow-lg hover:scale-110 flex items-center gap-1.5 text-xs font-bold border border-white/20 cursor-pointer"
                        title="Click to view full uncropped photo"
                      >
                        <Maximize2 size={13} />
                        <span className="text-[11px] hidden sm:inline">Full Photo</span>
                      </button>

                      {/* Veg / Non-Veg Indicator on image bottom left */}
                      <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1.5 border border-black/5">
                        <div className={`w-3.5 h-3.5 border-2 ${item.is_veg ? 'border-emerald-600' : 'border-rose-600'} flex items-center justify-center p-[1.5px]`}>
                          <div className={`w-full h-full rounded-full ${item.is_veg ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                        </div>
                        <span className="text-[10px] font-bold tracking-wider uppercase text-brand-brown/85">
                          {item.is_veg ? 'Pure Veg' : 'Non-Veg'}
                        </span>
                      </div>
                    </div>

                    {/* Card Details Section */}
                    <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                      <div>
                        {/* Rating & Prep Meta */}
                        <div className="flex items-center justify-between text-xs text-brand-brown/70 mb-3">
                          <div className="flex items-center gap-1 font-black text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/80">
                            <Star size={13} className="fill-amber-500 text-amber-500" />
                            <span>{item.rating}</span>
                            <span className="text-brand-brown/50 font-normal">({item.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-brand-brown/65 font-medium">
                            <Clock size={12} className="text-brand-orange" />
                            <span>{item.prepTime}</span>
                            <span>•</span>
                            <span>{item.serves}</span>
                          </div>
                        </div>

                        {/* Title & Tagline */}
                        <h3 className="text-2xl font-black text-brand-brown group-hover:text-brand-orange transition-colors font-display tracking-tight leading-snug">
                          {item.name}
                        </h3>
                        <p className="text-xs font-bold text-brand-orange/95 mb-2.5 uppercase tracking-wide">
                          {item.tagline}
                        </p>
                        <p className="text-brand-brown/65 text-sm leading-relaxed mb-4 line-clamp-2">
                          {item.description}
                        </p>

                        {/* Feature Highlights Chips */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {item.tags.map((tag, i) => (
                            <span key={i} className="text-[11px] font-bold text-brand-brown/80 bg-brand-earth/50 hover:bg-brand-orange/15 px-2.5 py-1 rounded-full border border-brand-brown/5 transition-colors">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Trending Gradient CTA Button */}
                      <Link 
                        to="/menu" 
                        className="w-full relative group/btn overflow-hidden rounded-2xl bg-gradient-to-r from-brand-orange via-[#E85D04] to-brand-brown text-white py-3.5 px-6 font-bold shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40 transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                      >
                        <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                        <ShoppingBag size={17} className="group-hover/btn:rotate-6 transition-transform" />
                        <span className="tracking-wide">Order Now Fresh</span>
                        <ChevronRight size={17} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>

          {/* Bottom Explore Full Menu banner */}
          <div className="mt-14 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-brand-brown/10 shadow-xl max-w-3xl mx-auto w-full">
              <div className="text-left sm:flex-1">
                <h4 className="font-black text-brand-brown text-base sm:text-lg font-display">Craving more authentic Bihari tastes?</h4>
                <p className="text-xs sm:text-sm text-brand-brown/65 mt-0.5">Explore our complete 25+ item menu including Champaran Ahuna Handi, Kulhad Chai, Matka Lassi & Combos.</p>
              </div>
              <Link 
                to="/menu"
                className="shrink-0 bg-brand-brown hover:bg-brand-orange text-white text-xs sm:text-sm font-black px-7 py-3.5 rounded-2xl shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Full Menu (25+ Items)</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
