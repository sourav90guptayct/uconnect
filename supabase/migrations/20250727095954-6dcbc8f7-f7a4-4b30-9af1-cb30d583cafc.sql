-- Create jobs table for storing job postings
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  job_type TEXT NOT NULL DEFAULT 'full_time',
  employment_type TEXT NOT NULL DEFAULT 'permanent',
  experience_required TEXT NOT NULL,
  salary_min NUMERIC,
  salary_max NUMERIC,
  salary_type TEXT DEFAULT 'annual',
  location_city TEXT NOT NULL,
  location_state TEXT NOT NULL,
  location_district TEXT,
  job_description TEXT NOT NULL,
  key_responsibilities TEXT[],
  required_skills TEXT[],
  preferred_skills TEXT[],
  education_requirements TEXT,
  industry_type TEXT,
  department TEXT,
  role_category TEXT,
  job_highlights TEXT[],
  requirements TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  posted_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  application_deadline DATE,
  application_count INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create policies for jobs table
CREATE POLICY "Jobs are viewable by everyone" 
ON public.jobs 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can create jobs" 
ON public.jobs 
FOR INSERT 
WITH CHECK (auth.uid() = posted_by);

CREATE POLICY "Job posters can update their own jobs" 
ON public.jobs 
FOR UPDATE 
USING (auth.uid() = posted_by);

CREATE POLICY "Job posters can delete their own jobs" 
ON public.jobs 
FOR DELETE 
USING (auth.uid() = posted_by);

-- Create trigger for updated_at
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_jobs_location ON public.jobs(location_state, location_district, location_city);
CREATE INDEX idx_jobs_active ON public.jobs(is_active);
CREATE INDEX idx_jobs_created_at ON public.jobs(created_at DESC);
CREATE INDEX idx_jobs_salary ON public.jobs(salary_min, salary_max);
CREATE INDEX idx_jobs_experience ON public.jobs(experience_required);

-- Create job applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  application_status TEXT NOT NULL DEFAULT 'applied' CHECK (application_status IN ('applied', 'shortlisted', 'interviewed', 'rejected', 'hired')),
  cover_letter TEXT,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(job_id, candidate_id)
);

-- Enable RLS for job applications
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for job applications
CREATE POLICY "Candidates can view their own applications" 
ON public.job_applications 
FOR SELECT 
USING (auth.uid() = (SELECT user_id FROM candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Candidates can create their own applications" 
ON public.job_applications 
FOR INSERT 
WITH CHECK (auth.uid() = (SELECT user_id FROM candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Job posters can view applications for their jobs" 
ON public.job_applications 
FOR SELECT 
USING (auth.uid() = (SELECT posted_by FROM jobs WHERE id = job_id));

CREATE POLICY "Job posters can update applications for their jobs" 
ON public.job_applications 
FOR UPDATE 
USING (auth.uid() = (SELECT posted_by FROM jobs WHERE id = job_id));

-- Create trigger for job applications updated_at
CREATE TRIGGER update_job_applications_updated_at
BEFORE UPDATE ON public.job_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for job applications
CREATE INDEX idx_job_applications_job_id ON public.job_applications(job_id);
CREATE INDEX idx_job_applications_candidate_id ON public.job_applications(candidate_id);
CREATE INDEX idx_job_applications_status ON public.job_applications(application_status);
CREATE INDEX idx_job_applications_applied_at ON public.job_applications(applied_at DESC);