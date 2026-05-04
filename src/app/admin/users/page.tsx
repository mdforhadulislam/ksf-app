'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Shield, User as UserIcon } from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) { toast.error('Failed to fetch'); } 
    finally { setLoading(false); }
  };

  const toggleRole = async (id: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, role: newRole }),
      });
      toast.success(`Role updated to ${newRole}`);
      fetchUsers();
    } catch (error) { toast.error('Failed'); }
  };

  if (loading) return <div className="py-20 text-center"><div className="w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-black mb-8">Users</h1>

        <div className="bg-white rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-neon-green/20 rounded-full flex items-center justify-center">
                        {user.role === 'admin' ? <Shield size={16} /> : <UserIcon size={16} />}
                      </div>
                      <span className="font-medium">{user.displayName || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'admin' ? 'bg-neon-green/20 text-black' : 'bg-gray-100'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleRole(user.id, user.role)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                        user.role === 'admin' 
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                          : 'bg-neon-green text-black hover:bg-neon-green-dark'
                      }`}
                    >
                      {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p className="text-center py-12 text-gray-500">No users found.</p>}
        </div>
      </div>
    </div>
  );
}
