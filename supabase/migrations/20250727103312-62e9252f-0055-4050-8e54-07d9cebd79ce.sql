-- Fix critical RLS issues: Enable RLS on all tables that have policies but RLS disabled

-- Enable RLS on all public tables that need it
ALTER TABLE public.candidate_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Improve RLS policies to require authentication for most operations
-- Update candidate policies to require authentication
DROP POLICY IF EXISTS "Authenticated users can view their own education" ON public.candidate_education;
DROP POLICY IF EXISTS "Authenticated users can create their own education" ON public.candidate_education;
DROP POLICY IF EXISTS "Authenticated users can update their own education" ON public.candidate_education;
DROP POLICY IF EXISTS "Authenticated users can delete their own education" ON public.candidate_education;

CREATE POLICY "Authenticated users can view their own education" ON public.candidate_education
FOR SELECT TO authenticated
USING (auth.uid() = (SELECT candidate_profiles.user_id FROM candidate_profiles WHERE candidate_profiles.id = candidate_education.candidate_id));

CREATE POLICY "Authenticated users can create their own education" ON public.candidate_education
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = (SELECT candidate_profiles.user_id FROM candidate_profiles WHERE candidate_profiles.id = candidate_education.candidate_id));

CREATE POLICY "Authenticated users can update their own education" ON public.candidate_education
FOR UPDATE TO authenticated
USING (auth.uid() = (SELECT candidate_profiles.user_id FROM candidate_profiles WHERE candidate_profiles.id = candidate_education.candidate_id));

CREATE POLICY "Authenticated users can delete their own education" ON public.candidate_education
FOR DELETE TO authenticated
USING (auth.uid() = (SELECT candidate_profiles.user_id FROM candidate_profiles WHERE candidate_profiles.id = candidate_education.candidate_id));

-- Update experience policies
DROP POLICY IF EXISTS "Authenticated users can view their own experience" ON public.candidate_experience;
DROP POLICY IF EXISTS "Authenticated users can create their own experience" ON public.candidate_experience;
DROP POLICY IF EXISTS "Authenticated users can update their own experience" ON public.candidate_experience;
DROP POLICY IF EXISTS "Authenticated users can delete their own experience" ON public.candidate_experience;

CREATE POLICY "Authenticated users can view their own experience" ON public.candidate_experience
FOR SELECT TO authenticated
USING (auth.uid() = (SELECT candidate_profiles.user_id FROM candidate_profiles WHERE candidate_profiles.id = candidate_experience.candidate_id));

CREATE POLICY "Authenticated users can create their own experience" ON public.candidate_experience
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = (SELECT candidate_profiles.user_id FROM candidate_profiles WHERE candidate_profiles.id = candidate_experience.candidate_id));

CREATE POLICY "Authenticated users can update their own experience" ON public.candidate_experience
FOR UPDATE TO authenticated
USING (auth.uid() = (SELECT candidate_profiles.user_id FROM candidate_profiles WHERE candidate_profiles.id = candidate_experience.candidate_id));

CREATE POLICY "Authenticated users can delete their own experience" ON public.candidate_experience
FOR DELETE TO authenticated
USING (auth.uid() = (SELECT candidate_profiles.user_id FROM candidate_profiles WHERE candidate_profiles.id = candidate_experience.candidate_id));

-- Update profile policies
DROP POLICY IF EXISTS "Authenticated users can view their own profile" ON public.candidate_profiles;
DROP POLICY IF EXISTS "Authenticated users can create their own profile" ON public.candidate_profiles;
DROP POLICY IF EXISTS "Authenticated users can update their own profile" ON public.candidate_profiles;

CREATE POLICY "Authenticated users can view their own profile" ON public.candidate_profiles
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create their own profile" ON public.candidate_profiles
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own profile" ON public.candidate_profiles
FOR UPDATE TO authenticated
USING (auth.uid() = user_id);

-- Update skills policies
DROP POLICY IF EXISTS "Authenticated users can view their own skills" ON public.candidate_skills;
DROP POLICY IF EXISTS "Authenticated users can create their own skills" ON public.candidate_skills;
DROP POLICY IF EXISTS "Authenticated users can update their own skills" ON public.candidate_skills;
DROP POLICY IF EXISTS "Authenticated users can delete their own skills" ON public.candidate_skills;

CREATE POLICY "Authenticated users can view their own skills" ON public.candidate_skills
FOR SELECT TO authenticated
USING (auth.uid() = (SELECT candidate_profiles.user_id FROM candidate_profiles WHERE candidate_profiles.id = candidate_skills.candidate_id));

CREATE POLICY "Authenticated users can create their own skills" ON public.candidate_skills
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = (SELECT candidate_profiles.user_id FROM candidate_profiles WHERE candidate_profiles.id = candidate_skills.candidate_id));

CREATE POLICY "Authenticated users can update their own skills" ON public.candidate_skills
FOR UPDATE TO authenticated
USING (auth.uid() = (SELECT candidate_profiles.user_id FROM candidate_profiles WHERE candidate_profiles.id = candidate_skills.candidate_id));

CREATE POLICY "Authenticated users can delete their own skills" ON public.candidate_skills
FOR DELETE TO authenticated
USING (auth.uid() = (SELECT candidate_profiles.user_id FROM candidate_profiles WHERE candidate_profiles.id = candidate_skills.candidate_id));

-- Update contact submissions policies (keep public insert but restrict others to authenticated admins)
DROP POLICY IF EXISTS "Admins can view all contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can update contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can delete contact submissions" ON public.contact_submissions;

CREATE POLICY "Admins can view all contact submissions" ON public.contact_submissions
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update contact submissions" ON public.contact_submissions
FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete contact submissions" ON public.contact_submissions
FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Update job application policies
DROP POLICY IF EXISTS "Candidates can view their own applications" ON public.job_applications;
DROP POLICY IF EXISTS "Candidates can create their own applications" ON public.job_applications;
DROP POLICY IF EXISTS "Job posters can view applications for their jobs" ON public.job_applications;
DROP POLICY IF EXISTS "Job posters can update applications for their jobs" ON public.job_applications;

CREATE POLICY "Candidates can view their own applications" ON public.job_applications
FOR SELECT TO authenticated
USING (auth.uid() = (SELECT candidate_profiles.user_id FROM candidate_profiles WHERE candidate_profiles.id = job_applications.candidate_id));

CREATE POLICY "Candidates can create their own applications" ON public.job_applications
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = (SELECT candidate_profiles.user_id FROM candidate_profiles WHERE candidate_profiles.id = job_applications.candidate_id));

CREATE POLICY "Job posters can view applications for their jobs" ON public.job_applications
FOR SELECT TO authenticated
USING (auth.uid() = (SELECT jobs.posted_by FROM jobs WHERE jobs.id = job_applications.job_id));

CREATE POLICY "Job posters can update applications for their jobs" ON public.job_applications
FOR UPDATE TO authenticated
USING (auth.uid() = (SELECT jobs.posted_by FROM jobs WHERE jobs.id = job_applications.job_id));

-- Update job policies
DROP POLICY IF EXISTS "Jobs are viewable by everyone" ON public.jobs;
DROP POLICY IF EXISTS "Authenticated users can create jobs" ON public.jobs;
DROP POLICY IF EXISTS "Job posters can update their own jobs" ON public.jobs;
DROP POLICY IF EXISTS "Job posters can delete their own jobs" ON public.jobs;

-- Keep jobs viewable by everyone (this is intentional for a job board)
CREATE POLICY "Jobs are viewable by everyone" ON public.jobs
FOR SELECT
USING (is_active = true);

CREATE POLICY "Authenticated users can create jobs" ON public.jobs
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = posted_by);

CREATE POLICY "Job posters can update their own jobs" ON public.jobs
FOR UPDATE TO authenticated
USING (auth.uid() = posted_by);

CREATE POLICY "Job posters can delete their own jobs" ON public.jobs
FOR DELETE TO authenticated
USING (auth.uid() = posted_by);

-- Update user roles policies (most critical - prevent privilege escalation)
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles" ON public.user_roles
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));