-- Update Cool Master product with new images
UPDATE products
SET
  images = jsonb_build_array(
    '/products/cool-master-1.jpg',
    '/products/cool-master-2.jpg',
    '/products/cool-master-3.jpg',
    '/products/cool-master-4.jpg'
  ),
  updated_at = now()
WHERE (slug = 'cool-master' OR slug = 'cool-master-25l' OR name ILIKE '%cool master%') 
  AND category = 'personal-coolers';