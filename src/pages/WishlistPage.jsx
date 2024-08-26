import React from 'react';
import Layout from '../components/Layout';
import Wishlist from '../components/Wishlist';

const WishlistPage = () => {
  return (
    <Layout container>
      <div className="bg-[#C5B358] rounded-lg p-6 mb-6 shadow-lg flex items-center justify-center">
        <h2 className="text-4xl font-extrabold text-gray-800 text-white tracking-wide text-center">
          Wishlist
        </h2>
      </div>

      <div id="app1">
        <Wishlist />
      </div>
    </Layout>
  );
};

export default WishlistPage;
