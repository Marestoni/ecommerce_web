// src/services/api.ts
const API_BASE_URL = 'http://localhost:8080';

interface ApiResponse<T> {
  data: T;
  status: number;
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Obter o token do sessionStorage
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Adicionar o token ao header se existir
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    headers,
    ...options,
  });

  if (!response.ok) {
    // Se for 401 Unauthorized, remover o token inválido
    if (response.status === 401) {
      sessionStorage.removeItem('token');
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return { data, status: response.status };
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) => fetchApi<T>(endpoint, options),
  post: <T>(endpoint: string, body: object, options?: RequestInit) => 
    fetchApi<T>(endpoint, { 
      method: 'POST', 
      body: JSON.stringify(body),
      ...options 
    }),
  put: <T>(endpoint: string, body: object, options?: RequestInit) => 
    fetchApi<T>(endpoint, { 
      method: 'PUT', 
      body: JSON.stringify(body),
      ...options 
    }),
  delete: <T>(endpoint: string, options?: RequestInit) => 
    fetchApi<T>(endpoint, { 
      method: 'DELETE',
      ...options 
    }),
};