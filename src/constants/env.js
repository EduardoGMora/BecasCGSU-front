/**
 * Environment configuration
 * Centralized access to environment variables
 */

export const ENV = {
  // API Configuration
  API_URL:
    import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === 'development' ? '/api' : 'http://localhost:8000'),
  API_TIMEOUT: parseInt(import.meta.env.VITE_TIMEOUT, 10) || 10000,
  
  // EmailJS Configuration
  EMAILJS: {
    PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
    SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    TEMPLATE_CONTACT: import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT || '',
    TEMPLATE_APP: import.meta.env.VITE_EMAILJS_TEMPLATE_APP || '',
  },
  
  // Environment
  MODE: import.meta.env.MODE,
  IS_DEVELOPMENT: import.meta.env.MODE === 'development',
  IS_PRODUCTION: import.meta.env.MODE === 'production',
};

/**
 * Validates if EmailJS is properly configured
 * @returns {boolean}
 */
export const isEmailJSConfigured = () => {
  return Boolean(
    ENV.EMAILJS.PUBLIC_KEY &&
    ENV.EMAILJS.SERVICE_ID &&
    ENV.EMAILJS.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' &&
    ENV.EMAILJS.SERVICE_ID !== 'YOUR_SERVICE_ID'
  );
};
