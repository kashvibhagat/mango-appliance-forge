-- Add new product Arctic Pc 55 to personal coolers
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
  'Arctic Pc 55',
  'arctic-pc-55',
  'personal-coolers',
  'Mango Appliances',
  'Arctic Pc 55',
  'Arctic Pc 55 Personal Air Cooler - Enhanced cooling capacity for larger spaces',
  5499,
  45,
  jsonb_build_array(
    '/products/arctic-pc-55-1.jpg',
    '/products/arctic-pc-55-2.jpg',
    '/products/arctic-pc-55-3.jpg',
    '/products/arctic-pc-55-4.jpg'
  ),
  jsonb_build_object(
    'Tank Capacity', '55L',
    'Air Throw', '35 feet',
    'Cooling Area', '180 sq ft',
    'Power Consumption', '180W',
    'Speed Settings', '3 Speed',
    'Water Level Indicator', 'Yes',
    'Castor Wheels', 'Yes'
  ),
  12,
  true
);