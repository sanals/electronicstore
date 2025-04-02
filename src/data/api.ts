import { Product } from '../types/Product';
import { products } from './products';

export const api = {
  getProducts: async (): Promise<Product[]> => {
    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(products), 1000);
    });
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(products.find(p => p.id === id)), 1000);
    });
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    // Simulating API call
    return new Promise((resolve) => {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
      setTimeout(() => resolve(filtered), 1000);
    });
  }
}; 