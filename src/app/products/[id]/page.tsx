// products/[id]/page.tsx
'use client';

import { useProduct } from '@/hooks/useProducts';
import { notFound, useParams } from 'next/navigation';
import AddToCartButton from '../../components/AddToCartButton';

export default function ProductPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) return notFound();

  const { product, loading, error } = useProduct(id);

  if (loading) return <p className="text-center mt-10">Carregando...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product) return notFound();

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-200 h-96 flex items-center justify-center rounded-lg">
          <span className="text-gray-500">Imagem de {product.name}</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
              ))}
            </div>
            <span className="ml-2 text-gray-600">{product.rating}</span>
          </div>
          <p className="text-2xl font-bold mb-4">R$ {product.price}</p>
          <p className="text-gray-700 mb-6">Estoque: {product.stock}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="flex space-x-4">
            <AddToCartButton product={product} />
            <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition-colors">
              Comprar Agora
            </button>
          </div>
          <div className="mt-8 pt-6 border-t">
            <h2 className="text-xl font-semibold mb-2">Detalhes do Produto</h2>
            <ul className="space-y-2">
              <li><strong>Categoria:</strong> {product.category}</li>
              <li><strong>SKU:</strong> {product.id}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
