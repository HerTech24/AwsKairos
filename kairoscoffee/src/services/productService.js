import { productApi } from './api';

const productService = {
    
    /**
     * Obtener todos los productos (público)
     */
    getAllProducts: async () => {
        try {
            const response = await productApi.get('/product/public');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error al cargar productos' };
        }
    },
    
    /**
     * Obtener un producto por ID (público)
     */
    getProductById: async (id) => {
        try {
            const response = await productApi.get(`/product/public/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Producto no encontrado' };
        }
    },
    
    /**
     * Buscar productos con filtros (requiere autenticación)
     */
    searchProducts: async (filters) => {
        try {
            const params = new URLSearchParams();
            
            if (filters.nombre) params.append('nombre', filters.nombre);
            if (filters.precioMin) params.append('precioMin', filters.precioMin);
            if (filters.precioMax) params.append('precioMax', filters.precioMax);
            if (filters.idCategoria) params.append('idCategoria', filters.idCategoria);
            
            const response = await productApi.get(`/product/user/search?${params}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error en búsqueda' };
        }
    },
    
    /**
     * Crear nuevo producto (solo ADMIN)
     */
    createProduct: async (productData) => {
        try {
            const response = await productApi.post('/product/admin', {
                nombre: productData.nombre,
                descripcion: productData.descripcion,
                precio: parseFloat(productData.precio),
                stock: parseInt(productData.stock),
                imagenUrl: productData.imagenUrl,
                idCategoria: productData.idCategoria
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error al crear producto' };
        }
    },
    
    /**
     * Actualizar producto (solo ADMIN)
     */
    updateProduct: async (id, productData) => {
        try {
            const response = await productApi.put(`/product/admin/${id}`, {
                nombre: productData.nombre,
                descripcion: productData.descripcion,
                precio: parseFloat(productData.precio),
                stock: parseInt(productData.stock),
                imagenUrl: productData.imagenUrl,
                idCategoria: productData.idCategoria
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error al actualizar producto' };
        }
    },
    
    /**
     * Actualizar solo el stock (solo ADMIN)
     */
    updateStock: async (id, nuevoStock) => {
        try {
            const response = await productApi.patch(
                `/product/admin/${id}/stock?nuevoStock=${nuevoStock}`
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error al actualizar stock' };
        }
    },
    
    /**
     * Eliminar producto (solo ADMIN)
     */
    deleteProduct: async (id) => {
        try {
            const response = await productApi.delete(`/product/admin/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Error al eliminar producto' };
        }
    }
};

export default productService;