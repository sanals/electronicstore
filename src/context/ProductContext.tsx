import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types/Product';
import { products } from '../data/products';

export const ProductContext = createContext<{
  products: Product[];
  filteredProducts: Product[];
  setFilter: (category: string) => void;
}>({
  products: [],
  filteredProducts: [],
  setFilter: () => {}
});

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productsState] = useState<Product[]>(products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsState);
  
  const setFilter = (category: string) => {
    if (!category) {
      setFilteredProducts(productsState);
      return;
    }

    const filtered = productsState.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
    
    setFilteredProducts(filtered);
  };

  return (
    <ProductContext.Provider value={{ 
      products: productsState, 
      filteredProducts, 
      setFilter 
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}; 