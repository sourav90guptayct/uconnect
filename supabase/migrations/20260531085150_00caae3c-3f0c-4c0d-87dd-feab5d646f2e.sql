
-- 1) Tighten realtime.messages SELECT policy to scope by topic (candidate id) and admins
DROP POLICY IF EXISTS "Users can only receive their own application events" ON realtime.messages;

CREATE POLICY "Users can only receive their own application events"
ON realtime.messages
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role)
  OR (
    realtime.topic() IN (
      SELECT cp.id::text
      FROM public.candidate_profiles cp
      WHERE cp.user_id = auth.uid()
    )
  )
);

-- 2) Add admin SELECT policy for resumes storage bucket
CREATE POLICY "Admins can view all resumes"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'resumes' AND has_role(auth.uid(), 'admin'::app_role));

-- 3) Tighten contact_submissions INSERT: require non-empty values within sane bounds
DROP POLICY IF EXISTS "Enable anonymous inserts for contact submissions" ON public.contact_submissions;

CREATE POLICY "Anyone can submit a validated contact form"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(full_name) BETWEEN 1 AND 120
  AND char_length(email) BETWEEN 3 AND 254
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(message) BETWEEN 1 AND 5000
  AND (company IS NULL OR char_length(company) <= 200)
  AND (phone IS NULL OR char_length(phone) <= 40)
);

-- 4) Revoke EXECUTE on SECURITY DEFINER functions that should not be publicly callable.
-- Keep has_role callable (used by RLS policies under authenticated role).
REVOKE EXECUTE ON FUNCTION public.assign_admin_role_to_user(text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_user_email(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_employee_by_email(text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_job_application_count() FROM PUBLIC, anon, authenticated;
