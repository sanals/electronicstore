export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  description: string;
  imageUrl: string;
  images: string[];
  specifications: Record<string, string>;
  variants?: string[];
  popularity: number;
}

export type Category = {
  name: string;
  subCategories: string[];
}; 