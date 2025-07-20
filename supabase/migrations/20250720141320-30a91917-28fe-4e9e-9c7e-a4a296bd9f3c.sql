-- Fix the public INSERT policy to work properly with anonymous users
DROP POLICY IF EXISTS "Allow public contact form submissions" ON public.contact_submissions;

-- Create a policy that works for both anonymous and authenticated users
CREATE POLICY "Allow public contact form submissions" 
ON public.contact_submissions 
FOR INSERT 
TO public, anon, authenticated
WITH CHECK (true);