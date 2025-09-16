-- Update product images to use correct public paths
UPDATE products 
SET images = CASE 
  WHEN category = 'personal-coolers' THEN '["/products/product-personal-cooler.jpg"]'::jsonb
  WHEN category = 'tower-coolers' THEN '["/products/product-tower-cooler.jpg"]'::jsonb
  WHEN category = 'desert-coolers' THEN '["/products/product-tower-cooler.jpg"]'::jsonb
  WHEN category = 'industrial-coolers' THEN '["/products/product-tower-cooler.jpg"]'::jsonb
  WHEN category = 'spare-parts' THEN '["/products/product-spare-parts.jpg"]'::jsonb
  ELSE images
END
WHERE images::text LIKE '%src/assets%';