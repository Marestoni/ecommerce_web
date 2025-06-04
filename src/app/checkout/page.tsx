'use client';

import { useCart } from '../providers/CartProvider';
import { useAuthContext } from '../providers/AuthProvider';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, totalItems, totalPrice, clearCart } = useCart();
  const { user } = useAuthContext();
  const router = useRouter();

  // Estados do formulário
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    complement: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: user?.email || '',
    paymentMethod: 'credit',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirecionar se o carrinho estiver vazio
  if (!cart || cart.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
        <p className="text-lg mb-6">Adicione alguns produtos antes de finalizar a compra!</p>
        <Link 
          href="/products" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver Produtos
        </Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validação básica
    if (!formData.address || !formData.city || !formData.state || !formData.zipCode) {
      setError('Por favor, preencha todos os campos obrigatórios');
      setLoading(false);
      return;
    }

    if (formData.paymentMethod === 'credit' && 
        (!formData.cardNumber || !formData.cardName || !formData.cardExpiry || !formData.cardCvv)) {
      setError('Por favor, preencha todos os dados do cartão');
      setLoading(false);
      return;
    }

    try {
      // Simular processamento do pedido
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Limpar carrinho e redirecionar para confirmação
      clearCart();
      router.push('/checkout/success');
    } catch (err) {
      setError('Ocorreu um erro ao processar seu pedido. Por favor, tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário de Entrega e Pagamento */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seção de Entrega */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Informações de Entrega</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome*</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sobrenome*</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço*</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
                <input
                  type="text"
                  name="complement"
                  value={formData.complement}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cidade*</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado*</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CEP*</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Seção de Pagamento */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Método de Pagamento</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="credit"
                    name="paymentMethod"
                    value="credit"
                    checked={formData.paymentMethod === 'credit'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="credit" className="ml-2 block text-sm font-medium text-gray-700">
                    Cartão de Crédito
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pix"
                    name="paymentMethod"
                    value="pix"
                    checked={formData.paymentMethod === 'pix'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="pix" className="ml-2 block text-sm font-medium text-gray-700">
                    PIX
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="boleto"
                    name="paymentMethod"
                    value="boleto"
                    checked={formData.paymentMethod === 'boleto'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="boleto" className="ml-2 block text-sm font-medium text-gray-700">
                    Boleto Bancário
                  </label>
                </div>
              </div>
              
              {/* Dados do Cartão (mostrar apenas se selecionado) */}
              {formData.paymentMethod === 'credit' && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Número do Cartão*</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome no Cartão*</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Validade*</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/AA"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV*</label>
                      <input
                        type="text"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleChange}
                        placeholder="123"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Mensagem de erro */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processando...' : 'Confirmar Pedido'}
            </button>
          </form>
        </div>
        
        {/* Resumo do Pedido */}
        <div>
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
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
            
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Seus Itens</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                        )}
                      </div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm">R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}