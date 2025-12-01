import { authApi } from './api';

const userService = {
    
    /**
     * Obtener todos los usuarios (solo ADMIN)
     */
    getAllUsers: async () => {
        try {
            const response = await authApi.get('/admin/users');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error al cargar usuarios' };
        }
    },
    
    /**
     * Obtener un usuario por ID (solo ADMIN)
     */
    getUserById: async (id) => {
        try {
            const response = await authApi.get(`/admin/users/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Usuario no encontrado' };
        }
    },
    
    /**
     * Actualizar usuario (solo ADMIN)
     */
    updateUser: async (id, userData) => {
        try {
            const response = await authApi.put(`/admin/users/${id}`, {
                nombre: userData.nombre,
                apellido: userData.apellido,
                telefono: userData.telefono
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error al actualizar usuario' };
        }
    },
    
    /**
     * Eliminar usuario (solo ADMIN)
     */
    deleteUser: async (id) => {
        try {
            const response = await authApi.delete(`/admin/users/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error al eliminar usuario' };
        }
    }
};

export default userService;