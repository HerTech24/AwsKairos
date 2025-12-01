import { authApi } from './api';

const authService = {
    
    /**
     * Registrar nuevo usuario
     */
    register: async (userData) => {
        try {
            const response = await authApi.post('/auth/register', {
                nombre: userData.nombre,
                apellido: userData.apellido,
                email: userData.email,
                telefono: userData.telefono,
                password: userData.password
            });
            
            // Guardar tokens en localStorage
            if (response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                localStorage.setItem('userEmail', response.data.email);
                localStorage.setItem('userRole', response.data.role);
            }
            
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error en el registro' };
        }
    },
    
    /**
     * Login con credenciales locales
     */
    login: async (email, password) => {
        try {
            const response = await authApi.post('/auth/login', {
                email,
                password
            });
            
            // Guardar tokens
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('userEmail', response.data.email);
            localStorage.setItem('userName', response.data.nombre);
            localStorage.setItem('userRole', response.data.role);
            
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Credenciales inválidas' };
        }
    },
    
    /**
     * Login con Auth0
     */
    loginWithAuth0: async (idToken) => {
        try {
            const response = await authApi.post('/auth/auth0', {
                idToken
            });
            
            // Guardar tokens
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('userEmail', response.data.email);
            localStorage.setItem('userName', response.data.nombre);
            localStorage.setItem('userRole', response.data.role);
            
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error en autenticación social' };
        }
    },
    
    /**
     * Obtener perfil del usuario actual
     */
    getProfile: async () => {
        try {
            const response = await authApi.get('/auth/me');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error al obtener perfil' };
        }
    },
    
    /**
     * Renovar access token
     */
    refreshToken: async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            
            if (!refreshToken) {
                throw new Error('No hay refresh token');
            }
            
            const response = await authApi.post('/auth/refresh-token', {
                refreshToken
            });
            
            // Actualizar access token
            localStorage.setItem('accessToken', response.data.accessToken);
            
            return response.data;
        } catch (error) {
            // Si falla, cerrar sesión
            authService.logout();
            throw error;
        }
    },
    
    /**
     * Cerrar sesión
     */
    logout: async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            
            if (refreshToken) {
                await authApi.post('/auth/logout', { refreshToken });
            }
        } catch (error) {
            console.error('Error en logout:', error);
        } finally {
            // Limpiar localStorage independientemente del resultado
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            localStorage.removeItem('userRole');
        }
    },
    
    /**
     * Verificar si hay sesión activa
     */
    isAuthenticated: () => {
        return !!localStorage.getItem('accessToken');
    },
    
    /**
     * Obtener rol del usuario actual
     */
    getUserRole: () => {
        return localStorage.getItem('userRole');
    },
    
    /**
     * Verificar si el usuario es administrador
     */
    isAdmin: () => {
        return localStorage.getItem('userRole') === 'ADMIN';
    }
};

export default authService;