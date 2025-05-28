import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Smartphone Premium',
    price: 2999.90,
    description: 'O mais avançado smartphone do mercado com câmera de 108MP',
    image: '/placeholder-smartphone.jpg',
    category: 'Eletrônicos',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Notebook Ultrafino',
    price: 4599.90,
    description: 'Notebook com processador de última geração e 16GB de RAM',
    image: '/placeholder-laptop.jpg',
    category: 'Eletrônicos',
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Fone Bluetooth',
    price: 399.90,
    description: 'Fone com cancelamento de ruído e 30h de bateria',
    image: '/placeholder-headphones.jpg',
    category: 'Acessórios',
    rating: 4.5,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}