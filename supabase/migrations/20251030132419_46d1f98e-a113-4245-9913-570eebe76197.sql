-- Update Punch 20 product with new images
UPDATE products
SET
  images = jsonb_build_array(
    '/products/punch-20-1.png',
    '/products/punch-20-2.png',
    '/products/punch-20-3.png',
    '/products/punch-20-4.png'
  ),
  updated_at = now()
WHERE (slug = 'punch-20' OR name ILIKE '%punch 20%' OR name ILIKE '%punch-20%') 
  AND category = 'personal-coolers';