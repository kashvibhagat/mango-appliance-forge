import { Product, ProductCategory } from '@/types/product';
import { mangoCategories, mangoProducts, mangoFeaturedProducts, allMangoProducts } from './mangoProducts';

// Use the comprehensive Mango catalogue data
export const categories: ProductCategory[] = mangoCategories;

// Use the comprehensive Mango catalogue products
export const featuredProducts: Product[] = mangoFeaturedProducts;

// All products including spares
export const allProducts = allMangoProducts;