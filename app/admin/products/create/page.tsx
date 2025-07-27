import { Metadata } from 'next';
import CreateProductForm from '@/components/admin/CreateProductForm';

export const metadata: Metadata = {
  title: 'Create Product - Admin | Clothify',
  description: 'Create a new product in the admin panel',
};

export default function CreateProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Product</h1>
        <p className="text-gray-600">Add a new product to your store</p>
      </div>
      
      <CreateProductForm />
    </div>
  );
}