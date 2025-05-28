'use client';

import Link from 'next/link';
import { useProducts } from '@/hooks/useProducts';

export default function Home() {
  const { products, loading, error } = useProducts();
  const featuredProducts = products.slice(0, 3);
  const topRatedProducts = products.filter(p => p.rating >= 4.5).slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-blue-50 rounded-xl p-8 md:p-12 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Bem-vindo à Nossa Loja</h1>
        <p className="text-xl mb-6 text-gray-600">Os melhores produtos com os melhores preços</p>
        <Link
          href="/products"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block text-lg"
        >
          Compre Agora
        </Link>
      </div>

      {/* Produtos em Destaque */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Produtos em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <div key={product.id} className="border p-4 rounded-lg hover:shadow-lg transition-shadow hover:scale-[1.02]">
              <div className="bg-gray-200 h-48 mb-4 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">Imagem de {product.name}</span>
              </div>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600 my-2">R$ {product.price}</p>
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
                  ))}
                </div>
                <span className="ml-2 text-gray-600 text-sm">{product.rating.toFixed(1)}</span>
              </div>
              <Link 
                href={`/products/${product.id}`}
                className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Ver detalhes →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Benefícios */}
      <div className="bg-gray-50 rounded-xl p-8 my-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Por que comprar conosco?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🚚',
              title: 'Frete Grátis',
              description: 'Para compras acima de R$ 200,00'
            },
            {
              icon: '🔒',
              title: 'Pagamento Seguro',
              description: 'Processamento de pagamento criptografado'
            },
            {
              icon: '↩️',
              title: 'Devolução Fácil',
              description: '30 dias para devoluções'
            }
          ].map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Todos os produtos */}
      <div className="mt-8 text-center">
        <Link
          href="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
        >
          Ver Todos os Produtos
        </Link>
      </div>
    </div>
  );
}