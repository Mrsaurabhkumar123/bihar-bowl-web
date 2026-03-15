import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Star, 
  TrendingUp, 
  CreditCard, 
  MapPin, 
  Award, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
  is_veg: number;
}

const Home = () => {
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  
  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setFeaturedItems(data.slice(0, 3)));
  }, []);

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* 
            HERO VIDEO:
            Change the 'src' below to your video link 
          */}
          <video 
            src="/biharbowl_vdo.mp4" 
            className="w-full h-full object-cover"
            autoPlay 
            muted 
            loop 
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
        
        {/* Decorative Mithila Elements */}
        <div className="absolute top-20 right-0 w-96 h-96 mithila-pattern opacity-10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-earth to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-block bg-brand-orange px-6 py-2 rounded-md mb-8 shadow-xl">
              <span className="text-white font-bold text-sm uppercase tracking-[0.2em]">Welcome To Bihar Bowl</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-white mb-8 leading-[0.85] font-display uppercase tracking-tighter drop-shadow-2xl">
              Cuddle The <span className="text-brand-yellow italic font-display">Kulhad</span> <br />
              <span className="text-brand-orange">Savor</span> The Litti
            </h1>
            <p className="text-xl md:text-2xl text-brand-earth/95 mb-12 leading-relaxed max-w-2xl font-medium drop-shadow-md">
              With over 1 Lakh Litti plates every day, we brew the perfect experience of happiness and create soulful memories. We are India’s fastest growing Bihar-food chain.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/menu" className="bg-brand-orange text-white px-12 py-6 rounded-xl text-2xl font-black hover:bg-brand-yellow hover:text-brand-brown transition-all transform hover:scale-110 shadow-2xl flex items-center space-x-4 border-4 border-white/20">
                <span>Order Now</span>
                <ChevronRight size={28} />
              </Link>
              <Link to="/franchise" className="bg-white text-brand-brown px-12 py-6 rounded-xl text-2xl font-black hover:bg-brand-orange hover:text-white transition-all transform hover:scale-110 shadow-2xl border-4 border-brand-orange/20">
                Partner With Us
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Stats */}
        <div className="absolute bottom-12 right-12 hidden lg:flex space-x-8 z-20">
          {[
            { label: 'Outlets', value: '50+' },
            { label: 'Cities', value: '20+' },
            { label: 'Happy Souls', value: '1M+' }
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl text-center min-w-[140px]">
              <p className="text-3xl font-bold text-brand-yellow mb-1">{stat.value}</p>
              <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* YouTube Advertising & Franchise Details Section */}
      <section className="py-24 bg-brand-brown/90 text-white relative overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 opacity-5 mithila-pattern" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-brand-brown-light aspect-video">
              {/* 
                ADVERTISING VIDEO:
                Change the 'src' below to your video link 
              */}
              <video 
                className="w-full h-full object-cover"
                src="/advertising.mp4"
                controls
                muted
                loop
              ></video>
            </div>
            
            <div className="bg-brand-brown-light/30 p-10 rounded-[3rem] border border-white/10 backdrop-blur-md">
              <h2 className="text-4xl font-bold font-display mb-8 text-brand-yellow">Get Franchise Details!</h2>
              <form className="space-y-4">
                <input type="text" placeholder="Name" className="w-full bg-white text-brand-brown rounded-md px-6 py-4 focus:outline-none" />
                <input type="tel" placeholder="Contact Number" className="w-full bg-white text-brand-brown rounded-md px-6 py-4 focus:outline-none" />
                <input type="email" placeholder="Your-email" className="w-full bg-white text-brand-brown rounded-md px-6 py-4 focus:outline-none" />
                <input type="text" placeholder="Area in which you want to open Bihar Bowl outlet?" className="w-full bg-white text-brand-brown rounded-md px-6 py-4 focus:outline-none" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="City" className="w-full bg-white text-brand-brown rounded-md px-6 py-4 focus:outline-none" />
                  <input type="text" placeholder="Address" className="w-full bg-white text-brand-brown rounded-md px-6 py-4 focus:outline-none" />
                </div>
                <textarea placeholder="Message" className="w-full bg-white text-brand-brown rounded-md px-6 py-4 focus:outline-none h-24"></textarea>
                <select className="w-full bg-white text-brand-brown rounded-md px-6 py-4 focus:outline-none">
                  <option>Budget Rs. 10-15 Lacs</option>
                  <option>Budget Rs. 15-25 Lacs</option>
                  <option>Budget Rs. 25-50 Lacs</option>
                  <option>Budget Rs. 50 Lacs+</option>
                </select>
                <button type="button" className="bg-brand-orange text-white px-12 py-5 rounded-md font-black text-lg uppercase tracking-wider hover:bg-brand-yellow hover:text-brand-brown transition-all w-full lg:w-auto shadow-xl">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Untold Story Section (CSB Style) */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl transition-all duration-500">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                  {/* 
                    FOUNDER IMAGE:
                    Change the 'src' below to your image link 
                  */}
                  <img 
                    src="/foundersk1.png" 
                    alt="Saurabh Singhaniya" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/60 to-transparent" />
                  <div className="absolute bottom-12 left-12">
                    <p className="text-white font-bold text-3xl mb-1">Saurabh Singhaniya</p>
                    <p className="text-brand-yellow font-bold uppercase tracking-widest text-sm">Founder, Bihar Bowl</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-brand-orange font-bold text-sm uppercase tracking-[0.3em]">The Untold Story</h2>
                <h3 className="text-6xl font-bold text-brand-brown leading-tight font-display">Bihar Bowl - <br /><span className="text-brand-orange italic">Untold Story</span></h3>
              </div>
              
              <p className="text-xl text-brand-brown/70 leading-relaxed italic border-l-4 border-brand-orange pl-8">
                “I remember the initial days of Bihar Bowl where each new customer brought tons of joy and smiles to my and other team members’ face. And when any customer praised us for tasty Litti, use of kulhad, or ambience, we were over nine clouds. At Bihar Bowl, we always want that fire inside every member and crave that smile. Now, I love to hear stories from different corners of the world.”
              </p>
              
              <p className="text-lg text-brand-brown/60 leading-relaxed">
                We are India’s fastest growing Bihar-food chain & franchise that started its journey back in 2020. We envision blending the health benefits of Sattu with the most traditional dish “Litti” in India. Hailing from the cultural capital of Bihar, we’re well known for our uniqueness and world-class service.
              </p>
              
              <div className="pt-6">
                <Link to="/about" className="inline-flex items-center space-x-4 bg-brand-brown text-white px-10 py-5 rounded-2xl font-bold hover:bg-brand-orange transition-all shadow-xl group">
                  <span>Read Our Full Story</span>
                  <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values Section */}
      <section className="py-24 bg-brand-earth/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Authenticity', desc: 'Preserving the real taste of Bihar with traditional wood-fired methods.', icon: '🔥' },
              { title: 'Innovation', desc: 'Blending heritage with modern convenience for the global palate.', icon: '💡' },
              { title: 'Community', desc: 'Empowering local farmers and spreading joy through every kulhad.', icon: '🤝' },
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-brand-brown/5 text-center group hover:bg-brand-orange transition-all duration-500"
              >
                <div className="text-5xl mb-6 group-hover:scale-125 transition-transform duration-500">{value.icon}</div>
                <h4 className="text-2xl font-bold text-brand-brown mb-4 group-hover:text-white transition-colors">{value.title}</h4>
                <p className="text-brand-brown/60 group-hover:text-white/80 transition-colors">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Soulful Memories (Testimonials) */}
      <section className="py-32 bg-brand-brown text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 mithila-pattern" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-brand-yellow font-bold text-sm uppercase tracking-[0.3em] mb-4">Soulful Memories</h2>
              <h3 className="text-6xl font-bold font-display leading-tight">What Our <span className="text-brand-orange italic">Community</span> Says</h3>
            </div>
            <div className="flex space-x-4">
              <button className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all">
                <ChevronRight size={24} className="rotate-180" />
              </button>
              <button className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange transition-all">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Anjali Sharma",
                role: "Food Blogger",
                text: "The most authentic Litti Chokha I've had outside of Bihar. The wood-fired aroma is unmistakable!",
                img: "https://picsum.photos/seed/anjali/100/100"
              },
              {
                name: "Rahul Verma",
                role: "Franchise Partner",
                text: "Partnering with Bihar Bowl was the best decision. The support and the brand value are unmatched.",
                img: "https://picsum.photos/seed/rahul/100/100"
              },
              {
                name: "Priya Singh",
                role: "Regular Customer",
                text: "Cuddling the Kulhad with a hot plate of Litti is my favorite weekend ritual. Simply soulful!",
                img: "https://picsum.photos/seed/priya/100/100"
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 space-y-8"
              >
                <div className="flex items-center space-x-2 text-brand-yellow">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-xl text-white/80 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center space-x-4 pt-4">
                  <img src={testimonial.img} alt={testimonial.name} className="w-14 h-14 rounded-full border-2 border-brand-orange" />
                  <div>
                    <p className="font-bold text-lg">{testimonial.name}</p>
                    <p className="text-brand-yellow text-sm uppercase tracking-widest">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us (Bento Grid) */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-brand-orange font-bold text-sm uppercase tracking-[0.3em]">Why Choose Us?</h2>
            <h3 className="text-6xl font-bold text-brand-brown font-display">Partner With The <span className="text-brand-orange italic">Best</span></h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[700px]">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 md:row-span-2 bg-brand-brown rounded-[3rem] p-12 text-white relative overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-10 mithila-pattern" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-20 h-20 bg-brand-orange rounded-2xl flex items-center justify-center mb-8">
                  <TrendingUp size={40} />
                </div>
                <div>
                  <h4 className="text-4xl font-bold font-display mb-6">Massive Margins & Growth</h4>
                  <p className="text-xl text-white/70 leading-relaxed">
                    Franchise partners of Bihar Bowl are enjoying massive margins and impeccable growth every year. Our supply chain is optimized for your success.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl group-hover:bg-brand-orange/40 transition-all" />
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 bg-brand-orange rounded-[3rem] p-12 text-white relative overflow-hidden group"
            >
              <div className="relative z-10 flex items-center space-x-8">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                  <CreditCard size={32} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold font-display mb-2">High ROI Model</h4>
                  <p className="text-white/80">Tested, tried, and high-ROI-driven business model for passionate entrepreneurs.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-brand-yellow rounded-[3rem] p-10 text-brand-brown relative overflow-hidden group"
            >
              <div className="relative z-10">
                <MapPin size={32} className="mb-6" />
                <h4 className="text-xl font-bold font-display mb-2">Global Presence</h4>
                <p className="text-brand-brown/70 text-sm">50+ outlets across 20+ cities and growing globally.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-brand-earth rounded-[3rem] p-10 text-brand-brown relative overflow-hidden group border border-brand-brown/5"
            >
              <div className="relative z-10">
                <Award size={32} className="mb-6 text-brand-orange" />
                <h4 className="text-xl font-bold font-display mb-2">Trusted Brand</h4>
                <p className="text-brand-brown/70 text-sm">India's most loved and trusted Bihar-food chain.</p>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-20 text-center">
            <Link to="/franchise" className="inline-flex items-center space-x-6 bg-brand-orange text-white px-12 py-6 rounded-2xl text-xl font-bold hover:bg-brand-brown transition-all shadow-2xl group">
              <span>Request A Franchise Consultation</span>
              <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-brand-brown relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 mithila-pattern" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/10 aspect-video relative group"
            >
              <video 
                src="/biharbowl_vdo.mp4" 
                className="w-full h-full object-cover"
                autoPlay 
                muted 
                loop 
                playsInline
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </motion.div>
            <div className="space-y-8">
              <h2 className="text-5xl font-black text-brand-yellow font-display uppercase tracking-tighter">Experience the <span className="text-brand-orange italic">Tradition</span></h2>
              <p className="text-xl text-white/70 leading-relaxed">
                Watch how we bring the authentic flavors of Bihar to your plate. From the wood-fired ovens to the hand-picked spices, every step is a tribute to our heritage.
              </p>
              <button className="bg-brand-orange text-white px-10 py-5 rounded-md font-black uppercase tracking-widest hover:bg-brand-yellow hover:text-brand-brown transition-all shadow-xl">
                Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Taste the Tradition Section */}
      <section className="py-32 bg-brand-earth/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 mithila-pattern" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-brand-orange font-bold text-sm uppercase tracking-[0.3em]">Taste the Tradition</h2>
                <h3 className="text-7xl font-bold text-brand-brown leading-tight font-display">Authentic <span className="text-brand-orange italic">Bihar</span> On Your Plate</h3>
              </div>
              <p className="text-xl text-brand-brown/70 leading-relaxed">
                We bring you the soul of Bihar through our traditional recipes. From the smoky wood-fired Litti to the refreshing Sattu Sharbat, every bite is a journey back to the roots.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-brand-orange">100%</div>
                  <p className="text-brand-brown/60 font-medium uppercase tracking-widest text-xs">Desi Ghee</p>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-brand-orange">Wood</div>
                  <p className="text-brand-brown/60 font-medium uppercase tracking-widest text-xs">Fired Cooking</p>
                </div>
              </div>
              <div className="pt-8">
                <Link to="/menu" className="inline-flex items-center space-x-4 bg-brand-brown text-white px-10 py-5 rounded-2xl font-bold hover:bg-brand-orange transition-all shadow-xl group">
                  <span>Explore Our Menu</span>
                  <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl">
                <img src="/littichokhaads.png" alt="Traditional Litti" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-brand-yellow rounded-full flex items-center justify-center text-center p-6 transform -rotate-12 shadow-2xl animate-float">
                <p className="text-brand-brown font-black text-xl leading-tight uppercase">Bihar's Pride</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Foodie Moments Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-brand-orange font-bold text-sm uppercase tracking-[0.3em]">Community</h2>
            <h3 className="text-6xl font-bold text-brand-brown font-display">Foodie <span className="text-brand-orange italic">Moments</span></h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-6">
              <div className="rounded-3xl overflow-hidden shadow-xl h-48 border-4 border-brand-earth/20">
                <img src="/menu1.jpg" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Litti" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="space-y-6 pt-12">
              <div className="rounded-3xl overflow-hidden shadow-xl h-60 border-4 border-brand-earth/20">
                <img src="/menu3.png" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Paneer" referrerPolicy="no-referrer" />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-xl h-48 border-4 border-brand-earth/20">
                <img src="/menu_mushroom.png" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Mushroom" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl overflow-hidden shadow-xl h-48 border-4 border-brand-earth/20">
                <img src="/menu_chicken_keema.png" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Chaap" referrerPolicy="no-referrer" />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-xl h-60 border-4 border-brand-earth/20">
                <img src="/menu_mutton.png" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Biryani" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="space-y-6 pt-12">
              <div className="rounded-3xl overflow-hidden shadow-xl h-60 border-4 border-brand-earth/20">
                <img src="/menu_fish.png" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Rolls" referrerPolicy="no-referrer" />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-xl h-48 border-4 border-brand-earth/20">
                <img src="/menu_egg.png" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Momos" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <Link to="/gallery" className="inline-flex items-center space-x-4 text-brand-brown font-bold text-xl hover:text-brand-orange transition-colors group">
              <span>View All Moments</span>
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Dish */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 mithila-pattern opacity-5 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mithila-border rounded-[4rem] p-4 lg:p-12 bg-brand-earth/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="rounded-[2rem] overflow-hidden shadow-2xl">
                  <img 
                    src="/littichokhaads.png" 
                    alt="Litti Chokha" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
              
              <div className="space-y-10">
                <div className="inline-block bg-brand-orange/10 px-4 py-2 rounded-md">
                  <span className="text-brand-orange font-bold text-sm uppercase tracking-widest">Featured Dish</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold text-brand-brown leading-tight">The Soul of Bihar: <span className="text-brand-orange">Litti Chokha</span></h2>
                <p className="text-xl text-brand-brown/70 leading-relaxed">
                  Litti is a traditional dish from the Indian state of Bihar. It is made of whole wheat flour, stuffed with sattu (roasted chickpea flour) mixed with herbs and spices and then roasted over coal or wood then it is tossed with much ghee.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { title: 'Authentic Sattu', desc: 'Spiced chickpea flour' },
                    { title: 'Wood-fired', desc: 'Traditional roasting' },
                    { title: 'Desi Ghee', desc: 'Pure cow ghee' },
                    { title: 'Smoky Chokha', desc: 'Roasted eggplant' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="mt-1 bg-brand-orange/20 p-1 rounded-full">
                        <CheckCircle2 className="text-brand-orange" size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-brand-brown">{item.title}</p>
                        <p className="text-xs text-brand-brown/60">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <Link to="/menu" className="inline-flex items-center space-x-3 bg-brand-brown text-white px-8 py-4 rounded-md font-bold hover:bg-brand-orange transition-all shadow-lg group">
                    <span>Explore Menu</span>
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Preview */}
      <section className="py-24 bg-brand-earth/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-brand-brown mb-4">Moments at <span className="text-brand-orange">Bihar Bowl</span></h2>
              <p className="text-brand-brown/60">Our customers share their love for authentic Bihari flavors. Join the community!</p>
            </div>
            <Link to="/gallery" className="text-brand-orange font-bold hover:underline flex items-center space-x-2">
              <span>View Full Gallery</span>
              <ChevronRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { id: 1, img: '/gallery1.jpg' },
              { id: 2, img: '/gallery2.jpg' },
              { id: 3, img: '/gallery3.jpg' },
              { id: 4, img: '/gallery4.jpg' }
            ].map((item, idx) => (
              <motion.div 
                key={item.id}
                whileHover={{ scale: 1.05 }}
                className="rounded-xl overflow-hidden shadow-lg"
              >
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={`Moment ${item.id}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Menu */}
      <section className="py-24 bg-brand-earth/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-brown mb-4">Popular on the Menu</h2>
            <p className="text-brand-brown/60 max-w-2xl mx-auto">Handpicked favorites that our customers can't get enough of.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-brand-brown/5 group"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={item.image_url} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-brand-orange font-bold text-sm shadow-lg">
                    ₹{item.price}
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-bold text-brand-brown mb-2 font-display">{item.name}</h4>
                  <p className="text-brand-brown/60 text-sm mb-6 line-clamp-2">{item.description}</p>
                  <Link to="/menu" className="w-full bg-brand-brown text-white py-3 rounded-xl font-bold hover:bg-brand-orange transition-all flex items-center justify-center space-x-2">
                    <span>Order Now</span>
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
