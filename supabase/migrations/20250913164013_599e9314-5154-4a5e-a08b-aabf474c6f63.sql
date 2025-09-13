-- Manually assign admin role to the existing user
INSERT INTO public.user_roles (user_id, role)
SELECT 
    au.id,
    'admin'::app_role
FROM auth.users au
WHERE au.email = 'donotreply@mangoappliances.com'
ON CONFLICT (user_id, role) DO NOTHING;