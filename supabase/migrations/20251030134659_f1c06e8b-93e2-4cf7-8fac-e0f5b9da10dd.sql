-- Add new product Nexon 40 to personal coolers
INSERT INTO products (
  name,
  slug,
  category,
  brand,
  model,
  description,
  price,
  stock_quantity,
  images,
  specifications,
  warranty_period,
  is_active
) VALUES (
  'Nexon 40',
  'nexon-40',
  'personal-coolers',
  'Mango Appliances',
  'Nexon 40',
  'Nexon 40 Personal Air Cooler - Efficient cooling solution for personal spaces',
  4999,
  50,
  jsonb_build_array(
    '/products/nexon-40-1.jpg',
    '/products/nexon-40-2.jpg',
    '/products/nexon-40-3.jpg',
    '/products/nexon-40-4.jpg'
  ),
  jsonb_build_object(
    'Tank Capacity', '40L',
    'Air Throw', '30 feet',
    'Cooling Area', '150 sq ft',
    'Power Consumption', '160W',
    'Speed Settings', '3 Speed',
    'Water Level Indicator', 'Yes',
    'Castor Wheels', 'Yes'
  ),
  12,
  true
);