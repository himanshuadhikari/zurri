import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, TruckIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';
import defaultContants from '@/constants';

interface OrderItem {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
}

interface Order {
    id: string;
    orderNumber: string;
    date: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    items: OrderItem[];
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    trackingNumber?: string;
}

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'>('all');

    // Mock data - replace with actual API call
    useEffect(() => {
        const fetchOrders = async () => {
            // Simulate API call
            setTimeout(() => {
                const mockOrders: Order[] = [
                    {
                        id: '1',
                        orderNumber: 'ORD-2024-001',
                        date: '2024-01-15',
                        status: 'delivered',
                        total: 129.99,
                        items: [
                            {
                                id: '1',
                                name: 'Classic Cotton T-Shirt',
                                image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=300',
                                price: 29.99,
                                quantity: 2,
                                size: 'M',
                                color: 'Navy Blue'
                            },
                            {
                                id: '2',
                                name: 'Denim Jeans',
                                image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=300',
                                price: 69.99,
                                quantity: 1,
                                size: '32',
                                color: 'Dark Blue'
                            }
                        ],
                        shippingAddress: {
                            street: '123 Main St',
                            city: 'New York',
                            state: 'NY',
                            zipCode: '10001',
                            country: 'USA'
                        },
                        trackingNumber: 'TRK123456789'
                    },
                    {
                        id: '2',
                        orderNumber: 'ORD-2024-002',
                        date: '2024-01-20',
                        status: 'shipped',
                        total: 89.99,
                        items: [
                            {
                                id: '3',
                                name: 'Casual Hoodie',
                                image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=300',
                                price: 89.99,
                                quantity: 1,
                                size: 'L',
                                color: 'Gray'
                            }
                        ],
                        shippingAddress: {
                            street: '123 Main St',
                            city: 'New York',
                            state: 'NY',
                            zipCode: '10001',
                            country: 'USA'
                        },
                        trackingNumber: 'TRK987654321'
                    },
                    {
                        id: '3',
                        orderNumber: 'ORD-2024-003',
                        date: '2024-01-25',
                        status: 'processing',
                        total: 159.99,
                        items: [
                            {
                                id: '4',
                                name: 'Winter Jacket',
                                image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=300',
                                price: 159.99,
                                quantity: 1,
                                size: 'M',
                                color: 'Black'
                            }
                        ],
                        shippingAddress: {
                            street: '123 Main St',
                            city: 'New York',
                            state: 'NY',
                            zipCode: '10001',
                            country: 'USA'
                        }
                    }
                ];
                setOrders(mockOrders);
                setLoading(false);
            }, 1000);
        };

        fetchOrders();
    }, []);

    const getStatusIcon = (status: Order['status']) => {
        switch (status) {
            case 'pending':
                return <ClockIcon className="h-5 w-5 text-yellow-500" />;
            case 'processing':
                return <ClockIcon className="h-5 w-5 text-blue-500" />;
            case 'shipped':
                return <TruckIcon className="h-5 w-5 text-purple-500" />;
            case 'delivered':
                return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
            case 'cancelled':
                return <XCircleIcon className="h-5 w-5 text-red-500" />;
            default:
                return <ClockIcon className="h-5 w-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.status === filter);

    const toggleOrderExpansion = (orderId: string) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Order History</h2>

                    {/* Filter Dropdown */}
                    <div className="relative">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as typeof filter)}
                            className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All Orders</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <ChevronDownIcon className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                        <p className="text-gray-500">
                            {filter === 'all' ? "You haven't placed any orders yet." : `No ${filter} orders found.`}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredOrders.map((order) => (
                            <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                                {/* Order Header */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
                                                <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {getStatusIcon(order.status)}
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-right">
                                                <p className="text-lg font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                                                <p className="text-sm text-gray-500">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                                            </div>
                                            <button
                                                onClick={() => toggleOrderExpansion(order.id)}
                                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                            >
                                                {expandedOrder === order.id ? (
                                                    <ChevronUpIcon className="h-5 w-5" />
                                                ) : (
                                                    <ChevronDownIcon className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Tracking Number */}
                                    {order.trackingNumber && (
                                        <div className="mt-4 p-3 bg-blue-50 rounded-md">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <TruckIcon className="h-4 w-4 text-blue-600" />
                                                    <span className="text-sm font-medium text-blue-900">Tracking Number:</span>
                                                </div>
                                                <span className="text-sm font-mono text-blue-700">{order.trackingNumber}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Expanded Order Details */}
                                {expandedOrder === order.id && (
                                    <div className="border-t border-gray-200 bg-gray-50">
                                        <div className="p-6 space-y-6">
                                            {/* Order Items */}
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900 mb-4">Items Ordered</h4>
                                                <div className="space-y-4">
                                                    {order.items.map((item) => (
                                                        <div key={item.id} className="flex items-center space-x-4">
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="h-16 w-16 object-cover rounded-md"
                                                            />
                                                            <div className="flex-1">
                                                                <h5 className="text-sm font-medium text-gray-900">{item.name}</h5>
                                                                <div className="flex items-center space-x-4 mt-1">
                                                                    {item.size && (
                                                                        <span className="text-xs text-gray-500">Size: {item.size}</span>
                                                                    )}
                                                                    {item.color && (
                                                                        <span className="text-xs text-gray-500">Color: {item.color}</span>
                                                                    )}
                                                                    <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                                                                </div>
                                                            </div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {defaultContants.RUPEE_SIGN}{item.price.toFixed(2)}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Shipping Address */}
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping Address</h4>
                                                <div className="text-sm text-gray-600">
                                                    <p>{order.shippingAddress.street}</p>
                                                    <p>
                                                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                                                    </p>
                                                    <p>{order.shippingAddress.country}</p>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                {order.status === 'delivered' && (
                                                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200">
                                                        Reorder Items
                                                    </button>
                                                )}
                                                {(order.status === 'shipped' || order.status === 'delivered') && order.trackingNumber && (
                                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors duration-200">
                                                        Track Package
                                                    </button>
                                                )}
                                                {order.status === 'delivered' && (
                                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors duration-200">
                                                        Return Items
                                                    </button>
                                                )}
                                                {order.status === 'pending' && (
                                                    <button className="px-4 py-2 border border-red-300 text-red-700 text-sm font-medium rounded-md hover:bg-red-50 transition-colors duration-200">
                                                        Cancel Order
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;