-- Update Industrial Cool Max 200 with new images
UPDATE products
SET images = jsonb_build_array(
    '/products/industrial-cool-max-200-1.jpg',
    '/products/industrial-cool-max-200-2.jpg',
    '/products/industrial-cool-max-200-3.jpg',
    '/products/industrial-cool-max-200-4.jpg'
  ),
  updated_at = now()
WHERE slug = 'industrial-cool-max-200';