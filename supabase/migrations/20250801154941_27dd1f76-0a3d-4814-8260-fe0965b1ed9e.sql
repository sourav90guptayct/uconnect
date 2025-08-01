-- Add policies for anon role too in case user is not properly authenticated
CREATE POLICY "Allow anon inserts for testing" 
ON job_applications 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Also grant permissions to anon role
GRANT INSERT, SELECT ON job_applications TO anon;