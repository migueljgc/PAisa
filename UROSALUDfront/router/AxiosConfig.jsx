// src/axiosConfig.js
import axios from 'axios';

// Configurar la URL base si es necesario
axios.defaults.baseURL = 'http://localhost:8080'; // Ajusta esto según tu configuración

// Interceptor de solicitudes para agregar el token JWT
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;