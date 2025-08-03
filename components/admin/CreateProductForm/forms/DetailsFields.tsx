'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface DetailsFieldsProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: any;
}

// Corset-specific standard values
const STANDARD_VALUES = {
  length: [
    'Underbust',
    'Overbust',
    'Longline',
    'Waist cincher'
  ],
  fit: [
    'Light support',
    'Medium support',
    'Firm support',
    'Extreme waist training',
    'Fashion/costume'
  ],
  neckline: [
    'Sweetheart',
    'Straight across',
    'Plunge',
    'Halter',
    'Off-shoulder',
    'High neck'
  ],
  style: [
    'Waist training',
    'Fashion/everyday',
    'Bridal/wedding',
    'Gothic/alternative',
    'Steampunk',
    'Victorian/historical',
    'Burlesque/lingerie',
    'Plus size'
  ],
  closureType: [
    'Back lacing',
    'Front busk + back lacing',
    'Side zip',
    'Hook and eye'
  ],
  boningType: [
    'Steel boned',
    'Plastic boned',
    'Spiral steel',
    'Flat steel'
  ],
  waistReduction: [
    '2-4 inches',
    '4-6 inches',
    '6-8 inches',
    '8+ inches'
  ],
  sizingType: [
    'Standard',
    'Curvy',
    'Long torso',
    'Short torso'
  ]
};

export default function DetailsFields({ formData, setFormData, errors }: DetailsFieldsProps) {

  const [customValues, setCustomValues] = useState<{ [key: string]: string[] }>({});
  const [showCustomInput, setShowCustomInput] = useState<{ [key: string]: boolean }>({});

  const handleDetailChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        [field]: value
      }
    });
  };

  const handleTextDetailChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        [field]: value
      }
    });
  };

  const addCustomValue = (field: string, customValue: string) => {
    if (customValue.trim() && !STANDARD_VALUES[field as keyof typeof STANDARD_VALUES]?.includes(customValue)) {
      setCustomValues(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), customValue.trim()]
      }));
      handleDetailChange(field, customValue.trim());
      setShowCustomInput(prev => ({ ...prev, [field]: false }));
    }
  };

  const removeCustomValue = (field: string, valueToRemove: string) => {
    setCustomValues(prev => ({
      ...prev,
      [field]: prev[field]?.filter(val => val !== valueToRemove) || []
    }));
  };

  const getAllOptions = (field: string) => {
    const standardOptions = STANDARD_VALUES[field as keyof typeof STANDARD_VALUES] || [];
    const customOptions = customValues[field] || [];
    return [...standardOptions, ...customOptions];
  };

  const DropdownField = ({
    field,
    label,
    placeholder
  }: {
    field: string;
    label: string;
    placeholder: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="space-y-2">
        <select
          value={formData.details?.[field] || ''}
          onChange={(e) => handleDetailChange(field, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">{placeholder}</option>
          {getAllOptions(field).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
  
        {/* Custom value input */}
        {showCustomInput[field] ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.details?.[field] || ""}
              placeholder={`Add custom ${label.toLowerCase()}`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCustomValue(field, e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
            <button
              type="button"
              onClick={() => setShowCustomInput(prev => ({ ...prev, [field]: false }))}
              className="px-3 py-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowCustomInput(prev => ({ ...prev, [field]: true }))}
            className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="w-4 h-4" />
            Add custom {label.toLowerCase()}
          </button>
        )}

        {/* Show custom values */}
        {customValues[field] && customValues[field].length > 0 && (
          <div className="flex flex-wrap gap-1">
            {customValues[field].map((value) => (
              <span
                key={value}
                className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
              >
                {value}
                <button
                  type="button"
                  onClick={() => removeCustomValue(field, value)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      {errors?.details?.[field] && (
        <p className="text-sm text-red-600">{errors.details[field]}</p>
      )}
    </div>
  );

  const TextInputField = ({
    field,
    label,
    placeholder
  }: {
    field: string;
    label: string;
    placeholder: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        value={formData.details?.[field] || ''}
        onChange={(e) => handleTextDetailChange(field, e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      {errors?.details?.[field] && (
        <p className="text-sm text-red-600">{errors.details[field]}</p>
      )}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dropdown Fields */}
        <DropdownField
          field="length"
          label="Length"
          placeholder="Select corset length"
        />

        <DropdownField
          field="fit"
          label="Fit/Support Level"
          placeholder="Select support level"
        />

        <DropdownField
          field="neckline"
          label="Neckline"
          placeholder="Select neckline style"
        />

        <DropdownField
          field="style"
          label="Style Category"
          placeholder="Select style category"
        />

        <DropdownField
          field="closureType"
          label="Closure Type"
          placeholder="Select closure type"
        />

        <DropdownField
          field="boningType"
          label="Boning Type"
          placeholder="Select boning type"
        />

        <DropdownField
          field="waistReduction"
          label="Waist Reduction"
          placeholder="Select waist reduction"
        />

        <DropdownField
          field="sizingType"
          label="Sizing Type"
          placeholder="Select sizing type"
        />

        {/* Text Input Fields */}
        <TextInputField
          field="fabric"
          label="Fabric"
          placeholder="e.g., Satin, Brocade, Cotton coutil"
        />

        <TextInputField
          field="pattern"
          label="Pattern/Color"
          placeholder="e.g., Black with red trim, Floral brocade"
        />

        <TextInputField
          field="straps"
          label="Straps/Details"
          placeholder="e.g., Detachable straps, Ribbon lacing"
        />

        <TextInputField
          field="hemline"
          label="Hemline/Edge"
          placeholder="e.g., Scalloped edge, Straight hem"
        />
      </div>
    </div>
  );
}