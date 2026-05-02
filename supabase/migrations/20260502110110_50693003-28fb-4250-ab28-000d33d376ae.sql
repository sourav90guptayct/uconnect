
-- 1. Fix profile pictures: drop overly permissive SELECT and replace with owner-scoped
DROP POLICY IF EXISTS "Users can view profile pictures" ON storage.objects;

CREATE POLICY "Users can view their own profile pictures"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'profile-pictures'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

-- Also allow admins to view all profile pictures
CREATE POLICY "Admins can view all profile pictures"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'profile-pictures'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- 2. Fix realtime channel authorization
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only receive their own application events"
ON realtime.messages
FOR SELECT
TO authenticated
USING (
  -- Allow if the realtime event relates to the user's own candidate profile
  EXISTS (
    SELECT 1 FROM public.candidate_profiles cp
    JOIN public.job_applications ja ON ja.candidate_id = cp.id
    WHERE cp.user_id = auth.uid()
  )
  OR public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- 3. Harden user_roles: explicit deny for non-admin INSERT
CREATE POLICY "Non-admins cannot insert roles"
ON public.user_roles
AS RESTRICTIVE
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::public.app_role)
);
