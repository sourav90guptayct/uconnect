-- Fix RLS policies to ensure users can apply to jobs posted by admin or anyone
-- The current job application policies might be too restrictive

-- Drop existing restrictive policies if any
DROP POLICY IF EXISTS "Candidates can create their own applications" ON public.job_applications;

-- Create more permissive policy for job applications
-- Allow any authenticated user with a candidate profile to apply to any active job
CREATE POLICY "Candidates can create applications for any job" 
ON public.job_applications 
FOR INSERT 
WITH CHECK (
  auth.uid() IS NOT NULL AND
  EXISTS (
    SELECT 1 FROM public.candidate_profiles 
    WHERE user_id = auth.uid() AND id = candidate_id
  ) AND
  EXISTS (
    SELECT 1 FROM public.jobs 
    WHERE id = job_id AND is_active = true
  )
);

-- Allow anyone to view active jobs
DROP POLICY IF EXISTS "Jobs are viewable by everyone or admins can see all" ON public.jobs;
CREATE POLICY "Everyone can view active jobs and admins can see all" 
ON public.jobs 
FOR SELECT 
USING (
  is_active = true OR 
  has_role(auth.uid(), 'admin'::app_role) OR
  posted_by = auth.uid()
);