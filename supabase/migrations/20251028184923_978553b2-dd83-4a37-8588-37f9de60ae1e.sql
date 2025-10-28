-- Add slug column to products table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' AND column_name = 'slug'
  ) THEN
    ALTER TABLE products ADD COLUMN slug TEXT;
  END IF;
END $$;

-- Generate slugs for existing products (name to lowercase with hyphens)
UPDATE products 
SET slug = LOWER(REPLACE(name, ' ', '-'))
WHERE slug IS NULL OR slug = '';

-- Create unique index on slug
CREATE UNIQUE INDEX IF NOT EXISTS products_slug_unique ON products(slug);