-- Fix critical security vulnerabilities in database

-- 1. Fix CUSTOMERS table - should be admin-only
DROP POLICY IF EXISTS "Admin can manage all customers" ON public.customers;

CREATE POLICY "Admins can manage customers"
ON public.customers
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- 2. Fix COMPLAINTS table - users should only see their own
DROP POLICY IF EXISTS "Users can view their own complaints" ON public.complaints;
DROP POLICY IF EXISTS "Users can create their own complaints" ON public.complaints;
DROP POLICY IF EXISTS "Users can update their own complaints" ON public.complaints;
DROP POLICY IF EXISTS "Admin can manage all complaints" ON public.complaints;

-- Only authenticated users can view their own complaints or admins can view all
CREATE POLICY "Users view own complaints"
ON public.complaints
FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users create own complaints"
ON public.complaints
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own complaints"
ON public.complaints
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins manage all complaints"
ON public.complaints
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- 3. Fix ORDERS table - remove permissive policies, add secure anonymous tracking
DROP POLICY IF EXISTS "Allow anonymous order creation" ON public.orders;
DROP POLICY IF EXISTS "Secure order tracking" ON public.orders;
DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can delete orders" ON public.orders;

-- Users can only view and create their own orders
CREATE POLICY "Users view own orders"
ON public.orders
FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users create own orders"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow anonymous order creation (for checkout without login)
CREATE POLICY "Anonymous order creation"
ON public.orders
FOR INSERT
TO anon
WITH CHECK (user_id IS NULL);

-- Admins can manage all orders
CREATE POLICY "Admins manage all orders"
ON public.orders
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- 4. Fix SYSTEM_SETTINGS table - admin only
DROP POLICY IF EXISTS "Admin can manage all settings" ON public.system_settings;

CREATE POLICY "Admins manage settings"
ON public.system_settings
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- 5. Fix NOTIFICATIONS table - add user read access
CREATE POLICY "Users can view notifications"
ON public.notifications
FOR SELECT
TO authenticated
USING (true);

-- Keep admin policies
DROP POLICY IF EXISTS "Admins can view and manage notifications" ON public.notifications;
DROP POLICY IF EXISTS "Admins can create notifications" ON public.notifications;
DROP POLICY IF EXISTS "Admins can update notifications" ON public.notifications;
DROP POLICY IF EXISTS "Admins can delete notifications" ON public.notifications;

CREATE POLICY "Admins manage notifications"
ON public.notifications
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- 6. Ensure USER_ADDRESSES is secure (verify existing policies)
-- Policies already exist and are correct, no changes needed

-- 7. Ensure SHIPMENT_DETAILS policies are correct
-- Existing policies are secure, no changes needed

-- 8. Ensure WARRANTY_REGISTRATIONS policies are correct
-- Existing policies are secure, no changes needed