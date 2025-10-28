-- Insert Artic DC 50L desert cooler product
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
  'Artic DC 50L',
  'The Artic DC 50L is a powerful desert air cooler with a 50-liter water tank capacity, designed for efficient cooling in medium to large spaces. Featuring robust construction, high-efficiency cooling pads, and excellent air circulation, it delivers consistent cooling performance for homes and commercial spaces.',
  'desert-coolers',
  'Mango',
  'ADC-50L-021',
  18499,
  18,
  24,
  true,
  '["artic-dc-50l-1.jpg", "artic-dc-50l-2.jpg", "artic-dc-50l-3.jpg", "artic-dc-50l-4.jpg", "artic-dc-50l-5.jpg", "artic-dc-50l-6.jpg"]'::jsonb,
  '{"Tank Capacity": "50 Liters", "Power Consumption": "215 Watts", "Air Throw": "50 feet", "Room Size": "Up to 750 sq ft", "Pump": "High-efficiency circulation pump", "Material": "Premium Metal Body with Anti-rust Coating"}'::jsonb
);