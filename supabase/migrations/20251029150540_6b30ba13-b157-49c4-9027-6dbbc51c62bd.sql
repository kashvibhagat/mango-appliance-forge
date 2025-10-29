-- Insert new 8D MAX Cooler product
INSERT INTO products (
  name,
  slug,
  description,
  category,
  brand,
  model,
  price,
  stock_quantity,
  images,
  specifications,
  warranty_period,
  is_active
) VALUES (
  '8D MAX Cooler',
  '8d-max-cooler',
  'High-performance 8D industrial duct cooler with large tank capacity, designed for maximum cooling efficiency in industrial and commercial spaces. Features powerful airflow and durable construction.',
  'Industrial Coolers',
  'Mango Appliances',
  '8D MAX',
  45999,
  15,
  jsonb_build_array(
    '/products/8d-max-1.jpg',
    '/products/8d-max-2.jpg',
    '/products/8d-max-3.jpg',
    '/products/8d-max-4.jpg'
  ),
  jsonb_build_object(
    'Tank Capacity', '200L',
    'Air Throw', '40 feet',
    'Cooling Area', '800-1000 sq.ft',
    'Power Consumption', '350W',
    'Fan Speed', '3 Speed Settings',
    'Duct Type', '4D Duct System',
    'Water Level Indicator', 'Yes',
    'Castor Wheels', 'Yes',
    'Motor Type', 'Heavy Duty'
  ),
  24,
  true
);