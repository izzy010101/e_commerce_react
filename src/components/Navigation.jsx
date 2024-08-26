import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import HeaderLinks from './HeaderLinks';
import CategoriesNav from './CategoriesNav';
import Dropdown from './Dropdown';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../api/axios';
import { useCategories } from '../contexts/CategoriesContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { categories, loading } = useCategories();

  if (loading) {
    return null;
  }

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="flex-1 lg:max-w-md w-full py-4 min-w-96">
            <Search />
          </div>

          <div className="flex gap-4 items-center justify-end w-full py-4">
            <HeaderLinks />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mx-auto px-4 border-t-2 border-[#C5B358] flex justify-between items-center h-16">
        <div className="shrink-0 flex items-center">
          <Link to="/">
            <img
              src="/assets/logo.png"
              alt="Ziara Logo"
              className="h-12 w-full"
            />
          </Link>
        </div>
        <CategoriesNav categories={categories} />
        <Dropdown />
        <div className="-me-2 flex items-center sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                className={isOpen ? 'hidden' : 'inline-flex'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                className={isOpen ? 'inline-flex' : 'hidden'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <ul className="flex space-x-4 gap-1 items-center justify-center">
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

        <div className="border-t border-gray-200 dark:border-gray-600">
          {user ? (
            <div className="flex justify-between p-4">
              <div className="">
                <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                  {user.name}
                </div>
                <div className="font-medium text-sm text-gray-500">
                  {user.email}
                </div>
              </div>
              <div className="flex gap-4 space-y-1 items-center">
                <Link
                  to="/profile"
                  className="m-1 text-sm text-gray-700 dark:text-gray-500"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="!m-1 text-sm text-gray-700 dark:text-gray-500"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end p-4">
              <Link
                to="/login"
                className="font-medium text-base text-gray-800 dark:text-gray-200"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="ml-4 font-medium text-base text-gray-800 dark:text-gray-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
