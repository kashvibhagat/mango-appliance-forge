-- Create admin user and assign admin role for DoNotReply@mangoappliances.com

-- First, ensure the user_roles table exists with proper structure
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'user', 'moderator')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id, role)
);

-- Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow reading roles for authentication checks
CREATE POLICY "Allow reading roles for auth checks" ON public.user_roles
    FOR SELECT USING (true);

-- Create or replace function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_roles.user_id = is_admin.user_id 
        AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to assign admin role (this will be used manually when the user signs up)
CREATE OR REPLACE FUNCTION public.assign_admin_role_to_email()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the user's email is the admin email
    IF NEW.email = 'DoNotReply@mangoappliances.com' THEN
        -- Insert admin role for this user
        INSERT INTO public.user_roles (user_id, role)
        VALUES (NEW.id, 'admin')
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically assign admin role to the specific email
DROP TRIGGER IF EXISTS assign_admin_role_trigger ON auth.users;
CREATE TRIGGER assign_admin_role_trigger
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.assign_admin_role_to_email();