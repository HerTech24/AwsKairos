import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verificar si hay un usuario guardado en localStorage al cargar la app
        const savedUser = localStorage.getItem('kairosUser');
        if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
        // Simular autenticación - aquí conectarías con tu API
        setTimeout(() => {
            if (email && password) {
            const userData = {
                id: 1,
                email: email,
                name: email.split('@')[0]
            };
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('kairosUser', JSON.stringify(userData));
            resolve(userData);
            } else {
            reject(new Error('Credenciales inválidas'));
            }
        }, 1000);
        });
    };

    const register = (userData) => {
        return new Promise((resolve, reject) => {
        // Simular registro - aquí conectarías con tu API
        setTimeout(() => {
            if (userData.email && userData.password && userData.name) {
            const newUser = {
                id: Date.now(),
                email: userData.email,
                name: userData.name
            };
            setUser(newUser);
            setIsAuthenticated(true);
            localStorage.setItem('kairosUser', JSON.stringify(newUser));
            resolve(newUser);
            } else {
            reject(new Error('Datos de registro inválidos'));
            }
        }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('kairosUser');
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    );
};