-- First, let's check the current RLS policies and fix the public insert policy
DROP POLICY IF EXISTS "Allow public contact form submissions" ON public.contact_submissions;

-- Create a proper public insert policy that allows anyone to submit contact forms
CREATE POLICY "Allow public contact form submissions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);