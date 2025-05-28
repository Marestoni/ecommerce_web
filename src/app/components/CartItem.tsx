'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Product, CartItem } from '../../types/product';
import Image from 'next/image';

interface CartItemProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export default function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  return (
    <div className="border-b last:border-b-0 p-4 flex">
      <div className="bg-gray-200 w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
        {/* Substituir por Image do Next.js com uma imagem real */}
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          Imagem
        </div>
      </div>

      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <h3 className="font-medium text-lg">{item.name}</h3>
          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-500 hover:text-red-500"
          >
            Remover
          </button>
        </div>

        <p className="text-gray-600 text-sm mt-1">{item.category}</p>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center border rounded">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
            >
              -
            </button>
            <span className="px-3 py-1">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
              disabled={item.quantity >= item.stock}
            >
              +
            </button>
          </div>

          <span className="font-bold">R$ {(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}