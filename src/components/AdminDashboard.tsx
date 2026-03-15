import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShoppingBag, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  Package,
  Truck,
  ChefHat,
  CreditCard,
  QrCode
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminDashboard = ({ user }: { user: any }) => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [franchise, setFranchise] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const branchQuery = user?.role === 'franchise_owner' ? `?branch_id=${user.branch_id}` : '';
      const [ordersRes, franchiseRes] = await Promise.all([
        fetch(`/api/admin/orders${branchQuery}`),
        fetch('/api/admin/franchise')
      ]);
      const [ordersData, franchiseData] = await Promise.all([
        ordersRes.json(),
        franchiseRes.json()
      ]);
      setOrders(ordersData);
      setFranchise(franchiseData);
    } catch (error) {
      console.error("Error fetching admin data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const updateOrderStatus = async (id: number, status: string) => {
    const res = await fetch('/api/admin/orders/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    if (res.ok) {
      toast.success(`Order status updated to ${status}`);
      fetchData();
    }
  };

  const updatePaymentStatus = async (id: number, payment_status: string) => {
    const res = await fetch('/api/admin/orders/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, payment_status })
    });
    if (res.ok) {
      toast.success(`Payment status updated to ${payment_status}`);
      fetchData();
    }
  };

  if (!user || (user.role !== 'admin' && user.role !== 'franchise_owner')) {
    return <div className="pt-40 text-center">Unauthorized Access</div>;
  }

  if (loading) return <div className="pt-32 text-center">Loading Dashboard...</div>;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-earth/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-brand-brown">
              {user.role === 'admin' ? 'Global Admin' : 'Branch Manager'} Dashboard
            </h1>
            <p className="text-brand-brown/60 mt-1">
              {user.role === 'admin' ? 'Monitoring all Bihar Bowl outlets' : `Managing ${user.name}'s outlet`}
            </p>
          </div>
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-brand-brown/5">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-2 rounded-xl font-bold transition-all flex items-center space-x-2 ${activeTab === 'orders' ? 'bg-brand-orange text-white' : 'text-brand-brown/60 hover:bg-brand-earth'}`}
            >
              <ShoppingBag size={18} />
              <span>Orders</span>
            </button>
            {user.role === 'admin' && (
              <button 
                onClick={() => setActiveTab('franchise')}
                className={`px-6 py-2 rounded-xl font-bold transition-all flex items-center space-x-2 ${activeTab === 'franchise' ? 'bg-brand-orange text-white' : 'text-brand-brown/60 hover:bg-brand-earth'}`}
              >
                <Users size={18} />
                <span>Franchise</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Orders', value: orders.length, icon: Package, color: 'bg-blue-500' },
            { label: 'Pending Orders', value: orders.filter(o => o.status === 'pending').length, icon: Clock, color: 'bg-orange-500' },
            { label: 'Total Revenue', value: `₹${orders.reduce((acc, o) => acc + o.total, 0)}`, icon: TrendingUp, color: 'bg-green-500' },
            { label: 'Unpaid Orders', value: orders.filter(o => o.payment_status === 'pending').length, icon: CreditCard, color: 'bg-red-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-brand-brown/5">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-2xl text-white`}>
                  <stat.icon size={24} />
                </div>
              </div>
              <p className="text-brand-brown/40 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-bold text-brand-brown mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-brand-brown/5 overflow-hidden">
          {activeTab === 'orders' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-brand-earth/50 border-b border-brand-brown/5">
                  <tr>
                    <th className="px-8 py-6 font-bold text-brand-brown">Order Details</th>
                    <th className="px-8 py-6 font-bold text-brand-brown">Items</th>
                    <th className="px-8 py-6 font-bold text-brand-brown">Payment</th>
                    <th className="px-8 py-6 font-bold text-brand-brown">Status</th>
                    <th className="px-8 py-6 font-bold text-brand-brown">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-earth">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-brand-earth/20 transition-colors">
                      <td className="px-8 py-6">
                        <p className="font-mono text-xs text-brand-brown/40 mb-1">#BB-{order.id.toString().padStart(4, '0')}</p>
                        <p className="font-bold text-brand-brown">{order.customer_name}</p>
                        <p className="text-xs text-brand-brown/60">{order.customer_phone}</p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-xs text-brand-brown/70">
                          {JSON.parse(order.items).map((item: any, i: number) => (
                            <div key={i}>{item.quantity}x {item.name}</div>
                          ))}
                        </div>
                        <p className="font-bold text-brand-orange mt-2">₹{order.total}</p>
                      </td>
                      <td className="px-8 py-6">
                        <button 
                          onClick={() => updatePaymentStatus(order.id, order.payment_status === 'paid' ? 'pending' : 'paid')}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-2 ${
                            order.payment_status === 'paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}
                        >
                          <CreditCard size={12} />
                          <span>{order.payment_status}</span>
                        </button>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                          order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-2">
                          {order.status === 'pending' && (
                            <button onClick={() => updateOrderStatus(order.id, 'accepted')} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100" title="Accept Order">
                              <CheckCircle size={18} />
                            </button>
                          )}
                          {order.status === 'accepted' && (
                            <button onClick={() => updateOrderStatus(order.id, 'preparing')} className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100" title="Start Preparing">
                              <ChefHat size={18} />
                            </button>
                          )}
                          {order.status === 'preparing' && (
                            <button onClick={() => updateOrderStatus(order.id, 'out_for_delivery')} className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100" title="Out for Delivery">
                              <Truck size={18} />
                            </button>
                          )}
                          {order.status === 'out_for_delivery' && (
                            <button onClick={() => updateOrderStatus(order.id, 'delivered')} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100" title="Mark Delivered">
                              <CheckCircle size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-brand-earth/50 border-b border-brand-brown/5">
                  <tr>
                    <th className="px-8 py-6 font-bold text-brand-brown">Applicant</th>
                    <th className="px-8 py-6 font-bold text-brand-brown">City</th>
                    <th className="px-8 py-6 font-bold text-brand-brown">Budget</th>
                    <th className="px-8 py-6 font-bold text-brand-brown">Contact</th>
                    <th className="px-8 py-6 font-bold text-brand-brown">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-earth">
                  {franchise.map((app) => (
                    <tr key={app.id} className="hover:bg-brand-earth/20 transition-colors">
                      <td className="px-8 py-6">
                        <p className="font-bold text-brand-brown">{app.name}</p>
                        <p className="text-xs text-brand-brown/40">{app.email}</p>
                      </td>
                      <td className="px-8 py-6 font-medium text-brand-brown">{app.city}</td>
                      <td className="px-8 py-6">
                        <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-[10px] font-bold">
                          {app.budget}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm text-brand-brown/60">{app.phone}</td>
                      <td className="px-8 py-6 text-sm text-brand-brown/40">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
