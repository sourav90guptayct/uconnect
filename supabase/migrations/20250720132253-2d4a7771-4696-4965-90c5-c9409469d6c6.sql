-- Drop the existing policy and create a more permissive one
DROP POLICY IF EXISTS "Allow public insertions" ON contact_submissions;

-- Create a new policy that allows anonymous insertions
CREATE POLICY "Enable insert for anonymous users" ON contact_submissions
FOR INSERT 
TO anon
WITH CHECK (true);

-- Also allow authenticated users to insert
CREATE POLICY "Enable insert for authenticated users" ON contact_submissions
FOR INSERT 
TO authenticated
WITH CHECK (true);