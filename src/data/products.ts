import { Product, ProductCategory } from '@/types/product';

export const categories: ProductCategory[] = [
  {
    id: '1',
    name: 'Air Coolers',
    slug: 'air-coolers',
    description: 'Premium air coolers for home and office cooling',
    filters: [
      {
        id: 'price',
        name: 'Price',
        type: 'range',
        min: 5000,
        max: 50000,
        unit: '₹'
      },
      {
        id: 'cooling-area',
        name: 'Cooling Area',
        type: 'select',
        options: [
          { value: 'small', label: 'Small (150-300 sq ft)', count: 12 },
          { value: 'medium', label: 'Medium (300-600 sq ft)', count: 18 },
          { value: 'large', label: 'Large (600+ sq ft)', count: 8 }
        ]
      },
      {
        id: 'tank-capacity',
        name: 'Tank Capacity',
        type: 'select',
        options: [
          { value: '20-30', label: '20-30 Liters', count: 8 },
          { value: '30-50', label: '30-50 Liters', count: 15 },
          { value: '50+', label: '50+ Liters', count: 15 }
        ]
      },
      {
        id: 'type',
        name: 'Type',
        type: 'checkbox',
        options: [
          { value: 'personal', label: 'Personal', count: 12 },
          { value: 'desert', label: 'Desert', count: 16 },
          { value: 'window', label: 'Window', count: 8 },
          { value: 'tower', label: 'Tower', count: 12 }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Spare Parts',
    slug: 'spare-parts',
    description: 'Genuine spare parts and accessories for air coolers',
    filters: [
      {
        id: 'price',
        name: 'Price',
        type: 'range',
        min: 100,
        max: 5000,
        unit: '₹'
      },
      {
        id: 'part-type',
        name: 'Part Type',
        type: 'checkbox',
        options: [
          { value: 'cooling-pads', label: 'Cooling Pads', count: 25 },
          { value: 'motors', label: 'Motors', count: 15 },
          { value: 'pumps', label: 'Water Pumps', count: 12 },
          { value: 'fans', label: 'Fans', count: 18 },
          { value: 'remote', label: 'Remote Controls', count: 8 },
          { value: 'filters', label: 'Filters', count: 10 }
        ]
      },
      {
        id: 'compatibility',
        name: 'Brand Compatibility',
        type: 'select',
        options: [
          { value: 'symphony', label: 'Symphony', count: 20 },
          { value: 'bajaj', label: 'Bajaj', count: 18 },
          { value: 'crompton', label: 'Crompton', count: 15 },
          { value: 'orient', label: 'Orient', count: 12 },
          { value: 'universal', label: 'Universal', count: 25 }
        ]
      }
    ]
  }
];

export const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Mango Arctic Pro 50L Desert Air Cooler',
    slug: 'mango-arctic-pro-50l-desert-cooler',
    description: 'Premium desert air cooler with advanced cooling technology, perfect for large rooms and offices. Features honeycomb cooling pads, powerful motor, and smart controls.',
    shortDescription: 'Premium 50L desert cooler with honeycomb pads and smart controls',
    images: [
      '/src/assets/hero-air-cooler.jpg',
      '/src/assets/product-tower-cooler.jpg',
      '/src/assets/hero-air-cooler.jpg'
    ],
    price: 18999,
    originalPrice: 24999,
    category: categories[0],
    brand: 'Mango',
    sku: 'MNG-ARC-50L-001',
    inStock: true,
    stockQuantity: 15,
    rating: 4.6,
    reviewCount: 234,
    specifications: {
      'Tank Capacity': '50 Liters',
      'Cooling Area': '600-800 sq ft',
      'Air Throw': '45 feet',
      'Power Consumption': '180W',
      'Cooling Pad Type': 'Honeycomb',
      'Motor Speed': '1400 RPM',
      'Weight': '18 kg',
      'Dimensions': '60 x 45 x 110 cm'
    },
    features: [
      'Honeycomb cooling pads for maximum cooling',
      'Powerful 180W motor with low noise operation',
      'Smart remote control with timer function',
      'Large 50L water tank with water level indicator',
      '4-way air deflection for uniform cooling',
      'Castor wheels for easy mobility',
      'Ice chamber for extra cooling',
      'Dust filter for clean air circulation'
    ],
    tags: ['bestseller', 'premium', 'desert-cooler', 'large-room'],
    dimensions: {
      length: 60,
      width: 45,
      height: 110,
      weight: 18
    },
    warranty: '2 Years Comprehensive Warranty',
    powerConsumption: '180W',
    tankCapacity: '50 Liters',
    airThrow: '45 feet',
    coolingArea: '600-800 sq ft',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-01T15:30:00Z'
  },
  {
    id: '2',
    name: 'Mango Breeze Personal Air Cooler 20L',
    slug: 'mango-breeze-personal-air-cooler-20l',
    description: 'Compact personal air cooler ideal for small rooms, study areas, and bedrooms. Energy-efficient design with honeycomb cooling pads.',
    shortDescription: 'Compact 20L personal cooler for small spaces',
    images: [
      '/src/assets/product-personal-cooler.jpg',
      '/src/assets/product-personal-cooler.jpg'
    ],
    price: 8999,
    originalPrice: 11999,
    category: categories[0],
    brand: 'Mango',
    sku: 'MNG-BRZ-20L-002',
    inStock: true,
    stockQuantity: 28,
    rating: 4.3,
    reviewCount: 156,
    specifications: {
      'Tank Capacity': '20 Liters',
      'Cooling Area': '150-250 sq ft',
      'Air Throw': '25 feet',
      'Power Consumption': '75W',
      'Cooling Pad Type': 'Honeycomb',
      'Motor Speed': '1200 RPM',
      'Weight': '8 kg',
      'Dimensions': '40 x 30 x 65 cm'
    },
    features: [
      'Compact design perfect for personal use',
      'Energy-efficient 75W motor',
      'Honeycomb cooling pads',
      '20L water tank with easy fill design',
      '3-speed fan control',
      'Portable with built-in handles',
      'Low water indicator',
      'Quiet operation'
    ],
    tags: ['personal', 'compact', 'energy-efficient'],
    dimensions: {
      length: 40,
      width: 30,
      height: 65,
      weight: 8
    },
    warranty: '1 Year Warranty',
    powerConsumption: '75W',
    tankCapacity: '20 Liters',
    airThrow: '25 feet',
    coolingArea: '150-250 sq ft',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-03-01T15:30:00Z'
  },
  {
    id: '3',
    name: 'Mango Tower Elite 35L Tower Air Cooler',
    slug: 'mango-tower-elite-35l-tower-cooler',
    description: 'Sleek tower air cooler with modern design and advanced cooling technology. Space-saving vertical design perfect for contemporary homes.',
    shortDescription: 'Modern 35L tower cooler with space-saving design',
    images: [
      '/src/assets/product-tower-cooler.jpg',
      '/src/assets/product-tower-cooler.jpg'
    ],
    price: 13999,
    originalPrice: 17999,
    category: categories[0],
    brand: 'Mango',
    sku: 'MNG-TWR-35L-003',
    inStock: true,
    stockQuantity: 22,
    rating: 4.5,
    reviewCount: 128,
    specifications: {
      'Tank Capacity': '35 Liters',
      'Cooling Area': '400-500 sq ft',
      'Air Throw': '35 feet',
      'Power Consumption': '120W',
      'Cooling Pad Type': 'Honeycomb',
      'Motor Speed': '1300 RPM',
      'Weight': '12 kg',
      'Dimensions': '35 x 35 x 120 cm'
    },
    features: [
      'Space-saving tower design',
      'Digital display with touch controls',
      'Remote control with timer',
      '35L water tank with easy refill',
      'Oscillation function for wide coverage',
      'Silent operation technology',
      'Auto water level control',
      'Modern LED indicators'
    ],
    tags: ['tower', 'modern', 'space-saving'],
    dimensions: {
      length: 35,
      width: 35,
      height: 120,
      weight: 12
    },
    warranty: '2 Years Warranty',
    powerConsumption: '120W',
    tankCapacity: '35 Liters',
    airThrow: '35 feet',
    coolingArea: '400-500 sq ft',
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-03-01T15:30:00Z'
  },
  {
    id: '4',
    name: 'Premium Honeycomb Cooling Pads (Set of 4)',
    slug: 'premium-honeycomb-cooling-pads-set-4',
    description: 'High-quality honeycomb cooling pads designed for maximum cooling efficiency. Compatible with most air cooler brands. Set includes 4 pads.',
    shortDescription: 'High-efficiency honeycomb cooling pads set',
    images: [
      '/src/assets/product-spare-parts.jpg',
      '/src/assets/hero-spares.jpg'
    ],
    price: 1299,
    originalPrice: 1699,
    category: categories[1],
    brand: 'Mango',
    sku: 'MNG-PAD-HC-004',
    inStock: true,
    stockQuantity: 45,
    rating: 4.7,
    reviewCount: 89,
    specifications: {
      'Material': 'High-grade Cellulose',
      'Thickness': '100mm',
      'Dimensions': '60 x 30 x 10 cm',
      'Pack Size': '4 Pads',
      'Compatibility': 'Universal fit',
      'Efficiency': '90% cooling efficiency',
      'Durability': '2-3 seasons',
      'Installation': 'Easy DIY installation'
    },
    features: [
      'Premium honeycomb structure for maximum cooling',
      'High water absorption capacity',
      'Anti-bacterial treatment',
      'Universal compatibility with most brands',
      'Easy to install and replace',
      'Long-lasting durability',
      'Eco-friendly materials',
      'Set of 4 pads included'
    ],
    tags: ['spare-parts', 'cooling-pads', 'universal', 'premium'],
    warranty: '6 Months Warranty',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-03-01T15:30:00Z'
  }
];

export const allProducts: Product[] = [
  ...featuredProducts,
  // Add more products here as needed
];