-- Complete security coverage for remaining tables

-- 1. Add explicit anonymous denial for user_addresses
CREATE POLICY "Public cannot view addresses"
ON public.user_addresses
FOR SELECT
TO anon
USING (false);

-- 2. Add admin access to user_addresses
CREATE POLICY "Admins can view all addresses"
ON public.user_addresses
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. Update users view addresses policy to explicitly check NULL
DROP POLICY IF EXISTS "Users can view their own addresses" ON public.user_addresses;

CREATE POLICY "Users view only their own addresses"
ON public.user_addresses
FOR SELECT
TO authenticated
USING (
  (auth.uid() = user_id AND user_id IS NOT NULL)
  OR has_role(auth.uid(), 'admin'::app_role)
);

-- 4. Add explicit anonymous denial for profiles
CREATE POLICY "Public cannot view profiles"
ON public.profiles
FOR SELECT
TO anon
USING (false);

-- 5. Update profiles policies to check NULL explicitly  
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

CREATE POLICY "Users view only their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  (auth.uid() = user_id AND user_id IS NOT NULL)
  OR has_role(auth.uid(), 'admin'::app_role)
);