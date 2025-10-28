-- Update TC 15 Tower Cooler product images
UPDATE products 
SET images = '["/products/tc-15-1.jpg", "/products/tc-15-2.jpg", "/products/tc-15-3.jpg", "/products/tc-15-4.jpg"]'::jsonb
WHERE name ILIKE '%TC%15%' OR model ILIKE '%TC%15%';