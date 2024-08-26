import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './contexts/CartContext.jsx';
import { WishlistProvider } from './contexts/WishlistContext.jsx';
import { CategoriesProvider } from './contexts/CategoriesContext.jsx';
import { ProductsProvider } from './contexts/ProductsContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { LoadingProvider } from './contexts/LoadingContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WishlistProvider>
      <LoadingProvider>
        <AuthProvider>
          <CartProvider>
            <CategoriesProvider>
              <ProductsProvider>
                <App />
              </ProductsProvider>
            </CategoriesProvider>
          </CartProvider>
        </AuthProvider>
      </LoadingProvider>
    </WishlistProvider>
  </StrictMode>,
);
