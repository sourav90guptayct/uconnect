-- Let's also grant explicit permissions to the authenticator role
GRANT INSERT, SELECT, UPDATE ON job_applications TO authenticator;
GRANT USAGE ON SCHEMA public TO authenticator;