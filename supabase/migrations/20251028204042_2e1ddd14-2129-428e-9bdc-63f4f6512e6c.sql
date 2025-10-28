-- Insert new Army Cool industrial cooler product
INSERT INTO products (name, slug, category, brand, model, description, price, stock_quantity, is_active, images, specifications, warranty_period)
VALUES (
  'Army Cool',
  'army-cool',
  'Industrial Coolers',
  'Mango Appliances',
  'ARMY-COOL-2024',
  'High-performance industrial air cooler designed for large spaces and demanding environments. Features advanced cooling technology with premium build quality.',
  24999,
  15,
  true,
  jsonb_build_array(
    '/products/army-cool-1.jpg',
    '/products/army-cool-2.jpg',
    '/products/army-cool-3.jpg',
    '/products/army-cool-4.jpg'
  ),
  jsonb_build_object(
    'Tank Capacity', '70L',
    'Cooling Area', '500-600 sq.ft',
    'Air Throw', '45 ft',
    'Power Consumption', '210W',
    'Fan Speed', '3 Speed Settings',
    'Water Level Indicator', 'Yes',
    'Caster Wheels', 'Yes',
    'Humidity Control', 'Yes'
  ),
  12
);