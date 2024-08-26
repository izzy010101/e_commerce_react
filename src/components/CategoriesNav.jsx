import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../contexts/CategoriesContext';

const CategoriesNav = () => {
  const { categories, loading } = useCategories();

  if (loading) {
    return null;
  }

  return (
    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
      <ul className="flex space-x-4 gap-1">
        {categories.map((category) => (
          <li key={category.id} className="flex items-center">
            <Link
              to={`/category/${category.id}`}
              className="h-full inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 transition duration-150 ease-in-out"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesNav;
