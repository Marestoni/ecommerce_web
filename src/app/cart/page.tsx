'use client';

import { useCart } from '../providers/CartProvider';
import CartItem from '../components/CartItem';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../providers/AuthProvider';
import { useEffect } from 'react';

export default function CartPage() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalItems, 
    totalPrice 
  } = useCart();
  
  const router = useRouter();
  const { user } = useAuthContext();

  const handleCheckout = () => {
    if (!user) {
      // Redireciona para login e guarda a página atual para voltar depois
      router.push(`/auth?redirect=${encodeURIComponent('/cart')}`);
      return;
    }
    // Lógica para prosseguir com o checkout
    router.push('/checkout');
  };

  if (totalItems === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
        <p className="text-lg mb-6">Adicione alguns produtos para começar!</p>
        <Link 
          href="/products" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver Produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {cart.map(item => (
              <CartItem
                key={`${item.id}-${item.quantity}`}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Limpar Carrinho
            </button>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} itens)</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span>Grátis</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Finalizar Compra
            </button>

            {!user && (
              <p className="mt-3 text-sm text-gray-600 text-center">
                Você precisa estar logado para finalizar a compra
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}