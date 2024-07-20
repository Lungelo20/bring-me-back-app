import React, { createContext, useState, useEffect } from 'react';
import { loginUser } from '../api/api'; // Import the loginUser function
import axiosInstance from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = () => {
            try {
                if (localStorage.length === 0) {                    
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }                
                const storedUserString = localStorage.getItem('user');
                const storedToken = localStorage.getItem('jwtToken');                
                if (storedUserString !== 'undefined' && storedToken) {
                    console.log('Stored user:', storedUserString); // Log stored user
                    const storedUser = JSON.parse(storedUserString);
    
                    setUser(storedUser);
                    setIsAuthenticated(true);
    
                    // Optionally set token in axios headers
                    axiosInstance.defaults.headers['Authorization'] = `Bearer ${storedToken}`;
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Error parsing stored user data:', error);
                setIsAuthenticated(false);
            }    
            setLoading(false);
        };
    
        fetchUser();
    }, []);
    
    const login = async (email, password) => {
        try {
            await loginUser({ email, password });           
            setIsAuthenticated(true);
            setError(null); // Clear any previous errors
        } catch (error) {
            setError('Authantication failed! '); // Set error message
            throw new Error('Login failed at Auth:',error);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('jwtToken'); // Remove token from local storage
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};
