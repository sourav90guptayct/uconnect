-- Ensure admins can view all job applications and related data
-- This will allow the AllApplicants component to show all applications to admins

-- Add policy to allow admins to view all job applications
CREATE POLICY "Admins can view all applications" 
ON public.job_applications 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add policy to allow admins to view all candidate profiles (needed for join queries)
CREATE POLICY "Admins can view all candidate profiles" 
ON public.candidate_profiles 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));