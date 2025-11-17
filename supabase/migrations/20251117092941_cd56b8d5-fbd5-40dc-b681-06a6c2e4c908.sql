-- Fix RLS policies for orders table
-- Drop overly permissive admin policies
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update order status" ON public.orders;

-- Create secure admin policies using role check
CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete orders"
ON public.orders
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Fix RLS policies for warranty_registrations table
DROP POLICY IF EXISTS "Admin can manage warranty registrations" ON public.warranty_registrations;

-- Create secure admin policies
CREATE POLICY "Admins can view all warranty registrations"
ON public.warranty_registrations
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update warranty registrations"
ON public.warranty_registrations
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete warranty registrations"
ON public.warranty_registrations
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Fix RLS policies for shipment_details table
DROP POLICY IF EXISTS "Admin can manage shipment details" ON public.shipment_details;

-- Create secure admin policies
CREATE POLICY "Admins can view all shipment details"
ON public.shipment_details
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert shipment details"
ON public.shipment_details
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update shipment details"
ON public.shipment_details
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete shipment details"
ON public.shipment_details
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));