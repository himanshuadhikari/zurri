'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    _count: {
        products: number;
    };
}

interface CategoryFormData {
    name: string;
    description: string;
    image: string;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState<CategoryFormData>({
        name: '',
        description: '',
        image: ''
    });
    const [formLoading, setFormLoading] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const limit = 10;

    // Load categories
    const loadCategories = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: limit.toString(),
                search: searchTerm,
                sortBy,
                sortOrder
            });

            const response = await fetch(`/api/admin/categories?${params}`);
            if (!response.ok) throw new Error('Failed to fetch categories');

            const data = await response.json();
            setCategories(data.categories);
            setTotalPages(data.totalPages);
            setTotal(data.total);
        } catch (error) {
            console.error('Error loading categories:', error);
            toast.error('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    // Load categories when dependencies change
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentPage(1);
            loadCategories();
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, sortBy, sortOrder]);

    useEffect(() => {
        loadCategories();
    }, [currentPage]);

    // Show create form
    const showCreateForm = () => {
        setEditingCategory(null);
        setFormData({ name: '', description: '', image: '' });
        setShowForm(true);
    };

    // Show edit form
    const showEditForm = (category: Category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            description: category.description || '',
            image: category.image || ''
        });
        setShowForm(true);
    };

    // Close form
    const closeForm = () => {
        setShowForm(false);
        setEditingCategory(null);
        setFormData({ name: '', description: '', image: '' });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            toast.error('Category name is required');
            return;
        }

        setFormLoading(true);
        try {
            const url = editingCategory
                ? `/api/admin/categories/${editingCategory.id}`
                : '/api/admin/categories';

            const method = editingCategory ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to save category');
            }

            toast.success(editingCategory ? 'Category updated successfully!' : 'Category created successfully!');
            closeForm();
            loadCategories();
        } catch (error: any) {
            console.error('Error saving category:', error);
            toast.error(error.message || 'Failed to save category');
        } finally {
            setFormLoading(false);
        }
    };

    // Delete category
    const deleteCategory = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/categories/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to delete category');
            }

            toast.success('Category deleted successfully');
            setDeleteConfirm(null);
            loadCategories();
        } catch (error: any) {
            console.error('Error deleting category:', error);
            toast.error(error.message || 'Failed to delete category');
        }
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Generate page numbers
    const generatePageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                                <p className="mt-1 text-sm text-gray-500">Manage your product categories</p>
                            </div>
                            <button
                                onClick={showCreateForm}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                <i className="fas fa-plus mr-2"></i>
                                Add Category
                            </button>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Categories List */}
                        <div className="lg:col-span-2">
                            {/* Search and Filters */}
                            <div className="bg-white rounded-lg shadow mb-6">
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="md:col-span-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    placeholder="Search categories..."
                                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                />
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <i className="fas fa-search text-gray-400"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                                            <select
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value)}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            >
                                                <option value="name">Name</option>
                                                <option value="createdAt">Created Date</option>
                                                <option value="updatedAt">Updated Date</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                                            <select
                                                value={sortOrder}
                                                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            >
                                                <option value="asc">Ascending</option>
                                                <option value="desc">Descending</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Categories Table */}
                            <div className="bg-white shadow rounded-lg overflow-hidden">
                                {loading ? (
                                    <div className="flex justify-center items-center py-12">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                                        <span className="ml-3 text-gray-600">Loading categories...</span>
                                    </div>
                                ) : categories.length === 0 ? (
                                    <div className="text-center py-12">
                                        <i className="fas fa-folder-open text-gray-400 text-4xl mb-4"></i>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                                        <p className="text-gray-500 mb-4">Get started by creating your first category.</p>
                                        <button
                                            onClick={showCreateForm}
                                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            <i className="fas fa-plus mr-2"></i>
                                            Add Category
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Category
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Description
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Products
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Created
                                                        </th>
                                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {categories.map((category) => (
                                                        <tr key={category.id} className="hover:bg-gray-50">
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    {category.image ? (
                                                                        <img
                                                                            className="h-10 w-10 rounded-lg object-cover mr-4"
                                                                            src={category.image}
                                                                            alt={category.name}
                                                                        />
                                                                    ) : (
                                                                        <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center mr-4">
                                                                            <i className="fas fa-folder text-gray-400"></i>
                                                                        </div>
                                                                    )}
                                                                    <div>
                                                                        <div className="text-sm font-medium text-gray-900">
                                                                            {category.name}
                                                                        </div>
                                                                        <div className="text-sm text-gray-500">
                                                                            {category.slug}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="text-sm text-gray-900 max-w-xs truncate">
                                                                    {category.description || '-'}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                    {category._count.products} products
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {formatDate(category.createdAt)}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                <div className="flex justify-end space-x-2">
                                                                    <button
                                                                        onClick={() => showEditForm(category)}
                                                                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors"
                                                                        title="Edit category"
                                                                    >
                                                                         <PencilIcon className="h-4 w-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => setDeleteConfirm(category.id)}
                                                                        className={`text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors ${category._count.products > 0 ? 'opacity-50 cursor-not-allowed' : ''
                                                                            }`}
                                                                        title={
                                                                            category._count.products > 0
                                                                                ? 'Cannot delete category with products'
                                                                                : 'Delete category'
                                                                        }
                                                                        disabled={category._count.products > 0}
                                                                    >
                                                                       <TrashIcon className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Pagination */}
                                        {totalPages > 1 && (
                                            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                                <div className="flex-1 flex justify-between sm:hidden">
                                                    <button
                                                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                                        disabled={currentPage <= 1}
                                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        Previous
                                                    </button>
                                                    <button
                                                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                                        disabled={currentPage >= totalPages}
                                                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                                    <div>
                                                        <p className="text-sm text-gray-700">
                                                            Showing{' '}
                                                            <span className="font-medium">
                                                                {(currentPage - 1) * limit + 1}
                                                            </span>{' '}
                                                            to{' '}
                                                            <span className="font-medium">
                                                                {Math.min(currentPage * limit, total)}
                                                            </span>{' '}
                                                            of <span className="font-medium">{total}</span> results
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                                            <button
                                                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                                                disabled={currentPage <= 1}
                                                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                <i className="fas fa-chevron-left"></i>
                                                            </button>
                                                            {generatePageNumbers().map((page) => (
                                                                <button
                                                                    key={page}
                                                                    onClick={() => setCurrentPage(page)}
                                                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === currentPage
                                                                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                                        }`}
                                                                >
                                                                    {page}
                                                                </button>
                                                            ))}
                                                            <button
                                                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                                                disabled={currentPage >= totalPages}
                                                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                <i className="fas fa-chevron-right"></i>
                                                            </button>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Category Form */}
                        <div className="lg:col-span-1">
                            <div className={`bg-white rounded-lg shadow transition-all duration-300 ${showForm ? 'block' : 'hidden'}`}>
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {editingCategory ? 'Edit Category' : 'Add Category'}
                                        </h3>
                                        <button
                                            onClick={() => setShowForm(false)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter category name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            rows={3}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Enter category description"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Image URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>

                                    <div className="flex justify-end space-x-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={closeForm}
                                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={formLoading}
                                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {formLoading ? (
                                                <>
                                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                                    {editingCategory ? 'Updating...' : 'Creating...'}
                                                </>
                                            ) : (
                                                editingCategory ? 'Update Category' : 'Create Category'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Quick Stats */}
                            {!showForm && (
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-500">Total Categories</span>
                                            <span className="text-sm font-medium text-gray-900">{total}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-500">Current Page</span>
                                            <span className="text-sm font-medium text-gray-900">{currentPage} of {totalPages}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {deleteConfirm && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3 text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                    <i className="fas fa-exclamation-triangle text-red-600"></i>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Category</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Are you sure you want to delete this category? This action cannot be undone.
                                </p>
                                <div className="flex justify-center space-x-3">
                                    <button
                                        onClick={() => setDeleteConfirm(null)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => deleteCategory(deleteConfirm)}
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Delete Confirmation Modal */}
                {deleteConfirm && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3 text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                    <i className="fas fa-exclamation-triangle text-red-600"></i>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Category</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Are you sure you want to delete this category? This action cannot be undone.
                                </p>
                                <div className="flex justify-center space-x-3">
                                    <button
                                        onClick={() => setDeleteConfirm(null)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => deleteCategory(deleteConfirm)}
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}