import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import Layout from '../components/Layout';
import { useProducts } from '../contexts/ProductsContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';

const ProductPage = () => {
  const { id } = useParams();
  const { products, fetchAllProducts, loading } = useProducts();
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();
  const { addToCart, cartItems } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const foundProduct = products.find((prod) => prod.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [products, id]);

  if (loading || !product) {
    return <div>Loading...</div>;
  }

  const parsedImages = JSON.parse(product.images_urls);
  const parsedColors = JSON.parse(product.colors);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product, parsedColors[0], parsedImages[0]);
    }
  };

  const handleAddToCart = () => {
    const alreadyInCart = cartItems.find((item) => item.id === product.id);
    if (!alreadyInCart) {
      addToCart(product);
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

  return (
    <Layout container>
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={parsedImages[selectedImageIndex]}
              alt={product.name}
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
            <div className="flex justify-center space-x-2 mt-4">
              {parsedImages.map((img, index) => (
                <button
                  aria-label="Toggle Image"
                  key={index}
                  className={`h-20 w-20 rounded-lg ${index === selectedImageIndex ? 'ring-2 ring-yellow-500' : 'ring-1 ring-gray-300'}`}
                  onClick={() => setSelectedImageIndex(index)}
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="mt-1 text-gray-500">{product.description}</p>
            <p className="text-xl text-yellow-600 font-semibold mt-4">
              ${product.price}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              In Stock: {product.stock}
            </p>
            <div className="flex space-x-2 mt-4">
              {parsedColors.map((color, index) => (
                <span
                  key={index}
                  className="h-6 w-6 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={handleWishlistToggle}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-colors"
              >
                {isInWishlist ? (
                  <HeartSolid className="w-6 h-6" />
                ) : (
                  <HeartIcon className="w-6 h-6" />
                )}
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
              {user && (
                <button
                  onClick={handleAddToCart}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-colors"
                >
                  <ShoppingCartIcon className="w-6 h-6 mr-1" />
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
