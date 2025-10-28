-- Update image paths for Artic DC 50L
UPDATE products 
SET images = '["/products/artic-dc-50l-1.jpg", "/products/artic-dc-50l-2.jpg", "/products/artic-dc-50l-3.jpg", "/products/artic-dc-50l-4.jpg", "/products/artic-dc-50l-5.jpg", "/products/artic-dc-50l-6.jpg"]'::jsonb
WHERE model = 'ADC-50L-021';

-- Update image paths for Artic DC 70L
UPDATE products 
SET images = '["/products/artic-dc-70l-1.jpg", "/products/artic-dc-70l-2.jpg", "/products/artic-dc-70l-3.jpg", "/products/artic-dc-70l-4.jpg", "/products/artic-dc-70l-5.jpg", "/products/artic-dc-70l-6.jpg"]'::jsonb
WHERE model = 'ADC-70L-022';