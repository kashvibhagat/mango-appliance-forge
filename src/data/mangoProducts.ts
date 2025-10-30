import { ProductCategory } from '@/types/product';
import { categories } from '@/data/products';

// Company information for Mango Appliances
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

// All products are now fetched from Supabase database
// This ensures data consistency and eliminates hardcoded product data
export const mangoCategories = categories;

// Re-export categories for convenience
export { categories };