import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../api/axios';

const UpdateProfileInformationForm = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ message: '', type: '' });

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.put('/profile/update', {
        name,
        email,
      });
      setUser(response.data.user);
      setStatus({ message: 'Profile updated successfully.', type: 'success' });
    } catch (error) {
      setStatus({ message: 'Failed to update profile.', type: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          className="mt-1 block w-full rounded-md border-primary focus:border-primary focus:ring-primary focus:ring-2 focus:outline-none dark:border-gray-700 dark:focus:border-primary"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          className="mt-1 block w-full rounded-md border-primary focus:border-primary focus:ring-primary focus:ring-2 focus:outline-none dark:border-gray-700 dark:focus:border-primary"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="bg-primary hover:bg-primaryHover text-white py-2 px-4 rounded-md"
        >
          Save
        </button>
        {status.message && (
          <p
            className={`text-sm ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}
          >
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default UpdateProfileInformationForm;
