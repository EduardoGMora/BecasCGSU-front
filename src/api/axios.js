import axios from 'axios';

// Creamos una instancia base
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    timeout: Number(import.meta.env.VITE_TIMEOUT) || 10000, // 10 segundos
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;