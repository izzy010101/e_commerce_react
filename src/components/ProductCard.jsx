import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, isLoggedIn }) => {
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? JSON.parse(product.colors)[0] : 'defaultColor',
  );
  const parsedImages = JSON.parse(product.images_urls);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images =
    parsedImages.length > 0 ? parsedImages : ['/path/to/default/image.jpg'];

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    const itemInWishlist = wishlistItems.some((item) => item.id === product.id);
    itemInWishlist
      ? removeFromWishlist(product.id)
      : addToWishlist(product, selectedColor, images[currentImageIndex]);
  };

  const handleAddToCart = () => {
    const alreadyInCart = cartItems.find((item) => item.id === product.id);
    if (!alreadyInCart) {
      addToCart({
        ...product,
        selectedColor,
        image: images[currentImageIndex],
      });
      Swal.fire({
        icon: 'success',
        title: 'Product added to cart!',
        showConfirmButton: false,
        timer: 900,
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Product is already in the cart!',
        showConfirmButton: false,
        timer: 900,
      });
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const navigateToProductPage = () => {
    navigate(`/product/${product.id}`);
  };

  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  return (
    <div className="max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between h-full w-full">
      <div className="relative w-full">
        <img
          src={images[currentImageIndex]}
          alt={product.name}
          className="w-full object-cover cursor-pointer"
          style={{ height: '200px' }}
          onClick={navigateToProductPage}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#b8a93e] text-white p-1 rounded-full shadow hover:bg-gray-700 transition-colors duration-300"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#b8a93e] text-white p-1 rounded-full shadow hover:bg-gray-700 transition-colors duration-300"
            >
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </>
        )}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
          aria-label={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          {isInWishlist ? (
            <HeartSolid className="w-5 h-5 text-red-500" />
          ) : (
            <HeartIcon className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>
      <div className="p-4 flex-grow text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {product.name}
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {product.description}
        </p>
        {isLoggedIn ? (
          <p className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </p>
        ) : (
          <p className="mt-4 text-md text-red-400 underline dark:text-white">
            <Link to="/login">Login to see the price</Link>
          </p>
        )}
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          In Stock: {product.stock}
        </p>
        <div className="flex space-x-2 mt-4 justify-center">
          {JSON.parse(product.colors).map((color, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-full border-2 cursor-pointer ${color === selectedColor ? 'border-gray-800 dark:border-white' : 'border-gray-300 dark:border-gray-600'}`}
              style={{ backgroundColor: color }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(color);
              }}
            />
          ))}
        </div>
      </div>
      {isLoggedIn && (
        <div className="p-4 dark:bg-gray-900 flex justify-center items-center mt-auto">
          <button
            onClick={handleAddToCart}
            className="flex gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-colors"
          >
            <ShoppingCartIcon className="w-6 h-6" />
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
