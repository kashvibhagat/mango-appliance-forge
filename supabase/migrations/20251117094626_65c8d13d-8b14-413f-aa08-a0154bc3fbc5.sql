-- Fix remaining security issues (corrected)

-- 1. Fix SHIPPING_RULES table - ensure proper access control
-- First drop existing policy if it exists
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Admin can manage shipping rules" ON public.shipping_rules;
  DROP POLICY IF EXISTS "Admins manage shipping rules" ON public.shipping_rules;
  DROP POLICY IF EXISTS "Everyone can view active shipping rules" ON public.shipping_rules;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- Create admin-only management policy
CREATE POLICY "Admins only manage shipping"
ON public.shipping_rules
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Allow everyone to view active shipping rules
CREATE POLICY "Public view active shipping"
ON public.shipping_rules
FOR SELECT
TO authenticated, anon
USING (is_active = true);

-- 2. Fix NOTIFICATIONS table - make it broadcast-only
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can view notifications" ON public.notifications;
  DROP POLICY IF EXISTS "Public can view active notifications" ON public.notifications;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- Allow viewing of active, non-expired notifications
CREATE POLICY "View active notifications"
ON public.notifications
FOR SELECT
TO authenticated, anon
USING (
  is_read = false 
  AND (expires_at IS NULL OR expires_at > now())
);