-- Update jobs RLS policy to allow admins to see all jobs (active and inactive)
DROP POLICY IF EXISTS "Jobs are viewable by everyone" ON public.jobs;

-- Create new policy that allows everyone to see active jobs and admins to see all jobs
CREATE POLICY "Jobs are viewable by everyone or admins can see all" 
ON public.jobs 
FOR SELECT 
USING (
  is_active = true OR 
  has_role(auth.uid(), 'admin'::app_role)
);

-- Also allow admins to update job status
CREATE POLICY "Admins can update all jobs" 
ON public.jobs 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));