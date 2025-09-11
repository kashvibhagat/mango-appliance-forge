import { Product, ProductCategory } from '@/types/product';

// Define spare parts category directly to avoid circular dependency
const sparePartsCategory: ProductCategory = {
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
};

export const spareProducts: Product[] = [
  {
    id: "spare-1",
    name: "Water Pump - Standard",
    slug: "water-pump-standard", 
    description: "High-quality replacement water pump for Mango air coolers. Compatible with most personal and tower cooler models.",
    shortDescription: "Replacement water pump for air coolers",
    images: ["/src/assets/product-spare-parts.jpg"],
    price: 899,
    originalPrice: 1199,
    category: sparePartsCategory,
    brand: "Mango",
    sku: "PUMP-STD-001",
    inStock: true,
    stockQuantity: 50,
    rating: 4.4,
    reviewCount: 32,
    specifications: {
      "Type": "Submersible Water Pump",
      "Power": "18W",
      "Voltage": "220-240V",
      "Compatibility": "Personal & Tower Coolers"
    },
    features: ["Easy installation", "Durable motor", "Energy efficient", "Quiet operation"],
    tags: ["pump", "replacement", "genuine"],
    warranty: "1 year warranty",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "spare-2", 
    name: "Motor Assembly - High Power",
    slug: "motor-assembly-high-power",
    description: "Heavy-duty motor assembly for desert and industrial coolers. High-performance replacement part.",
    shortDescription: "High-power motor for desert coolers",
    images: ["/src/assets/product-spare-parts.jpg"],
    price: 2499,
    originalPrice: 2999,
    category: sparePartsCategory,
    brand: "Mango",
    sku: "MOTOR-HP-002",
    inStock: true,
    stockQuantity: 25,
    rating: 4.6,
    reviewCount: 18,
    specifications: {
      "Type": "Motor Assembly",
      "Power": "180W",
      "RPM": "1350",
      "Compatibility": "Desert & Industrial Coolers"
    },
    features: ["High torque", "Copper winding", "Ball bearing", "Maintenance free"],
    tags: ["motor", "heavy-duty", "replacement"],
    warranty: "2 years warranty",
    createdAt: "2024-01-01T00:00:00Z", 
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "spare-3",
    name: "Honeycomb Cooling Pads - Set of 4",
    slug: "honeycomb-cooling-pads-set",
    description: "Premium honeycomb cooling pads for maximum cooling efficiency. Set of 4 pads suitable for most cooler models.",
    shortDescription: "Honeycomb cooling pads set",
    images: ["/src/assets/product-spare-parts.jpg"],
    price: 1299,
    originalPrice: 1599,
    category: sparePartsCategory,
    brand: "Mango",
    sku: "PAD-HC-003",
    inStock: true,
    stockQuantity: 75,
    rating: 4.5,
    reviewCount: 64,
    specifications: {
      "Material": "Cellulose Paper",
      "Thickness": "100mm",
      "Size": "24 x 12 inches",
      "Quantity": "4 pieces"
    },
    features: ["High water absorption", "Long lasting", "Better cooling", "Easy to install"],
    tags: ["cooling-pads", "honeycomb", "replacement"],
    warranty: "6 months warranty",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];

export const allProductsWithSpares = [...spareProducts];