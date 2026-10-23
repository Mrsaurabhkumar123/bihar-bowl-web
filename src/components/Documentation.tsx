import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Upload, Shield, Users, CreditCard, Lock, Plus, Trash2, Eye, ExternalLink, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Document {
  id: number;
  title: string;
  category: string;
  file_url: string;
  created_at: string;
}

interface Franchisee {
  id: number;
  name: string;
  location: string;
  contact: string;
  email: string;
  document_list: string;
}

const Documentation = ({ user }: { user: any }) => {
  const [activeTab, setActiveTab] = useState('brand');
  const [docs, setDocs] = useState<Document[]>([]);
  const [franchisees, setFranchisees] = useState<Franchisee[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showAddFranchisee, setShowAddFranchisee] = useState(false);
  
  const [newDoc, setNewDoc] = useState({ title: '', category: 'brand', file_url: '' });
  const [newFranchisee, setNewFranchisee] = useState({ name: '', location: '', contact: '', email: '' });
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchDocs();
    fetchFranchisees();
  }, []);

  const fetchDocs = async () => {
    const res = await fetch('/api/documents');
    const data = await res.json();
    setDocs(data);
  };

  const fetchFranchisees = async () => {
    const res = await fetch('/api/franchisees');
    const data = await res.json();
    setFranchisees(data);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newDoc, uploaded_by: user.id })
    });
    if (res.ok) {
      toast.success("Document uploaded successfully");
      setShowUpload(false);
      fetchDocs();
    }
  };

  const handleAddFranchisee = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/franchisees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFranchisee)
    });
    if (res.ok) {
      toast.success("Franchisee added successfully");
      setShowAddFranchisee(false);
      fetchFranchisees();
    }
  };

  const tabs = [
    { id: 'brand', label: 'Brand Document', icon: FileText },
    { id: 'franchisor', label: 'Franchisor Details', icon: Shield },
    { id: 'franchisee', label: 'Franchisee Details', icon: Users },
    { id: 'customer', label: 'Customer Details', icon: Users },
    { id: 'payment', label: 'Payment Details', icon: CreditCard },
    { id: 'security', label: 'Security Management', icon: Lock },
  ];

  if (!user || user.role !== 'admin') {
    return (
      <div className="pt-40 pb-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <Lock size={64} className="text-brand-orange mb-6 opacity-20" />
        <h1 className="text-4xl font-bold text-brand-brown mb-4">Access Restricted</h1>
        <p className="text-brand-brown/60 max-w-md">
          This section contains sensitive brand and operational documents. 
          Please login with an administrator account to view this content.
        </p>
      </div>
    );
  }

  const filteredDocs = docs.filter(d => d.category === activeTab);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-black text-brand-brown font-display uppercase tracking-tighter">Documentation <span className="text-brand-orange italic">Center</span></h1>
            <p className="text-brand-brown/60 mt-2">Manage and view all essential brand and operational documents.</p>
          </div>
          {isAdmin && (
            <div className="flex space-x-4">
              <button 
                onClick={() => {
                  setNewDoc({ ...newDoc, category: activeTab });
                  setShowUpload(true);
                }}
                className="flex items-center space-x-2 bg-brand-orange text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-orange/90 transition-all shadow-lg"
              >
                <Upload size={20} />
                <span>Upload to {tabs.find(t => t.id === activeTab)?.label}</span>
              </button>
              <button 
                onClick={() => setShowAddFranchisee(true)}
                className="flex items-center space-x-2 bg-brand-brown text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-brown/90 transition-all shadow-lg"
              >
                <Plus size={20} />
                <span>Add Franchisee</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-brand-orange text-white shadow-lg scale-105' 
                    : 'bg-white text-brand-brown/60 hover:bg-brand-earth'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 shadow-xl border border-white/20">
              {activeTab === 'franchisee' ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-brand-brown mb-6">Franchisee Directory</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {franchisees.map((f) => (
                      <div key={f.id} className="bg-brand-earth/30 p-6 rounded-3xl border border-brand-brown/5">
                        <h3 className="text-xl font-bold text-brand-brown">{f.name}</h3>
                        <p className="text-sm text-brand-brown/60 mb-4">{f.location}</p>
                        <div className="space-y-2 text-sm">
                          <p><strong>Contact:</strong> {f.contact}</p>
                          <p><strong>Email:</strong> {f.email}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-brand-brown/10">
                          <p className="text-xs font-bold uppercase tracking-wider text-brand-orange mb-2">Documents</p>
                          <div className="flex flex-wrap gap-2">
                            {JSON.parse(f.document_list || '[]').map((doc: string, i: number) => (
                              <span key={i} className="bg-white px-3 py-1 rounded-full text-[10px] font-bold border border-brand-brown/5">{doc}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-brand-brown mb-6 capitalize">{activeTab.replace('_', ' ')} Documents</h2>
                  {filteredDocs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredDocs.map((doc) => (
                        <div 
                          key={doc.id} 
                          className="flex items-center justify-between p-4 bg-white rounded-2xl border border-brand-brown/5 hover:border-brand-orange transition-all group"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl group-hover:bg-brand-orange group-hover:text-white transition-colors">
                              <FileText size={24} />
                            </div>
                            <div>
                              <p className="font-bold text-brand-brown">{doc.title}</p>
                              <p className="text-xs text-brand-brown/40">{new Date(doc.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => setSelectedDoc(doc)}
                              className="p-2 text-brand-brown/40 hover:text-brand-orange transition-colors"
                              title="Preview"
                            >
                              <Eye size={18} />
                            </button>
                            <a 
                              href={doc.file_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-2 text-brand-brown/40 hover:text-brand-orange transition-colors"
                              title="Open Original"
                            >
                              <ExternalLink size={18} />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <FileText size={48} className="mx-auto text-brand-brown/10 mb-4" />
                      <p className="text-brand-brown/40 font-medium">No documents found in this category.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-brown/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl"
            >
              <h2 className="text-3xl font-bold text-brand-brown mb-8">Upload Document</h2>
              <form onSubmit={handleUpload} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-brand-brown/60 mb-2">Document Title</label>
                  <input 
                    type="text" 
                    required
                    value={newDoc.title}
                    onChange={(e) => setNewDoc({...newDoc, title: e.target.value})}
                    className="w-full bg-brand-earth/50 rounded-xl px-6 py-4 focus:outline-none border border-transparent focus:border-brand-orange transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-brown/60 mb-2">Category</label>
                  <select 
                    value={newDoc.category}
                    onChange={(e) => setNewDoc({...newDoc, category: e.target.value})}
                    className="w-full bg-brand-earth/50 rounded-xl px-6 py-4 focus:outline-none border border-transparent focus:border-brand-orange transition-all"
                  >
                    {tabs.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-brown/60 mb-2">File URL (Simulated)</label>
                  <input 
                    type="url" 
                    required
                    value={newDoc.file_url}
                    onChange={(e) => setNewDoc({...newDoc, file_url: e.target.value})}
                    className="w-full bg-brand-earth/50 rounded-xl px-6 py-4 focus:outline-none border border-transparent focus:border-brand-orange transition-all"
                  />
                </div>
                <div className="flex space-x-4 pt-4">
                  <button type="button" onClick={() => setShowUpload(false)} className="flex-1 py-4 font-bold text-brand-brown/60 hover:text-brand-brown transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 bg-brand-orange text-white py-4 rounded-xl font-bold hover:bg-brand-orange/90 transition-all shadow-lg">Upload</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Franchisee Modal */}
      <AnimatePresence>
        {showAddFranchisee && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-brown/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl"
            >
              <h2 className="text-3xl font-bold text-brand-brown mb-8">Add New Franchisee</h2>
              <form onSubmit={handleAddFranchisee} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Franchisee Name"
                  required
                  value={newFranchisee.name}
                  onChange={(e) => setNewFranchisee({...newFranchisee, name: e.target.value})}
                  className="w-full bg-brand-earth/50 rounded-xl px-6 py-4 focus:outline-none border border-transparent focus:border-brand-orange transition-all"
                />
                <input 
                  type="text" 
                  placeholder="Location"
                  required
                  value={newFranchisee.location}
                  onChange={(e) => setNewFranchisee({...newFranchisee, location: e.target.value})}
                  className="w-full bg-brand-earth/50 rounded-xl px-6 py-4 focus:outline-none border border-transparent focus:border-brand-orange transition-all"
                />
                <input 
                  type="tel" 
                  placeholder="Contact Number"
                  required
                  value={newFranchisee.contact}
                  onChange={(e) => setNewFranchisee({...newFranchisee, contact: e.target.value})}
                  className="w-full bg-brand-earth/50 rounded-xl px-6 py-4 focus:outline-none border border-transparent focus:border-brand-orange transition-all"
                />
                <input 
                  type="email" 
                  placeholder="Email Address"
                  required
                  value={newFranchisee.email}
                  onChange={(e) => setNewFranchisee({...newFranchisee, email: e.target.value})}
                  className="w-full bg-brand-earth/50 rounded-xl px-6 py-4 focus:outline-none border border-transparent focus:border-brand-orange transition-all"
                />
                <div className="flex space-x-4 pt-4">
                  <button type="button" onClick={() => setShowAddFranchisee(false)} className="flex-1 py-4 font-bold text-brand-brown/60 hover:text-brand-brown transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 bg-brand-orange text-white py-4 rounded-xl font-bold hover:bg-brand-orange/90 transition-all shadow-lg">Add Franchisee</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Document Preview Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-brand-brown/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-brand-brown/5 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-brand-brown">{selectedDoc.title}</h2>
                  <p className="text-brand-brown/60">Category: <span className="capitalize">{selectedDoc.category}</span> • Uploaded on {new Date(selectedDoc.created_at).toLocaleDateString()}</p>
                </div>
                <button 
                  onClick={() => setSelectedDoc(null)}
                  className="p-3 bg-brand-earth/50 rounded-full hover:bg-brand-orange hover:text-white transition-all"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-grow bg-brand-earth/20 p-8 overflow-auto">
                {selectedDoc.file_url.endsWith('.pdf') ? (
                  <iframe src={selectedDoc.file_url} className="w-full h-full rounded-2xl border-0" title="PDF Preview" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full space-y-6">
                    <img src={selectedDoc.file_url} alt={selectedDoc.title} className="max-w-full max-h-full rounded-2xl shadow-lg object-contain" />
                    <a 
                      href={selectedDoc.file_url} 
                      download 
                      className="bg-brand-orange text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-orange/90 transition-all shadow-lg flex items-center space-x-2"
                    >
                      <Upload size={20} className="rotate-180" />
                      <span>Download Document</span>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Documentation;
