import React, { useState, useEffect } from 'react';
import { Star, User, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Reviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({ user_name: '', rating: 5, comment: '' });

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview)
    });
    if (res.ok) {
      toast.success("Review submitted for moderation!");
      setNewReview({ user_name: '', rating: 5, comment: '' });
    }
  };

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-bold text-brand-brown mb-6">Customer Reviews</h2>
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex text-brand-yellow">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={24} />)}
              </div>
              <span className="text-2xl font-bold text-brand-brown">4.9 / 5</span>
            </div>
            <p className="text-brand-brown/60 mb-10">We value your feedback. Share your experience with us!</p>
            
            <form onSubmit={handleSubmit} className="bg-brand-earth/30 p-8 rounded-3xl border border-brand-orange/5 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-brown/70">Your Name</label>
                <input 
                  required
                  type="text" 
                  value={newReview.user_name}
                  onChange={e => setNewReview({...newReview, user_name: e.target.value})}
                  className="w-full bg-white border border-brand-brown/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-brown/70">Rating</label>
                <select 
                  value={newReview.rating}
                  onChange={e => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                  className="w-full bg-white border border-brand-brown/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange"
                >
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-brown/70">Review</label>
                <textarea 
                  required
                  rows={4}
                  value={newReview.comment}
                  onChange={e => setNewReview({...newReview, comment: e.target.value})}
                  className="w-full bg-white border border-brand-brown/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-orange"
                />
              </div>
              <button className="w-full bg-brand-brown text-white py-4 rounded-xl font-bold hover:bg-brand-orange transition-colors shadow-lg">
                Submit Review
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {reviews.length === 0 ? (
              <div className="text-center py-20 bg-brand-earth/20 rounded-3xl border border-dashed border-brand-brown/10">
                <p className="text-brand-brown/40">No reviews yet. Be the first to review!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="bg-white border border-brand-earth p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-brand-orange/10 p-3 rounded-full">
                        <User className="text-brand-orange" size={24} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-brand-brown">{review.user_name}</h4>
                          <CheckCircle size={14} className="text-blue-500" />
                          <span className="text-[10px] font-bold text-blue-500 uppercase">Verified</span>
                        </div>
                        <div className="flex text-brand-yellow mt-1">
                          {[...Array(review.rating)].map((_, i) => <Star key={i} fill="currentColor" size={14} />)}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-brand-brown/40">{new Date(review.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-brand-brown/70 leading-relaxed italic">"{review.comment}"</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
