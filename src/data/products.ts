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
  // Additional Desert Coolers from Mango Appliances
  {
    id: "13",
    name: "Glacial Deluxe-i",
    slug: "glacial-deluxe-i",
    description: "The Glacial Deluxe-i is a premium desert air cooler featuring advanced cooling technology and smart features. With intelligent controls, high-efficiency honeycomb pads, and powerful air circulation, it delivers exceptional cooling for large commercial and residential spaces.",
    shortDescription: "Premium smart desert cooler with intelligent controls",
    images: ["/src/assets/hero-air-cooler.jpg"],
    price: 24999,
    originalPrice: 28999,
    category: categories[2], // Desert Coolers
    brand: "Mango",
    sku: "GD-I-013",
    inStock: true,
    stockQuantity: 10,
    rating: 4.7,
    reviewCount: 38,
    specifications: {
      "Tank Capacity": "70 Liters",
      "Power Consumption": "260 Watts",
      "Air Throw": "65 feet",
      "Room Size": "Up to 1200 sq ft",
      "Pump": "Smart auto-fill pump system",
      "Material": "Premium Metal Body with Anti-corrosion Coating"
    },
    features: [
      "Smart remote control with display",
      "Auto-fill water system",
      "4-way motorized air deflection",
      "Premium honeycomb cooling pads",
      "Digital temperature display",
      "Timer and sleep mode functions"
    ],
    tags: ["desert", "premium", "smart", "auto-fill"],
    dimensions: {
      length: 68,
      width: 52,
      height: 135,
      weight: 45
    },
    warranty: "3 years comprehensive warranty",
    powerConsumption: "260W",
    tankCapacity: "70L",
    airThrow: "65 feet",
    coolingArea: "1200 sq ft",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "14",
    name: "Glacial Deluxe",
    slug: "glacial-deluxe",
    description: "The Glacial Deluxe offers superior cooling performance for large spaces with robust construction and enhanced features. Perfect for commercial establishments, large halls, and industrial applications requiring powerful and consistent cooling.",
    shortDescription: "Superior desert cooler for commercial applications",
    images: ["/src/assets/hero-air-cooler.jpg"],
    price: 20999,
    originalPrice: 24999,
    category: categories[2], // Desert Coolers
    brand: "Mango",
    sku: "GD-014",
    inStock: true,
    stockQuantity: 14,
    rating: 4.6,
    reviewCount: 52,
    specifications: {
      "Tank Capacity": "60 Liters",
      "Power Consumption": "240 Watts",
      "Air Throw": "55 feet",
      "Room Size": "Up to 900 sq ft",
      "Pump": "High-pressure water pump",
      "Material": "Heavy-duty Metal Body"
    },
    features: [
      "Heavy-duty construction",
      "High-pressure water circulation",
      "4-way air deflection system",
      "Extra-thick cooling pads",
      "Industrial-grade motor",
      "Reinforced castor wheels"
    ],
    tags: ["desert", "commercial", "heavy-duty", "industrial"],
    dimensions: {
      length: 62,
      width: 48,
      height: 125,
      weight: 38
    },
    warranty: "3 years comprehensive warranty",
    powerConsumption: "240W",
    tankCapacity: "60L",
    airThrow: "55 feet",
    coolingArea: "900 sq ft",
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z"
  },
  {
    id: "15",
    name: "Glacial-i",
    slug: "glacial-i",
    description: "The Glacial-i combines modern technology with reliable desert cooling performance. Features intelligent controls and efficient operation for medium to large spaces requiring consistent and powerful air circulation.",
    shortDescription: "Modern desert cooler with intelligent controls",
    images: ["/src/assets/hero-air-cooler.jpg"],
    price: 18999,
    originalPrice: 21999,
    category: categories[2], // Desert Coolers
    brand: "Mango",
    sku: "G-I-015",
    inStock: true,
    stockQuantity: 16,
    rating: 4.5,
    reviewCount: 47,
    specifications: {
      "Tank Capacity": "50 Liters",
      "Power Consumption": "210 Watts",
      "Air Throw": "48 feet",
      "Room Size": "Up to 700 sq ft",
      "Pump": "Efficient auto-circulation pump",
      "Material": "Metal Body with Weather Protection"
    },
    features: [
      "Intelligent control panel",
      "Auto water level monitoring",
      "Multi-speed operation",
      "Enhanced cooling pad system",
      "Remote control operation",
      "Energy-efficient motor"
    ],
    tags: ["desert", "intelligent", "efficient", "modern"],
    dimensions: {
      length: 58,
      width: 44,
      height: 118,
      weight: 32
    },
    warranty: "2 years comprehensive warranty",
    powerConsumption: "210W",
    tankCapacity: "50L",
    airThrow: "48 feet",
    coolingArea: "700 sq ft",
    createdAt: "2024-01-06T00:00:00Z",
    updatedAt: "2024-01-06T00:00:00Z"
  },
  {
    id: "16",
    name: "Glacial",
    slug: "glacial",
    description: "The Glacial is a reliable desert air cooler designed for consistent performance and value. With solid construction and effective cooling capabilities, it's ideal for residential and small commercial spaces.",
    shortDescription: "Reliable desert cooler for residential use",
    images: ["/src/assets/hero-air-cooler.jpg"],
    price: 16999,
    originalPrice: 19999,
    category: categories[2], // Desert Coolers
    brand: "Mango",
    sku: "G-016",
    inStock: true,
    stockQuantity: 20,
    rating: 4.4,
    reviewCount: 63,
    specifications: {
      "Tank Capacity": "42 Liters",
      "Power Consumption": "190 Watts",
      "Air Throw": "42 feet",
      "Room Size": "Up to 550 sq ft",
      "Pump": "Standard circulation pump",
      "Material": "Durable Metal Body"
    },
    features: [
      "Reliable cooling performance",
      "Easy-to-use controls",
      "Good water circulation",
      "Sturdy metal construction",
      "Effective air distribution",
      "Low maintenance design"
    ],
    tags: ["desert", "reliable", "residential", "value"],
    dimensions: {
      length: 54,
      width: 41,
      height: 112,
      weight: 29
    },
    warranty: "2 years comprehensive warranty",
    powerConsumption: "190W",
    tankCapacity: "42L",
    airThrow: "42 feet",
    coolingArea: "550 sq ft",
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-08T00:00:00Z"
  },
  // Additional Personal Coolers from Mango Appliances
  {
    id: "17",
    name: "Punch 20i",
    slug: "punch-20i",
    description: "The Punch 20i is a compact personal cooler designed for efficient cooling in small spaces. With intelligent features and energy-efficient operation, it delivers powerful performance in a space-saving design perfect for bedrooms and study rooms.",
    shortDescription: "Compact intelligent personal cooler for small spaces",
    images: ["/src/assets/product-personal-cooler.jpg"],
    price: 7999,
    originalPrice: 9499,
    category: categories[0], // Personal Coolers
    brand: "Mango",
    sku: "P20-I-017",
    inStock: true,
    stockQuantity: 35,
    rating: 4.2,
    reviewCount: 89,
    specifications: {
      "Tank Capacity": "20 Liters",
      "Power Consumption": "130 Watts",
      "Air Throw": "28 feet",
      "Room Size": "Up to 200 sq ft",
      "Pump": "Compact submersible pump",
      "Material": "High-quality ABS Plastic"
    },
    features: [
      "Intelligent cooling modes",
      "Remote control operation",
      "LED display panel",
      "Timer function",
      "Swing operation",
      "Ultra-quiet motor"
    ],
    tags: ["personal", "compact", "intelligent", "quiet"],
    dimensions: {
      length: 40,
      width: 30,
      height: 65,
      weight: 9
    },
    warranty: "2 years comprehensive warranty",
    powerConsumption: "130W",
    tankCapacity: "20L",
    airThrow: "28 feet",
    coolingArea: "200 sq ft",
    createdAt: "2024-01-16T00:00:00Z",
    updatedAt: "2024-01-16T00:00:00Z"
  },
  {
    id: "18",
    name: "Punch 20",
    slug: "punch-20",
    description: "The Punch 20 offers reliable personal cooling with straightforward operation and efficient performance. Ideal for individual use in small rooms, offices, and personal spaces requiring consistent cooling comfort.",
    shortDescription: "Reliable personal cooler with efficient performance",
    images: ["/src/assets/product-personal-cooler.jpg"],
    price: 6999,
    originalPrice: 8499,
    category: categories[0], // Personal Coolers
    brand: "Mango",
    sku: "P20-018",
    inStock: true,
    stockQuantity: 40,
    rating: 4.1,
    reviewCount: 102,
    specifications: {
      "Tank Capacity": "18 Liters",
      "Power Consumption": "120 Watts",
      "Air Throw": "25 feet",
      "Room Size": "Up to 180 sq ft",
      "Pump": "Standard water pump",
      "Material": "Durable ABS Plastic"
    },
    features: [
      "Simple manual controls",
      "Efficient cooling pads",
      "Water level indicator",
      "Portable design",
      "Energy-efficient operation",
      "Easy maintenance"
    ],
    tags: ["personal", "reliable", "affordable", "simple"],
    dimensions: {
      length: 38,
      width: 28,
      height: 62,
      weight: 8
    },
    warranty: "2 years comprehensive warranty",
    powerConsumption: "120W",
    tankCapacity: "18L",
    airThrow: "25 feet",
    coolingArea: "180 sq ft",
    createdAt: "2024-01-18T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z"
  },
  {
    id: "19",
    name: "Punch 40i",
    slug: "punch-40i",
    description: "The Punch 40i is a powerful personal cooler with enhanced capacity for larger personal spaces. Features intelligent controls, efficient cooling technology, and robust performance for extended use in medium-sized rooms.",
    shortDescription: "Powerful personal cooler with enhanced capacity",
    images: ["/src/assets/product-personal-cooler.jpg"],
    price: 11999,
    originalPrice: 13999,
    category: categories[0], // Personal Coolers
    brand: "Mango",
    sku: "P40-I-019",
    inStock: true,
    stockQuantity: 25,
    rating: 4.4,
    reviewCount: 68,
    specifications: {
      "Tank Capacity": "40 Liters",
      "Power Consumption": "170 Watts",
      "Air Throw": "40 feet",
      "Room Size": "Up to 350 sq ft",
      "Pump": "High-efficiency pump",
      "Material": "Premium ABS with Metal Reinforcement"
    },
    features: [
      "Enhanced cooling capacity",
      "Smart remote control",
      "Multi-speed operation",
      "Ice chamber compatibility",
      "Auto swing function",
      "Digital temperature display"
    ],
    tags: ["personal", "powerful", "enhanced", "smart"],
    dimensions: {
      length: 52,
      width: 40,
      height: 85,
      weight: 16
    },
    warranty: "2 years comprehensive warranty",
    powerConsumption: "170W",
    tankCapacity: "40L",
    airThrow: "40 feet",
    coolingArea: "350 sq ft",
    createdAt: "2024-01-11T00:00:00Z",
    updatedAt: "2024-01-11T00:00:00Z"
  },
  {
    id: "20",
    name: "Punch 40",
    slug: "punch-40",
    description: "The Punch 40 delivers dependable cooling performance with a larger tank capacity for extended operation. Perfect for those who need reliable cooling in medium-sized spaces without frequent water refills.",
    shortDescription: "Dependable cooler with large tank capacity",
    images: ["/src/assets/product-personal-cooler.jpg"],
    price: 10499,
    originalPrice: 12499,
    category: categories[0], // Personal Coolers
    brand: "Mango",
    sku: "P40-020",
    inStock: true,
    stockQuantity: 30,
    rating: 4.3,
    reviewCount: 84,
    specifications: {
      "Tank Capacity": "38 Liters",
      "Power Consumption": "165 Watts",
      "Air Throw": "38 feet",
      "Room Size": "Up to 320 sq ft",
      "Pump": "Reliable water pump",
      "Material": "Sturdy ABS Plastic"
    },
    features: [
      "Large water tank capacity",
      "Manual speed control",
      "Effective air circulation",
      "Water level monitoring",
      "Durable construction",
      "Easy mobility"
    ],
    tags: ["personal", "large-tank", "dependable", "durable"],
    dimensions: {
      length: 50,
      width: 38,
      height: 82,
      weight: 15
    },
    warranty: "2 years comprehensive warranty",
    powerConsumption: "165W",
    tankCapacity: "38L",
    airThrow: "38 feet",
    coolingArea: "320 sq ft",
    createdAt: "2024-01-13T00:00:00Z",
    updatedAt: "2024-01-13T00:00:00Z"
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