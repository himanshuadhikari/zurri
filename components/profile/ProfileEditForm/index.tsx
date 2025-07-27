'use client';

import React, { useState, useEffect } from 'react';
import { Save, X, AlertCircle, Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { ProfileFormData, validateProfile } from '@/lib/validations/profile';
import { UserProfile, updateProfile, deleteAccount } from '@/lib/api/profile';
import ProfileImageUpload from '../ProfileImageUpload';
import PersonalInfoForm from '../PersonalInfoForm';
import AddressForm from '../AddressForm';
import PreferencesForm from '../PreferencesForm';

interface ProfileEditFormProps {
  initialData: UserProfile;
}

export default function ProfileEditForm({ initialData }: ProfileEditFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    email: initialData.email,
    phone: initialData.phone || '',
    dateOfBirth: initialData.dateOfBirth || '',
    gender: initialData.gender,
    bio: initialData.bio || '',
    profileImage: initialData.profileImage || '',
    street: initialData.street || '',
    city: initialData.city || '',
    state: initialData.state || '',
    zipCode: initialData.zipCode || '',
    country: initialData.country || '',
    newsletter: initialData.newsletter,
    notifications: initialData.notifications,
    marketing: initialData.marketing,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check for changes
  useEffect(() => {
    const hasFormChanges = JSON.stringify(formData) !== JSON.stringify({
      firstName: initialData.firstName,
      lastName: initialData.lastName,
      email: initialData.email,
      phone: initialData.phone || '',
      dateOfBirth: initialData.dateOfBirth || '',
      gender: initialData.gender,
      bio: initialData.bio || '',
      profileImage: initialData.profileImage || '',
      street: initialData.street || '',
      city: initialData.city || '',
      state: initialData.state || '',
      zipCode: initialData.zipCode || '',
      country: initialData.country || '',
      newsletter: initialData.newsletter,
      notifications: initialData.notifications,
      marketing: initialData.marketing,
    });
    setHasChanges(hasFormChanges);
  }, [formData, initialData]);

  const handleFieldChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleImageChange = (imageUrl: string) => {
    handleFieldChange('profileImage', imageUrl);
  };

  const handleImageError = (error: string) => {
    toast.error(error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateProfile(formData);
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach(error => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      console.log(errorMap, formData);
      toast.error('Please fix the errors before submitting');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        toast.success('Profile updated successfully!');
        router.push('/profile');
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: initialData.firstName,
      lastName: initialData.lastName,
      email: initialData.email,
      phone: initialData.phone || '',
      dateOfBirth: initialData.dateOfBirth || '',
      gender: initialData.gender,
      bio: initialData.bio || '',
      profileImage: initialData.profileImage || '',
      street: initialData.street || '',
      city: initialData.city || '',
      state: initialData.state || '',
      zipCode: initialData.zipCode || '',
      country: initialData.country || '',
      newsletter: initialData.newsletter,
      notifications: initialData.notifications,
      marketing: initialData.marketing,
    });
    setErrors({});
    toast.success('Form reset to original values');
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteAccount();
      if (result.success) {
        toast.success('Account deleted successfully');
        router.push('/');
      } else {
        toast.error(result.error || 'Failed to delete account');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
            {hasChanges && (
              <div className="flex items-center space-x-2 text-amber-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">You have unsaved changes</span>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Profile Image */}
          <div className="flex justify-center">
            <ProfileImageUpload
              currentImage={formData.profileImage}
              onImageChange={handleImageChange}
              onError={handleImageError}
            />
          </div>

          {/* Personal Information */}
          <PersonalInfoForm
            formData={formData}
            errors={errors}
            onChange={handleFieldChange}
          />

          {/* Address Information */}
          <AddressForm
            formData={formData}
            errors={errors}
            onChange={handleFieldChange}
          />

          {/* Preferences */}
          <PreferencesForm
            formData={formData}
            onChange={handleFieldChange}
          />

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => router.push('/profile')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              
              <button
                type="button"
                onClick={handleReset}
                disabled={!hasChanges}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Reset
              </button>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Account</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !hasChanges}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Delete Account
              </h3>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
            </p>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Account</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}