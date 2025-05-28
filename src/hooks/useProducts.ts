// src/hooks/useProducts.ts
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Product } from '../types/product';

interface UseProductsOptions {
  page?: number;
  limit?: number;
}

export function useProducts({ page = 1, limit = 20 }: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get<{
          products: Product[];
          total: number;
          totalPages: number;
        }>(`/products?page=${page}&limit=${limit}`);
        
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setTotalProducts(data.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit]);

  return { 
    products, 
    loading, 
    error, 
    totalPages, 
    totalProducts,
    currentPage: page
  };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get<Product>(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
}