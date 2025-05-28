'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Product, CartItem } from '../../types/product';



interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Carregar carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setHasLoaded(true);
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, hasLoaded]);

  const addToCart = (product: Product, quantity: number) => {
  setCart(prevCart => {
    const existingItem = prevCart.find(item => item.id === product.id);
    const currentQuantityInCart = existingItem?.quantity || 0;
    const totalRequested = currentQuantityInCart + quantity;

    if (totalRequested > product.stock) {
      alert(`No estoque só temos ${product.stock} unidade(s) do produto.`);
      return prevCart; // Não altera o carrinho
    }

    if (existingItem) {
      return prevCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    }

    return [...prevCart, { ...product, quantity }];
  });
};
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}