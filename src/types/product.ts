export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  category: string;
  rating: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
  stock: number;
}

interface ProductPageProps {
  params: {
    id: string;
  };
}
