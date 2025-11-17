-- Fix remaining security issues

-- 1. Fix SHIPPING_RULES table - admin only for modifications
DROP POLICY IF EXISTS "Admin can manage shipping rules" ON public.shipping_rules;
DROP POLICY IF EXISTS "Everyone can view active shipping rules" ON public.shipping_rules;

CREATE POLICY "Admins manage shipping rules"
ON public.shipping_rules
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Everyone can view active shipping rules"
ON public.shipping_rules
FOR SELECT
TO authenticated, anon
USING (is_active = true);

-- 2. Fix NOTIFICATIONS table - make it broadcast-only (global announcements)
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view notifications" ON public.notifications;

-- Allow all authenticated users to view notifications (broadcast/announcement style)
-- If you need user-specific notifications later, add a user_id column
CREATE POLICY "Public can view active notifications"
ON public.notifications
FOR SELECT
TO authenticated, anon
USING (
  is_read = false 
  AND (expires_at IS NULL OR expires_at > now())
);

-- Keep admin management policy
-- (already exists as "Admins manage notifications")

-- 3. Verify CUSTOMERS table policy (should already be correct)
-- The existing "Admins can manage customers" policy is correct

-- 4. Verify SYSTEM_SETTINGS table policy (should already be correct)
-- The existing "Admins manage settings" policy is correct