// src/config/emailjs.config.js
// Configuración de EmailJS para el envío de correos
import { ENV, isEmailJSConfigured } from '../constants/env';

/**
 * Configuración de EmailJS
 * Para obtener estos valores:
 * 1. Crea una cuenta en https://www.emailjs.com/
 * 2. Ve a Email Services y agrega un servicio (Gmail, Outlook, etc.)
 * 3. Ve a Email Templates y crea tus plantillas
 * 4. Copia el PUBLIC_KEY desde Account > API Keys
 */

// Exportación de constantes para uso directo
export const EMAILJS_PUBLIC_KEY = ENV.EMAILJS.PUBLIC_KEY;
export const EMAILJS_SERVICE_ID = ENV.EMAILJS.SERVICE_ID;
export const EMAILJS_TEMPLATE_ID = ENV.EMAILJS.TEMPLATE_CONTACT;

// Re-export validation function
export { isEmailJSConfigured };

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