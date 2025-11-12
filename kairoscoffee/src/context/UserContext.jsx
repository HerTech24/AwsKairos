import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const loginWithRedirect = () => setAuthenticated(true);
    const logout = () => setAuthenticated(false);

    return (
        <UserContext.Provider value={{ isAuthenticated, user, loginWithRedirect, logout }}>
        {children}
        </UserContext.Provider>
    );
};
