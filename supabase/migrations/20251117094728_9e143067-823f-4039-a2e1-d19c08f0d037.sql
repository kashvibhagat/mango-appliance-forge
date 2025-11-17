-- Fix notifications exposure - make admin-only viewing
-- Notifications contain sensitive business data (order info, warranty data)

DO $$ 
BEGIN
  DROP POLICY IF EXISTS "View active notifications" ON public.notifications;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- Only admins should view notifications (they contain business data)
CREATE POLICY "Admins view notifications"
ON public.notifications
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));