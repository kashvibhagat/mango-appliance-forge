-- Update TC 25 Tower Cooler product images
UPDATE products 
SET images = '["/products/tc-25-1.jpg", "/products/tc-25-2.jpg", "/products/tc-25-3.jpg", "/products/tc-25-4.jpg"]'::jsonb
WHERE name ILIKE '%TC%25%' OR model ILIKE '%TC%25%';