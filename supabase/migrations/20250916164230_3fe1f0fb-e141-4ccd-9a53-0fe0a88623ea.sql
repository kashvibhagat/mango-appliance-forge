-- Migrate all product data from TypeScript to Supabase database
-- First, let's insert all the products from the TypeScript data

-- Personal Coolers
INSERT INTO public.products (
  id, name, description, category, brand, model, price, stock_quantity, 
  images, specifications, warranty_period, is_active, created_at, updated_at
) VALUES 
-- Cool Master i
(
  '1'::uuid,
  'Cool Master i',
  'The Cool Master i is a compact and efficient personal air cooler designed for individual comfort. With its sleek design and powerful cooling capacity, it''s perfect for small rooms and personal spaces. Features honeycomb cooling pads, multi-directional air throw, and energy-efficient operation.',
  'personal-coolers',
  'Mango',
  'CM-I-001',
  8999,
  25,
  '["src/assets/product-personal-cooler.jpg"]'::jsonb,
  '{"Tank Capacity": "25 Liters", "Power Consumption": "150 Watts", "Air Throw": "30 feet", "Room Size": "Up to 250 sq ft", "Pump": "Submersible pump included", "Material": "ABS Plastic Body"}'::jsonb,
  24,
  true,
  '2024-01-15T00:00:00Z'::timestamp with time zone,
  '2024-01-15T00:00:00Z'::timestamp with time zone
),
-- Cool Master
(
  '2'::uuid,
  'Cool Master',
  'The Cool Master is a reliable personal air cooler offering excellent cooling performance for small to medium rooms. Features durable construction, efficient cooling pads, and user-friendly controls for comfortable operation.',
  'personal-coolers',
  'Mango',
  'CM-002',
  7999,
  30,
  '["src/assets/product-personal-cooler.jpg"]'::jsonb,
  '{"Tank Capacity": "20 Liters", "Power Consumption": "140 Watts", "Air Throw": "25 feet", "Room Size": "Up to 200 sq ft", "Pump": "Submersible pump", "Material": "ABS Plastic Body"}'::jsonb,
  24,
  true,
  '2024-01-12T00:00:00Z'::timestamp with time zone,
  '2024-01-12T00:00:00Z'::timestamp with time zone
),
-- Thunder Plus i
(
  '3'::uuid,
  'Thunder Plus i',
  'The Thunder Plus i combines power and efficiency in a personal cooling solution. With enhanced features and modern design, it delivers superior performance for personal comfort in any room setting.',
  'personal-coolers',
  'Mango',
  'TP-I-003',
  9999,
  20,
  '["src/assets/product-personal-cooler.jpg"]'::jsonb,
  '{"Tank Capacity": "30 Liters", "Power Consumption": "160 Watts", "Air Throw": "35 feet", "Room Size": "Up to 300 sq ft", "Pump": "High-efficiency pump", "Material": "ABS Plastic with Metal Grille"}'::jsonb,
  24,
  true,
  '2024-01-08T00:00:00Z'::timestamp with time zone,
  '2024-01-08T00:00:00Z'::timestamp with time zone
),
-- Thunder Plus
(
  '4'::uuid,
  'Thunder Plus',
  'The Thunder Plus offers reliable cooling performance with user-friendly features. Perfect for those seeking a balance between performance and affordability in personal cooling solutions.',
  'personal-coolers',
  'Mango',
  'TP-004',
  8499,
  22,
  '["src/assets/product-personal-cooler.jpg"]'::jsonb,
  '{"Tank Capacity": "28 Liters", "Power Consumption": "155 Watts", "Air Throw": "32 feet", "Room Size": "Up to 280 sq ft", "Pump": "Standard pump", "Material": "ABS Plastic Body"}'::jsonb,
  24,
  true,
  '2024-01-06T00:00:00Z'::timestamp with time zone,
  '2024-01-06T00:00:00Z'::timestamp with time zone
),
-- Arctic TC 15 (Tower Cooler)
(
  '5'::uuid,
  'Arctic TC 15',
  'The Arctic TC 15 is a compact tower air cooler designed for modern living spaces. With its sleek tower design and efficient cooling, it''s perfect for apartments and small offices. Features space-saving design and quiet operation.',
  'tower-coolers',
  'Mango',
  'ATC-15-005',
  10999,
  15,
  '["src/assets/product-tower-cooler.jpg"]'::jsonb,
  '{"Tank Capacity": "15 Liters", "Power Consumption": "120 Watts", "Air Throw": "35 feet", "Room Size": "Up to 300 sq ft", "Pump": "Compact pump", "Material": "ABS Plastic with Metal Grille"}'::jsonb,
  24,
  true,
  '2024-01-14T00:00:00Z'::timestamp with time zone,
  '2024-01-14T00:00:00Z'::timestamp with time zone
),
-- Arctic TC 25 (Tower Cooler)
(
  '6'::uuid,
  'Arctic TC 25',
  'The Arctic TC 25 is a premium tower air cooler that combines style with performance. Its sleek tower design saves space while providing powerful cooling for medium to large rooms. Features advanced honeycomb pads and multiple speed settings.',
  'tower-coolers',
  'Mango',
  'ATC-25-006',
  12999,
  18,
  '["src/assets/product-tower-cooler.jpg"]'::jsonb,
  '{"Tank Capacity": "25 Liters", "Power Consumption": "180 Watts", "Air Throw": "40 feet", "Room Size": "Up to 400 sq ft", "Pump": "High-efficiency pump", "Material": "ABS Plastic with Metal Grille"}'::jsonb,
  36,
  true,
  '2024-01-10T00:00:00Z'::timestamp with time zone,
  '2024-01-10T00:00:00Z'::timestamp with time zone
),
-- Arctic TC 40 (Tower Cooler)
(
  '7'::uuid,
  'Arctic TC 40',
  'The Arctic TC 40 is a high-performance tower cooler designed for large spaces and commercial use. With superior cooling capacity and robust build quality, it delivers exceptional performance for halls, offices, and large rooms.',
  'tower-coolers',
  'Mango',
  'ATC-40-007',
  16999,
  12,
  '["src/assets/product-tower-cooler.jpg"]'::jsonb,
  '{"Tank Capacity": "40 Liters", "Power Consumption": "220 Watts", "Air Throw": "50 feet", "Room Size": "Up to 600 sq ft", "Pump": "High-pressure pump", "Material": "ABS Plastic with Metal Reinforcement"}'::jsonb,
  36,
  true,
  '2024-01-04T00:00:00Z'::timestamp with time zone,
  '2024-01-04T00:00:00Z'::timestamp with time zone
),
-- Wintry Deluxe-i (Desert Cooler)
(
  '8'::uuid,
  'Wintry Deluxe-i',
  'The Wintry Deluxe-i is a premium desert air cooler featuring advanced technology and superior cooling performance. Designed for large spaces with enhanced features like remote control, timer, and high-efficiency cooling pads.',
  'desert-coolers',
  'Mango',
  'WD-I-008',
  22999,
  8,
  '["src/assets/hero-air-cooler.jpg"]'::jsonb,
  '{"Tank Capacity": "65 Liters", "Power Consumption": "250 Watts", "Air Throw": "60 feet", "Room Size": "Up to 1000 sq ft", "Pump": "High-pressure pump with auto-fill", "Material": "Metal Body with Anti-rust Coating"}'::jsonb,
  36,
  true,
  '2024-01-02T00:00:00Z'::timestamp with time zone,
  '2024-01-02T00:00:00Z'::timestamp with time zone
),
-- Wintry Deluxe (Desert Cooler)
(
  '9'::uuid,
  'Wintry Deluxe',
  'The Wintry Deluxe is a high-capacity desert air cooler designed for large spaces and commercial use. With robust build quality and superior cooling performance, it''s ideal for halls, shops, and large rooms.',
  'desert-coolers',
  'Mango',
  'WD-009',
  18999,
  12,
  '["src/assets/hero-air-cooler.jpg"]'::jsonb,
  '{"Tank Capacity": "55 Liters", "Power Consumption": "220 Watts", "Air Throw": "50 feet", "Room Size": "Up to 800 sq ft", "Pump": "High-pressure pump", "Material": "Metal Body with Powder Coating"}'::jsonb,
  36,
  true,
  '2024-01-05T00:00:00Z'::timestamp with time zone,
  '2024-01-05T00:00:00Z'::timestamp with time zone
),
-- Wintry i (Desert Cooler)
(
  '10'::uuid,
  'Wintry i',
  'The Wintry i offers reliable desert cooling performance with modern features. Perfect for medium to large spaces requiring consistent and powerful air circulation with enhanced cooling efficiency.',
  'desert-coolers',
  'Mango',
  'W-I-010',
  16999,
  15,
  '["src/assets/hero-air-cooler.jpg"]'::jsonb,
  '{"Tank Capacity": "45 Liters", "Power Consumption": "200 Watts", "Air Throw": "45 feet", "Room Size": "Up to 600 sq ft", "Pump": "Efficient water pump", "Material": "Metal Body with Protective Coating"}'::jsonb,
  24,
  true,
  '2024-01-07T00:00:00Z'::timestamp with time zone,
  '2024-01-07T00:00:00Z'::timestamp with time zone
),
-- Wintry (Desert Cooler)
(
  '11'::uuid,
  'Wintry',
  'The Wintry is a dependable desert air cooler offering excellent value for money. With solid construction and reliable cooling performance, it''s perfect for those seeking effective cooling solutions for large spaces.',
  'desert-coolers',
  'Mango',
  'W-011',
  14999,
  18,
  '["src/assets/hero-air-cooler.jpg"]'::jsonb,
  '{"Tank Capacity": "40 Liters", "Power Consumption": "180 Watts", "Air Throw": "40 feet", "Room Size": "Up to 500 sq ft", "Pump": "Standard water pump", "Material": "Metal Body"}'::jsonb,
  24,
  true,
  '2024-01-09T00:00:00Z'::timestamp with time zone,
  '2024-01-09T00:00:00Z'::timestamp with time zone
),
-- Glacial Deluxe-i (Desert Cooler)
(
  '13'::uuid,
  'Glacial Deluxe-i',
  'The Glacial Deluxe-i is a premium desert air cooler featuring advanced cooling technology and smart features. With intelligent controls, high-efficiency honeycomb pads, and powerful air circulation, it delivers exceptional cooling for large commercial and residential spaces.',
  'desert-coolers',
  'Mango',
  'GD-I-013',
  24999,
  10,
  '["src/assets/hero-air-cooler.jpg"]'::jsonb,
  '{"Tank Capacity": "70 Liters", "Power Consumption": "260 Watts", "Air Throw": "65 feet", "Room Size": "Up to 1200 sq ft", "Pump": "Smart auto-fill pump system", "Material": "Premium Metal Body with Anti-corrosion Coating"}'::jsonb,
  36,
  true,
  '2024-01-01T00:00:00Z'::timestamp with time zone,
  '2024-01-01T00:00:00Z'::timestamp with time zone
),
-- Glacial Deluxe (Desert Cooler)
(
  '14'::uuid,
  'Glacial Deluxe',
  'The Glacial Deluxe offers superior cooling performance for large spaces with robust construction and enhanced features. Perfect for commercial establishments, large halls, and industrial applications requiring powerful and consistent cooling.',
  'desert-coolers',
  'Mango',
  'GD-014',
  20999,
  14,
  '["src/assets/hero-air-cooler.jpg"]'::jsonb,
  '{"Tank Capacity": "60 Liters", "Power Consumption": "240 Watts", "Air Throw": "55 feet", "Room Size": "Up to 900 sq ft", "Pump": "High-pressure water pump", "Material": "Heavy-duty Metal Body"}'::jsonb,
  36,
  true,
  '2024-01-03T00:00:00Z'::timestamp with time zone,
  '2024-01-03T00:00:00Z'::timestamp with time zone
),
-- Glacial-i (Desert Cooler)
(
  '15'::uuid,
  'Glacial-i',
  'The Glacial-i combines modern technology with reliable desert cooling performance. Features intelligent controls and efficient operation for medium to large spaces requiring consistent and powerful air circulation.',
  'desert-coolers',
  'Mango',
  'G-I-015',
  18999,
  16,
  '["src/assets/hero-air-cooler.jpg"]'::jsonb,
  '{"Tank Capacity": "50 Liters", "Power Consumption": "210 Watts", "Air Throw": "48 feet", "Room Size": "Up to 700 sq ft", "Pump": "Efficient auto-circulation pump", "Material": "Metal Body with Weather Protection"}'::jsonb,
  24,
  true,
  '2024-01-06T00:00:00Z'::timestamp with time zone,
  '2024-01-06T00:00:00Z'::timestamp with time zone
),
-- Glacial (Desert Cooler)
(
  '16'::uuid,
  'Glacial',
  'The Glacial is a reliable desert air cooler designed for consistent performance and value. With solid construction and effective cooling capabilities, it''s ideal for residential and small commercial spaces.',
  'desert-coolers',
  'Mango',
  'G-016',
  16999,
  20,
  '["src/assets/hero-air-cooler.jpg"]'::jsonb,
  '{"Tank Capacity": "42 Liters", "Power Consumption": "190 Watts", "Air Throw": "42 feet", "Room Size": "Up to 550 sq ft", "Pump": "Standard circulation pump", "Material": "Durable Metal Body"}'::jsonb,
  24,
  true,
  '2024-01-08T00:00:00Z'::timestamp with time zone,
  '2024-01-08T00:00:00Z'::timestamp with time zone
),
-- Additional Personal Coolers
-- Punch 20i
(
  '17'::uuid,
  'Punch 20i',
  'The Punch 20i is a compact personal cooler designed for efficient cooling in small spaces. With intelligent features and energy-efficient operation, it delivers powerful performance in a space-saving design perfect for bedrooms and study rooms.',
  'personal-coolers',
  'Mango',
  'P20-I-017',
  7999,
  35,
  '["src/assets/product-personal-cooler.jpg"]'::jsonb,
  '{"Tank Capacity": "20 Liters", "Power Consumption": "130 Watts", "Air Throw": "28 feet", "Room Size": "Up to 200 sq ft", "Pump": "Compact submersible pump", "Material": "High-quality ABS Plastic"}'::jsonb,
  24,
  true,
  '2024-01-16T00:00:00Z'::timestamp with time zone,
  '2024-01-16T00:00:00Z'::timestamp with time zone
),
-- Punch 20
(
  '18'::uuid,
  'Punch 20',
  'The Punch 20 offers reliable personal cooling with straightforward operation and efficient performance. Ideal for individual use in small rooms, offices, and personal spaces requiring consistent cooling comfort.',
  'personal-coolers',
  'Mango',
  'P20-018',
  6999,
  40,
  '["src/assets/product-personal-cooler.jpg"]'::jsonb,
  '{"Tank Capacity": "18 Liters", "Power Consumption": "120 Watts", "Air Throw": "25 feet", "Room Size": "Up to 180 sq ft", "Pump": "Standard water pump", "Material": "Durable ABS Plastic"}'::jsonb,
  24,
  true,
  '2024-01-18T00:00:00Z'::timestamp with time zone,
  '2024-01-18T00:00:00Z'::timestamp with time zone
),
-- Punch 40i
(
  '19'::uuid,
  'Punch 40i',
  'The Punch 40i is a powerful personal cooler with enhanced capacity for larger personal spaces. Features intelligent controls, efficient cooling technology, and robust performance for extended use in medium-sized rooms.',
  'personal-coolers',
  'Mango',
  'P40-I-019',
  11999,
  25,
  '["src/assets/product-personal-cooler.jpg"]'::jsonb,
  '{"Tank Capacity": "40 Liters", "Power Consumption": "170 Watts", "Air Throw": "40 feet", "Room Size": "Up to 350 sq ft", "Pump": "High-efficiency pump", "Material": "Premium ABS with Metal Reinforcement"}'::jsonb,
  24,
  true,
  '2024-01-20T00:00:00Z'::timestamp with time zone,
  '2024-01-20T00:00:00Z'::timestamp with time zone
),
-- Punch 40
(
  '20'::uuid,
  'Punch 40',
  'The Punch 40 delivers enhanced personal cooling performance for larger personal spaces. With reliable operation and robust construction, it provides consistent cooling comfort for extended periods in medium-sized rooms and offices.',
  'personal-coolers',
  'Mango',
  'P40-020',
  10999,
  28,
  '["src/assets/product-personal-cooler.jpg"]'::jsonb,
  '{"Tank Capacity": "38 Liters", "Power Consumption": "165 Watts", "Air Throw": "38 feet", "Room Size": "Up to 320 sq ft", "Pump": "Standard high-capacity pump", "Material": "Reinforced ABS Plastic"}'::jsonb,
  24,
  true,
  '2024-01-22T00:00:00Z'::timestamp with time zone,
  '2024-01-22T00:00:00Z'::timestamp with time zone
);

-- Now let's add some spare parts products
INSERT INTO public.products (
  id, name, description, category, brand, model, price, stock_quantity, 
  images, specifications, warranty_period, is_active, created_at, updated_at
) VALUES 
-- Honeycomb Cooling Pads
(
  '21'::uuid,
  'Honeycomb Cooling Pads - Standard',
  'High-quality honeycomb cooling pads designed for optimal cooling efficiency. Made from natural wood wool fibers with excellent water retention and air flow properties. Compatible with most personal and tower coolers.',
  'spare-parts',
  'Mango',
  'HCP-STD-001',
  899,
  100,
  '["src/assets/product-spare-parts.jpg"]'::jsonb,
  '{"Size": "Various sizes available", "Material": "Natural wood wool fiber", "Thickness": "50mm/100mm", "Compatibility": "Personal and Tower coolers", "Water Retention": "High", "Durability": "1-2 cooling seasons"}'::jsonb,
  12,
  true,
  now(),
  now()
),
-- Water Pump
(
  '22'::uuid,
  'Submersible Water Pump',
  'Replacement submersible water pump for Mango air coolers. Designed for efficient water circulation and long-lasting performance. Easy installation with universal fitting for most Mango cooler models.',
  'spare-parts',
  'Mango',
  'SWP-UNI-002',
  1299,
  50,
  '["src/assets/product-spare-parts.jpg"]'::jsonb,
  '{"Power": "18W", "Flow Rate": "450 LPH", "Head": "1.2 meters", "Material": "ABS Plastic with metal impeller", "Compatibility": "Most Mango cooler models", "Warranty": "1 year"}'::jsonb,
  12,
  true,
  now(),
  now()
),
-- Remote Control
(
  '23'::uuid,
  'Universal Remote Control',
  'Universal remote control compatible with all Mango intelligent air cooler models. Features all essential functions including speed control, timer, swing operation, and cooling modes.',
  'spare-parts',
  'Mango',
  'URC-INT-003',
  799,
  75,
  '["src/assets/product-spare-parts.jpg"]'::jsonb,
  '{"Compatibility": "All Mango intelligent models", "Range": "8 meters", "Battery": "2 x AAA (included)", "Functions": "Speed, Timer, Swing, Mode", "Material": "ABS Plastic", "Display": "LED indicators"}'::jsonb,
  12,
  true,
  now(),
  now()
),
-- Motor Assembly
(
  '24'::uuid,
  'Cooler Motor Assembly',
  'High-quality replacement motor assembly for Mango air coolers. Energy-efficient design with low noise operation and reliable performance. Suitable for personal and tower cooler models.',
  'spare-parts',
  'Mango',
  'CMA-STD-004',
  2499,
  30,
  '["src/assets/product-spare-parts.jpg"]'::jsonb,
  '{"Power": "180W", "Speed": "1350 RPM", "Voltage": "220-240V", "Material": "Copper winding", "Compatibility": "Personal and Tower models", "Noise Level": "Less than 50dB"}'::jsonb,
  18,
  true,
  now(),
  now()
),
-- Water Filter
(
  '25'::uuid,
  'Water Filter Cartridge',
  'Replacement water filter cartridge for Mango air coolers with filtration systems. Helps maintain water quality and prevents mineral buildup in cooling pads and water circulation system.',
  'spare-parts',
  'Mango',
  'WFC-STD-005',
  599,
  80,
  '["src/assets/product-spare-parts.jpg"]'::jsonb,
  '{"Filtration": "Sediment and chlorine", "Life": "3-6 months", "Flow Rate": "500 LPH", "Material": "Activated carbon and polypropylene", "Size": "Standard 10 inch", "Compatibility": "Models with filter systems"}'::jsonb,
  6,
  true,
  now(),
  now()
);

-- Add some industrial coolers
INSERT INTO public.products (
  id, name, description, category, brand, model, price, stock_quantity, 
  images, specifications, warranty_period, is_active, created_at, updated_at
) VALUES 
-- Industrial Cooler 1
(
  '26'::uuid,
  'Industrial Cool Pro 150',
  'Heavy-duty industrial air cooler designed for large commercial spaces, factories, and warehouses. Features robust construction, high-capacity cooling, and continuous operation capability for 24/7 use.',
  'industrial-coolers',
  'Mango',
  'ICP-150-001',
  45999,
  8,
  '["src/assets/industrial-coolers-category.jpg"]'::jsonb,
  '{"Tank Capacity": "150 Liters", "Power Consumption": "750 Watts", "Air Throw": "100 feet", "Room Size": "Up to 3000 sq ft", "Pump": "Industrial grade centrifugal pump", "Material": "Galvanized steel body with powder coating"}'::jsonb,
  36,
  true,
  now(),
  now()
),
-- Industrial Cooler 2
(
  '27'::uuid,
  'Industrial Cool Max 200',
  'Maximum capacity industrial air cooler for extra-large spaces. Engineered for continuous operation in harsh industrial environments with superior cooling performance and minimal maintenance requirements.',
  'industrial-coolers',
  'Mango',
  'ICM-200-002',
  65999,
  5,
  '["src/assets/industrial-coolers-category.jpg"]'::jsonb,
  '{"Tank Capacity": "200 Liters", "Power Consumption": "1100 Watts", "Air Throw": "120 feet", "Room Size": "Up to 5000 sq ft", "Pump": "Heavy-duty industrial pump", "Material": "Stainless steel construction"}'::jsonb,
  48,
  true,
  now(),
  now()
);

-- Update the existing empty products or remove them if they exist
DELETE FROM public.products WHERE name = '' OR name IS NULL OR description = '' OR description IS NULL;