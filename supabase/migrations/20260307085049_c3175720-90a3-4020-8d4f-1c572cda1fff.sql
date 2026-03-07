-- Fix 1: Add admin-only guard to get_user_email function
CREATE OR REPLACE FUNCTION public.get_user_email(user_uuid uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  RETURN (SELECT email FROM auth.users WHERE id = user_uuid);
END;
$$;

-- Fix 2: Make profile-pictures bucket private
UPDATE storage.buckets
SET public = false
WHERE id = 'profile-pictures';

-- Fix 3: Remove overly permissive test RLS policies on job_applications
DROP POLICY IF EXISTS "Allow all authenticated inserts for testing" ON public.job_applications;
DROP POLICY IF EXISTS "Allow all authenticated selects for testing" ON public.job_applications;
DROP POLICY IF EXISTS "Allow anon inserts for testing" ON public.job_applications;