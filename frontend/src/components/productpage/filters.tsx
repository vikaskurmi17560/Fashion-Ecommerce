'use client';
import React, { useState, useEffect } from 'react';
import { useProductStore } from '@/service/productstore';

function Filters() {
  const [localPrice, setLocalPrice] = useState(2000);
  const [localCategory, setLocalCategory] = useState('All');
  const [localSearch, setLocalSearch] = useState('');

  const categories = ['All', 'Accessories', 'Men', 'Women'];

  const setFilterByPrice = useProductStore(state => state.setFilterByPrice);
  const setFilterByCategory = useProductStore(state => state.setFilterByCategory);
  const setSearchTerm = useProductStore(state => state.setSearchTerm);

  useEffect(() => {
    setFilterByPrice(localPrice);
  }, [localPrice, setFilterByPrice]);

  useEffect(() => {
    setFilterByCategory(localCategory);
  }, [localCategory, setFilterByCategory]);

 
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(localSearch);
    }, 500);
    return () => clearTimeout(timeout);
  }, [localSearch, setSearchTerm]);

  return (
    <aside className="bg-slate-100 w-full md:w-80 max-h-screen overflow-y-auto p-4 shadow-md">
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Filter by Price</h2>
        <input
          type="range"
          min={200}
          max={2000}
          value={localPrice}
          onChange={(e) => setLocalPrice(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between mt-4 text-gray-700">
          <span>Price: ₹200 – ₹{localPrice}</span>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <ul className="space-y-3 text-gray-700">
          {categories.map(cat => (
            <li
              key={cat}
              onClick={() => setLocalCategory(cat)}
              className={`cursor-pointer px-2 py-1 rounded-md hover:bg-blue-100 ${
                localCategory === cat ? 'bg-blue-200 font-medium' : ''
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Search</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    </aside>
  );
}

export default Filters;
