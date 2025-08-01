-- Grant permissions to jobs table for authenticator and anon roles
GRANT SELECT ON jobs TO authenticator;
GRANT SELECT ON jobs TO anon;

-- Also grant permissions to candidate_profiles table to be safe
GRANT SELECT ON candidate_profiles TO authenticator;
GRANT SELECT ON candidate_profiles TO anon;