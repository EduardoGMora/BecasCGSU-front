/**
 * Formatting utilities
 */

/**
 * Formats currency to Mexican Peso format
 * @param {number} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount);
};

/**
 * Formats date to local string
 * @param {Date|string} date
 * @returns {string}
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
};

/**
 * Formats date to short format
 * @param {Date|string} date
 * @returns {string}
 */
export const formatDateShort = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj);
};

/**
 * Formats phone number
 * @param {string} phone
 * @returns {string}
 */
export const formatPhone = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
};

/**
 * Truncates text to specified length
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Capitalizes first letter of each word
 * @param {string} text
 * @returns {string}
 */
export const capitalizeWords = (text) => {
  if (!text) return '';
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
