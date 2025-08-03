'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, Truck, Mail } from 'lucide-react';
import Link from 'next/link';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Order Confirmed!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
            <p className="text-sm text-gray-600 mt-1">
              Order ID: <span className="font-mono font-medium">{orderId}</span>
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Confirmation Email</p>
                <p className="text-sm text-gray-600">Sent to your email address</p>
              </div>
            </div>

            <div className="flex items-center">
              <Package className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Processing</p>
                <p className="text-sm text-gray-600">Your order is being prepared</p>
              </div>
            </div>

            <div className="flex items-center">
              <Truck className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Estimated Delivery</p>
                <p className="text-sm text-gray-600">3-5 business days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <Link
            href="/orders"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Order Status
          </Link>
          
          <Link
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}