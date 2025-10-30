-- Rename Punch 20i to Nexon 60
UPDATE products
SET
  name = 'Nexon 60',
  slug = 'nexon-60',
  model = 'Nexon 60',
  updated_at = now()
WHERE (slug ILIKE '%punch%20i%' OR slug = 'punch-20i' OR name ILIKE '%punch 20i%' OR name ILIKE '%punch-20i%') 
  AND category = 'personal-coolers';