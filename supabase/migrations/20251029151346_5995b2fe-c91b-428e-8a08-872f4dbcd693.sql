-- Insert new 4D MAX Cooler product
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
  '4D MAX Cooler',
  '4d-max-cooler',
  'Premium 4D industrial duct cooler with advanced cooling technology and large tank capacity. Designed for superior performance in industrial and commercial environments with powerful airflow and robust construction.',
  'industrial-coolers',
  'Mango Appliances',
  '4D MAX',
  42999,
  12,
  jsonb_build_array(
    '/products/4d-max-1.jpg',
    '/products/4d-max-2.jpg',
    '/products/4d-max-3.jpg',
    '/products/4d-max-4.jpg'
  ),
  jsonb_build_object(
    'Tank Capacity', '180L',
    'Air Throw', '45 feet',
    'Cooling Area', '700-900 sq.ft',
    'Power Consumption', '320W',
    'Fan Speed', '3 Speed Settings',
    'Duct Type', '4D Duct System',
    'Water Level Indicator', 'Yes',
    'Castor Wheels', 'Heavy-duty wheels',
    'Motor Type', 'Industrial Grade'
  ),
  24,
  true
);