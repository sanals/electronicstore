import { Product, Category } from '../types/Product';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ProductResponse extends ApiResponse<Product[]> {}
export interface CategoryResponse extends ApiResponse<Category[]> {} 