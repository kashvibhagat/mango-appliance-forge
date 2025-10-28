-- Update Army Cool product with additional images
UPDATE products 
SET images = jsonb_build_array(
  '/products/army-cool-1.jpg',
  '/products/army-cool-2.jpg',
  '/products/army-cool-3.jpg',
  '/products/army-cool-4.jpg',
  '/products/army-cool-5.jpg',
  '/products/army-cool-6.jpg',
  '/products/army-cool-7.jpg',
  '/products/army-cool-8.jpg'
)
WHERE slug = 'army-cool';