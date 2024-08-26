import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { useLoading } from './LoadingContext';
import { useWishlist } from './WishlistContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { loading, setIsLoading } = useLoading();
  const { clearWishlist } = useWishlist();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axiosInstance.get('/user');
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user:', error);
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const register = async (name, email, password, passwordConfirmation) => {
    const response = await axiosInstance.post('register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const login = async (email, password) => {
    const response = await axiosInstance.post('login', { email, password });
    localStorage.setItem('token', response.data.access_token);

    try {
      const userResponse = await axiosInstance.get('/user');
      setUser(userResponse.data);
    } catch (error) {
      console.error('Error fetching user after login:', error);
      setUser(null);
    }

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('wishlist_items');
    setUser(null);
    clearWishlist();
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, loading, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
