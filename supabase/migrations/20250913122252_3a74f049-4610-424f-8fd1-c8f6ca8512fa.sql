-- First, let's create a function to easily assign admin role to any user
CREATE OR REPLACE FUNCTION assign_admin_role(user_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_uuid uuid;
BEGIN
  -- Get the user ID from auth.users table
  SELECT id INTO user_uuid
  FROM auth.users
  WHERE email = user_email;
  
  IF user_uuid IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', user_email;
  END IF;
  
  -- Insert admin role (or update if exists)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (user_uuid, 'admin'::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RAISE NOTICE 'Admin role assigned to user %', user_email;
END;
$$;

-- Create a sample admin user if DoNotReply@mangoappliances.com exists in auth
-- This will only work if the user has already signed up
DO $$
BEGIN
  -- Try to assign admin role to DoNotReply@mangoappliances.com if it exists
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'DoNotReply@mangoappliances.com') THEN
    PERFORM assign_admin_role('DoNotReply@mangoappliances.com');
  END IF;
END $$;