import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Gallery = () => {
  const [showUpload, setShowUpload] = useState(false);
  /* 
    GALLERY IMAGES:
    Add or change your image links in this array below.
  */
  const [images] = useState([
    { id: 1, url: '/gallery_full1.jpg', title: 'Authentic Wood-fired Litti' },
    { id: 2, url: '/gallery_full2.png', title: 'Our Vibrant Ambience' },
    { id: 3, url: '/gallery_full3.png', title: 'Soulful Memories' },
    { id: 4, url: '/gallery_full4.png', title: 'The Royal Bihar Thali' },
    { id: 5, url: '/gallery_full5.png', title: 'Cuddle the Kulhad' },
    { id: 6, url: '/gallery_full6.png', title: 'Spreading Love at Events' },
    { id: 7, url: '/gallery1.jpg', title: 'Traditional Serving' },
    { id: 8, url: '/gallery2.jpg', title: 'Freshly Prepared' },
    { id: 9, url: '/gallery3.jpg', title: 'Bihari Hospitality' },
    { id: 10, url: '/gallery4.jpg', title: 'Culinary Heritage' },
    { id: 11, url: '/foodiemoments.png', title: 'Foodie Moments' },
  ]);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Photo uploaded! It will be visible after admin approval.");
    setShowUpload(false);
  };

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/gallery.png" 
            alt="Gallery Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl md:text-8xl font-black text-white mb-4 font-display uppercase tracking-tighter drop-shadow-2xl">Photo <span className="text-brand-orange italic">Gallery</span></h1>
            <p className="text-xl text-brand-earth/80 font-medium max-w-2xl mx-auto">Glimpses of our journey and your soulful experiences.</p>
          </motion.div>
        </div>
      </section>

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-black text-brand-brown mb-2 font-display uppercase tracking-tighter">Moments at BB</h2>
            <p className="text-brand-brown/60">Capturing the vibe of Bihar Bowl.</p>
          </div>
          <button 
            onClick={() => setShowUpload(true)}
            className="flex items-center space-x-2 bg-brand-orange text-white px-8 py-4 rounded-full font-bold hover:bg-brand-orange/90 transition-all shadow-xl"
          >
            <Camera size={20} />
            <span>Share Your Moment</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img) => (
            <motion.div 
              key={img.id}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-xl group"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <p className="text-white font-bold text-xl">{img.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Franchise Standards Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-brand-brown mb-4 font-display uppercase tracking-tighter">Franchise <span className="text-brand-orange italic">Standards</span></h2>
            <p className="text-brand-brown/60 max-w-2xl mx-auto">Our visual identity and design guidelines for franchise partners.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 
              FRANCHISE STANDARDS IMAGES:
              Add or change your image links in this array below.
            */}
            {[
              { title: 'Branding Logo', url: '/logo.jpg', desc: 'The face of Bihar Bowl.' },
              { title: 'Dress Code', url: '/dresscode.png', desc: 'Our team uniform standards.' },
              { title: 'Theme & Vibe', url: '/theme.png', desc: 'The soulful Bihar atmosphere.' },
              { title: 'Container Design', url: '/container.png', desc: 'Our signature outlet model.' },
              { title: 'Interior Design', url: '/interior.png', desc: 'Modern comfort meets tradition.' },
              { title: 'Kitchen Design', url: '/kitchen.png', desc: 'Efficiency and hygiene first.' },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-brand-brown/5 group"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-brand-brown mb-2">{item.title}</h3>
                  <p className="text-brand-brown/60 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-brown/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative"
          >
            <button 
              onClick={() => setShowUpload(false)}
              className="absolute top-6 right-6 text-brand-brown/40 hover:text-brand-brown"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-brand-brown mb-6">Upload Photo</h3>
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="border-2 border-dashed border-brand-brown/10 rounded-2xl p-10 text-center hover:border-brand-orange/30 transition-colors cursor-pointer">
                <Upload size={48} className="mx-auto text-brand-brown/20 mb-4" />
                <p className="text-sm text-brand-brown/60">Click or drag photo to upload</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-brown/70">Caption</label>
                <input 
                  type="text" 
                  placeholder="e.g., Best Litti in town!"
                  className="w-full bg-brand-earth/50 border border-brand-brown/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange"
                />
              </div>
              <button className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold shadow-lg">
                Submit for Approval
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
