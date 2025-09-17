/**
 * Profile form validation constants
 */
export const PROGILE_VALIDATION_MESSAGES = {
  required: "This field is required",
  invalidEmail: "Please enter a valid email address",
  minLength: (min: number) => `Minimum length is ${min} characters`,
  maxLength: (max: number) => `Maximum length is ${max} characters`,
  passwordMismatch: "Passwords do not match",
};
