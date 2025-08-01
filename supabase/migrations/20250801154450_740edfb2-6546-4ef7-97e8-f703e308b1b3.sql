-- Temporarily disable RLS on job_applications to test basic functionality
ALTER TABLE job_applications DISABLE ROW LEVEL SECURITY;

-- Test if basic insert works without RLS