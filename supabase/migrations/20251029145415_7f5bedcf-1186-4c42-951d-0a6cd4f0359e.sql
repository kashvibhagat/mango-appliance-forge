-- Update Industrial Cool Pro 150 with new images
UPDATE products
SET images = jsonb_build_array(
    '/products/industrial-cool-pro-150-1.jpg',
    '/products/industrial-cool-pro-150-2.jpg',
    '/products/industrial-cool-pro-150-3.jpg',
    '/products/industrial-cool-pro-150-4.jpg'
  ),
  updated_at = now()
WHERE slug = 'industrial-cool-pro-150';