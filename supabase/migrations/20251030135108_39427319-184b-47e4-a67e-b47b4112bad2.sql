-- Update Punch 20i product with new images
UPDATE products
SET
  images = jsonb_build_array(
    '/products/punch-20i-1.jpg',
    '/products/punch-20i-2.jpg',
    '/products/punch-20i-3.jpg',
    '/products/punch-20i-4.jpg'
  ),
  updated_at = now()
WHERE (slug ILIKE '%punch%20i%' OR slug = 'punch-20i' OR name ILIKE '%punch 20i%' OR name ILIKE '%punch-20i%') 
  AND category = 'personal-coolers';