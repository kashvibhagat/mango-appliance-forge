-- Update Wintry Deluxe product images
UPDATE products 
SET images = '["/products/wintry-deluxe-1.jpg", "/products/wintry-deluxe-2.jpg", "/products/wintry-deluxe-3.jpg", "/products/wintry-deluxe-4.jpg"]'::jsonb
WHERE name ILIKE '%wintry%deluxe%' OR model ILIKE '%wintry%deluxe%';