-- Fix security issue: Set search_path for the admin role function
CREATE OR REPLACE FUNCTION public.auto_assign_admin_role()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Check if the user's email matches the admin email
    IF NEW.email = 'DoNotReply@mangoappliances.com' THEN
        -- Insert admin role for this user
        INSERT INTO public.user_roles (user_id, role)
        VALUES (NEW.id, 'admin'::app_role)
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
    
    RETURN NEW;
END;
$$;