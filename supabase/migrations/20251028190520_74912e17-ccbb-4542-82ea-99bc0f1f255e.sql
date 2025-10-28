-- Update Wintry product images
UPDATE products 
SET images = '["/products/wintry-1.jpg", "/products/wintry-2.jpg", "/products/wintry-3.jpg", "/products/wintry-4.jpg"]'::jsonb
WHERE model = 'WINTRY' OR name ILIKE '%wintry%';