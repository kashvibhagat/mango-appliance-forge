-- Update Glacial product images
UPDATE products 
SET images = '["/products/glacial-1.jpg", "/products/glacial-2.jpg", "/products/glacial-3.jpg", "/products/glacial-4.jpg", "/products/glacial-5.jpg"]'::jsonb
WHERE model = 'G-016';