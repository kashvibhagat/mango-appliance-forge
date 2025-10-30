-- Update Punch 40 product with new images
UPDATE products
SET
  images = jsonb_build_array(
    '/products/punch-40-1.jpg',
    '/products/punch-40-2.jpg',
    '/products/punch-40-3.jpg',
    '/products/punch-40-4.jpg'
  ),
  updated_at = now()
WHERE (slug = 'punch-40' OR name ILIKE '%punch 40%' OR name ILIKE '%punch-40%') 
  AND category = 'personal-coolers';