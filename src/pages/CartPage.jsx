import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { XMarkIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import axiosInstance from '../api/axios';

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart, clearCart, cartItemCount } =
    useCart();
  const { user } = useAuth();

  const totalCost = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = () => {
    Swal.fire({
      title: 'Confirm Order',
      titleText: `Total cost is ${totalCost}`,
      text: 'Are you sure you want to place this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, place order!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .post('orders', { user_id: user?.id, total_price: totalCost })
          .then((response) => {
            Swal.fire(
              'Ordered!',
              'Your order has been placed successfully. Order Number: ' +
                response.data.orderId,
              'success',
            );
            clearCart();
          })
          .catch((error) => {
            Swal.fire(
              'Failed!',
              'There was a problem placing your order.',
              'error',
            );
            console.error('Checkout error:', error);
          });
      }
    });
  };

  return (
    <Layout container>
      <div className="bg-[#C5B358] rounded-lg p-6 mb-6 shadow-lg flex items-center justify-center">
        <h2 className="text-4xl font-extrabold text-gray-800 text-white tracking-wide text-center">
          Cart
        </h2>
      </div>
      <div className=" mx-auto p-8 bg-white rounded-lg shadow-lg ">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#b8a93e]">
          Your Shopping Cart
        </h1>
        <p className="text-lg mb-2">
          User: {user?.name} ({user?.email})
        </p>
        <p className="text-lg mb-4">
          Total Items: {cartItemCount} | Total Cost: ${totalCost}
        </p>
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((item) => {
              const parsedImages = JSON.parse(item.images_urls);

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center mr-auto">
                    <img
                      src={parsedImages[0]}
                      alt={item.name}
                      className="h-20 w-20 object-cover rounded mr-4"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                      <p className="text-yellow-500 font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-1 border rounded-lg m-3">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2"
                    >
                      <MinusIcon className="h-5 w-5 text-gray-600" />
                    </button>
                    <span className="mx-2 text-lg">{item.quantity}</span>
                    <button onClick={() => addToCart(item)} className="p-2">
                      <PlusIcon className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, true)}
                    className="text-red-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              );
            })}
            <div className="text-right mt-4">
              <button
                onClick={handleCheckout}
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
