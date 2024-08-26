import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axios';
import { useLoading } from './LoadingContext';

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const { loading, setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get('/categories')
      .then((response) => {
        setCategories(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
