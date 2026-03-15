import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout, ChefHat, Sofa, Palette, FileText, Monitor, Package, Shirt, Heart } from 'lucide-react';

interface Guide {
  id: number;
  category: string;
  title: string;
  description: string;
  image_urls: string;
}

const DesignGuide = () => {
  const [activeCategory, setActiveCategory] = useState('interior');
  const [guides, setGuides] = useState<Guide[]>([]);

  useEffect(() => {
    fetch('/api/design-guides')
      .then(res => res.json())
      .then(setGuides);
  }, []);

  const categories = [
    { id: 'interior', label: 'Interior Design', icon: Layout },
    { id: 'kitchen', label: 'Kitchen Layout', icon: ChefHat },
    { id: 'furniture', label: 'Furniture Placement', icon: Sofa },
    { id: 'branding', label: 'Branding Board', icon: Palette },
    { id: 'menu', label: 'Menu Item Design', icon: FileText },
    { id: 'counter', label: 'Counter Layout', icon: Monitor },
    { id: 'packing', label: 'Packing Design', icon: Package },
    { id: 'uniform', label: 'Staff Uniform', icon: Shirt },
    { id: 'mithila', label: 'Rustic Mithila Theme', icon: Heart },
  ];

  const currentGuide = guides.find(g => g.category === activeCategory);
  const images = currentGuide ? JSON.parse(currentGuide.image_urls) : [
    '/design_placeholder1.jpg',
    '/design_placeholder2.jpg',
    '/design_placeholder3.jpg',
    '/design_placeholder4.jpg',
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-brand-brown font-display uppercase tracking-tighter">Restaurant <span className="text-brand-orange italic">Design Guide</span></h1>
          <p className="text-xl text-brand-brown/60 mt-4 max-w-3xl mx-auto font-medium">Standardized aesthetics and operational layouts for the perfect Bihar Bowl experience.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                activeCategory === cat.id 
                  ? 'bg-brand-orange text-white shadow-xl scale-105' 
                  : 'bg-white text-brand-brown/60 hover:bg-brand-earth border border-brand-brown/5'
              }`}
            >
              <cat.icon size={18} />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] shadow-xl border border-white/20"
            >
              <h2 className="text-4xl font-bold text-brand-brown mb-6 capitalize">{activeCategory.replace('_', ' ')} Guide</h2>
              <p className="text-lg text-brand-brown/70 leading-relaxed mb-8">
                {currentGuide?.description || `Our ${activeCategory} design focuses on maintaining the authentic rustic vibe of Bihar while ensuring modern efficiency and comfort for our guests.`}
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-brand-orange uppercase tracking-wider">Key Features</h3>
                <ul className="space-y-3">
                  {[
                    'Authentic Mithila Art integrations',
                    'Optimized space utilization',
                    'Durable and sustainable materials',
                    'Brand-consistent color palette'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center space-x-3 text-brand-brown/80 font-medium">
                      <div className="w-2 h-2 bg-brand-orange rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((url: string, i: number) => (
              <motion.div
                key={`${activeCategory}-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square rounded-3xl overflow-hidden shadow-lg border-4 border-white group relative"
              >
                <img 
                  src={url} 
                  alt={`${activeCategory} design ${i + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignGuide;
