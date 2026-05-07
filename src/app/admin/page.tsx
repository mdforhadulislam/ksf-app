'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { Product, Order, User } from '@/types';
import Link from 'next/link';
import { ShoppingBag, Users, Package, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          fetch(`${process.env.API_URL}/api/products`),
          fetch(`${process.env.API_URL}/api/orders`),
          fetch(`${process.env.API_URL}/api/users`),
        ]);
        const [products, orders, users] = await Promise.all([
          productsRes.json(),
          ordersRes.json(),
          usersRes.json(),
        ]);

        const revenue = orders
          .filter((o: any) => o.status !== 'cancelled')
          .reduce((sum: number, o: any) => sum + o.total, 0);

        setStats({
          products: products.length,
          orders: orders.length,
          users: users.length,
          revenue,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <ProtectedRoute requireAdmin>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600">Products</h3>
              <Package className="text-indigo-600" size={24} />
            </div>
            <p className="text-3xl font-bold">{stats.products}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600">Orders</h3>
              <ShoppingBag className="text-green-600" size={24} />
            </div>
            <p className="text-3xl font-bold">{stats.orders}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600">Users</h3>
              <Users className="text-blue-600" size={24} />
            </div>
            <p className="text-3xl font-bold">{stats.users}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600">Revenue</h3>
              <DollarSign className="text-yellow-600" size={24} />
            </div>
            <p className="text-3xl font-bold">BDT {stats.revenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link
            href="/admin/products"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition group"
          >
            <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition">
              Manage Products
            </h3>
            <p className="text-gray-600">Add, edit, or delete products</p>
          </Link>

          <Link
            href="/admin/categories"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition group"
          >
            <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition">
              Manage Categories
            </h3>
            <p className="text-gray-600">Add, edit, or delete categories</p>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition group"
          >
            <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition">
              View Orders
            </h3>
            <p className="text-gray-600">Track and manage all orders</p>
          </Link>

          <Link
            href="/admin/users"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition group"
          >
            <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition">
              Manage Users
            </h3>
            <p className="text-gray-600">View and manage user accounts</p>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
