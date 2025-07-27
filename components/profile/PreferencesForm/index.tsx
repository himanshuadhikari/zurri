'use client';

import React from 'react';
import { Settings, Mail, Bell, Megaphone } from 'lucide-react';

interface PreferencesFormProps {
  formData: {
    newsletter: boolean;
    notifications: boolean;
    marketing: boolean;
  };
  onChange: (field: string, value: boolean) => void;
}

export default function PreferencesForm({
  formData,
  onChange
}: PreferencesFormProps) {
  const preferences = [
    {
      key: 'newsletter',
      icon: Mail,
      title: 'Newsletter Subscription',
      description: 'Receive our weekly newsletter with updates and special offers',
      value: formData.newsletter
    },
    {
      key: 'notifications',
      icon: Bell,
      title: 'Push Notifications',
      description: 'Get notified about order updates, new products, and account activity',
      value: formData.notifications
    },
    {
      key: 'marketing',
      icon: Megaphone,
      title: 'Marketing Communications',
      description: 'Receive promotional emails about sales, new products, and exclusive deals',
      value: formData.marketing
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Settings className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-medium text-gray-900">Communication Preferences</h3>
      </div>

      <div className="space-y-4">
        {preferences.map((preference) => {
          const IconComponent = preference.icon;
          return (
            <div
              key={preference.key}
              className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">
                <IconComponent className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {preference.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {preference.description}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0 ml-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preference.value}
                        onChange={(e) => onChange(preference.key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900">
              Privacy Notice
            </h4>
            <p className="text-sm text-blue-700 mt-1">
              You can change these preferences at any time. We respect your privacy and will never share your information with third parties without your consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}