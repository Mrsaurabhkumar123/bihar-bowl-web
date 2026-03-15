import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Utensils, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/about.png" 
            alt="About Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-9xl font-black text-white mb-12 font-display uppercase tracking-tighter drop-shadow-2xl">
              Who Are <span className="text-brand-orange italic">We?</span>
            </h1>
            <div className="max-w-4xl mx-auto space-y-8">
              <p className="text-2xl text-brand-earth/90 leading-relaxed font-medium">
                Bihar Bowl (BB) is India’s largest Litti-Chokha chain. With over <span className="text-brand-yellow font-bold">50+ outlets</span> worldwide, including <span className="text-brand-yellow font-bold">Canada, Nepal and UAE</span>. Our franchise model is supported by strong supply chain management and a diligent audit system.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-[4rem] overflow-hidden shadow-2xl border-8 border-brand-earth">
                <img src="/founder_saurabh.jpg" alt="Founder Story" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-brand-orange p-10 rounded-[3rem] shadow-2xl text-white max-w-xs">
                <p className="text-4xl font-black mb-2">2020</p>
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">The Journey Began</p>
              </div>
            </motion.div>
            <div className="space-y-8">
              <h2 className="text-5xl font-black text-brand-brown font-display uppercase tracking-tighter">Our <span className="text-brand-orange italic">Heritage</span></h2>
              <p className="text-xl text-brand-brown/70 leading-relaxed">
                Founded by Saurabh Singhaniya, Bihar Bowl was born out of a desire to bring the authentic, rustic flavors of Bihar to the global stage. What started as a small outlet in Patna has now grown into a global phenomenon.
              </p>
              <p className="text-xl text-brand-brown/70 leading-relaxed">
                We believe that food is more than just sustenance; it's a bridge between cultures. Our Litti-Chokha is prepared using traditional methods, ensuring that every bite carries the soul of Bihar.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="space-y-2">
                  <p className="text-4xl font-black text-brand-orange">50+</p>
                  <p className="text-sm font-bold text-brand-brown/60 uppercase tracking-widest">Outlets</p>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl font-black text-brand-orange">10k+</p>
                  <p className="text-sm font-bold text-brand-brown/60 uppercase tracking-widest">Daily Happy Souls</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-brand-brown text-white relative overflow-hidden">
        <div className="absolute inset-0 mithila-pattern opacity-5" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black font-display uppercase tracking-tighter">Our Core <span className="text-brand-yellow italic">Values</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: <Shield size={40} />, title: 'Authenticity', desc: 'Preserving traditional recipes and methods.' },
              { icon: <Award size={40} />, title: 'Quality', desc: 'Using only the finest ingredients and pure desi ghee.' },
              { icon: <Users size={40} />, title: 'Community', desc: 'Building a family of passionate food lovers.' },
              { icon: <Utensils size={40} />, title: 'Innovation', desc: 'Modernizing the experience without losing the soul.' }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm p-10 rounded-[3rem] border border-white/10 text-center space-y-6 hover:bg-white/10 transition-all"
              >
                <div className="w-20 h-20 bg-brand-yellow text-brand-brown rounded-full flex items-center justify-center mx-auto shadow-xl">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold font-display">{value.title}</h3>
                <p className="text-brand-earth/60 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
