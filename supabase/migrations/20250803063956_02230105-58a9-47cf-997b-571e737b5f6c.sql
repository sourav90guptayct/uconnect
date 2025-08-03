-- Clear all job applications first (due to foreign key constraints)
DELETE FROM public.job_applications;

-- Clear all jobs
DELETE FROM public.jobs;

-- Reset the application counts just to be safe
UPDATE public.jobs SET application_count = 0 WHERE application_count > 0;