-- Fix critical security issue: Admin policy allowing public access to profiles
-- The current "Admins can view all profiles" policy has "Using Expression: true" 
-- which allows EVERYONE to view all profiles, not just admins

-- Drop the insecure policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create a secure admin policy that actually checks for admin role
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));