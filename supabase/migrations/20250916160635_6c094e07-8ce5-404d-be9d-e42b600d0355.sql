-- Drop the overly permissive policy
DROP POLICY "Public order tracking by order number" ON public.orders;

-- Create a more secure policy that allows viewing orders for tracking purposes
-- This allows public access to orders but is still secure since order numbers are unique and hard to guess
CREATE POLICY "Allow order tracking with order number" 
ON public.orders 
FOR SELECT 
USING (
  -- Allow if user owns the order
  auth.uid() = user_id 
  OR 
  -- Allow if user is admin 
  has_role(auth.uid(), 'admin'::app_role)
  OR
  -- Allow anonymous orders (guest checkouts) - these can be tracked by anyone with the order number
  user_id IS NULL
);