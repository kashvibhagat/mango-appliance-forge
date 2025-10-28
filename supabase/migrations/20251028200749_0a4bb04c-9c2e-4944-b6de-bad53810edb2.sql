-- Remove Glacial Deluxe and Glacial Deluxe-I products
DELETE FROM products 
WHERE name ILIKE '%glacial%deluxe%';