'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { ProductFormData, validateProductForm, ValidationError } from '@/lib/validations/product';
import { createProduct, editProduct, getCategories } from '@/lib/api/products';
import BasicInfoFields from './forms/BasicInfoFields';
import ImageFields from './forms/ImageFields';
import AttributeFields from './forms/AttributeFields';
import AdminLayout from '../AdminLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import DetailsFields from './forms/DetailsFields';
import VariantFields from './forms/VariantFields';

const initialFormData: ProductFormData = {
    name: '',
    slug: '',
    description: '',
    price: 0,
    comparePrice: null,
    sku: '',
    stock: 0,
    categoryId: '',
    images: [''],
    sizes: [],
    colors: [],
    featured: false,
    active: true,
    variants: []
};

export default function CreateProductForm({ product = null }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [formData, setFormData] = useState<ProductFormData>(product || initialFormData);
    const [errors, setErrors] = useState<ValidationError[]>([]);
    const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);

    // Load categories on component mount
    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        setCategoriesLoading(true);
        try {
            const result = await getCategories();
            if (result.success && result.data) {
                setCategories(result.data);
            } else {
                // Fallback categories if API fails
                setCategories([
                    { id: '1', name: 'Men' },
                    { id: '2', name: 'Women' },
                    { id: '3', name: 'Kids' },
                ]);
                if (result.error) {
                    console.warn('Failed to load categories:', result.error);
                }
            }
        } catch (error) {
            console.error('Error loading categories:', error);
            // Fallback categories
            setCategories([
                { id: '1', name: 'Men' },
                { id: '2', name: 'Women' },
                { id: '3', name: 'Kids' },
            ]);
        } finally {
            setCategoriesLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Clear previous errors
        setErrors([]);

        // Validate form
        const validationErrors = validateProductForm(formData);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            toast.error('Please fix the form errors before submitting');
            setLoading(false);
            return;
        }

        setLoading(true);
        
        try {
            const result =  formData.id ? await editProduct(formData) : await createProduct(formData);

            if (!result?.id) {
                throw new Error(result?.error || 'Failed to create product');
            }

            toast.success(`Product ${formData.id ? "updated" : "created"}  successfully!`);
            router.push('/admin/products');
        } catch (error) {
            console.error('Error creating product:', error);
            toast.error(error instanceof Error ? error.message : `Failed to  ${formData.id ? "updated" : "created"}  product!`);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (loading) return;

        // Check if form has been modified
        const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialFormData);

        if (hasChanges) {
            const confirmed = window.confirm(
                'You have unsaved changes. Are you sure you want to leave?'
            );
            if (!confirmed) return;
        }

        router.push('/admin/products');
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setErrors([]);
        toast.success('Form reset successfully');
    };

    if (categoriesLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <LoadingSpinner size="lg" />
                </div>
            </AdminLayout>
        );
    }
    return (
        <AdminLayout>
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <form 
                onSubmit={handleSubmit} 
                className="space-y-8">
                    {/* Form Header */}
                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Product Information</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Fill in the details below to create a new product
                        </p>
                    </div>

                    {/* Basic Information */}
                    <div>
                        <h3 className="text-md font-medium text-gray-900 mb-4">Basic Information</h3>
                        <BasicInfoFields
                            formData={formData}
                            setFormData={setFormData}
                            errors={errors}
                            categories={categories}
                        />
                    </div>

                    <div>
                        <h3 className="text-md font-medium text-gray-900 mb-4">Product Details</h3>
                        <DetailsFields
                            formData={formData}
                            setFormData={setFormData}
                            errors={errors}
                        />
                    </div>

                    {/* Product Images */}
                    <div>
                        <h3 className="text-md font-medium text-gray-900 mb-4">Product Images</h3>
                        <ImageFields
                            formData={formData}
                            setFormData={setFormData}
                            errors={errors}
                        />
                    </div>

                    {/* Product Attributes */}
                    <div>
                        <h3 className="text-md font-medium text-gray-900 mb-4">Product Attributes</h3>
                        <AttributeFields
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </div>

                      {/* Product Variants */}
                    <div>
                        <h3 className="text-md font-medium text-gray-900 mb-4">Stock Management</h3>
                        <VariantFields
                            formData={formData}
                            setFormData={setFormData}
                            errors={errors}
                        />
                    </div>


                    {/* Form Actions */}
                    <div className="border-t pt-6">
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors"
                                disabled={loading}
                            >
                                Reset Form
                            </button>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        'Create Product'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}