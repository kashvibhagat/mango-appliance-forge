-- Rename Cool Master i to Chota Bheem and update images
UPDATE products
SET
  name = 'Chota Bheem',
  slug = 'chota-bheem',
  images = jsonb_build_array(
    '/products/chota-bheem-1.jpg',
    '/products/chota-bheem-2.jpg',
    '/products/chota-bheem-3.jpg',
    '/products/chota-bheem-4.jpg'
  ),
  updated_at = now()
WHERE (slug = 'cool-master-i' OR name ILIKE '%cool master i%') 
  AND category = 'personal-coolers';