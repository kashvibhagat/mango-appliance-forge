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
  // Personal Coolers
  {
    id: "1",
    name: "Cool Master i",
    slug: "cool-master-i",
    description: "The Cool Master i is a compact and efficient personal air cooler designed for individual comfort. With its sleek design and powerful cooling capacity, it's perfect for small rooms and personal spaces. Features honeycomb cooling pads, multi-directional air throw, and energy-efficient operation.",
    shortDescription: "Compact personal cooler with powerful cooling for individual comfort",
    images: ["/src/assets/product-personal-cooler.jpg"],
    price: 8999,
    originalPrice: 10999,
    category: categories[0], // Personal Coolers
    brand: "Mango",
    sku: "CM-I-001",
    inStock: true,
    stockQuantity: 25,
    rating: 4.5,
    reviewCount: 128,
    specifications: {
      "Tank Capacity": "25 Liters",
      "Power Consumption": "150 Watts",
      "Air Throw": "30 feet",
      "Room Size": "Up to 250 sq ft",
      "Pump": "Submersible pump included",
      "Material": "ABS Plastic Body"
    },
    features: [
      "Honeycomb cooling pads",
      "Multi-directional air throw",
      "Remote control operation",
      "Timer function",
      "Low power consumption",
      "Easy mobility with castor wheels"
    ],
    tags: ["personal", "compact", "energy-efficient", "remote-control"],
    dimensions: {
      length: 45,
      width: 35,
      height: 75,
      weight: 12
    },
    warranty: "2 years comprehensive warranty",
    powerConsumption: "150W",
    tankCapacity: "25L",
    airThrow: "30 feet",
    coolingArea: "250 sq ft",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "2",
    name: "Cool Master",
    slug: "cool-master",
    description: "The Cool Master is a reliable personal air cooler offering excellent cooling performance for small to medium rooms. Features durable construction, efficient cooling pads, and user-friendly controls for comfortable operation.",
    shortDescription: "Reliable personal cooler for small to medium rooms",
    images: ["/src/assets/product-personal-cooler.jpg"],
    price: 7999,
    originalPrice: 9499,
    category: categories[0], // Personal Coolers
    brand: "Mango",
    sku: "CM-002",
    inStock: true,
    stockQuantity: 30,
    rating: 4.3,
    reviewCount: 95,
    specifications: {
      "Tank Capacity": "20 Liters",
      "Power Consumption": "140 Watts",
      "Air Throw": "25 feet",
      "Room Size": "Up to 200 sq ft",
      "Pump": "Submersible pump",
      "Material": "ABS Plastic Body"
    },
    features: [
      "Efficient cooling pads",
      "Manual speed control",
      "Water level indicator",
      "Easy fill water tank",
      "Compact design",
      "Castor wheels for mobility"
    ],
    tags: ["personal", "compact", "affordable", "reliable"],
    dimensions: {
      length: 42,
      width: 32,
      height: 70,
      weight: 10
    },
    warranty: "2 years comprehensive warranty",
    powerConsumption: "140W",
    tankCapacity: "20L",
    airThrow: "25 feet",
    coolingArea: "200 sq ft",
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z"
  },
  {
    id: "3",
    name: "Thunder Plus i",
    slug: "thunder-plus-i",
    description: "The Thunder Plus i combines power and efficiency in a personal cooling solution. With enhanced features and modern design, it delivers superior performance for personal comfort in any room setting.",
    shortDescription: "Enhanced personal cooler with superior performance",
    images: ["/src/assets/product-personal-cooler.jpg"],
    price: 9999,
    originalPrice: 11999,
    category: categories[0], // Personal Coolers
    brand: "Mango",
    sku: "TP-I-003",
    inStock: true,
    stockQuantity: 20,
    rating: 4.6,
    reviewCount: 87,
    specifications: {
      "Tank Capacity": "30 Liters",
      "Power Consumption": "160 Watts",
      "Air Throw": "35 feet",
      "Room Size": "Up to 300 sq ft",
      "Pump": "High-efficiency pump",
      "Material": "ABS Plastic with Metal Grille"
    },
    features: [
      "Enhanced cooling performance",
      "Remote control operation",
      "Timer and speed control",
      "Ice chamber for extra cooling",
      "Swing function",
      "Low noise operation"
    ],
    tags: ["personal", "enhanced", "remote-control", "ice-chamber"],
    dimensions: {
      length: 48,
      width: 38,
      height: 80,
      weight: 14
    },
    warranty: "2 years comprehensive warranty",
    powerConsumption: "160W",
    tankCapacity: "30L",
    airThrow: "35 feet",
    coolingArea: "300 sq ft",
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-08T00:00:00Z"
  },
  {
    id: "4",
    name: "Thunder Plus",
    slug: "thunder-plus",
    description: "The Thunder Plus offers reliable cooling performance with user-friendly features. Perfect for those seeking a balance between performance and affordability in personal cooling solutions.",
    shortDescription: "Reliable personal cooler with balanced performance",
    images: ["/src/assets/product-personal-cooler.jpg"],
    price: 8499,
    originalPrice: 9999,
    category: categories[0], // Personal Coolers
    brand: "Mango",
    sku: "TP-004",
    inStock: true,
    stockQuantity: 22,
    rating: 4.4,
    reviewCount: 76,
    specifications: {
      "Tank Capacity": "28 Liters",
      "Power Consumption": "155 Watts",
      "Air Throw": "32 feet",
      "Room Size": "Up to 280 sq ft",
      "Pump": "Standard pump",
      "Material": "ABS Plastic Body"
    },
    features: [
      "Reliable cooling performance",
      "Manual controls",
      "Large water tank",
      "Honeycomb pads",
      "Portable design",
      "Energy efficient"
    ],
    tags: ["personal", "reliable", "affordable", "efficient"],
    dimensions: {
      length: 46,
      width: 36,
      height: 78,
      weight: 13
    },
    warranty: "2 years comprehensive warranty",
    powerConsumption: "155W",
    tankCapacity: "28L",
    airThrow: "32 feet",
    coolingArea: "280 sq ft",
    createdAt: "2024-01-06T00:00:00Z",
    updatedAt: "2024-01-06T00:00:00Z"
  },
  // Tower Coolers
  {
    id: "5",
    name: "Arctic TC 15",
    slug: "arctic-tc-15",
    description: "The Arctic TC 15 is a compact tower air cooler designed for modern living spaces. With its sleek tower design and efficient cooling, it's perfect for apartments and small offices. Features space-saving design and quiet operation.",
    shortDescription: "Compact tower cooler for modern living spaces",
    images: ["/src/assets/product-tower-cooler.jpg"],
    price: 10999,
    originalPrice: 12999,
    category: categories[1], // Tower Coolers
    brand: "Mango",
    sku: "ATC-15-005",
    inStock: true,
    stockQuantity: 15,
    rating: 4.4,
    reviewCount: 64,
    specifications: {
      "Tank Capacity": "15 Liters",
      "Power Consumption": "120 Watts",
      "Air Throw": "35 feet",
      "Room Size": "Up to 300 sq ft",
      "Pump": "Compact pump",
      "Material": "ABS Plastic with Metal Grille"
    },
    features: [
      "Space-saving tower design",
      "Remote control operation",
      "3-speed settings",
      "Timer function",
      "Oscillation feature",
      "LED display"
    ],
    tags: ["tower", "compact", "space-saving", "modern"],
    dimensions: {
      length: 25,
      width: 25,
      height: 85,
      weight: 12
    },
    warranty: "2 years comprehensive warranty",
    powerConsumption: "120W",
    tankCapacity: "15L",
    airThrow: "35 feet",
    coolingArea: "300 sq ft",
    createdAt: "2024-01-14T00:00:00Z",
    updatedAt: "2024-01-14T00:00:00Z"
  },
  {
    id: "6",
    name: "Arctic TC 25",
    slug: "arctic-tc-25",
    description: "The Arctic TC 25 is a premium tower air cooler that combines style with performance. Its sleek tower design saves space while providing powerful cooling for medium to large rooms. Features advanced honeycomb pads and multiple speed settings.",
    shortDescription: "Premium tower cooler with powerful cooling performance",
    images: ["/src/assets/product-tower-cooler.jpg"],
    price: 12999,
    originalPrice: 15999,
    category: categories[1], // Tower Coolers
    brand: "Mango",
    sku: "ATC-25-006",
    inStock: true,
    stockQuantity: 18,
    rating: 4.7,
    reviewCount: 89,
    specifications: {
      "Tank Capacity": "25 Liters",
      "Power Consumption": "180 Watts",
      "Air Throw": "40 feet",
      "Room Size": "Up to 400 sq ft",
      "Pump": "High-efficiency pump",
      "Material": "ABS Plastic with Metal Grille"
    },
    features: [
      "Advanced honeycomb cooling pads",
      "Remote control with timer",
      "4-speed operation",
      "Auto swing function",
      "Water level indicator",
      "Digital display"
    ],
    tags: ["tower", "premium", "remote-control", "auto-swing"],
    dimensions: {
      length: 30,
      width: 30,
      height: 95,
      weight: 15
    },
    warranty: "3 years comprehensive warranty",
    powerConsumption: "180W",
    tankCapacity: "25L",
    airThrow: "40 feet",
    coolingArea: "400 sq ft",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z"
  },
  {
    id: "7",
    name: "Arctic TC 40",
    slug: "arctic-tc-40",
    description: "The Arctic TC 40 is a high-performance tower cooler designed for large spaces and commercial use. With superior cooling capacity and robust build quality, it delivers exceptional performance for halls, offices, and large rooms.",
    shortDescription: "High-performance tower cooler for large spaces",
    images: ["/src/assets/product-tower-cooler.jpg"],
    price: 16999,
    originalPrice: 19999,
    category: categories[1], // Tower Coolers
    brand: "Mango",
    sku: "ATC-40-007",
    inStock: true,
    stockQuantity: 12,
    rating: 4.8,
    reviewCount: 52,
    specifications: {
      "Tank Capacity": "40 Liters",
      "Power Consumption": "220 Watts",
      "Air Throw": "50 feet",
      "Room Size": "Up to 600 sq ft",
      "Pump": "High-pressure pump",
      "Material": "ABS Plastic with Metal Reinforcement"
    },
    features: [
      "Extra-large cooling capacity",
      "Professional-grade performance",
      "Remote control operation",
      "Variable speed control",
      "Wide angle oscillation",
      "Heavy-duty construction"
    ],
    tags: ["tower", "high-performance", "commercial", "large-capacity"],
    dimensions: {
      length: 35,
      width: 35,
      height: 110,
      weight: 22
    },
    warranty: "3 years comprehensive warranty",
    powerConsumption: "220W",
    tankCapacity: "40L",
    airThrow: "50 feet",
    coolingArea: "600 sq ft",
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-04T00:00:00Z"
  },
  // Desert Coolers
  {
    id: "8",
    name: "Wintry Deluxe-i",
    slug: "wintry-deluxe-i",
    description: "The Wintry Deluxe-i is a premium desert air cooler featuring advanced technology and superior cooling performance. Designed for large spaces with enhanced features like remote control, timer, and high-efficiency cooling pads.",
    shortDescription: "Premium desert cooler with advanced features",
    images: ["/src/assets/hero-air-cooler.jpg"],
    price: 22999,
    originalPrice: 26999,
    category: categories[2], // Desert Coolers
    brand: "Mango",
    sku: "WD-I-008",
    inStock: true,
    stockQuantity: 8,
    rating: 4.8,
    reviewCount: 43,
    specifications: {
      "Tank Capacity": "65 Liters",
      "Power Consumption": "250 Watts",
      "Air Throw": "60 feet",
      "Room Size": "Up to 1000 sq ft",
      "Pump": "High-pressure pump with auto-fill",
      "Material": "Metal Body with Anti-rust Coating"
    },
    features: [
      "Remote control operation",
      "Auto-fill water system",
      "4-way air deflection",
      "Heavy-duty honeycomb pads",
      "Timer and speed control",
      "Continuous water supply connection"
    ],
    tags: ["desert", "premium", "remote-control", "auto-fill"],
    dimensions: {
      length: 65,
      width: 50,
      height: 130,
      weight: 42
    },
    warranty: "3 years comprehensive warranty",
    powerConsumption: "250W",
    tankCapacity: "65L",
    airThrow: "60 feet",
    coolingArea: "1000 sq ft",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z"
  },
  {
    id: "9",
    name: "Wintry Deluxe",
    slug: "wintry-deluxe",
    description: "The Wintry Deluxe is a high-capacity desert air cooler designed for large spaces and commercial use. With robust build quality and superior cooling performance, it's ideal for halls, shops, and large rooms.",
    shortDescription: "High-capacity desert cooler for commercial use",
    images: ["/src/assets/hero-air-cooler.jpg"],
    price: 18999,
    originalPrice: 22999,
    category: categories[2], // Desert Coolers
    brand: "Mango",
    sku: "WD-009",
    inStock: true,
    stockQuantity: 12,
    rating: 4.6,
    reviewCount: 67,
    specifications: {
      "Tank Capacity": "55 Liters",
      "Power Consumption": "220 Watts",
      "Air Throw": "50 feet",
      "Room Size": "Up to 800 sq ft",
      "Pump": "High-pressure pump",
      "Material": "Metal Body with Powder Coating"
    },
    features: [
      "Extra-thick honeycomb pads",
      "High-pressure water pump",
      "4-way air deflection",
      "Large water tank capacity",
      "Rust-resistant body",
      "Heavy-duty castor wheels"
    ],
    tags: ["desert", "commercial", "high-capacity", "durable"],
    dimensions: {
      length: 60,
      width: 45,
      height: 120,
      weight: 35
    },
    warranty: "3 years comprehensive warranty",
    powerConsumption: "220W",
    tankCapacity: "55L",
    airThrow: "50 feet",
    coolingArea: "800 sq ft",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z"
  },
  {
    id: "10",
    name: "Wintry i",
    slug: "wintry-i",
    description: "The Wintry i offers reliable desert cooling performance with modern features. Perfect for medium to large spaces requiring consistent and powerful air circulation with enhanced cooling efficiency.",
    shortDescription: "Reliable desert cooler with modern features",
    images: ["/src/assets/hero-air-cooler.jpg"],
    price: 16999,
    originalPrice: 19999,
    category: categories[2], // Desert Coolers
    brand: "Mango",
    sku: "W-I-010",
    inStock: true,
    stockQuantity: 15,
    rating: 4.5,
    reviewCount: 58,
    specifications: {
      "Tank Capacity": "45 Liters",
      "Power Consumption": "200 Watts",
      "Air Throw": "45 feet",
      "Room Size": "Up to 600 sq ft",
      "Pump": "Efficient water pump",
      "Material": "Metal Body with Protective Coating"
    },
    features: [
      "Modern control panel",
      "Efficient cooling pads",
      "Multi-directional airflow",
      "Water level indicator",
      "Easy maintenance design",
      "Mobile castor wheels"
    ],
    tags: ["desert", "modern", "efficient", "reliable"],
    dimensions: {
      length: 55,
      width: 42,
      height: 115,
      weight: 30
    },
    warranty: "2 years comprehensive warranty",
    powerConsumption: "200W",
    tankCapacity: "45L",
    airThrow: "45 feet",
    coolingArea: "600 sq ft",
    createdAt: "2024-01-07T00:00:00Z",
    updatedAt: "2024-01-07T00:00:00Z"
  },
  {
    id: "11",
    name: "Wintry",
    slug: "wintry",
    description: "The Wintry is a dependable desert air cooler offering excellent value for money. With solid construction and reliable cooling performance, it's perfect for those seeking effective cooling solutions for large spaces.",
    shortDescription: "Dependable desert cooler with excellent value",
    images: ["/src/assets/hero-air-cooler.jpg"],
    price: 14999,
    originalPrice: 17999,
    category: categories[2], // Desert Coolers
    brand: "Mango",
    sku: "W-011",
    inStock: true,
    stockQuantity: 18,
    rating: 4.3,
    reviewCount: 72,
    specifications: {
      "Tank Capacity": "40 Liters",
      "Power Consumption": "180 Watts",
      "Air Throw": "40 feet",
      "Room Size": "Up to 500 sq ft",
      "Pump": "Standard water pump",
      "Material": "Metal Body"
    },
    features: [
      "Reliable cooling performance",
      "Manual speed control",
      "Large water capacity",
      "Durable construction",
      "Easy to operate",
      "Good air circulation"
    ],
    tags: ["desert", "reliable", "value", "durable"],
    dimensions: {
      length: 52,
      width: 40,
      height: 110,
      weight: 28
    },
    warranty: "2 years comprehensive warranty",
    powerConsumption: "180W",
    tankCapacity: "40L",
    airThrow: "40 feet",
    coolingArea: "500 sq ft",
    createdAt: "2024-01-09T00:00:00Z",
    updatedAt: "2024-01-09T00:00:00Z"
  },
  // Spare Parts
  {
    id: "12",
    name: "Premium Honeycomb Cooling Pads",
    slug: "premium-honeycomb-cooling-pads",
    description: "High-quality replacement honeycomb cooling pads for Mango air coolers. These premium pads ensure optimal cooling efficiency and longer lifespan. Made from natural wood wool fibers with excellent water retention and air flow properties.",
    shortDescription: "Premium replacement honeycomb cooling pads",
    images: ["/src/assets/product-spare-parts.jpg"],
    price: 899,
    originalPrice: 1199,
    category: categories[3], // Spare Parts
    brand: "Mango",
    sku: "MHP-012",
    inStock: true,
    stockQuantity: 50,
    rating: 4.3,
    reviewCount: 156,
    specifications: {
      "Material": "Natural Wood Wool",
      "Thickness": "100mm",
      "Size": "Standard fit for most models",
      "Water Retention": "High",
      "Durability": "Season-long performance",
      "Installation": "Easy DIY replacement"
    },
    features: [
      "Natural wood wool construction",
      "Excellent water retention",
      "High cooling efficiency",
      "Easy installation",
      "Long-lasting performance",
      "Compatible with most Mango models"
    ],
    tags: ["spare-parts", "replacement", "honeycomb", "cooling-pads"],
    dimensions: {
      length: 60,
      width: 60,
      height: 10,
      weight: 2
    },
    warranty: "6 months warranty",
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z"
  }
];

export const allProducts: Product[] = [
  ...featuredProducts,
  // Add more products here as needed
];