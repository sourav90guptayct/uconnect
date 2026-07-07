
ALTER TABLE public.screening_submissions ADD COLUMN IF NOT EXISTS resume_url TEXT;

-- Anyone can upload a CV to the screening-resumes bucket
CREATE POLICY "Anyone can upload screening resumes"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'screening-resumes');

-- Only admins can read screening resumes
CREATE POLICY "Admins can view screening resumes"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'screening-resumes' AND public.has_role(auth.uid(), 'admin'));
