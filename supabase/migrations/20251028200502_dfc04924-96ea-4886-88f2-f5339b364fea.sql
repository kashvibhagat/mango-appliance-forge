-- Update TC 40 Tower Cooler product images
UPDATE products 
SET images = '["/products/tc-40-1.jpg", "/products/tc-40-2.jpg", "/products/tc-40-3.jpg", "/products/tc-40-4.jpg"]'::jsonb
WHERE name ILIKE '%TC%40%' OR model ILIKE '%TC%40%';