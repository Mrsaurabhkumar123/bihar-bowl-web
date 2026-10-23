import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  ArrowLeft, 
  CreditCard 
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { CartItem, Branch } from '../types';

interface CartProps {
  cart: CartItem[];
  updateQuantity: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  user: any;
}

const Cart: React.FC<CartProps> = ({ cart, updateQuantity, removeFromCart, clearCart, user }) => {
  const [step, setStep] = useState<'cart' | 'branch' | 'payment' | 'success'>('cart');
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [customerPhone, setCustomerPhone] = useState('');
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (step === 'branch') {
      fetch('/api/branches').then(res => res.json()).then(setBranches);
    }
  }, [step]);

  const handlePlaceOrder = async () => {
    if (!selectedBranch) return toast.error("Please select a branch");
    if (!customerPhone && !user) return toast.error("Please provide a phone number");

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: user?.name || "Guest User",
        customer_phone: user?.phone || customerPhone,
        items: cart,
        total,
        branch_id: selectedBranch.id
      })
    });
    const data = await res.json();
    if (data.success) {
      setOrderId(data.order_id);
      setStep('payment');
    }
  };

  const handlePaymentSuccess = () => {
    setStep('success');
    clearCart();
    toast.success("Payment successful!");
  };

  if (step === 'success') {
    return (
      <div className="pt-40 pb-24 px-4 min-h-screen bg-brand-earth/20">
        <div className="max-w-md mx-auto bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-brand-orange/10">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-brand-brown mb-4">Order Confirmed!</h2>
          <p className="text-brand-brown/60 mb-8">Your order #{orderId} has been sent to {selectedBranch?.name}.</p>
          <Link to="/dashboard" className="block w-full bg-brand-orange text-white py-4 rounded-xl font-bold hover:bg-brand-orange/90 transition-all">
            Track Order Status
          </Link>
        </div>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-brand-earth/20">
        <div className="max-w-xl mx-auto px-4">
          <button onClick={() => setStep('branch')} className="flex items-center space-x-2 text-brand-brown mb-8 font-bold">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl">
            <h2 className="text-3xl font-bold text-brand-brown mb-2">Complete Payment</h2>
            <p className="text-brand-brown/60 mb-8">Scan the QR code of {selectedBranch?.name} to pay ₹{total}</p>
            
            <div className="flex flex-col items-center space-y-6">
              <div className="p-4 bg-white border-4 border-brand-orange rounded-3xl shadow-lg">
                <img src={selectedBranch?.qr_code_url} alt="Payment QR" className="w-64 h-64" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-brand-brown/40 uppercase tracking-widest mb-1">Total Amount</p>
                <p className="text-4xl font-bold text-brand-orange">₹{total}</p>
              </div>
              <div className="w-full space-y-4 pt-6">
                <button 
                  onClick={handlePaymentSuccess}
                  className="w-full bg-brand-brown text-white py-4 rounded-2xl font-bold hover:bg-brand-orange transition-all flex items-center justify-center space-x-3"
                >
                  <CreditCard size={20} />
                  <span>I have paid online</span>
                </button>
                <p className="text-xs text-center text-brand-brown/40">Our branch will verify the payment before accepting the order.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'branch') {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-brand-earth/20">
        <div className="max-w-4xl mx-auto px-4">
          <button onClick={() => setStep('cart')} className="flex items-center space-x-2 text-brand-brown mb-8 font-bold">
            <ArrowLeft size={20} />
            <span>Back to Cart</span>
          </button>
          <h2 className="text-4xl font-bold text-brand-brown mb-4">Select Nearest Branch</h2>
          <p className="text-brand-brown/60 mb-12">Choose the outlet you want to order from.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {branches.map(branch => (
              <button 
                key={branch.id}
                onClick={() => setSelectedBranch(branch)}
                className={`p-8 rounded-[2.5rem] text-left transition-all border-2 ${
                  selectedBranch?.id === branch.id 
                  ? 'bg-brand-orange/5 border-brand-orange shadow-inner' 
                  : 'bg-white border-transparent hover:border-brand-orange/20 shadow-xl'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange">
                    <CheckCircle2 size={24} className={selectedBranch?.id === branch.id ? 'opacity-100' : 'opacity-20'} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-brand-brown mb-1">{branch.name}</h3>
                <p className="text-brand-brown/60 text-sm">{branch.location}</p>
              </button>
            ))}
          </div>

          {!user && (
            <div className="max-w-md mb-12">
              <label className="block text-sm font-bold text-brand-brown mb-2 uppercase tracking-widest">Your Phone Number</label>
              <input 
                type="tel" 
                placeholder="Enter 10 digit number"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-white rounded-2xl px-6 py-4 focus:outline-none border-2 border-transparent focus:border-brand-orange transition-all shadow-xl"
              />
            </div>
          )}

          <button 
            onClick={handlePlaceOrder}
            disabled={!selectedBranch}
            className="w-full md:w-auto bg-brand-brown text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-brand-orange transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-earth/20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-brand-brown">Your Cart</h2>
          <span className="bg-brand-orange text-white px-4 py-1 rounded-full font-bold">{cart.length} Items</span>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-16 text-center shadow-2xl border border-brand-orange/10">
            <div className="w-24 h-24 bg-brand-earth rounded-full flex items-center justify-center mx-auto mb-8 text-brand-brown/20">
              <ShoppingBag size={48} />
            </div>
            <h3 className="text-2xl font-bold text-brand-brown mb-4">Your cart is empty</h3>
            <p className="text-brand-brown/60 mb-8">Looks like you haven't added any Litti goodness yet.</p>
            <Link to="/menu" className="inline-block bg-brand-orange text-white px-10 py-4 rounded-xl font-bold hover:bg-brand-orange/90 transition-all shadow-lg">
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-brand-orange/10">
              <div className="p-8 space-y-8">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-6">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-brand-brown">{item.name}</h3>
                      <p className="text-brand-orange font-bold">₹{item.price}</p>
                    </div>
                    <div className="flex items-center bg-brand-earth/50 rounded-xl p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-white rounded-lg transition-colors text-brand-brown"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-bold text-brand-brown">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-white rounded-lg transition-colors text-brand-brown"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-3 text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="bg-brand-earth/30 p-8">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-brand-brown/60 font-bold uppercase tracking-widest">Subtotal</span>
                  <span className="text-3xl font-bold text-brand-brown">₹{total}</span>
                </div>
                <button 
                  onClick={() => setStep('branch')}
                  className="w-full bg-brand-orange text-white py-5 rounded-2xl font-bold text-lg hover:bg-brand-brown transition-all shadow-xl"
                >
                  Choose Branch & Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
