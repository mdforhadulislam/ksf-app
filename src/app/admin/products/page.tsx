'use client';

import { Edit, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    discountPercent: 0,
    description: '',
    image: '',
    category: '',
    stock: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) { toast.error('Failed to fetch'); }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) { console.error('Failed to fetch categories'); }
  };


  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = formData.image;
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('file', imageFile);
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: uploadData });
        const uploadResult = await uploadRes.json();
        imageUrl = uploadResult.url;
      }

      if (editingProduct) {
        await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, image: imageUrl }),
        });
        toast.success('Updated!');
      } else {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, image: imageUrl }),
        });
        toast.success('Added!');
      }
      setShowModal(false);
      setEditingProduct(null);
      setFormData({ name: '', price: 0, discountPercent: 0, description: '', image: '', category: '', stock: 0 });
      setImageFile(null);
      fetchProducts();
    } catch (error) {
      toast.error('Failed to save');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      discountPercent: product.discountPercent || 0,
      description: product.description,
      image: product.image,
      category: product.category,
      stock: product.stock,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      toast.success('Deleted!');
      fetchProducts();
    } catch (error) { toast.error('Failed to delete'); }
  };
const getDisplayWithOutDiscountPrice = (product: any) => {
  if (
    product.discountPercent &&
    product.discountPercent > 0
  ) {
    return (
      product.price + (product.price * product.discountPercent) / 100
    );
  }

  return 0;
};

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-black">Products</h1>
          <button
            onClick={() => {
              setEditingProduct(null);
              setFormData({ name: '', price: 0, discountPercent: 0, description: '', image: '', category: '', stock: 0 });
              setShowModal(true);
            }}
            className="bg-neon-green text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-neon-green-dark transition"
          >
            <Plus size={18} /> Add
          </button>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center">📦</div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4 font-bold">
                    {product.discountPercent && product.discountPercent > 0 ? (
                      <div>
                        <span className="text-sm text-gray-400 line-through">BDT {product.price.toFixed(2)}</span>
                        <div className="text-black">BDT {getDisplayWithOutDiscountPrice(product).toFixed(2)}</div>
                      </div>
                    ) : (
                      <span>BDT {product.price.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{product.category || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4">
                    {product.discountPercent && product.discountPercent > 0 ? (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        -{product.discountPercent}%
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(product)} className="text-neon-green hover:text-neon-green-dark">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{editingProduct ? 'Edit' : 'Add'} Product</h2>
                <button onClick={() => setShowModal(false)}><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
                <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
                <input type="number" placeholder="Discount % (0-100)" value={formData.discountPercent} onChange={(e) => setFormData({ ...formData, discountPercent: Number(e.target.value) })} className="w-full px-4 py-3 border border-gray-300 rounded-xl" min="0" max="100" />
                <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl" rows={3} required />
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <input type="number" placeholder="Stock" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })} className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full" />
                {formData.image && !imageFile && <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded" />}
                <button type="submit" disabled={loading} className="w-full bg-neon-green text-black py-3 rounded-xl font-semibold hover:bg-neon-green-dark transition disabled:opacity-50">
                  {loading ? 'Saving...' : editingProduct ? 'Update' : 'Add'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
