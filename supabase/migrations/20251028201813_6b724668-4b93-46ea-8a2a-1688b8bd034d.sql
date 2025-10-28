-- Add Bharat Army industrial cooler product
INSERT INTO products (
  name,
  slug,
  description,
  price,
  stock_quantity,
  category,
  brand,
  model,
  images,
  specifications,
  warranty_period,
  is_active
) VALUES (
  'Bharat Army',
  'bharat-army',
  'The Bharat Army is a robust industrial air cooler designed for heavy-duty cooling in large industrial spaces, warehouses, and manufacturing facilities. Featuring high-capacity cooling pads, powerful air circulation, and durable construction, it delivers exceptional cooling performance for demanding environments.',
  45999,
  8,
  'industrial-coolers',
  'Mango',
  'BA-18-003',
  '["/products/bharat-army-1.jpg", "/products/bharat-army-2.jpg", "/products/bharat-army-3.jpg", "/products/bharat-army-4.jpg", "/products/bharat-army-5.jpg"]'::jsonb,
  '{"Pump": "High-pressure industrial pump", "Material": "Heavy-duty metal body with corrosion-resistant coating", "Air Throw": "80 feet", "Room Size": "Up to 1500 sq ft", "Tank Capacity": "70 Liters", "Power Consumption": "280 Watts", "Cooling Area": "1500 sq ft", "Pad Type": "Industrial-grade honeycomb pads", "Wheels": "Heavy-duty castor wheels"}'::jsonb,
  36,
  true
);