'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  if (!user) {
    router.push('/login');
    return null;
  }

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          items,
          total,
          status: 'pending',
          shippingInfo: formData,
          paymentMethod: 'cod',
        }),
      });
      if (res.ok) {
        clearCart();
        toast.success('Order placed!');
        router.push('/');
      } else {
        toast.error('Order failed');
      }
    } catch (error) {
      toast.error('Order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-black mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl">
              <h2 className="text-xl font-bold">Shipping Info</h2>
               
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-neon-green"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-neon-green"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-neon-green"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-neon-green text-black py-3 rounded-xl font-semibold hover:bg-neon-green-dark transition disabled:opacity-50"
              >
                {loading ? 'Placing Order...' : `Place Order - $${total.toFixed(2)}`}
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl sticky top-24">
              <h2 className="text-xl font-bold mb-4">Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold text-black">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                Payment: Cash on Delivery
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
