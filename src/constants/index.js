/**
 * Application constants
 */

export const APP_NAME = 'Portal de Becas CGSU';

export const ROUTES = {
  HOME: '/',
  SCHOLARSHIPS: '/becas',
  APPLICATIONS: '/mis-solicitudes',
  CONTACT: '/contacto',
  ADMIN: '/admin',
  SUB_ADMIN: '/subadmin',
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
};

export const USER_ROLES = {
  STUDENT: 'student',
  ADMIN: 'admin',
  SUB_ADMIN: 'subadmin',
};

export const SCHOLARSHIP_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
};

export const APPLICATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  IN_REVIEW: 'in_review',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión, por favor intenta de nuevo',
  INVALID_CREDENTIALS: 'Credenciales inválidas',
  UNAUTHORIZED: 'No tienes permiso para acceder a esta página',
  SERVER_ERROR: 'Error del servidor, por favor intenta más tarde',
  REQUIRED_FIELDS: 'Por favor completa todos los campos requeridos',
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Inicio de sesión exitoso',
  APPLICATION_SUBMITTED: 'Solicitud enviada correctamente',
  MESSAGE_SENT: 'Mensaje enviado correctamente',
};
