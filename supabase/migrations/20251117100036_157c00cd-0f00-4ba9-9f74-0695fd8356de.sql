-- Fix critical customer data exposure issues

-- 1. Fix customers table - currently has NO public read protection
-- Drop the permissive admin policy and recreate with proper isolation
DROP POLICY IF EXISTS "Admins can manage customers" ON public.customers;

CREATE POLICY "Admins can manage customers"
ON public.customers
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Explicitly deny anonymous access to customers table
CREATE POLICY "Deny anonymous access to customers"
ON public.customers
FOR SELECT
TO anon
USING (false);

-- 2. Fix complaints table - add explicit anonymous denial
CREATE POLICY "Deny anonymous access to complaints"
ON public.complaints
FOR SELECT
TO anon
USING (false);

-- 3. Fix orders table - add explicit anonymous denial
CREATE POLICY "Deny anonymous access to orders"
ON public.orders
FOR SELECT
TO anon
USING (false);

-- 4. Fix warranty_registrations table - add explicit anonymous denial  
CREATE POLICY "Deny anonymous access to warranty_registrations"
ON public.warranty_registrations
FOR SELECT
TO anon
USING (false);