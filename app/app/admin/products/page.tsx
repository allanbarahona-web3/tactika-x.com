'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { productsApi, categoriesApi } from '@/lib/api/client';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  category: { id: string; name: string } | null;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
}

export default function ProductsPage() {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: '',
  });

  useEffect(() => {
    if (!token) return;
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productsApi.list(token!),
        categoriesApi.list(token!),
      ]);
      setProducts(productsData?.data || []);
      setCategories(categoriesData?.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      if (editingId) {
        await productsApi.update(token, editingId, formData);
      } else {
        await productsApi.create(token, formData);
      }
      fetchData();
      setShowModal(false);
      setFormData({ name: '', slug: '', description: '', price: 0, stock: 0, categoryId: '' });
      setEditingId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product');
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price / 100, // Convert from cents
      stock: product.stock,
      categoryId: product.category?.id || '',
    });
    setEditingId(product.id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Are you sure?')) return;
    try {
      await productsApi.delete(token, id);
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ name: '', slug: '', description: '', price: 0, stock: 0, categoryId: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your product catalog</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-black text-white rounded-lg font-medium text-sm transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          <span>New Product</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6">
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-2 border-gray-200 border-t-gray-900 animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm font-medium">Loading products</p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {products.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m0 0L4 7m8 4v10l8-4v-10L12 11m0 0L4 7" /></svg>
              <p className="text-sm font-medium text-gray-900">No products</p>
              <p className="text-xs text-gray-500 mt-1">Create your first product to get started</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wide">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wide">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wide">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wide">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500 font-mono">{product.slug}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.category?.name || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ${(product.price / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2.5 py-1 rounded text-xs font-medium ${
                        product.stock > 0
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-700'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm space-x-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-gray-600 hover:text-gray-900 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? 'Edit Product' : 'New Product'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Category
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Price (USD)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors text-sm"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gray-900 hover:bg-black text-white rounded-lg font-medium text-sm transition-colors"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
