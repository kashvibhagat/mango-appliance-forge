-- Fix remaining authenticated user access vulnerabilities

-- 1. Fix complaints - ensure non-admins can ONLY see their OWN complaints
DROP POLICY IF EXISTS "Users view own complaints" ON public.complaints;
DROP POLICY IF EXISTS "Deny anonymous access to complaints" ON public.complaints;

CREATE POLICY "Users view only their own complaints"
ON public.complaints
FOR SELECT
TO authenticated
USING (
  (auth.uid() = user_id AND user_id IS NOT NULL) 
  OR has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Public cannot view complaints"
ON public.complaints
FOR SELECT
TO anon
USING (false);

-- 2. Fix customers - ensure ONLY admins can access customer records
DROP POLICY IF EXISTS "Deny anonymous access to customers" ON public.customers;

CREATE POLICY "Only admins view customers"
ON public.customers
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public cannot view customers"
ON public.customers
FOR SELECT
TO anon
USING (false);

-- 3. Fix orders - strengthen user ownership validation
DROP POLICY IF EXISTS "Users view own orders" ON public.orders;
DROP POLICY IF EXISTS "Deny anonymous access to orders" ON public.orders;

CREATE POLICY "Users view only their own orders"
ON public.orders
FOR SELECT
TO authenticated
USING (
  (auth.uid() = user_id AND user_id IS NOT NULL)
  OR has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Public cannot view orders"
ON public.orders
FOR SELECT
TO anon
USING (false);

-- 4. Fix warranty_registrations - ensure strict user ownership
DROP POLICY IF EXISTS "Users can view their own warranty registrations" ON public.warranty_registrations;
DROP POLICY IF EXISTS "Deny anonymous access to warranty_registrations" ON public.warranty_registrations;

CREATE POLICY "Users view only their own warranty registrations"
ON public.warranty_registrations
FOR SELECT
TO authenticated
USING (
  (auth.uid() = user_id AND user_id IS NOT NULL)
  OR has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Public cannot view warranty registrations"
ON public.warranty_registrations
FOR SELECT
TO anon
USING (false);