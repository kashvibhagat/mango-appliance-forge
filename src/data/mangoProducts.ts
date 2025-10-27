import { Product, ProductCategory } from '@/types/product';
import { featuredProducts, categories } from '@/data/products';

// Company information
export const companyInfo = {
  brand: 'Mango Appliances',
  name: 'Mango Appliances Private Limited',
  philosophy: 'Premium Cooling Solutions',
  experience: '15+',
  factories: '3 Manufacturing Units',
  location: 'Rajkot, Gujarat',
  international: 'Asia, Middle East & Indian Sub-continent',
  facilities: 'ISO 9001:2015 certified with modern infrastructure',
  team: 'experienced engineering and quality control team',
  network: 'pan India distribution network',
  certifications: ['ISO 9001:2015', 'BIS', 'Energy Star']
};

// Use existing featured products from products.ts
export const mangoFeaturedProducts = featuredProducts;

// Use existing categories from products.ts
export const mangoCategories = categories;

// Export featured products for easy access
export { featuredProducts, categories };