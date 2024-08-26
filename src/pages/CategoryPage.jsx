import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Layout from '../components/Layout';
import { useProducts } from '../contexts/ProductsContext';
import { useCategories } from '../contexts/CategoriesContext';
import { useLoading } from '../contexts/LoadingContext';
import { useAuth } from '../contexts/AuthContext';

const CategoryPage = () => {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState('Category');
  const { user } = useAuth();
  const { categories } = useCategories();
  const { products, fetchAllProducts, loading } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const categoryId = parseInt(id);

    fetchAllProducts();

    const category = categories.find((category) => category.id === categoryId);
    setCategoryName(category ? category.name : 'Category');

    const filtered = products.filter(
      (product) => product.category_id === categoryId,
    );
    setFilteredProducts(filtered);
  }, [id, categories, products, fetchAllProducts]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading, setIsLoading]);

  return (
    <Layout container>
      <>
        <div className="bg-[#C5B358] mt-1 ml-4 mr-4 mb-10 sm:mt-0 sm:ml-0 sm:mr-0 sm:mb-1 !mb-8 rounded-lg p-6 shadow-lg flex items-center justify-center">
          <h1 className="text-4xl font-extrabold text-white tracking-wide text-center">
            {categoryName}
          </h1>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col rounded-lg md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 items-center"
              >
                <ProductCard product={product} isLoggedIn={Boolean(user)} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No products found in this category.
            </p>
          )}
        </div>
      </>
    </Layout>
  );
};

export default CategoryPage;
