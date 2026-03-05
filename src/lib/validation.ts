/**
 * South African phone number validation
 * Valid formats: 0XXXXXXXXX (10 digits) or +27XXXXXXXXX (12 chars)
 */
export const isValidSAPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\s/g, "");
  return /^0\d{9}$/.test(cleaned) || /^\+27\d{9}$/.test(cleaned);
};

/**
 * Email validation - must contain @ and valid domain
 */
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
};

export const SA_PHONE_ERROR = "Please enter a valid South African mobile number.";
export const EMAIL_ERROR = "Please enter a valid email address.";
