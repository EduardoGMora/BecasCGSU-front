// src/config/emailjs.config.js
// Configuración de EmailJS para el envío de correos

/**
 * Configuración de EmailJS
 * Para obtener estos valores:
 * 1. Crea una cuenta en https://www.emailjs.com/
 * 2. Ve a Email Services y agrega un servicio (Gmail, Outlook, etc.)
 * 3. Ve a Email Templates y crea tus plantillas
 * 4. Copia el PUBLIC_KEY desde Account > API Keys
 */

// Exportación de constantes para uso directo
export const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
export const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
export const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT || 'template_contact';

/**
 * Valida si la configuración de EmailJS está completa
 */
export const isEmailJSConfigured = () => {
  return (
    EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' &&
    EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID' &&
    EMAILJS_CONFIG.PUBLIC_KEY &&
    EMAILJS_CONFIG.SERVICE_ID
  );
};

/**
 * Mensajes de error personalizados
 */
export const EMAIL_ERRORS = {
  NOT_CONFIGURED: 'EmailJS no está configurado correctamente',
  SEND_FAILED: 'Error al enviar el correo',
  INVALID_EMAIL: 'Correo electrónico inválido',
  REQUIRED_FIELDS: 'Por favor completa todos los campos requeridos',
  NETWORK_ERROR: 'Error de conexión, por favor intenta de nuevo'
};