-- Rename Punch 40i to Punch 60
UPDATE products
SET
  name = 'Punch 60',
  slug = 'punch-60',
  updated_at = now()
WHERE (slug = 'punch-40i' OR name ILIKE '%punch 40i%' OR name ILIKE '%punch-40i%') 
  AND category = 'personal-coolers';