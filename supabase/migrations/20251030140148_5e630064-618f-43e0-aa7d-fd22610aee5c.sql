-- Add new product Arctic Pc 40 to personal coolers
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
  'Arctic Pc 40',
  'arctic-pc-40',
  'personal-coolers',
  'Mango Appliances',
  'Arctic Pc 40',
  'Arctic Pc 40 Personal Air Cooler - Powerful cooling for medium-sized spaces',
  4799,
  55,
  jsonb_build_array(
    '/products/arctic-pc-40-1.jpg',
    '/products/arctic-pc-40-2.jpg',
    '/products/arctic-pc-40-3.jpg',
    '/products/arctic-pc-40-4.jpg'
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