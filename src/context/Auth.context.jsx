import { createContext, useContext, useState } from "react";

const initialValue = {
    isAuthenticated: false,
    userDetails: null,
    login: () => {},
    logout: () => {}
}

export const AuthContext = createContext(initialValue);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
    const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('userDetails')));

    const login = (userData) => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('userDetails', JSON.stringify(userData));
        setUserDetails(userData);
    };

    const register = (userData) => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', true);
        setUserDetails(userData);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserDetails(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userDetails');
    };

    const value = {
        isAuthenticated,
        userDetails,
        login,
        logout,
        register
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
