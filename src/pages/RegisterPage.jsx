import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import axiosInstance from '../api/axios';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { register, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await register(name, email, password, passwordConfirmation);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        setErrors({ ...error.response.data.errors });
      } else {
        console.error('Registration failed:', error);
      }
    }
  };

  return (
    <Layout container>
      <>
        <div className="flex flex-col gap-4 p-6">
          <h3 className="text-2xl font-thin">Create Your Account</h3>
          <p className="text-xs">
            Create your account to have access to a more personalized
            experience.
          </p>
        </div>

        <div className="flex p-6">
          <form onSubmit={handleSubmit} className="w-full lg:w-1/2 ">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name*
              </label>
              <input
                id="name"
                className="appearance-none bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-base leading-6 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b8a93e] focus:border-[#b8a93e] shadow-sm shadow-[#C5B358] block mt-1 w-full"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                autoComplete="name"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-2">{errors.name}</p>
              )}
            </div>

            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email*
              </label>
              <input
                id="email"
                className="appearance-none bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-base leading-6 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b8a93e] focus:border-[#b8a93e] shadow-sm shadow-[#C5B358] block mt-1 w-full"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password*
              </label>
              <input
                id="password"
                className="appearance-none bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-base leading-6 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b8a93e] focus:border-[#b8a93e] shadow-sm shadow-[#C5B358] block mt-1 w-full"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-2">{errors.password}</p>
              )}
            </div>

            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password*
              </label>
              <input
                id="password_confirmation"
                className="appearance-none bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 text-base leading-6 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b8a93e] focus:border-[#b8a93e] shadow-sm shadow-[#C5B358] block mt-1 w-full"
                type="password"
                name="password_confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete="new-password"
              />
              {errors.password_confirmation && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.password_confirmation}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end mt-4">
              <Link
                to="/login"
                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:ring-2 focus:ring-[#b8a93e] focus:border-[#b8a93e] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Already registered?
              </Link>

              <button
                type="submit"
                className="primary_btn ms-4 inline-flex items-center px-4 py-2 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-[#b8a93e] dark:hover:bg-white focus:bg-[#b8a93e] dark:focus:bg-white active:bg-[#b8a93e] dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b8a93e] focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
              >
                Register
              </button>
            </div>
          </form>

          <div className="w-full lg:w-1/2  flex  justify-center">
            <div className="w-1/2 rounded bg-[#e0e2e6]">
              <p className="uppercase text-xs font-thin p-6">
                What will you find in your Ziara Account
              </p>

              <div>
                <div className="flex items-center space-x-2 text-xs m-4 pl-4 pb-4 border-b border-b-[#C5B358]">
                  <img
                    src="/assets/cart_icon.png"
                    alt="Cart Icon"
                    className="w-[30px]"
                  />
                  <span className="text-xs">
                    Select items and see in your cart
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-xs m-4 pl-4 pb-4 border-b border-b-[#C5B358]">
                  <img
                    src="/assets/credit_card_icon.png"
                    alt="Credit Card Icon"
                    className="w-[30px]"
                  />
                  <span className="text-xs">
                    Manage your personal information
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-xs m-4 pl-4 pb-4 border-b border-b-[#C5B358]">
                  <img
                    src="/assets/newsletter_icon.png"
                    alt="Newsletter Icon"
                    className="w-[30px]"
                  />
                  <span className="text-xs">
                    Receive Newsletters from Ziara Clothing
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-xs m-4 pl-4 pb-4 border-b border-b-[#C5B358]">
                  <img
                    src="/assets/offers_icon.png"
                    alt="Offers Icon"
                    className="w-[30px]"
                  />
                  <span className="text-xs">
                    Get special offers and discounts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default RegisterPage;
