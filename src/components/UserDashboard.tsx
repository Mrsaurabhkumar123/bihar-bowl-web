import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, History } from 'lucide-react';

interface UserDashboardProps {
  user: any;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`/api/user/orders/${user.email}`).then(res => res.json()).then(data => {
        setOrders(data);
        setIsLoading(false);
      });
    }
  }, [user]);

  if (!user) return <div className="pt-40 text-center">Please login to view your orders.</div>;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-earth/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-bold text-brand-brown font-display">My Orders</h1>
            <p className="text-brand-brown/60 mt-2">Track your delicious journey with Bihar Bowl</p>
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange">
              <History size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-brand-brown/40 uppercase">Total Orders</p>
              <p className="text-xl font-bold text-brand-brown">{orders.length}</p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-20">Loading your orders...</div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center shadow-sm">
            <ShoppingBag size={64} className="mx-auto text-brand-brown/10 mb-6" />
            <p className="text-xl text-brand-brown/60 mb-8">No orders yet. Time to eat!</p>
            <Link to="/menu" className="bg-brand-orange text-white px-8 py-4 rounded-full font-bold">Order Now</Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-brand-orange/5 hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="text-xs font-bold bg-brand-earth text-brand-brown px-3 py-1 rounded-full">#{order.id}</span>
                      <span className="text-sm text-brand-brown/40">{new Date(order.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-bold text-brand-brown">{order.branch_name}</h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {order.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-brand-brown/40 mt-2">Payment: {order.payment_status}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-2">
                    {JSON.parse(order.items).map((item: any, i: number) => (
                      <div key={i} className="flex justify-between text-sm text-brand-brown/70">
                        <span>{item.quantity}x {item.name}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="h-px bg-brand-earth my-2" />
                    <div className="flex justify-between font-bold text-brand-brown">
                      <span>Total Paid</span>
                      <span className="text-brand-orange">₹{order.total}</span>
                    </div>
                  </div>
                  
                  <div className="bg-brand-earth/30 p-6 rounded-2xl">
                    <p className="text-xs font-bold text-brand-brown/40 uppercase mb-4">Delivery Progress</p>
                    <div className="relative h-2 bg-white rounded-full overflow-hidden">
                      <div className={`absolute top-0 left-0 h-full bg-brand-orange transition-all duration-1000 ${
                        order.status === 'pending' ? 'w-1/4' :
                        order.status === 'accepted' ? 'w-2/4' :
                        order.status === 'preparing' ? 'w-3/4' :
                        'w-full'
                      }`} />
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] font-bold text-brand-brown/40 uppercase tracking-widest">
                      <span>Ordered</span>
                      <span>Kitchen</span>
                      <span>Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
