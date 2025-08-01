-- Re-enable RLS and create minimal policies for testing
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Create a very simple insert policy for testing
CREATE POLICY "Allow all authenticated inserts for testing" 
ON job_applications 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Create a simple select policy too
CREATE POLICY "Allow all authenticated selects for testing" 
ON job_applications 
FOR SELECT 
TO authenticated
USING (true);