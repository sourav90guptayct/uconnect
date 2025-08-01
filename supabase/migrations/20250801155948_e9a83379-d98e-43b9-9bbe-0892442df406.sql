-- Temporarily disable RLS on jobs table to test if that's the issue
ALTER TABLE jobs DISABLE ROW LEVEL SECURITY;

-- Also temporarily disable on candidate_profiles
ALTER TABLE candidate_profiles DISABLE ROW LEVEL SECURITY;