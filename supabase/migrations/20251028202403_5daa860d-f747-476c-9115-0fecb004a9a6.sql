-- Add Army Cool industrial cooler product
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
  'Army Cool',
  'army-cool',
  'The Army Cool is a premium industrial air cooler featuring advanced cooling technology with a powerful blower and honeycomb cooling pads. Designed for large industrial spaces, warehouses, and commercial facilities, it delivers exceptional cooling performance with energy-efficient operation and durable construction.',
  42999,
  10,
  'industrial-coolers',
  'Mango',
  'AC-IND-004',
  '["/products/army-cool-1.jpg", "/products/army-cool-2.jpg", "/products/army-cool-3.jpg", "/products/army-cool-4.jpg"]'::jsonb,
  '{"Pump": "High-capacity industrial pump", "Material": "Heavy-duty plastic and metal construction", "Air Throw": "75 feet", "Room Size": "Up to 1400 sq ft", "Tank Capacity": "65 Liters", "Power Consumption": "270 Watts", "Cooling Area": "1400 sq ft", "Pad Type": "Premium honeycomb cooling pads", "Wheels": "360-degree rotating castor wheels"}'::jsonb,
  36,
  true
);