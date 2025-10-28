-- Insert Artic DC 70L desert cooler product
INSERT INTO products (
  name, 
  description, 
  category, 
  brand, 
  model,
  price,
  stock_quantity,
  warranty_period,
  is_active,
  images,
  specifications
) VALUES (
  'Artic DC 70L',
  'The Artic DC 70L is a high-capacity desert air cooler with a 70-liter water tank, designed for powerful cooling in large spaces and commercial environments. Equipped with advanced cooling technology, robust construction, and superior air circulation, it ensures optimal cooling performance for extended periods.',
  'desert-coolers',
  'Mango',
  'ADC-70L-022',
  22999,
  15,
  24,
  true,
  '["artic-dc-70l-1.jpg", "artic-dc-70l-2.jpg", "artic-dc-70l-3.jpg", "artic-dc-70l-4.jpg", "artic-dc-70l-5.jpg", "artic-dc-70l-6.jpg"]'::jsonb,
  '{"Tank Capacity": "70 Liters", "Power Consumption": "240 Watts", "Air Throw": "60 feet", "Room Size": "Up to 1000 sq ft", "Pump": "High-efficiency circulation pump", "Material": "Premium Metal Body with Anti-rust Coating"}'::jsonb
);