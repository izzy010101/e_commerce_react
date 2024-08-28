import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';

const DeleteUserForm = () => {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting delete request with password:', password);
      await axiosInstance.delete('/profile/delete_user', {
        data: { password },
      });
      logout();
      navigate('/login');
      setStatus('Account deleted successfully.');
      
    } catch (error) {
      setStatus('Failed to delete account.');
    }
  };

  return (
    <div className="space-y-6 mt-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="mt-1 block w-full rounded-md border-primary focus:border-primary focus:ring-primary focus:ring-2 focus:outline-none dark:border-gray-700 dark:focus:border-primary"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md ms-3"
          >
            Delete Account
          </button>
        </div>
        {status && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{status}</p>
        )}
      </form>
    </div>
  );
};

export default DeleteUserForm;
