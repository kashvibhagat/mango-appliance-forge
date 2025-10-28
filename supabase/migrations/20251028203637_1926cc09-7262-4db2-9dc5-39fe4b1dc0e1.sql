-- Replace Army Cool product images with new ones
UPDATE products 
SET images = jsonb_build_array(
  '/products/army-cool-new-1.jpg',
  '/products/army-cool-new-2.jpg',
  '/products/army-cool-new-3.jpg',
  '/products/army-cool-new-4.jpg'
)
WHERE slug = 'army-cool';