import React, { useState } from 'react';
import axiosInstance from '../api/axios';

const UpdatePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put('/password/update', {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      });
      setStatus({ message: 'Password updated successfully.', type: 'success' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setStatus({ message: 'Failed to update password.', type: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div>
        <label
          htmlFor="current_password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Current Password
        </label>
        <input
          id="current_password"
          type="password"
          className="mt-1 block w-full rounded-md border-primary focus:border-primary focus:ring-primary focus:ring-2 focus:outline-none dark:border-gray-700 dark:focus:border-primary"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label
          htmlFor="new_password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          New Password
        </label>
        <input
          id="new_password"
          type="password"
          className="mt-1 block w-full rounded-md border-primary focus:border-primary focus:ring-primary focus:ring-2 focus:outline-none dark:border-gray-700 dark:focus:border-primary"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label
          htmlFor="confirm_password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Confirm Password
        </label>
        <input
          id="confirm_password"
          type="password"
          className="mt-1 block w-full rounded-md border-primary focus:border-primary focus:ring-primary focus:ring-2 focus:outline-none dark:border-gray-700 dark:focus:border-primary"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

export default UpdatePasswordForm;
