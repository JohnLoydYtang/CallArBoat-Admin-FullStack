import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async () => {
    try {
      // Simulating a successful login
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      // Handle login error here
    }
  };
  
  const logout = async () => {
    try {
  
      // Simulating a successful logout
      await AsyncStorage.removeItem('isLoggedIn');
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
      // Handle logout error here
    }
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
