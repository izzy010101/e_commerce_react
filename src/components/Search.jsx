import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useProducts } from '../contexts/ProductsContext';

const Search = () => {
  const [query, setQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { products, fetchAllProducts, loading } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0) {
      fetchAllProducts();
    }
  }, [products.length, fetchAllProducts]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 1) {
        setIsSearching(true);
        const results = products
          .filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 7);
        setFilteredResults(results);
        setIsSearching(false);
      } else {
        setFilteredResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, products]);

  const handleInput = (event) => {
    setQuery(event.target.value);
  };

  const redirectToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
        </div>
        <input
          type="search"
          className="block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm text-gray-500 focus:ring-[#C5B358] focus:border-[#C5B358]"
          placeholder="Search..."
          value={query}
          onChange={handleInput}
          autoComplete="off"
        />
        {isSearching && (
          <div className="absolute inset-y-0 right-4 flex items-center">
            <ArrowPathIcon className="animate-spin h-5 w-5 text-gray-500" />
          </div>
        )}
      </div>
      {filteredResults.length > 0 && (
        <ul className="absolute left-0 w-full bg-white shadow-md mt-1 rounded-md z-10 max-h-60 overflow-y-auto">
          {filteredResults.map((product) => {
            const parsedImages = JSON.parse(product.images_urls);
            return (
              <li
                key={product.id}
                onClick={() => redirectToProduct(product.id)}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={parsedImages[0]}
                  alt={product.name}
                  className="h-10 w-10 object-cover rounded-full mr-2"
                />
                <span>{product.name}</span>
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
};

export default Search;
