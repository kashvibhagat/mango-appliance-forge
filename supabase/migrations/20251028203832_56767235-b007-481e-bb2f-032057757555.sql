-- Rename Army Cool to Army Force
UPDATE products 
SET 
  name = 'Army Force',
  slug = 'army-force'
WHERE slug = 'army-cool';