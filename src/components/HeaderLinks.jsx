import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import CartContext from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import {
  HeartIcon,
  UserCircleIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';

const HeaderLinks = () => {
  const { user } = useAuth();
  const { cartItemCount } = useContext(CartContext);
  const { wishlistCount } = useWishlist();

  return (
    <div className="flex gap-4 items-center justify-end w-full mt-4">
      <Link to="/wishlist" className="relative">
        <HeartIcon className="h-6 w-6 text-gray-700" />{' '}
        {wishlistCount > 0 && (
          <span className="absolute top-[-5px] right-[-15px] inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {wishlistCount}
          </span>
        )}
      </Link>

      {user && (
        <>
          <Link to="/profile">
            <UserCircleIcon className="h-6 w-6 text-gray-700" />{' '}
          </Link>
          <Link to="/cart">
            <div className="relative">
              <ShoppingBagIcon className="h-6 w-6 text-gray-700" />{' '}
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-red-600 rounded-full"></span>
              )}
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderLinks;
