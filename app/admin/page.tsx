"use client";
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  ShoppingBagIcon, 
  UsersIcon, 
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import defaultContants from '@/constants';

interface DashboardStats {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: any[];
  topProducts: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      
      const response = await fetch('/api/admin/dashboard', {});

      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    {
      name: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: ShoppingBagIcon,
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: UsersIcon,
      change: '+8%',
      changeType: 'increase'
    },
    {
      name: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: ClipboardDocumentListIcon,
      change: '+23%',
      changeType: 'increase'
    },
    {
      name: 'Total Revenue',
      value: `$${stats?.totalRevenue?.toFixed(2) || '0.00'}`,
      icon: CurrencyDollarIcon,
      change: '+15%',
      changeType: 'increase'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((item) => (
            <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <item.icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {item.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {item.value}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.changeType === 'increase' ? (
                            <ArrowTrendingUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowTrendingDownIcon className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                          )}
                          <span className="ml-1">{item.change}</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders & Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Recent Orders
              </h3>
              <div className="space-y-4">
                {stats?.recentOrders?.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        #{order.orderNumber}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ${order.total}
                      </p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                        order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'PROCESSING' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                )) || (
                  <p className="text-gray-500 text-center py-4">No recent orders</p>
                )}
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Top Products
              </h3>
              <div className="space-y-4">
                {stats?.topProducts?.slice(0, 5).map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 mr-3">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                         {defaultContants.RUPEE_SIGN}{product.price}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {product.orderCount || 0} sold
                      </p>
                    </div>
                  </div>
                )) || (
                  <p className="text-gray-500 text-center py-4">No product data</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}