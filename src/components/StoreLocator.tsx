import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Phone, Clock } from 'lucide-react';

const StoreLocator = () => {
  const [search, setSearch] = useState('');
  const stores = [
    { id: 1, name: 'Bihar Bowl - Boring Road', city: 'Patna', address: '1st Floor, Food Craft Square, Boring Road, Patna, Bihar- 800001', phone: '+91 62023 21756', hours: '11:00 AM - 11:00 PM', image: '/patnaoutlet.png' },
    { id: 2, name: 'Bihar Bowl - Mumbai', city: 'Mumbai', address: 'Shop 4, Marine Drive, Mumbai, Maharashtra', phone: '+91 62023 21756', hours: '11:00 AM - 11:00 PM', image: '/mumbaioutlet.png' },
    { id: 3, name: 'Bihar Bowl - Muzaffarpur', city: 'Muzaffarpur', address: 'Mithila Tower, Muzaffarpur, Bihar', phone: '+91 62023 21756', hours: '11:00 AM - 10:30 PM', image: '/muzaffarpuroutlet.png' },
    { id: 4, name: 'Bihar Bowl - Darbhanga', city: 'Darbhanga', address: 'Tower Chowk, Darbhanga, Bihar', phone: '+91 62023 21756', hours: '11:00 AM - 10:30 PM', image: '/darbhangaoutlet.png' },
    { id: 5, name: 'Bihar Bowl - Sitamarhi', city: 'Sitamarhi', address: 'Main Road, Sitamarhi, Bihar', phone: '+91 62023 21756', hours: '11:00 AM - 10:30 PM', image: '/sitamarhioutlet.png' },
  ];

  const filteredStores = stores.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/outlets.png" 
            alt="Outlets Background" 
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
            <h1 className="text-6xl md:text-8xl font-black text-white mb-4 font-display uppercase tracking-tighter drop-shadow-2xl">Our <span className="text-brand-orange italic">Outlets</span></h1>
            <p className="text-xl text-brand-earth/80 font-medium max-w-2xl mx-auto">Locate your nearest Bihar Bowl and experience the tradition.</p>
          </motion.div>
        </div>
      </section>

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown/40" size={20} />
              <input 
                type="text" 
                placeholder="Search by city or area..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white border border-brand-brown/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-brand-orange shadow-sm"
              />
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredStores.map(store => (
                <div key={store.id} className="bg-white rounded-2xl border border-brand-earth hover:border-brand-orange/30 transition-all cursor-pointer shadow-sm overflow-hidden group">
                  <div className="h-40 overflow-hidden">
                    <img src={store.image} alt={store.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-brand-brown mb-3">{store.name}</h3>
                    <div className="space-y-2 text-sm text-brand-brown/60">
                    <p className="flex items-start space-x-2">
                      <MapPin size={16} className="text-brand-orange shrink-0 mt-0.5" />
                      <span>{store.address}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Phone size={16} className="text-brand-orange shrink-0" />
                      <span>{store.phone}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Clock size={16} className="text-brand-orange shrink-0" />
                      <span>{store.hours}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-brand-earth rounded-[2.5rem] overflow-hidden shadow-inner border border-brand-brown/5 min-h-[500px] relative">
            {/* 
              GOOGLE MAPS INTEGRATION GUIDE:
              1. Get your API Key from Google Cloud Console
              2. Install the library: npm install @react-google-maps/api
              3. Replace this div with the <GoogleMap> component
            */}
            <div className="absolute inset-0 flex items-center justify-center text-center p-10">
              <div className="space-y-4">
                <MapPin size={64} className="mx-auto text-brand-orange opacity-20" />
                <p className="text-brand-brown/40 font-medium">
                  Interactive Map Integration<br/>
                  <span className="text-xs opacity-60">To enable, add your Google Maps API Key in this component.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
