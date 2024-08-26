import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useWishlist } from '../contexts/WishlistContext';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleRemoveFromWishlist = (productId, e) => {
    e.stopPropagation();
    removeFromWishlist(productId);
    Swal.fire({
      icon: 'success',
      title: 'Product removed from wishlist!',
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <div>
      {wishlistItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center p-4 mb-4 border rounded-lg cursor-pointer hover:shadow-lg"
          onClick={() => navigate(`/product/${item.id}`)}
        >
          <img
            src={item.image || '/path/to/default/image.jpg'}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-lg mr-4"
          />
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-500">Color: {item.color}</p>
            <p className="text-sm text-gray-500">
              Price: ${Number(item.price).toFixed(2)}
            </p>
          </div>
          <button
            onClick={(e) => handleRemoveFromWishlist(item.id, e)}
            className="ml-auto text-red-500 hover:text-red-600"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      ))}
      {wishlistItems.length === 0 && (
        <div className="flex items-center p-4 mb-4 border rounded-lg bg-white">
          <p>No items in your wishlist.</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
