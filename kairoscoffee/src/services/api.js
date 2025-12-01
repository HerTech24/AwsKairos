import axios from 'axios';

// URL base de los microservicios
const AUTH_API_URL = 'http://localhost:8080';
const PRODUCT_API_URL = 'http://localhost:8081';

// Instancia de Axios para servicio de autenticación
export const authApi = axios.create({
    baseURL: AUTH_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Instancia de Axios para servicio de productos
export const productApi = axios.create({
    baseURL: PRODUCT_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para agregar token automáticamente en cada petición
const addAuthInterceptor = (apiInstance) => {
    apiInstance.interceptors.request.use(
        (config) => {
            // Obtener token del localStorage
            const token = localStorage.getItem('accessToken');
            
            if (token) {
                // Agregar header Authorization
                config.headers.Authorization = `Bearer ${token}`;
            }
            
            console.log(`📤 Request: ${config.method.toUpperCase()} ${config.url}`);
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

// Interceptor para manejar respuestas y errores
const addResponseInterceptor = (apiInstance) => {
    apiInstance.interceptors.response.use(
        (response) => {
            console.log(`✅ Response: ${response.status} ${response.config.url}`);
            return response;
        },
        (error) => {
            console.error(`❌ Error: ${error.response?.status} ${error.config?.url}`);
            
            // Si el token expiró (401), redirigir a login
            if (error.response?.status === 401) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
            
            return Promise.reject(error);
        }
    );
};

// Aplicar interceptores a ambas instancias
addAuthInterceptor(authApi);
addAuthInterceptor(productApi);
addResponseInterceptor(authApi);
addResponseInterceptor(productApi);

export default { authApi, productApi };