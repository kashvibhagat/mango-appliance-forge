-- Fix Security Vulnerability 1: Notifications Table RLS Policy
-- Currently allows anyone to read all notifications - this is a major security issue

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Admin can manage notifications" ON public.notifications;

-- Create proper RLS policies for notifications
-- Only admins should be able to read, create, update, and delete notifications
CREATE POLICY "Admins can view all notifications" 
ON public.notifications 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can create notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update notifications" 
ON public.notifications 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete notifications" 
ON public.notifications 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));