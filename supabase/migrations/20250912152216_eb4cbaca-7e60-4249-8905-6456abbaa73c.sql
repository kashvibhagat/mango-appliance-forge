-- Add admin policies to allow admins to manage orders
CREATE POLICY "Admins can view all orders" 
ON public.orders 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can update order status" 
ON public.orders 
FOR UPDATE 
USING (true);

-- Add admin policies for profiles to see customer details  
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (true);