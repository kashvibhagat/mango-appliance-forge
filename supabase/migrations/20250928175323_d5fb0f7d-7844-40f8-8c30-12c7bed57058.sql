-- Fix the security vulnerability in order tracking by removing overly permissive anonymous access
-- This removes the ability for any anonymous user to see all orders with user_id = NULL

-- Drop the existing policy that allows unrestricted anonymous access
DROP POLICY IF EXISTS "Allow secure order tracking" ON public.orders;

-- Create a more secure policy that only allows:
-- 1. Users to see their own orders (auth.uid() = user_id)  
-- 2. Admins to see all orders
-- Anonymous users will need to use the application-level security checks (order_number + email)
CREATE POLICY "Secure order tracking" 
ON public.orders 
FOR SELECT 
USING (
  (auth.uid() = user_id) OR 
  has_role(auth.uid(), 'admin'::app_role)
);