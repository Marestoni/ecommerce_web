'use client';

import { useState } from 'react';
import { useCart } from '../providers/CartProvider';
import { Product } from '../../types/product';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex border rounded">
        <button
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
          disabled={isAdding}
        >
          -
        </button>
        <span className="px-3 py-1">{quantity}</span>
        <button
          onClick={() => setQuantity(q => q + 1)}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
          disabled={isAdding || quantity >= product.stock}
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`px-6 py-2 rounded ${isAdding ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
      >
        {isAdding ? 'Adicionando...' : 'Adicionar ao Carrinho'}
      </button>
    </div>
  );
}