-- First, let's drop the problematic trigger function temporarily
DROP FUNCTION IF EXISTS public.update_job_application_count() CASCADE;

-- Now enable RLS on existing tables
ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Check if jobs table exists and enable RLS
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'jobs' AND table_schema = 'public') THEN
        ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;