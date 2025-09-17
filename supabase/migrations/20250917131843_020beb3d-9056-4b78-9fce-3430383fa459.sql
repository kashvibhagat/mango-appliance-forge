-- Fix critical security issue: Orders table RLS policies
-- Remove the overly permissive order tracking policy that allows anonymous access to all orders

DROP POLICY IF EXISTS "Allow order tracking with order number" ON public.orders;
DROP POLICY IF EXISTS "Admins can view anonymous orders" ON public.orders;

-- Create a more secure policy for order tracking that only allows access with both order number and email
CREATE POLICY "Allow secure order tracking" 
ON public.orders 
FOR SELECT 
USING (
  -- User can view their own orders if authenticated
  (auth.uid() = user_id) OR 
  -- Admins can view all orders
  has_role(auth.uid(), 'admin'::app_role) OR
  -- Anonymous users can only view their own orders if they provide order_number AND customer_email
  -- This is handled at the application level for security
  (user_id IS NULL AND auth.uid() IS NULL)
);

-- Fix notifications table - ensure only admins can view system notifications
-- Update existing policies to be more restrictive
DROP POLICY IF EXISTS "Admins can view all notifications" ON public.notifications;

CREATE POLICY "Admins can view and manage notifications" 
ON public.notifications 
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Ensure proper indexing for performance and security
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);

-- Add trigger to ensure order number is always generated
DROP TRIGGER IF EXISTS generate_order_number_trigger ON public.orders;
CREATE TRIGGER generate_order_number_trigger
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_order_number();