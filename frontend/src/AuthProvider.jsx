import { createContext, useContext, useEffect, useState } from 'react';
import React from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(
        JSON.parse(sessionStorage.getItem('user')) || {}
    );
    const [token, setToken] = useState(sessionStorage.getItem('token') || '');

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [token]);

    const setUserSession = (status, data) => {
        sessionStorage.setItem('user', JSON.stringify(data.user)); 
        sessionStorage.setItem('token', data.token); 
        setIsLoggedIn(status);
        setUserData(data.user);
        setToken(data.token);
    };

    const clearUserSession = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserData({});
        setToken('');
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                userData,
                token,
                setUserSession,
                clearUserSession,
                setUserData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
