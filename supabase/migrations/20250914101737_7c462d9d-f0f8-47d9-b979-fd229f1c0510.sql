-- Ensure admin user exists for testing
-- First, check if the admin user exists, if not this will be handled by auth signup process
-- But we want to make sure the admin role is properly assigned

-- Insert admin role for the admin user if they exist
DO $$
BEGIN
  -- Check if the admin user exists and assign admin role
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'DoNotReply@mangoappliances.com') THEN
    INSERT INTO public.user_roles (user_id, role)
    SELECT id, 'admin'::app_role
    FROM auth.users 
    WHERE email = 'DoNotReply@mangoappliances.com'
    ON CONFLICT (user_id, role) DO NOTHING;
    
    RAISE NOTICE 'Admin role verified for DoNotReply@mangoappliances.com';
  ELSE
    RAISE NOTICE 'Admin user does not exist yet - will be created on first signup';
  END IF;
END $$;