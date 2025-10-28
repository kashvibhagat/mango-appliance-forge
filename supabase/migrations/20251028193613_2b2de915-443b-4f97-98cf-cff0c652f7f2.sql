-- Update Wintry Deluxe-i 70L product images
UPDATE products 
SET images = '["/products/wintry-deluxe-i-1.jpg", "/products/wintry-deluxe-i-2.jpg", "/products/wintry-deluxe-i-3.jpg"]'::jsonb
WHERE name ILIKE '%wintry%deluxe%i%70%' OR model ILIKE '%wintry%deluxe%i%70%';