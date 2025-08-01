-- Drop the existing problematic policy and create a simpler one
DROP POLICY IF EXISTS "Candidates can create applications for any job" ON job_applications;

-- Create a simpler policy that just checks user authentication and candidate profile ownership
CREATE POLICY "Authenticated users can create applications" 
ON job_applications 
FOR INSERT 
WITH CHECK (
  auth.uid() IS NOT NULL AND 
  EXISTS (
    SELECT 1 FROM candidate_profiles 
    WHERE candidate_profiles.user_id = auth.uid() 
    AND candidate_profiles.id = job_applications.candidate_id
  )
);