import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import axiosInstance from '../api/axios';
import { useAuth } from '../contexts/AuthContext';
import { useLoading } from '../contexts/LoadingContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.errors);
        setStatus('Failed to login. Please check your credentials.');
      } else {
        setStatus('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout container>
      <>
        <div className="flex flex-col gap-4 px-6 pt-6">
          <h3 className="text-2xl font-thin">Welcome Back</h3>
          <p className="text-xs">
            Sign in with your email address and password
          </p>
        </div>

        <div className="flex">
          <form onSubmit={handleSubmit} className="w-1/2 p-6">
            <div>
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
                autoFocus
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
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-2">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-end mt-4">
              <Link
                to="/forgot-password"
                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b8a93e] dark:focus:ring-[#b8a93e] dark:focus:ring-offset-gray-800"
              >
                Forgot your password?
              </Link>

              <button
                type="submit"
                className="primary_btn ms-3 inline-flex items-center px-4 py-2 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-[#b8a93e] dark:hover:bg-white focus:bg-[#b8a93e] dark:focus:bg-white active:bg-[#b8a93e] dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b8a93e] focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
              >
                Log in
              </button>
            </div>

            <div className="text-gray-600 flex flex-col items-end pt-4">
              <p>Don't have a Ziara account?</p>
              <Link to="/register" className="underline">
                Create yours now
              </Link>
            </div>

            {status && <p className="text-green-600 text-sm mt-4">{status}</p>}
          </form>
          <div className="card w-1/2 flex content-center justify-center">
            <div className="w-1/2 rounded bg-[#e0e2e6]">
              <p className="uppercase text-xs font-thin p-6">
                What will you find in your Ziara Account
              </p>

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
      </>
    </Layout>
  );
};

export default LoginPage;
