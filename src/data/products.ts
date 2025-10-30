import { Product, ProductCategory } from '@/types/product';

export const categories: ProductCategory[] = [
  {
    id: '1',
    name: 'Personal Coolers',
    slug: 'personal-coolers',
    description: 'Compact personal coolers perfect for small spaces and individual cooling',
    filters: [
      {
        id: 'price',
        name: 'Price',
        type: 'range',
        min: 5000,
        max: 25000,
        unit: '₹'
      },
      {
        id: 'cooling-area',
        name: 'Room Space',
        type: 'select',
        options: [
          { value: '150-250', label: '150-250 sq ft', count: 8 },
          { value: '250-350', label: '250-350 sq ft', count: 10 },
          { value: '350-450', label: '350-450 sq ft', count: 6 }
        ]
      },
      {
        id: 'tank-capacity',
        name: 'Tank Size',
        type: 'select',
        options: [
          { value: '15-25', label: '15-25 Liters', count: 12 },
          { value: '25-35', label: '25-35 Liters', count: 8 },
          { value: '35+', label: '35+ Liters', count: 4 }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Tower Coolers',
    slug: 'tower-coolers',
    description: 'Sleek tower air coolers with space-saving vertical designs',
    filters: [
      {
        id: 'price',
        name: 'Price',
        type: 'range',
        min: 8000,
        max: 35000,
        unit: '₹'
      },
      {
        id: 'cooling-area',
        name: 'Room Space',
        type: 'select',
        options: [
          { value: '300-500', label: '300-500 sq ft', count: 6 },
          { value: '500-700', label: '500-700 sq ft', count: 8 },
          { value: '700+', label: '700+ sq ft', count: 4 }
        ]
      },
      {
        id: 'tank-capacity',
        name: 'Tank Size',
        type: 'select',
        options: [
          { value: '25-40', label: '25-40 Liters', count: 8 },
          { value: '40-60', label: '40-60 Liters', count: 6 },
          { value: '60+', label: '60+ Liters', count: 4 }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Desert Coolers',
    slug: 'desert-coolers',
    description: 'High-capacity desert coolers for large spaces and commercial use',
    filters: [
      {
        id: 'price',
        name: 'Price',
        type: 'range',
        min: 15000,
        max: 60000,
        unit: '₹'
      },
      {
        id: 'cooling-area',
        name: 'Room Space',
        type: 'select',
        options: [
          { value: '600-1000', label: '600-1000 sq ft', count: 8 },
          { value: '1000-1500', label: '1000-1500 sq ft', count: 6 },
          { value: '1500+', label: '1500+ sq ft', count: 4 }
        ]
      },
      {
        id: 'tank-capacity',
        name: 'Tank Size',
        type: 'select',
        options: [
          { value: '60-80', label: '60-80 Liters', count: 8 },
          { value: '80-120', label: '80-120 Liters', count: 6 },
          { value: '120+', label: '120+ Liters', count: 4 }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Spare Parts',
    slug: 'spare-parts',  
    description: 'Genuine Mango spare parts and accessories for air coolers',
    filters: [
      {
        id: 'price-range',
        name: 'Price Range',
        type: 'checkbox',
        options: [
          { value: 'under-1000', label: 'Under ₹1,000', count: 8 },
          { value: '1000-2500', label: '₹1,000 - ₹2,500', count: 6 },
          { value: '2500-5000', label: '₹2,500 - ₹5,000', count: 4 },
          { value: 'above-5000', label: 'Above ₹5,000', count: 2 }
        ]
      },
      {
        id: 'part-type',
        name: 'Part Type',
        type: 'checkbox',
        options: [
          { value: 'cooling-pads', label: 'Honeycomb Cooling Pads', count: 15 },
          { value: 'motors', label: 'Motors', count: 8 },
          { value: 'pumps', label: 'Water Pumps', count: 6 },
          { value: 'remote', label: 'Remote Controls', count: 12 },
          { value: 'filters', label: 'Filters', count: 10 }
        ]
      },
      {
        id: 'compatibility',
        name: 'Compatible With',
        type: 'checkbox',
        options: [
          { value: 'personal', label: 'Personal Coolers', count: 20 },
          { value: 'tower', label: 'Tower Coolers', count: 18 },
          { value: 'desert', label: 'Desert Coolers', count: 15 },
          { value: 'industrial', label: 'Industrial Coolers', count: 8 }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Industrial Coolers',
    slug: 'industrial-coolers',
    description: 'Heavy-duty industrial coolers for commercial spaces, factories, and warehouses',
    filters: [
      {
        id: 'price',
        name: 'Price',
        type: 'range',
        min: 25000,
        max: 100000,
        unit: '₹'
      },
      {
        id: 'cooling-area',
        name: 'Room Space',
        type: 'select',
        options: [
          { value: '1500-3000', label: '1500-3000 sq ft', count: 6 },
          { value: '3000-5000', label: '3000-5000 sq ft', count: 4 },
          { value: '5000+', label: '5000+ sq ft', count: 3 }
        ]
      },
      {
        id: 'tank-capacity',
        name: 'Tank Size',
        type: 'select',
        options: [
          { value: '150-200', label: '150-200 Liters', count: 5 },
          { value: '200-300', label: '200-300 Liters', count: 4 },
          { value: '300+', label: '300+ Liters', count: 3 }
        ]
      }
    ]
  }
];

// Featured products are now loaded from Supabase database
// This ensures product data and images are always in sync
export const featuredProducts: Product[] = [];

// All products are now loaded from Supabase database
// This eliminates duplication and ensures data consistency
export const allProducts: Product[] = [];