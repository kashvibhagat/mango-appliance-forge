import { Product, ProductCategory } from '@/types/product';

// Updated categories based on Mango catalogue
export const mangoCategories: ProductCategory[] = [
  {
    id: '1',
    name: 'Room Coolers',
    slug: 'room-coolers',
    description: 'Room air coolers with powerful cooling for indoor spaces',
    filters: [
      {
        id: 'price',
        name: 'Price',
        type: 'range',
        min: 8000,
        max: 25000,
        unit: '₹'
      },
      {
        id: 'cooling-area',
        name: 'Room Space',
        type: 'select',
        options: [
          { value: '200-300', label: '200-300 sq ft', count: 6 },
          { value: '300-400', label: '300-400 sq ft', count: 8 },
          { value: '400+', label: '400+ sq ft', count: 4 }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Personal Coolers',
    slug: 'personal-coolers',
    description: 'Compact personal coolers perfect for small spaces and individual cooling',
    filters: [
      {
        id: 'price',
        name: 'Price',
        type: 'range',
        min: 5000,
        max: 20000,
        unit: '₹'
      },
      {
        id: 'cooling-area',
        name: 'Room Space',
        type: 'select',
        options: [
          { value: '100-150', label: '100-150 sq ft', count: 8 },
          { value: '150-200', label: '150-200 sq ft', count: 10 },
          { value: '200+', label: '200+ sq ft', count: 6 }
        ]
      }
    ]
  },
  {
    id: '3',
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
          { value: '150-300', label: '150-300 sq ft', count: 6 },
          { value: '300-500', label: '300-500 sq ft', count: 8 },
          { value: '500+', label: '500+ sq ft', count: 4 }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Desert Coolers',
    slug: 'desert-coolers',
    description: 'High-capacity desert coolers for large spaces and extreme cooling',
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
          { value: '300-500', label: '300-500 sq ft', count: 8 },
          { value: '500-800', label: '500-800 sq ft', count: 6 },
          { value: '800+', label: '800+ sq ft', count: 4 }
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Commercial Coolers',
    slug: 'commercial-coolers',
    description: 'Heavy-duty commercial coolers for businesses and large spaces',
    filters: [
      {
        id: 'price',
        name: 'Price',
        type: 'range',
        min: 20000,
        max: 80000,
        unit: '₹'
      },
      {
        id: 'cooling-area',
        name: 'Room Space',
        type: 'select',
        options: [
          { value: '500-1000', label: '500-1000 sq ft', count: 6 },
          { value: '1000-1500', label: '1000-1500 sq ft', count: 4 },
          { value: '1500+', label: '1500+ sq ft', count: 3 }
        ]
      }
    ]
  },
  {
    id: '6',
    name: 'Industrial Coolers',
    slug: 'industrial-coolers',
    description: 'Heavy-duty industrial coolers for factories, warehouses, and large commercial spaces',
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
      }
    ]
  }
];

// Comprehensive Mango product catalogue based on PDF
export const mangoProducts: Product[] = [
  // PUNCH Series - Room Coolers
  {
    id: "punch-60",
    name: "PUNCH 60",
    slug: "punch-60",
    description: "The PUNCH 60 is a powerful room cooler suitable for up to 235 sq.ft. area with 2000 M³/HR air delivery. Features pump protection technology, silent performance, and dynamic cooling with honeycomb pads.",
    shortDescription: "Powerful room cooler with 235 sq.ft. coverage and 2000 M³/HR air delivery",
    images: ["/src/assets/product-personal-cooler.jpg"],
    price: 12999,
    originalPrice: 15999,
    category: mangoCategories[0], // Room Coolers
    brand: "Mango",
    sku: "PUK60",
    inStock: true,
    stockQuantity: 15,
    rating: 4.5,
    reviewCount: 89,
    specifications: {
      "Area Coverage": "235 sq.ft.",
      "Air Delivery": "2000 M³/HR",
      "Cooling Medium": "Honeycomb Pads",
      "Power Consumption": "165W",
      "Pump Protection": "Yes",
      "Auto Swing": "Yes",
      "Tank Capacity": "55L",
      "Castor Wheels": "Yes"
    },
    features: [
      "Pump protection technology",
      "Silent performance",
      "Powerful air throw with auto-swing",
      "Large tank capacity",
      "High efficiency cooling pads",
      "Works on inverter",
      "Castor wheels",
      "Dynamic cooling",
      "Patented registered design"
    ],
    tags: ["room-cooler", "pump-protection", "auto-swing", "inverter-compatible"],
    dimensions: {
      length: 600,
      width: 450,
      height: 1100,
      weight: 25
    },
    warranty: "2 years comprehensive warranty (2 year warranty on motor only)",
    powerConsumption: "165W",
    tankCapacity: "55L",
    airThrow: "35 feet",
    coolingArea: "235 sq ft",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "punch-60i",
    name: "PUNCH 60i",
    slug: "punch-60i",
    description: "The PUNCH 60i is an intelligent room cooler with digital features including sensor touch control panel, intelligent remote, and 12h timer. Suitable for up to 235 sq.ft. area with enhanced cooling performance.",
    shortDescription: "Intelligent room cooler with digital control panel and remote",
    images: ["/src/assets/product-personal-cooler.jpg"],
    price: 15999,
    originalPrice: 18999,
    category: mangoCategories[0], // Room Coolers
    brand: "Mango",
    sku: "PUK60I",
    inStock: true,
    stockQuantity: 12,
    rating: 4.7,
    reviewCount: 67,
    specifications: {
      "Area Coverage": "235 sq.ft.",
      "Air Delivery": "2000 M³/HR",
      "Cooling Medium": "3 Honeycomb Pads",
      "Power Consumption": "165W",
      "Digital Control": "Yes",
      "Remote Control": "Yes",
      "Timer": "12 hours",
      "Empty Tank Alarm": "Yes"
    },
    features: [
      "Pump protection technology",
      "Silent performance",
      "Dynamic cooling",
      "Patented registered design",
      "Powerful air throw with auto-swing",
      "Large tank capacity",
      "High efficiency cooling pads",
      "Works on inverter",
      "Castor wheels",
      "Empty tank alarm",
      "Sensor touch digital control panel",
      "Intelligent remote",
      "12h timer"
    ],
    tags: ["room-cooler", "digital-control", "remote", "timer", "smart"],
    dimensions: {
      length: 600,
      width: 450,
      height: 1100,
      weight: 26
    },
    warranty: "2 years comprehensive warranty (2 year warranty on motor only)",
    powerConsumption: "165W",
    tankCapacity: "55L",
    airThrow: "35 feet",
    coolingArea: "235 sq ft",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },

  // NEXON Series - Room Coolers
  {
    id: "nexon-60",
    name: "NEXON 60",
    slug: "nexon-60",
    description: "The NEXON 60 is a premium room cooler with patented registered design offering dynamic cooling for up to 235 sq.ft. area. Features powerful air throw with auto-swing and high efficiency cooling pads.",
    shortDescription: "Premium room cooler with patented design and dynamic cooling",
    images: ["/src/assets/product-personal-cooler.jpg"],
    price: 13999,
    originalPrice: 16999,
    category: mangoCategories[0], // Room Coolers
    brand: "Mango",
    sku: "NEX60",
    inStock: true,
    stockQuantity: 18,
    rating: 4.6,
    reviewCount: 94,
    specifications: {
      "Area Coverage": "235 sq.ft.",
      "Air Delivery": "2000 M³/HR",
      "Cooling Medium": "Honeycomb Pads",
      "Power Consumption": "165W",
      "Design": "Patented Registered",
      "Auto Swing": "Yes",
      "Inverter Support": "Yes"
    },
    features: [
      "Pump protection technology",
      "Silent performance",
      "Powerful air throw with auto-swing",
      "Large tank capacity",
      "High efficiency cooling pads",
      "Works on inverter",
      "Castor wheels",
      "Dynamic cooling",
      "Patented registered design"
    ],
    tags: ["room-cooler", "patented-design", "premium", "auto-swing"],
    dimensions: {
      length: 600,
      width: 450,
      height: 1100,
      weight: 25
    },
    warranty: "2 years comprehensive warranty (2 year warranty on motor only)",
    powerConsumption: "165W",
    tankCapacity: "55L",
    airThrow: "35 feet",
    coolingArea: "235 sq ft",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },

  // ARCTIC PC Series - Personal Coolers
  {
    id: "arctic-pc-37",
    name: "ARCTIC PC-37",
    slug: "arctic-pc-37",
    description: "The ARCTIC PC-37 is a compact personal cooler suitable for up to 125 sq.ft. area with 1100 M³/HR air delivery. Perfect for personal spaces with pump protection technology and silent performance.",
    shortDescription: "Compact personal cooler for 125 sq.ft. spaces",
    images: ["/src/assets/product-personal-cooler.jpg"],
    price: 7999,
    originalPrice: 9499,
    category: mangoCategories[1], // Personal Coolers
    brand: "Mango",
    sku: "APC37",
    inStock: true,
    stockQuantity: 25,
    rating: 4.3,
    reviewCount: 156,
    specifications: {
      "Area Coverage": "125 sq.ft.",
      "Air Delivery": "1100 M³/HR",
      "Cooling Medium": "Honeycomb Pads",
      "Power Consumption": "120W",
      "Pump Protection": "Yes",
      "Auto Swing": "Yes"
    },
    features: [
      "Pump protection technology",
      "Silent performance",
      "Powerful air throw with auto-swing",
      "High efficiency cooling pads",
      "Works on inverter",
      "Castor wheels",
      "Dynamic cooling",
      "Patented registered design"
    ],
    tags: ["personal-cooler", "compact", "pump-protection", "silent"],
    dimensions: {
      length: 450,
      width: 350,
      height: 750,
      weight: 15
    },
    warranty: "2 years comprehensive warranty (2 year warranty on motor only)",
    powerConsumption: "120W",
    tankCapacity: "25L",
    airThrow: "25 feet",
    coolingArea: "125 sq ft",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },

  // COOL MASTER Series - Personal Coolers
  {
    id: "cool-master-25i",
    name: "COOL MASTER 25i",
    slug: "cool-master-25i",
    description: "The COOL MASTER 25i is an intelligent personal cooler suitable for 160 sq.ft. area with digital control features. Includes sensor touch control panel, intelligent remote, and 12h timer for enhanced convenience.",
    shortDescription: "Intelligent personal cooler with digital controls",
    images: ["/src/assets/product-personal-cooler.jpg"],
    price: 10999,
    originalPrice: 12999,
    category: mangoCategories[1], // Personal Coolers
    brand: "Mango",
    sku: "CM25I",
    inStock: true,
    stockQuantity: 20,
    rating: 4.5,
    reviewCount: 78,
    specifications: {
      "Area Coverage": "160 sq.ft.",
      "Air Delivery": "1400 M³/HR",
      "Cooling Medium": "Honeycomb Pads",
      "Power Consumption": "140W",
      "Digital Control": "Yes",
      "Remote Control": "Yes",
      "Timer": "12 hours"
    },
    features: [
      "Pump protection technology",
      "Silent performance",
      "Dynamic cooling",
      "Patented registered design",
      "Powerful air throw with auto-swing",
      "Large tank capacity",
      "High efficiency cooling pads",
      "Works on inverter",
      "Castor wheels",
      "Empty tank alarm",
      "Sensor touch digital control panel",
      "Intelligent remote",
      "12h timer"
    ],
    tags: ["personal-cooler", "digital-control", "smart", "remote"],
    dimensions: {
      length: 480,
      width: 380,
      height: 800,
      weight: 18
    },
    warranty: "2 years comprehensive warranty (2 year warranty on motor only)",
    powerConsumption: "140W",
    tankCapacity: "35L",
    airThrow: "30 feet",
    coolingArea: "160 sq ft",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },

  // THUNDER PLUS Series - Personal Coolers
  {
    id: "thunder-plus-35i",
    name: "THUNDER PLUS 35i",
    slug: "thunder-plus-35i",
    description: "The THUNDER PLUS 35i is a premium personal cooler with intelligent features suitable for 160 sq.ft. area. Features digital control panel, remote control, and enhanced cooling performance.",
    shortDescription: "Premium personal cooler with intelligent features",
    images: ["/src/assets/product-personal-cooler.jpg"],
    price: 11999,
    originalPrice: 13999,
    category: mangoCategories[1], // Personal Coolers
    brand: "Mango",
    sku: "TP35I",
    inStock: true,
    stockQuantity: 16,
    rating: 4.6,
    reviewCount: 65,
    specifications: {
      "Area Coverage": "160 sq.ft.",
      "Air Delivery": "1400 M³/HR",
      "Cooling Medium": "Honeycomb Pads",
      "Power Consumption": "145W",
      "Digital Control": "Yes",
      "Remote Control": "Yes",
      "Timer": "12 hours"
    },
    features: [
      "Pump protection technology",
      "Silent performance",
      "Dynamic cooling",
      "Patented registered design",
      "Powerful air throw with auto-swing",
      "Large tank capacity",
      "High efficiency cooling pads",
      "Works on inverter",
      "Castor wheels",
      "Empty tank alarm",
      "Sensor touch digital control panel",
      "Intelligent remote",
      "12h timer"
    ],
    tags: ["personal-cooler", "premium", "intelligent", "digital-control"],
    dimensions: {
      length: 480,
      width: 380,
      height: 820,
      weight: 19
    },
    warranty: "2 years comprehensive warranty (2 year warranty on motor only)",
    powerConsumption: "145W",
    tankCapacity: "35L",
    airThrow: "32 feet",
    coolingArea: "160 sq ft",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },

  // ARCTIC TC Series - Tower Coolers
  {
    id: "arctic-tc-25",
    name: "ARCTIC TC 25",
    slug: "arctic-tc-25",
    description: "The ARCTIC TC 25 is a sleek tower cooler suitable for 150 sq.ft. area with 1400 M³/HR air delivery. Features space-saving tower design with powerful cooling performance and advanced features.",
    shortDescription: "Sleek tower cooler with space-saving design",
    images: ["/src/assets/product-tower-cooler.jpg"],
    price: 12999,
    originalPrice: 15999,
    category: mangoCategories[2], // Tower Coolers
    brand: "Mango",
    sku: "ATC25",
    inStock: true,
    stockQuantity: 22,
    rating: 4.4,
    reviewCount: 88,
    specifications: {
      "Area Coverage": "150 sq.ft.",
      "Air Delivery": "1400 M³/HR",
      "Cooling Medium": "Honeycomb Pads",
      "Power Consumption": "130W",
      "Design": "Tower",
      "Auto Swing": "Yes",
      "Inverter Support": "Yes"
    },
    features: [
      "Pump protection technology",
      "Silent performance",
      "Powerful air throw with auto-swing",
      "High efficiency cooling pads",
      "Works on inverter",
      "Castor wheels",
      "Space-saving tower design",
      "Patented dynamic cooling design"
    ],
    tags: ["tower-cooler", "space-saving", "modern", "auto-swing"],
    dimensions: {
      length: 300,
      width: 300,
      height: 1200,
      weight: 20
    },
    warranty: "2 years comprehensive warranty (2 year warranty on motor only)",
    powerConsumption: "130W",
    tankCapacity: "25L",
    airThrow: "35 feet",
    coolingArea: "150 sq ft",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },

  // NEW GLACIAL Series - Desert Coolers
  {
    id: "new-glacial-deluxe-85",
    name: "NEW GLACIAL DELUXE 85",
    slug: "new-glacial-deluxe-85",
    description: "The NEW GLACIAL DELUXE 85 is a high-performance desert cooler suitable for 385 sq.ft. area with 3300 M³/HR air delivery. Features pump protection technology and powerful cooling for large spaces.",
    shortDescription: "High-performance desert cooler for large spaces",
    images: ["/src/assets/desert-coolers-category.jpg"],
    price: 24999,
    originalPrice: 29999,
    category: mangoCategories[3], // Desert Coolers
    brand: "Mango",
    sku: "NGD85",
    inStock: true,
    stockQuantity: 10,
    rating: 4.7,
    reviewCount: 43,
    specifications: {
      "Area Coverage": "385 sq.ft.",
      "Air Delivery": "3300 M³/HR",
      "Cooling Medium": "Honeycomb Pads",
      "Power Consumption": "220W",
      "Pump Protection": "Yes",
      "Auto Swing": "Yes",
      "Tank Capacity": "85L"
    },
    features: [
      "Pump protection technology",
      "Silent performance",
      "Powerful air throw with auto-swing",
      "High efficiency cooling pads",
      "Castor wheels",
      "Dynamic cooling",
      "Works on inverter",
      "Patented design"
    ],
    tags: ["desert-cooler", "high-performance", "large-capacity", "powerful"],
    dimensions: {
      length: 700,
      width: 500,
      height: 1300,
      weight: 40
    },
    warranty: "2 years comprehensive warranty (2 year warranty on motor only)",
    powerConsumption: "220W",
    tankCapacity: "85L",
    airThrow: "45 feet",
    coolingArea: "385 sq ft",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },

  // NEW WINTRY Series - Desert Coolers
  {
    id: "new-wintry-deluxe-85i",
    name: "NEW WINTRY DELUXE 85i",
    slug: "new-wintry-deluxe-85i",
    description: "The NEW WINTRY DELUXE 85i is an intelligent desert cooler with digital features suitable for 385 sq.ft. area. Features sensor touch control panel, intelligent remote, and advanced cooling technology.",
    shortDescription: "Intelligent desert cooler with digital control features",
    images: ["/src/assets/desert-coolers-category.jpg"],
    price: 28999,
    originalPrice: 34999,
    category: mangoCategories[3], // Desert Coolers
    brand: "Mango",
    sku: "NWD85I",
    inStock: true,
    stockQuantity: 8,
    rating: 4.8,
    reviewCount: 35,
    specifications: {
      "Area Coverage": "385 sq.ft.",
      "Air Delivery": "3300 M³/HR",
      "Cooling Medium": "3 Honeycomb Pads",
      "Power Consumption": "220W",
      "Digital Control": "Yes",
      "Remote Control": "Yes",
      "Timer": "12 hours",
      "Empty Tank Alarm": "Yes"
    },
    features: [
      "Pump protection technology",
      "Silent performance",
      "Dynamic cooling",
      "Patented registered design",
      "Powerful air throw with auto-swing",
      "Large tank capacity",
      "High efficiency cooling pads",
      "Works on inverter",
      "Castor wheels",
      "Empty tank alarm",
      "Sensor touch digital control panel",
      "Intelligent remote",
      "12h timer"
    ],
    tags: ["desert-cooler", "intelligent", "digital-control", "premium"],
    dimensions: {
      length: 700,
      width: 500,
      height: 1300,
      weight: 42
    },
    warranty: "2 years comprehensive warranty (2 year warranty on motor only)",
    powerConsumption: "220W",
    tankCapacity: "85L",
    airThrow: "45 feet",
    coolingArea: "385 sq ft",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },

  // ARCTIC DC Series - Desert Coolers
  {
    id: "arctic-dc-70",
    name: "ARCTIC DC-70",
    slug: "arctic-dc-70",
    description: "The ARCTIC DC-70 is a premium desert cooler suitable for 360 sq.ft. area with 3100 M³/HR air delivery. Features pump protection, powerful air throw, and high efficiency cooling for large spaces.",
    shortDescription: "Premium desert cooler with powerful cooling performance",
    images: ["/src/assets/desert-coolers-category.jpg"],
    price: 22999,
    originalPrice: 27999,
    category: mangoCategories[3], // Desert Coolers
    brand: "Mango",
    sku: "ADC70",
    inStock: true,
    stockQuantity: 12,
    rating: 4.6,
    reviewCount: 52,
    specifications: {
      "Area Coverage": "360 sq.ft.",
      "Air Delivery": "3100 M³/HR",
      "Cooling Medium": "Honeycomb Pads",
      "Power Consumption": "200W",
      "Pump Protection": "Yes",
      "Auto Swing": "Yes",
      "Inverter Support": "Yes"
    },
    features: [
      "Pump protection",
      "Silent performance",
      "Powerful air throw with auto-swing",
      "High efficiency cooling pads",
      "Works on inverter",
      "Castor wheels",
      "Dynamic cooling",
      "Patented registered design"
    ],
    tags: ["desert-cooler", "premium", "powerful", "efficient"],
    dimensions: {
      length: 680,
      width: 480,
      height: 1250,
      weight: 38
    },
    warranty: "2 years comprehensive warranty (2 year warranty on motor only)",
    powerConsumption: "200W",
    tankCapacity: "70L",
    airThrow: "42 feet",
    coolingArea: "360 sq ft",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },

  // ARMY FORCE Series - Commercial Coolers
  {
    id: "army-force-120-g",
    name: "ARMY FORCE 120-G",
    slug: "army-force-120-g",
    description: "The ARMY FORCE 120-G is a heavy-duty commercial cooler suitable for 565 sq.ft. area with 4800 M³/HR air delivery. Features pump protection technology and lockable heavy-duty castor wheels for commercial use.",
    shortDescription: "Heavy-duty commercial cooler for large commercial spaces",
    images: ["/src/assets/industrial-coolers-category.jpg"],
    price: 35999,
    originalPrice: 42999,
    category: mangoCategories[4], // Commercial Coolers
    brand: "Mango",
    sku: "AF120G",
    inStock: true,
    stockQuantity: 6,
    rating: 4.5,
    reviewCount: 28,
    specifications: {
      "Area Coverage": "565 sq.ft.",
      "Air Delivery": "4800 M³/HR",
      "Cooling Medium": "3 Honeycomb Pads",
      "Power Consumption": "300W",
      "Type": "Collapsible Cooler",
      "Louvers": "Yes",
      "Grill": "Yes"
    },
    features: [
      "Pump protection",
      "Silent technology",
      "Powerful air throw with auto-swing",
      "High efficiency cooling pads",
      "Works on inverter",
      "Lockable heavy duty castor wheels",
      "Dynamic cooling",
      "Patented registered design"
    ],
    tags: ["commercial-cooler", "heavy-duty", "lockable-wheels", "high-capacity"],
    dimensions: {
      length: 800,
      width: 600,
      height: 1400,
      weight: 55
    },
    warranty: "2 years comprehensive warranty (2 year warranty on motor only)",
    powerConsumption: "300W",
    tankCapacity: "120L",
    airThrow: "50 feet",
    coolingArea: "565 sq ft",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },

  // MAX 8D Series - Commercial Coolers
  {
    id: "max-8d-130",
    name: "MAX 8D 130",
    slug: "max-8d-130",
    description: "The MAX 8D 130 is a premium commercial cooler suitable for 1000 sq.ft. area with 8500 M³/HR air delivery. Features powerful cooling performance with lockable heavy-duty castor wheels for commercial applications.",
    shortDescription: "Premium commercial cooler with maximum cooling power",
    images: ["/src/assets/industrial-coolers-category.jpg"],
    price: 45999,
    originalPrice: 54999,
    category: mangoCategories[4], // Commercial Coolers
    brand: "Mango",
    sku: "M8D130",
    inStock: true,
    stockQuantity: 4,
    rating: 4.7,
    reviewCount: 19,
    specifications: {
      "Area Coverage": "1000 sq.ft.",
      "Air Delivery": "8500 M³/HR",
      "Cooling Medium": "Honeycomb Pads",
      "Power Consumption": "400W",
      "Type": "Commercial Cooler",
      "Heavy Duty": "Yes"
    },
    features: [
      "Pump protection",
      "Silent performance",
      "Powerful air throw with auto-swing",
      "Large tank capacity",
      "High efficiency cooling pads",
      "Works on inverter",
      "Lockable heavy duty castor wheels",
      "Dynamic cooling",
      "Patented registered design"
    ],
    tags: ["commercial-cooler", "maximum-power", "heavy-duty", "premium"],
    dimensions: {
      length: 850,
      width: 650,
      height: 1500,
      weight: 65
    },
    warranty: "2 years comprehensive warranty (2 year warranty on motor only)",
    powerConsumption: "400W",
    tankCapacity: "130L",
    airThrow: "55 feet",
    coolingArea: "1000 sq ft",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },

  // VAAYU Series - Industrial Coolers
  {
    id: "vaayu-150",
    name: "VAAYU 150",
    slug: "vaayu-150",
    description: "The VAAYU 150 is a high-capacity industrial cooler suitable for 1880 sq.ft. area with 16000 M³/HR air delivery. Features pump protection technology and lockable heavy-duty castor wheels for industrial applications.",
    shortDescription: "High-capacity industrial cooler for large industrial spaces",
    images: ["/src/assets/industrial-coolers-category.jpg"],
    price: 65999,
    originalPrice: 79999,
    category: mangoCategories[5], // Industrial Coolers
    brand: "Mango",
    sku: "VAY150",
    inStock: true,
    stockQuantity: 3,
    rating: 4.8,
    reviewCount: 15,
    specifications: {
      "Area Coverage": "1880 sq.ft.",
      "Air Delivery": "16000 M³/HR",
      "Cooling Medium": "Honeycomb Pads",
      "Power Consumption": "600W",
      "Type": "Industrial Cooler",
      "Heavy Duty": "Yes"
    },
    features: [
      "Pump protection technology",
      "Silent performance",
      "Powerful air throw with auto-swing",
      "Large tank capacity",
      "High efficiency cooling pads",
      "Works on inverter",
      "Lockable heavy duty castor wheels",
      "Dynamic cooling",
      "Patented registered design"
    ],
    tags: ["industrial-cooler", "high-capacity", "heavy-duty", "powerful"],
    dimensions: {
      length: 1000,
      width: 750,
      height: 1600,
      weight: 85
    },
    warranty: "2 years comprehensive warranty (2 year warranty on motor only)",
    powerConsumption: "600W",
    tankCapacity: "150L",
    airThrow: "60 feet",
    coolingArea: "1880 sq ft",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  },

  // NAVY COOL Series - Industrial Coolers
  {
    id: "navy-cool-150",
    name: "NAVY COOL 150",
    slug: "navy-cool-150",
    description: "The NAVY COOL 150 is a premium industrial cooler suitable for 1880 sq.ft. area with 16000 M³/HR air delivery. Features advanced cooling technology with pump protection and heavy-duty construction for industrial use.",
    shortDescription: "Premium industrial cooler with advanced cooling technology",
    images: ["/src/assets/industrial-coolers-category.jpg"],
    price: 69999,
    originalPrice: 84999,
    category: mangoCategories[5], // Industrial Coolers
    brand: "Mango",
    sku: "NC150",
    inStock: true,
    stockQuantity: 2,
    rating: 4.9,
    reviewCount: 12,
    specifications: {
      "Area Coverage": "1880 sq.ft.",
      "Air Delivery": "16000 M³/HR",
      "Cooling Medium": "Honeycomb Pads",
      "Power Consumption": "600W",
      "Type": "Industrial Cooler",
      "Premium": "Yes"
    },
    features: [
      "Pump protection technology",
      "Silent performance",
      "Powerful air throw with auto-swing",
      "Large tank capacity",
      "High efficiency cooling pads",
      "Works on inverter",
      "Lockable heavy duty castor wheels",
      "Dynamic cooling",
      "Patented registered design"
    ],
    tags: ["industrial-cooler", "premium", "advanced-technology", "heavy-duty"],
    dimensions: {
      length: 1000,
      width: 750,
      height: 1600,
      weight: 87
    },
    warranty: "2 years comprehensive warranty (2 year warranty on motor only)",
    powerConsumption: "600W",
    tankCapacity: "150L",
    airThrow: "60 feet",
    coolingArea: "1880 sq ft",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z"
  }
];

// Featured products from the Mango catalogue
export const mangoFeaturedProducts = mangoProducts.slice(0, 8);

// All products combined (main products + spares can be added later)
export const allMangoProducts = [...mangoProducts];