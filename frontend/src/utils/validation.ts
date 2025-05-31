import { FormData } from '@/types';

export const validatePhoneNumber = (phone: string): boolean => {
  // Ugandan phone number format: +256 7XX XXX XXX
  const phoneRegex = /^\+256\s?[7]\d{2}\s?\d{3}\s?\d{3}$/;
  return phoneRegex.test(phone);
};

export const validateForm = (formData: FormData): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhoneNumber(formData.phone)) {
    errors.phone = 'Invalid phone number format. Use format: +256 7XX XXX XXX';
  }

  if (!formData.district) {
    errors.district = 'District is required';
  }

  if (!formData.crop) {
    errors.crop = 'Primary crop is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Format as +256 7XX XXX XXX
  if (digits.length === 12) {
    return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
  }
  return phone;
}; 