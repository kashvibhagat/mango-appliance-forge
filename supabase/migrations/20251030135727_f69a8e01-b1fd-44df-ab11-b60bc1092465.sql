-- Add new product Arctic Pc 20 to personal coolers
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
  'Arctic Pc 20',
  'arctic-pc-20',
  'personal-coolers',
  'Mango Appliances',
  'Arctic Pc 20',
  'Arctic Pc 20 Personal Air Cooler - Compact and efficient cooling for small spaces',
  3499,
  60,
  jsonb_build_array(
    '/products/arctic-pc-20-1.jpg',
    '/products/arctic-pc-20-2.jpg',
    '/products/arctic-pc-20-3.jpg',
    '/products/arctic-pc-20-4.jpg'
  ),
  jsonb_build_object(
    'Tank Capacity', '20L',
    'Air Throw', '25 feet',
    'Cooling Area', '100 sq ft',
    'Power Consumption', '120W',
    'Speed Settings', '3 Speed',
    'Water Level Indicator', 'Yes',
    'Castor Wheels', 'Yes'
  ),
  12,
  true
);