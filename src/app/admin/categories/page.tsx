'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', description: '', image: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/api/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (error) { toast.error('Failed to fetch'); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingCategory) {
        await fetch(`${process.env.API_URL}/api/categories/${editingCategory.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        toast.success('Updated!');
      } else {
        await fetch(`${process.env.API_URL}/api/categories`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        toast.success('Added!');
      }
      setShowModal(false);
      setEditingCategory(null);
      setFormData({ name: '', description: '', image: '' });
      fetchCategories();
    } catch (error) {
      toast.error('Failed to save');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      image: category.image || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    try {
      await fetch(`${process.env.API_URL}/api/categories/${id}`, { method: 'DELETE' });
      toast.success('Deleted!');
      fetchCategories();
    } catch (error) { toast.error('Failed to delete'); }
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-black">Categories</h1>
          <button
            onClick={() => { setEditingCategory(null); setFormData({ name: '', description: '', image: '' }); setShowModal(true); }}
            className="bg-neon-green text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-neon-green-dark transition"
          >
            <Plus size={18} /> Add
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-neon-green transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(category)} className="text-neon-green hover:text-neon-green-dark">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              {category.image && (
                <img src={category.image} alt={category.name} className="w-full h-32 object-cover rounded-lg" />
              )}
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{editingCategory ? 'Edit' : 'Add'} Category</h2>
                <button onClick={() => setShowModal(false)}><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Category Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                  rows={3}
                />
                <input
                  type="text"
                  placeholder="Image URL (optional)"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-neon-green text-black py-3 rounded-xl font-semibold hover:bg-neon-green-dark transition disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingCategory ? 'Update' : 'Add'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
