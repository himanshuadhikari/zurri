import { z } from 'zod';

export const profileSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  
  phone: z.string()
    .optional()
    .refine((val) => !val || /^\+?[\d\s\-\(\)]+$/.test(val), {
      message: 'Please enter a valid phone number'
    }),
  
  dateOfBirth: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const date = new Date(val);
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      return age >= 13 && age <= 120;
    }, {
      message: 'You must be between 13 and 120 years old'
    }),
  
  gender: z.enum(['male', 'female', 'other', 'prefer-not-to-say']).optional(),
  
  bio: z.string()
    .max(500, 'Bio must be less than 500 characters')
    .optional(),
  
  // profileImage: z.string().url().optional(),
  
  // Address fields
  street: z.string().max(100, 'Street address must be less than 100 characters').optional(),
  city: z.string().max(50, 'City must be less than 50 characters').optional(),
  state: z.string().max(50, 'State must be less than 50 characters').optional(),
  zipCode: z.string().max(20, 'ZIP code must be less than 20 characters').optional(),
  country: z.string().max(50, 'Country must be less than 50 characters').optional(),
  
  // Preferences
  newsletter: z.boolean().default(false),
  notifications: z.boolean().default(true),
  marketing: z.boolean().default(false),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export interface ValidationError {
  field: string;
  message: string;
}

export const validateProfile = (data: Partial<ProfileFormData>): ValidationError[] => {
  try {
    profileSchema.parse(data);
    return [];
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
    }
    return [{ field: 'general', message: 'Validation failed' }];
  }
};

export const validateImageFile = (file: File): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    errors.push({
      field: 'profileImage',
      message: 'Please upload a valid image file (JPEG, PNG, or WebP)'
    });
  }
  
  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    errors.push({
      field: 'profileImage',
      message: 'Image size must be less than 5MB'
    });
  }
  
  return errors;
};