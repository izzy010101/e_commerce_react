import React from 'react';
import UpdateProfileInformationForm from '../components/UpdateProfileInformationForm';
import UpdatePasswordForm from '../components/UpdatePasswordForm';
import DeleteUserForm from '../components/DeleteUserForm';
import Layout from '../components/Layout';

const ProfilePage = () => {
  return (
    <Layout container>
      <div className="container mx-auto sm:px-6 lg:px-8  bg-[#C5B358] rounded-lg p-6  shadow-lg flex items-center justify-center mt-1 ml-4 mr-4 mb-10 sm:mt-0 sm:ml-0 sm:mr-0 sm:mb-1 !mb-8 ">
        <h1 className="text-4xl font-extrabold text-gray-800 text-white tracking-wide text-center">
          Profile
        </h1>
      </div>
      <div>
        <div className=" mx-auto space-y-6">
          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="max-w-xl">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Profile Information
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Update your account's profile information and email address.
              </p>
              <UpdateProfileInformationForm />
            </div>
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="max-w-xl">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Update Password
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Ensure your account is using a long, random password to stay
                secure.
              </p>
              <UpdatePasswordForm />
            </div>
          </div>

          <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="max-w-xl">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Delete Account
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Once your account is deleted, all of its resources and data will
                be permanently deleted.
              </p>
              <DeleteUserForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
