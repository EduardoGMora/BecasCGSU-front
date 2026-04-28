import axios from 'axios';
import { ENV } from '../constants/env';

const baseURL =
    ENV.IS_DEVELOPMENT &&
    /^https?:\/\/(localhost|127\.0\.0\.1):8000\/?$/i.test(ENV.API_URL)
        ? '/api'
        : ENV.API_URL;

// Creamos una instancia base
const api = axios.create({
    baseURL,
    timeout: ENV.API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor para agregar token de autenticación si existe
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado o inválido
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;