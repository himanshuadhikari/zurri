'use client';

import React from 'react';
import { User, Mail, Phone, Calendar, Users } from 'lucide-react';

interface PersonalInfoFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    date_of_birth?: string;
    gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
    bio?: string;
  };
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export default function PersonalInfoForm({
  formData,
  errors,
  onChange
}: PersonalInfoFormProps) {
  const genderOptions = [
    { value: '', label: 'Select gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <User className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.firstName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.lastName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          <div className="flex items-center space-x-1">
            <Mail className="w-4 h-4" />
            <span>Email Address *</span>
          </div>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.email ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Enter your email address"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>Phone Number</span>
            </div>
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone || ''}
            onChange={(e) => onChange('phone', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.phone ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Date of Birth</span>
            </div>
          </label>
          <input
            type="date"
            id="date_of_birth"
            value={formData.date_of_birth || ''}
            onChange={(e) => onChange('date_of_birth', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.date_of_birth ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.date_of_birth && (
            <p className="mt-1 text-sm text-red-600">{errors.date_of_birth}</p>
          )}
        </div>
      </div>

      {/* Gender */}
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>Gender</span>
          </div>
        </label>
        
        <select
          id="gender"
          value={formData.gender || ''}
          onChange={(e) => onChange('gender', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.gender ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          {genderOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
        )}
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
          Bio
        </label>
        <textarea
          id="bio"
          rows={4}
          value={formData.bio || ''}
          onChange={(e) => onChange('bio', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none ${
            errors.bio ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Tell us a little about yourself..."
          maxLength={500}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.bio && (
            <p className="text-sm text-red-600">{errors.bio}</p>
          )}
          <p className="text-sm text-gray-500 ml-auto">
            {(formData.bio || '').length}/500 characters
          </p>
        </div>
      </div>
    </div>
  );
}