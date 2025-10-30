-- Rename Thunder Plus i to Nexon 20
UPDATE products
SET
  name = 'Nexon 20',
  slug = 'nexon-20',
  updated_at = now()
WHERE (slug ILIKE '%thunder%plus%i%' OR slug ILIKE '%thunder-plus-i%' OR name ILIKE '%thunder plus i%' OR name ILIKE '%thunder-plus-i%') 
  AND category = 'personal-coolers';