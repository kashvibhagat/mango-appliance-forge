-- Update Punch 40i product with new images
UPDATE products
SET
  images = jsonb_build_array(
    '/products/punch-40i-1.jpg',
    '/products/punch-40i-2.jpg',
    '/products/punch-40i-3.jpg',
    '/products/punch-40i-4.jpg'
  ),
  updated_at = now()
WHERE (slug = 'punch-40i' OR name ILIKE '%punch 40i%' OR name ILIKE '%punch-40i%') 
  AND category = 'personal-coolers';