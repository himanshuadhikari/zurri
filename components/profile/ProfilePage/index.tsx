'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Edit, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  User, 
  Settings,
  Shield,
  Bell,
  Megaphone,
  Check,
  X
} from 'lucide-react';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  date_of_birth?: string | null;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say' | null;
  bio?: string | null;
  profileImage?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  country?: string | null;
  newsletter: boolean;
  notifications: boolean;
  marketing: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProfilePageProps {
  user: UserProfile | null;
}

export default function ProfilePage({ user }: ProfilePageProps) {
  const fullName = `${user?.firstName} ${user?.lastName}`;
  const memberSince = new Date(user?.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

  const formatGender = (gender?: string | null) => {
    if (!gender) return 'Not specified';
    return gender.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAddress = () => {
    const parts = [user?.street, user?.city, user?.state, user?.zipCode, user?.country].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'No address provided';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg mb-8">
        <div className="px-8 py-12 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-white/20 border-4 border-white/30">
                {user?.profileImage ? (
                  <img
                    src={user?.profileImage}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white/70" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{fullName}</h1>
                <p className="text-indigo-100 mb-1">{user?.email}</p>
                <p className="text-indigo-200 text-sm">Member since {memberSince}</p>
              </div>
            </div>
            <Link
              href="/profile/edit"
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 backdrop-blur-sm"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
                  <p className="text-gray-900">{user?.firstName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
                  <p className="text-gray-900">{user?.lastName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                  <p className="text-gray-900">{user?.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
                  <p className="text-gray-900">{formatDate(user?.date_of_birth)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
                  <p className="text-gray-900">{formatGender(user?.gender)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Role</label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {user?.role}
                  </span>
                </div>
              </div>
              {user?.bio && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Bio</label>
                  <p className="text-gray-900 leading-relaxed">{user?.bio}</p>
                </div>
              )}
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900">Address</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-900">{getAddress()}</p>
            </div>
          </div>

          {/* Communication Preferences */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900">Communication Preferences</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Newsletter</p>
                      <p className="text-sm text-gray-500">Weekly updates and special offers</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {user?.newsletter ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Check className="w-3 h-3 mr-1" />
                        Enabled
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        <X className="w-3 h-3 mr-1" />
                        Disabled
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Notifications</p>
                      <p className="text-sm text-gray-500">Order updates and account activity</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {user?.notifications ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Check className="w-3 h-3 mr-1" />
                        Enabled
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        <X className="w-3 h-3 mr-1" />
                        Disabled
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Megaphone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Marketing</p>
                      <p className="text-sm text-gray-500">Promotional emails and exclusive deals</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {user?.marketing ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Check className="w-3 h-3 mr-1" />
                        Enabled
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        <X className="w-3 h-3 mr-1" />
                        Disabled
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <Link
                href="/profile/edit"
                className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Edit className="w-5 h-5 text-gray-400" />
                <span>Edit Profile</span>
              </Link>
              <Link
                href="/orders"
                className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Calendar className="w-5 h-5 text-gray-400" />
                <span>Order History</span>
              </Link>
              <Link
                href="/settings"
                className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-400" />
                <span>Account Settings</span>
              </Link>
              <Link
                href="/security"
                className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Shield className="w-5 h-5 text-gray-400" />
                <span>Security</span>
              </Link>
            </div>
          </div>

          {/* Account Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Account Stats</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium text-gray-900">{memberSince}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Profile Completion</span>
                <span className="font-medium text-gray-900">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-medium text-gray-900">
                  {new Date(user?.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}