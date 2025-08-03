'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    CreditCard,
    Truck,
    MapPin,
    User,
    Mail,
    Phone,
    ShoppingBag,
    Lock,
    ArrowLeft,
    Check
} from 'lucide-react';

interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

interface Address {
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

interface CustomerInfo {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
}

export default function CheckoutPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Form states
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        email: '',
        firstName: '',
        lastName: '',
        phone: ''
    });

    const [shippingAddress, setShippingAddress] = useState<Address>({
        firstName: '',
        lastName: '',
        company: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US'
    });

    const [billingAddress, setBillingAddress] = useState<Address>({
        firstName: '',
        lastName: '',
        company: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US'
    });

    const [sameAsShipping, setSameAsShipping] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [orderNotes, setOrderNotes] = useState('');

    // Load cart items (in real app, this would come from context/state management)
    useEffect(() => {
        // Mock cart data - replace with actual cart logic
        const mockCart: CartItem[] = [
            {
                id: '1',
                productId: 'prod1',
                name: 'Premium Wireless Headphones',
                price: 16599, // ₹16,599
                quantity: 1,
                image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300'
            },
            {
                id: '2',
                productId: 'prod2',
                name: 'Smart Watch Series 5',
                price: 24999, // ₹24,999
                quantity: 2,
                image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300'
            }
        ];
        setCartItems(mockCart);
    }, []);

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = subtotal > 500 ? 0 : 50; // Free shipping over ₹500, otherwise ₹50
    const tax = subtotal * 0.08;
    const total = subtotal + shippingCost + tax;

    const handleSubmitOrder = async () => {
        setLoading(true);
        try {
            const orderData = {
                items: cartItems.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity
                })),
                customerInfo,
                shippingAddress,
                billingAddress: sameAsShipping ? shippingAddress : billingAddress,
                paymentMethod,
                orderNotes
            };

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();

            if (result.success) {
                // Redirect to success page
                router.push(`/order-confirmation?orderId=${result.order.id}`);
            } else {
                alert(result.error || 'Failed to place order');
            }
        } catch (error) {
            console.error('Order submission error:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const validateStep = (step: number) => {
        switch (step) {
            case 1:
                return customerInfo.email && customerInfo.firstName && customerInfo.lastName && customerInfo.phone;
            case 2:
                return shippingAddress.firstName && shippingAddress.lastName &&
                    shippingAddress.address1 && shippingAddress.city &&
                    shippingAddress.state && shippingAddress.zipCode;
            case 3:
                return paymentMethod;
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 4));
        } else {
            alert('Please fill in all required fields');
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Cart
                        </button>
                        <div className="w-20"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Progress Steps */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between">
                                {[1, 2, 3, 4].map((step) => (
                                    <div key={step} className="flex items-center">
                                        <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                      ${currentStep >= step
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-600'
                                            }
                    `}>
                                            {currentStep > step ? <Check className="w-5 h-5" /> : step}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-2 text-sm text-gray-600">
                                <span>Contact</span>
                                <span>Shipping</span>
                                <span>Payment</span>
                                <span>Review</span>
                            </div>
                        </div>

                        {/* Step Content */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            {/* Step 1: Contact Information */}
                            {currentStep === 1 && (
                                <div>
                                    <div className="flex items-center mb-6">
                                        <User className="w-6 h-6 text-blue-600 mr-3" />
                                        <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                First Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={customerInfo.firstName}
                                                onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="John"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Last Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={customerInfo.lastName}
                                                onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Doe"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                value={customerInfo.email}
                                                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                value={customerInfo.phone}
                                                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Shipping Address */}
                            {currentStep === 2 && (
                                <div>
                                    <div className="flex items-center mb-6">
                                        <Truck className="w-6 h-6 text-blue-600 mr-3" />
                                        <h2 className="text-xl font-semibold text-gray-900">Shipping Address</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                First Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={shippingAddress.firstName}
                                                onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Last Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={shippingAddress.lastName}
                                                onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Company (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                value={shippingAddress.company}
                                                onChange={(e) => setShippingAddress({ ...shippingAddress, company: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Address Line 1 *
                                            </label>
                                            <input
                                                type="text"
                                                value={shippingAddress.address1}
                                                onChange={(e) => setShippingAddress({ ...shippingAddress, address1: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="123 Main Street"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Address Line 2 (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                value={shippingAddress.address2}
                                                onChange={(e) => setShippingAddress({ ...shippingAddress, address2: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Apartment, suite, etc."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                value={shippingAddress.city}
                                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                State *
                                            </label>
                                            <input
                                                type="text"
                                                value={shippingAddress.state}
                                                onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                ZIP Code *
                                            </label>
                                            <input
                                                type="text"
                                                value={shippingAddress.zipCode}
                                                onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Country *
                                            </label>
                                            <select
                                                value={shippingAddress.country}
                                                onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="IN">India</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Payment */}
                            {currentStep === 3 && (
                                <div>
                                    <div className="flex items-center mb-6">
                                        <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
                                        <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="border border-gray-300 rounded-lg p-4">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value="card"
                                                    checked={paymentMethod === 'card'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    className="mr-3"
                                                />
                                                <CreditCard className="w-5 h-5 mr-2" />
                                                Credit/Debit Card
                                            </label>
                                        </div>

                                        <div className="border border-gray-300 rounded-lg p-4">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value="paypal"
                                                    checked={paymentMethod === 'paypal'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    className="mr-3"
                                                />
                                                <div className="w-5 h-5 mr-2 bg-blue-600 rounded"></div>
                                                PayPal
                                            </label>
                                        </div>

                                        <div className="border border-gray-300 rounded-lg p-4">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value="cod"
                                                    checked={paymentMethod === 'cod'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    className="mr-3"
                                                />
                                                <Truck className="w-5 h-5 mr-2" />
                                                Cash on Delivery
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={sameAsShipping}
                                                onChange={(e) => setSameAsShipping(e.target.checked)}
                                                className="mr-3"
                                            />
                                            Billing address same as shipping address
                                        </label>
                                    </div>

                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Order Notes (Optional)
                                        </label>
                                        <textarea
                                            value={orderNotes}
                                            onChange={(e) => setOrderNotes(e.target.value)}
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Special instructions for your order..."
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Review */}
                            {currentStep === 4 && (
                                <div>
                                    <div className="flex items-center mb-6">
                                        <Check className="w-6 h-6 text-blue-600 mr-3" />
                                        <h2 className="text-xl font-semibold text-gray-900">Review Your Order</h2>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                                            <p className="text-gray-600">
                                                {customerInfo.firstName} {customerInfo.lastName}<br />
                                                {customerInfo.email}<br />
                                                {customerInfo.phone}
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                                            <p className="text-gray-600">
                                                {shippingAddress.firstName} {shippingAddress.lastName}<br />
                                                {shippingAddress.company && `${shippingAddress.company}\n`}
                                                {shippingAddress.address1}<br />
                                                {shippingAddress.address2 && `${shippingAddress.address2}\n`}
                                                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}<br />
                                                {shippingAddress.country}
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                                            <p className="text-gray-600 capitalize">{paymentMethod}</p>
                                        </div>

                                        {orderNotes && (
                                            <div>
                                                <h3 className="font-medium text-gray-900 mb-2">Order Notes</h3>
                                                <p className="text-gray-600">{orderNotes}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8 pt-6 border-t">
                                <button
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>

                                {currentStep < 4 ? (
                                    <button
                                        onClick={nextStep}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Continue
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmitOrder}
                                        disabled={loading}
                                        className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Lock className="w-4 h-4 mr-2" />
                                                Place Order
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                            <div className="flex items-center mb-6">
                                <ShoppingBag className="w-6 h-6 text-blue-600 mr-3" />
                                <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
                            </div>

                            {/* Cart Items */}
                            <div className="space-y-4 mb-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <ShoppingBag className="w-6 h-6 text-gray-400" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-sm font-medium text-gray-900">
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Totals */}
                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-gray-900">
                                        {shippingCost === 0 ? 'Free' : `₹${shippingCost.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="text-gray-900">₹{tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                                    <span className="text-gray-900">Total</span>
                                    <span className="text-gray-900">₹{total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Security Badge */}
                            <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Lock className="w-4 h-4 mr-2" />
                                    Your payment information is secure and encrypted
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}