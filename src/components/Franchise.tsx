import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Users, Award, Star, Utensils, Phone } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Franchise: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', city: '', budget: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const res = await fetch('/api/franchise', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (res.ok) {
      setIsSubmitted(true);
      toast.success("Application submitted successfully!");
      setFormData({ name: '', phone: '', email: '', city: '', budget: '', message: '' });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/frenchise.png" 
            alt="Franchise Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-9xl font-black text-white mb-8 font-display uppercase tracking-tighter drop-shadow-2xl">
              Partner <span className="text-brand-orange italic">With Us</span>
            </h1>
            <p className="text-2xl text-brand-earth/80 max-w-4xl mx-auto font-medium leading-relaxed">
              Join India's fastest growing Litti-Chokha chain. With over 50+ outlets worldwide, Bihar Bowl offers a proven, high-ROI business model with world-class support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-brand-brown p-12 rounded-[3rem] text-center text-white relative group overflow-hidden">
              <div className="absolute inset-0 bg-brand-orange opacity-0 group-hover:opacity-10 transition-opacity" />
              <p className="text-sm font-bold uppercase tracking-[0.3em] mb-4 opacity-60">Cities</p>
              <h3 className="text-7xl font-bold font-display">20+</h3>
            </div>
            <div className="bg-brand-brown p-12 rounded-[3rem] text-center text-white relative group overflow-hidden">
              <div className="absolute inset-0 bg-brand-orange opacity-0 group-hover:opacity-10 transition-opacity" />
              <p className="text-sm font-bold uppercase tracking-[0.3em] mb-4 opacity-60">Outlets</p>
              <h3 className="text-7xl font-bold font-display">50+</h3>
            </div>
            <div className="bg-brand-brown p-12 rounded-[3rem] text-center text-white relative group overflow-hidden">
              <div className="absolute inset-0 bg-brand-orange opacity-0 group-hover:opacity-10 transition-opacity" />
              <p className="text-sm font-bold uppercase tracking-[0.3em] mb-4 opacity-60">Countries</p>
              <h3 className="text-7xl font-bold font-display">02</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Model Section */}
      <section className="py-24 bg-brand-earth/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-black text-brand-brown font-display uppercase tracking-tighter">Our <span className="text-brand-orange italic">Franchise Model</span></h2>
              <p className="text-xl text-brand-brown/70 leading-relaxed">
                We provide a comprehensive support system for our franchise partners, including site selection, staff training, marketing support, and a robust supply chain. Our model is designed for high efficiency and maximum profitability.
              </p>
              <div className="space-y-4">
                {[
                  'Low Investment, High ROI',
                  'Standardized Recipes & Training',
                  'Centralized Supply Chain',
                  'Marketing & Branding Support',
                  'Regular Audits & Quality Control'
                ].map((point, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-brand-orange rounded-full flex items-center justify-center text-white">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-lg font-bold text-brand-brown">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
            >
              <img src="/franchisemodel.png" alt="Franchise Model" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 bg-brand-earth/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { icon: <Users size={40} />, title: 'Target Audience', desc: 'We are a major attraction for youths who are spending more than 6,00,000 minutes in our outlets. In the coming years, we are targeting to reach more cities.' },
              { icon: <Award size={40} />, title: 'Prominence', desc: 'We have been covered by major media houses with our success story of becoming a leading ethnic food company within 4 years of establishment.' },
              { icon: <CheckCircle2 size={40} />, title: 'Fresh Concept', desc: 'Our concept of ‘Taste The Kulhad Litti’ in a bar-like setting where smoking is completely prohibited has been a new concept that focuses on health.' },
              { icon: <Star size={40} />, title: 'Brand Value', desc: 'Bihar Bowl has culminated into a brand that resonates with youth through our vision & mission. We have marked presence in more than 20+ cities.' }
            ].map((card, i) => (
              <div key={i} className="bg-brand-brown p-12 rounded-[4rem] text-white flex flex-col items-center text-center space-y-6 hover:bg-brand-brown-light transition-colors">
                <div className="w-20 h-20 bg-white text-brand-brown rounded-full flex items-center justify-center shadow-xl">
                  {card.icon}
                </div>
                <h4 className="text-3xl font-bold font-display">{card.title}</h4>
                <p className="text-brand-earth/70 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Franchise Model Section */}
      <section className="py-32 bg-brand-brown/95 text-white relative overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 opacity-5 mithila-pattern" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-8xl font-bold font-display mb-8">Franchise <span className="text-brand-yellow">Model</span></h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 bg-brand-yellow text-brand-brown rounded-2xl flex items-center justify-center shadow-2xl">
                <Utensils size={48} />
              </div>
              <h3 className="text-4xl font-bold text-brand-yellow">FOFO</h3>
              <p className="text-xl font-bold opacity-60">(Franchise Owned Franchise Operated)</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="rounded-[4rem] overflow-hidden shadow-2xl border-8 border-brand-brown-light">
              <img src="/franchisemodel.png" alt="Outlet Model" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-8">
              <p className="text-2xl leading-relaxed text-brand-earth/80">
                In this model, the Company just rents out the Brand Name to the Franchise operator for a particular non-refundable sum also said to be – Franchise Fee for an agreed interval of time.
              </p>
              <div className="h-1 w-24 bg-brand-yellow" />
              <p className="text-lg opacity-60">
                This model ensures that the owner has full control over the operations while benefiting from the established brand identity and supply chain of Bihar Bowl.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-24 bg-white" id="franchise-form">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-brand-earth/20 rounded-[4rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full -mr-32 -mt-32" />
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-brand-brown font-display uppercase tracking-tighter">Apply for <span className="text-brand-orange italic">Franchise</span></h2>
                <p className="text-brand-brown/60 mt-4">Fill out the form below and our team will get in touch with you.</p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-brown mb-4">Application Received!</h3>
                  <p className="text-brand-brown/60 mb-8">Thank you for your interest. Our franchise team will contact you within 48 hours.</p>
                  <button onClick={() => setIsSubmitted(false)} className="bg-brand-brown text-white px-8 py-3 rounded-xl font-bold">Submit Another Application</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-brand-brown mb-2 uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-6 py-4 rounded-2xl border border-brand-brown/10 focus:ring-2 focus:ring-brand-orange outline-none bg-white"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-brand-brown mb-2 uppercase tracking-widest">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        className="w-full px-6 py-4 rounded-2xl border border-brand-brown/10 focus:ring-2 focus:ring-brand-orange outline-none bg-white"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-brand-brown mb-2 uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        required
                        className="w-full px-6 py-4 rounded-2xl border border-brand-brown/10 focus:ring-2 focus:ring-brand-orange outline-none bg-white"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-brand-brown mb-2 uppercase tracking-widest">Target City</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-6 py-4 rounded-2xl border border-brand-brown/10 focus:ring-2 focus:ring-brand-orange outline-none bg-white"
                        value={formData.city}
                        onChange={e => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-brown mb-2 uppercase tracking-widest">Investment Budget</label>
                    <select 
                      required
                      className="w-full px-6 py-4 rounded-2xl border border-brand-brown/10 focus:ring-2 focus:ring-brand-orange outline-none bg-white"
                      value={formData.budget}
                      onChange={e => setFormData({...formData, budget: e.target.value})}
                    >
                      <option value="">Select Budget Range</option>
                      <option value="10-15 Lakhs">10-15 Lakhs</option>
                      <option value="15-25 Lakhs">15-25 Lakhs</option>
                      <option value="25-40 Lakhs">25-40 Lakhs</option>
                      <option value="40 Lakhs+">40 Lakhs+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-brown mb-2 uppercase tracking-widest">Message / Query</label>
                    <textarea 
                      className="w-full px-6 py-4 rounded-2xl border border-brand-brown/10 focus:ring-2 focus:ring-brand-orange outline-none bg-white h-32"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-brand-orange text-white py-5 rounded-2xl font-bold text-xl hover:bg-brand-brown transition-all shadow-xl disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Franchise;
