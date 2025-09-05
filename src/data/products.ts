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
          { value: 'cooling-pads', label: 'Honeycomb Cooling Pads', count: 15 },
          { value: 'motors', label: 'Motors', count: 8 },
          { value: 'pumps', label: 'Water Pumps', count: 6 },
          { value: 'remote', label: 'Remote Controls', count: 12 },
          { value: 'filters', label: 'Filters', count: 10 }
        ]
      }
    ]
  }
];

export const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Mango Cool Master i Personal Cooler',
    slug: 'mango-cool-master-i-personal-cooler',
    description: 'Intelligent personal air cooler with remote control and sensor touch digital control panel. Perfect for small to medium rooms with honeycomb cooling pads and empty tank alarm.',
    shortDescription: 'Intelligent personal cooler with remote and digital controls',
    images: [
      '/src/assets/product-personal-cooler.jpg',
      '/src/assets/hero-air-cooler.jpg'
    ],
    price: 12999,
    originalPrice: 16999,
    category: categories[0],
    brand: 'Mango',
    sku: 'MNG-CM-I-001',
    inStock: true,
    stockQuantity: 15,
    rating: 4.5,
    reviewCount: 89,
    specifications: {
      'Tank Capacity': '25 Liters',
      'Room Space': '250 sq ft',
      'Air Throw': '30 feet',
      'Power Consumption': '120W',
      'Cooling Pad Type': 'Honeycomb',
      'Motor Speed': '1300 RPM',
      'Weight': '12 kg',
      'Dimensions': '45 x 35 x 75 cm'
    },
    features: [
      'Intelligent remote control',
      'Sensor touch digital control panel',
      'Empty tank alarm system',
      'High efficiency honeycomb cooling pads',
      'Works on inverter power',
      'Low operating cost like a fan',
      'Fresh and cool air delivery',
      'Suitable for indoor and outdoor use'
    ],
    tags: ['bestseller', 'personal', 'intelligent', 'remote-control'],
    dimensions: {
      length: 45,
      width: 35,
      height: 75,
      weight: 12
    },
    warranty: '2 Years Comprehensive Warranty',
    powerConsumption: '120W',
    tankCapacity: '25 Liters',
    airThrow: '30 feet',
    coolingArea: '250 sq ft',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-01T15:30:00Z'
  },
  {
    id: '2',
    name: 'Mango Arctic TC 25 Tower Cooler',
    slug: 'mango-arctic-tc-25-tower-cooler',
    description: 'Space-saving tower air cooler with intelligent remote control and sensor touch panel. Perfect for medium-sized rooms with efficient honeycomb cooling technology.',
    shortDescription: 'Tower cooler with remote control and digital panel',
    images: [
      '/src/assets/product-tower-cooler.jpg',
      '/src/assets/hero-air-cooler.jpg'
    ],
    price: 16999,
    originalPrice: 21999,
    category: categories[1],
    brand: 'Mango',
    sku: 'MNG-ATC-25-002',
    inStock: true,
    stockQuantity: 18,
    rating: 4.4,
    reviewCount: 67,
    specifications: {
      'Tank Capacity': '40 Liters',
      'Room Space': '500 sq ft',
      'Air Throw': '40 feet',
      'Power Consumption': '150W',
      'Cooling Pad Type': 'Honeycomb',
      'Motor Speed': '1350 RPM',
      'Weight': '15 kg',
      'Dimensions': '40 x 40 x 110 cm'
    },
    features: [
      'Space-saving tower design',
      'Intelligent remote control',
      'Sensor touch digital control panel',
      'Empty tank alarm system',
      'High efficiency honeycomb cooling pads',
      'Works on inverter power',
      'Oscillation function for wide coverage',
      'Modern LED indicators'
    ],
    tags: ['tower', 'space-saving', 'remote-control'],
    dimensions: {
      length: 40,
      width: 40,
      height: 110,
      weight: 15
    },
    warranty: '2 Years Warranty',
    powerConsumption: '150W',
    tankCapacity: '40 Liters',
    airThrow: '40 feet',
    coolingArea: '500 sq ft',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-03-01T15:30:00Z'
  },
  {
    id: '3',
    name: 'Mango Wintry Deluxe Desert Cooler',
    slug: 'mango-wintry-deluxe-desert-cooler',
    description: 'High-capacity desert air cooler for large spaces and commercial use. Features intelligent controls, honeycomb pads, and powerful cooling performance.',
    shortDescription: 'High-capacity desert cooler for large spaces',
    images: [
      '/src/assets/hero-air-cooler.jpg',
      '/src/assets/product-tower-cooler.jpg'
    ],
    price: 28999,
    originalPrice: 35999,
    category: categories[2],
    brand: 'Mango',
    sku: 'MNG-WD-80-003',
    inStock: true,
    stockQuantity: 12,
    rating: 4.6,
    reviewCount: 45,
    specifications: {
      'Tank Capacity': '80 Liters',
      'Room Space': '1000 sq ft',
      'Air Throw': '60 feet',
      'Power Consumption': '220W',
      'Cooling Pad Type': 'Honeycomb',
      'Motor Speed': '1450 RPM',
      'Weight': '25 kg',
      'Dimensions': '70 x 50 x 120 cm'
    },
    features: [
      'Large 80L water tank capacity',
      'Intelligent remote control',
      'Sensor touch digital control panel',
      'Empty tank alarm system',
      'High efficiency honeycomb cooling pads',
      'Powerful motor for large area cooling',
      'Heavy-duty castor wheels',
      'Commercial-grade build quality'
    ],
    tags: ['desert-cooler', 'commercial', 'high-capacity'],
    dimensions: {
      length: 70,
      width: 50,
      height: 120,
      weight: 25
    },
    warranty: '2 Years Comprehensive Warranty',
    powerConsumption: '220W',
    tankCapacity: '80 Liters',
    airThrow: '60 feet',
    coolingArea: '1000 sq ft',
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-03-01T15:30:00Z'
  },
  {
    id: '4',
    name: 'Mango Premium Honeycomb Cooling Pads (Set of 4)',
    slug: 'mango-premium-honeycomb-cooling-pads-set-4',
    description: 'Genuine Mango honeycomb cooling pads designed for maximum cooling efficiency. High-grade cellulose construction with anti-bacterial treatment.',
    shortDescription: 'Genuine honeycomb cooling pads with high efficiency',
    images: [
      '/src/assets/product-spare-parts.jpg',
      '/src/assets/hero-spares.jpg'
    ],
    price: 1599,
    originalPrice: 2199,
    category: categories[3],
    brand: 'Mango',
    sku: 'MNG-PAD-HC-004',
    inStock: true,
    stockQuantity: 35,
    rating: 4.7,
    reviewCount: 156,
    specifications: {
      'Material': 'High-grade Cellulose',
      'Thickness': '100mm',
      'Dimensions': '60 x 30 x 10 cm',
      'Pack Size': '4 Pads',
      'Compatibility': 'Mango Air Coolers',
      'Efficiency': '90% cooling efficiency',
      'Durability': '2-3 seasons',
      'Installation': 'Easy DIY installation'
    },
    features: [
      'High efficiency honeycomb structure',
      'Maximum water absorption capacity',
      'Anti-bacterial treatment',
      'Compatible with all Mango coolers',
      'Easy to install and replace',
      'Long-lasting durability',
      'Eco-friendly materials',
      'Genuine Mango spare part'
    ],
    tags: ['spare-parts', 'cooling-pads', 'genuine', 'high-efficiency'],
    warranty: '6 Months Warranty',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-03-01T15:30:00Z'
  }
];

export const allProducts: Product[] = [
  ...featuredProducts,
  // Add more products here as needed
];