-- Add compatible_products field to products table for spare parts
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS compatible_products jsonb DEFAULT '[]'::jsonb;

COMMENT ON COLUMN products.compatible_products IS 'Array of product names or slugs that this spare part is compatible with';

-- Update existing spare parts with compatibility based on their specifications
UPDATE products 
SET compatible_products = '["all"]'::jsonb
WHERE category = 'spare-parts';