import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axios';
import { useLoading } from './LoadingContext';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { loading, setIsLoading } = useLoading();

  const fetchAllProducts = () => {
    if (products.length === 0) {
      setIsLoading(true);
      axiosInstance
        .get('/products')
        .then((response) => {
          setProducts(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          setIsLoading(false);
        });
    }
  };

  return (
    <ProductsContext.Provider value={{ products, fetchAllProducts, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
