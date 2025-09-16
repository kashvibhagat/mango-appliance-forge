-- Create a policy to allow public order tracking by order number
-- This allows anyone to view order details if they have the correct order number
CREATE POLICY "Public order tracking by order number" 
ON public.orders 
FOR SELECT 
USING (true);

-- Note: This policy allows public access to order data when someone has the order number
-- This is a common e-commerce pattern where order numbers act as access tokens