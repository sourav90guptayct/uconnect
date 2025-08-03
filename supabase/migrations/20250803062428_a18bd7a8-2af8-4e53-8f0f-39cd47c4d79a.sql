-- Fix the critical RLS issues
-- First, let's check which tables need RLS enabled
-- Enable RLS on all public tables that should have it

-- Fix the jobs table RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Fix any other tables that might have RLS disabled
ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_updates ENABLE ROW LEVEL SECURITY;

-- Clean up the jobs table - remove jobs with null posted_by
DELETE FROM public.jobs WHERE posted_by IS NULL;

-- Make posted_by NOT NULL to prevent future issues
ALTER TABLE public.jobs ALTER COLUMN posted_by SET NOT NULL;