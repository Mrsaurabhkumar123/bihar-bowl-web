import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { MenuItem } from '../types';

interface MenuProps {
  addToCart: (item: MenuItem) => void;
  user: any;
}

const Menu: React.FC<MenuProps> = ({ addToCart, user }) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [category, setCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', category: 'Veg', description: '', price: 0, image_url: '', is_veg: 1 });
  
  const categories = ['All', 'Veg', 'Non-Veg', 'Drinks', 'Combos'];
  const isAdmin = user?.role === 'admin';

  const fetchMenu = () => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setItems(data));
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    });
    if (res.ok) {
      toast.success("Item added to menu");
      setShowAddModal(false);
      fetchMenu();
    }
  };

  const handleDeleteItem = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const res = await fetch(`/api/admin/menu/${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success("Item deleted");
      fetchMenu();
    }
  };

  const filteredItems = category === 'All' ? items : items.filter(i => i.category === category);

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/menu.png" 
            alt="Menu Background" 
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
            <h1 className="text-6xl md:text-8xl font-black text-white mb-4 font-display uppercase tracking-tighter drop-shadow-2xl">
              The Royal <span className="text-brand-orange italic">Bihar Menu</span>
            </h1>
            <p className="text-xl text-brand-earth/80 font-medium max-w-2xl mx-auto">Authentic flavors, crafted with tradition and served with love.</p>
          </motion.div>
        </div>
      </section>

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-2 rounded-md font-bold transition-all ${
                  category === cat 
                  ? 'bg-brand-orange text-white shadow-lg' 
                  : 'bg-white text-brand-brown hover:bg-brand-orange/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {isAdmin && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-brand-brown text-white px-8 py-3 rounded-2xl font-bold hover:bg-brand-orange transition-all shadow-xl"
            >
              <Plus size={20} />
              <span>Add New Item</span>
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.id}
                className="glass-card rounded-3xl overflow-hidden group"
              >
                <div className="h-56 overflow-hidden relative">
                  {/* 
                    MENU ITEM IMAGE:
                    The image 'src' is loaded from the 'item.image_url' property.
                    You can change this in your database or API response.
                  */}
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider ${item.is_veg ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {item.is_veg ? 'Veg' : 'Non-Veg'}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-brand-brown">{item.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-brand-orange font-bold">₹{item.price}</span>
                      {isAdmin && (
                        <button 
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-brand-brown/60 text-sm mb-6 line-clamp-2 h-10">{item.description}</p>
                  <button 
                    onClick={() => addToCart(item)}
                    className="w-full flex items-center justify-center space-x-2 bg-brand-brown text-white py-3 rounded-md font-bold hover:bg-brand-orange transition-colors"
                  >
                    <Plus size={18} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Single Menu Card Design Section */}
        <div className="mt-32 pt-24 border-t border-brand-brown/10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-brand-brown font-display uppercase tracking-tighter">The Royal <span className="text-brand-orange italic">Menu Card</span></h2>
            <p className="text-brand-brown/60 mt-4 font-medium">A single glance at our heritage flavors.</p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-brand-brown/5 relative">
            <div className="absolute inset-0 mithila-pattern opacity-5 pointer-events-none" />
            <div className="p-12 relative z-10">
              <div className="flex justify-between items-center mb-12 border-b-2 border-brand-orange/20 pb-8">
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 rounded-full border-4 border-brand-orange bg-white overflow-hidden shadow-lg">
                    <img src="/logo.jpg" alt="Logo" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-brand-orange font-display tracking-tighter">BIHAR BOWL</h3>
                    <p className="text-[10px] text-brand-brown/60 font-bold uppercase tracking-widest">Vibe Of Positivi-LITTI</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-brand-brown/40 font-bold uppercase text-xs tracking-widest mb-1">Authentic Since</p>
                  <p className="text-2xl font-black text-brand-brown font-display">2020</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-xl font-black text-brand-brown mb-6 border-l-4 border-brand-orange pl-4 uppercase tracking-widest">Litti Specials</h4>
                  <div className="space-y-4">
                    {items.filter(i => i.category === 'Veg' || i.category === 'Non-Veg').slice(0, 8).map(item => (
                      <div key={item.id} className="flex justify-between items-center group">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${item.is_veg ? 'bg-green-500' : 'bg-red-500'}`} />
                          <span className="font-bold text-brand-brown group-hover:text-brand-orange transition-colors">{item.name}</span>
                        </div>
                        <div className="flex-grow mx-4 border-b border-dotted border-brand-brown/20" />
                        <span className="font-bold text-brand-orange">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-black text-brand-brown mb-6 border-l-4 border-brand-orange pl-4 uppercase tracking-widest">Drinks & More</h4>
                  <div className="space-y-4">
                    {items.filter(i => i.category === 'Drinks' || i.category === 'Combos').map(item => (
                      <div key={item.id} className="flex justify-between items-center group">
                        <span className="font-bold text-brand-brown group-hover:text-brand-orange transition-colors">{item.name}</span>
                        <div className="flex-grow mx-4 border-b border-dotted border-brand-brown/20" />
                        <span className="font-bold text-brand-orange">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 p-6 bg-brand-earth/30 rounded-2xl border border-brand-brown/5">
                    <p className="text-xs font-bold text-brand-brown/60 uppercase tracking-widest mb-2">Our Promise</p>
                    <p className="text-sm text-brand-brown/80 italic">"Every Litti is crafted with pure desi ghee and hand-picked sattu, preserving the authentic taste of Bihar."</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 pt-8 border-t border-brand-brown/10 flex justify-between items-center text-[10px] font-bold text-brand-brown/40 uppercase tracking-[0.2em]">
                <span>Boring Road, Patna | Saket, Delhi</span>
                <span>www.biharbowl.com</span>
                <span>+91 62023 21756</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            {/* 
              DOWNLOAD MENU CARD LINK:
              Change the 'href' below to your PDF or Image link 
            */}
            <a 
              href="/menu.png" 
              download="Bihar_Bowl_Menu.png"
              className="bg-brand-brown text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-orange transition-all shadow-xl inline-flex items-center space-x-2 mx-auto cursor-pointer"
            >
              <Plus size={20} />
              <span>Download Menu Card</span>
            </a>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-brand-orange/20"
          >
            <h2 className="text-3xl font-black text-brand-brown mb-6 font-display uppercase tracking-tighter">Add <span className="text-brand-orange italic">New Item</span></h2>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-brand-brown mb-1 uppercase tracking-widest">Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-brand-brown/10 focus:ring-2 focus:ring-brand-orange outline-none"
                  value={newItem.name}
                  onChange={e => setNewItem({...newItem, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-brand-brown mb-1 uppercase tracking-widest">Category</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-brand-brown/10 focus:ring-2 focus:ring-brand-orange outline-none"
                    value={newItem.category}
                    onChange={e => setNewItem({...newItem, category: e.target.value})}
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-brown mb-1 uppercase tracking-widest">Price (₹)</label>
                  <input 
                    type="number" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-brand-brown/10 focus:ring-2 focus:ring-brand-orange outline-none"
                    value={newItem.price}
                    onChange={e => setNewItem({...newItem, price: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-brown mb-1 uppercase tracking-widest">Description</label>
                <textarea 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-brand-brown/10 focus:ring-2 focus:ring-brand-orange outline-none h-24"
                  value={newItem.description}
                  onChange={e => setNewItem({...newItem, description: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-brown mb-1 uppercase tracking-widest">Image URL</label>
                <input 
                  type="url" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-brand-brown/10 focus:ring-2 focus:ring-brand-orange outline-none"
                  value={newItem.image_url}
                  onChange={e => setNewItem({...newItem, image_url: e.target.value})}
                />
              </div>
              <div className="flex items-center space-x-2 py-2">
                <input 
                  type="checkbox" 
                  id="is_veg"
                  checked={newItem.is_veg === 1}
                  onChange={e => setNewItem({...newItem, is_veg: e.target.checked ? 1 : 0})}
                  className="w-5 h-5 accent-brand-orange"
                />
                <label htmlFor="is_veg" className="text-sm font-bold text-brand-brown uppercase tracking-widest">Vegetarian</label>
              </div>
              <div className="flex space-x-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-4 rounded-xl font-bold text-brand-brown bg-brand-brown/5 hover:bg-brand-brown/10 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 rounded-xl font-bold text-white bg-brand-orange hover:bg-brand-brown transition-all shadow-xl"
                >
                  Add Item
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Menu;
