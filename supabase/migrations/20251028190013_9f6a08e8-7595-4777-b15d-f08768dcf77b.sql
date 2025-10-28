-- Update Glacial-i product images
UPDATE products 
SET images = '["/products/glacial-i-1.jpg", "/products/glacial-i-2.png", "/products/glacial-i-3.png", "/products/glacial-i-4.png"]'::jsonb
WHERE model = 'G-I-015';