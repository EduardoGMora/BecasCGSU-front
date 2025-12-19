/**
 * Validation utilities
 */

/**
 * Validates email format
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates if a string is not empty
 * @param {string} value
 * @returns {boolean}
 */
export const isNotEmpty = (value) => {
  return value && value.trim().length > 0;
};

/**
 * Validates password strength
 * @param {string} password
 * @returns {object} { isValid: boolean, message: string }
 */
export const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return {
      isValid: false,
      message: 'La contraseña debe tener al menos 8 caracteres',
    };
  }
  
  // Add more password rules as needed
  // const hasUpperCase = /[A-Z]/.test(password);
  // const hasLowerCase = /[a-z]/.test(password);
  // const hasNumber = /\d/.test(password);
  
  return {
    isValid: true,
    message: 'Contraseña válida',
  };
};

/**
 * Validates phone number format
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  // Mexican phone number: 10 digits
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
};

/**
 * Validates student code format
 * @param {string} code
 * @returns {boolean}
 */
export const isValidStudentCode = (code) => {
  // Typically 9 digits for UdeG
  const codeRegex = /^\d{9}$/;
  return codeRegex.test(code);
};

/**
 * Validates form data
 * @param {object} data - Form data object
 * @param {array} requiredFields - Array of required field names
 * @returns {object} { isValid: boolean, errors: object }
 */
export const validateForm = (data, requiredFields) => {
  const errors = {};
  
  requiredFields.forEach((field) => {
    if (!isNotEmpty(data[field])) {
      errors[field] = `${field} es requerido`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
