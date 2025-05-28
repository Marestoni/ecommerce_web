// src/app/products/page.tsx
'use client';

import Link from 'next/link';
import { useProducts } from '@/hooks/useProducts';
import { useState } from 'react';

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;
  const { products, loading, error, totalPages, totalProducts } = useProducts({ 
    page: currentPage, 
    limit 
  });

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center h-64">
        <div>Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center text-red-500">
        Erro ao carregar produtos: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Nossos Produtos</h1>
      <p className="text-gray-600 mb-4">Total de produtos: {totalProducts}</p>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum produto disponível no momento.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {products.map(product => (
              <div key={product.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500">Imagem de {product.name}</span>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold">R$ {product.price}</span>
                    <Link 
                      href={`/products/${product.id}`} 
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controles de paginação */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Anterior
              </button>
              
              <span className="mx-4">
                Página {currentPage} de {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Próxima
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}