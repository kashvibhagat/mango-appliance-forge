-- Update Thunder Plus product with new images
UPDATE products
SET
  images = jsonb_build_array(
    '/products/thunder-plus-1.jpg',
    '/products/thunder-plus-2.jpg',
    '/products/thunder-plus-3.jpg',
    '/products/thunder-plus-4.jpg'
  ),
  updated_at = now()
WHERE slug = 'thunder-plus';