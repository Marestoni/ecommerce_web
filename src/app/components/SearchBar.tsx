'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts'; // ajuste o caminho se necessário
import { Product } from '@/types/product'; // ajuste o caminho se necessário

export default function SearchBar({ mobile = false }: { mobile?: boolean }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const { products } = useProducts();
  const router = useRouter();

  useEffect(() => {
    if (searchTerm.length > 0 && products.length > 0) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results.slice(0, mobile ? 3 : 5));
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products, mobile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setFilteredProducts([]);
    }
  };

  return (
    <div className={`relative ${mobile ? 'w-full' : 'w-full max-w-xl'}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Buscar produtos..."
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${mobile ? 'pr-10' : ''}`}
        />
        {mobile && (
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        )}
      </form>

      {isFocused && filteredProducts.length > 0 && (
        <div className={`absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg text-black ${mobile ? 'max-h-60 overflow-y-auto' : ''}`}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
              onMouseDown={() => {
                router.push(`/products/${product.id}`);
                setSearchTerm('');
                setFilteredProducts([]);
              }}
            >
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-gray-600">R$ {product.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
