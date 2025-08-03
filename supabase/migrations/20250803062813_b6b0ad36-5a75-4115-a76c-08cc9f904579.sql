-- Recreate the jobs table properly if it doesn't exist or is corrupted
DROP TABLE IF EXISTS public.jobs CASCADE;

CREATE TABLE public.jobs (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    company_name text NOT NULL,
    job_type text NOT NULL DEFAULT 'full_time'::text,
    employment_type text NOT NULL DEFAULT 'permanent'::text,
    experience_required text NOT NULL,
    salary_min numeric,
    salary_max numeric,
    salary_type text DEFAULT 'annual'::text,
    location_city text NOT NULL,
    location_state text NOT NULL,
    location_district text,
    job_description text NOT NULL,
    key_responsibilities text[],
    required_skills text[],
    preferred_skills text[],
    education_requirements text,
    industry_type text,
    role_category text,
    job_highlights text[],
    requirements text[],
    department text,
    application_count integer DEFAULT 0,
    application_deadline date,
    posted_by uuid NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on jobs table
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Recreate RLS policies for jobs
CREATE POLICY "Everyone can view active jobs and admins can see all" 
ON public.jobs 
FOR SELECT 
USING ((is_active = true) OR has_role(auth.uid(), 'admin'::app_role) OR (posted_by = auth.uid()));

CREATE POLICY "Admins can insert jobs" 
ON public.jobs 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update all jobs" 
ON public.jobs 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Job posters can update their own jobs" 
ON public.jobs 
FOR UPDATE 
USING (auth.uid() = posted_by);

CREATE POLICY "Job posters can delete their own jobs" 
ON public.jobs 
FOR DELETE 
USING (auth.uid() = posted_by);

-- Recreate the trigger function for application count
CREATE OR REPLACE FUNCTION public.update_job_application_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Increment application count
        UPDATE jobs 
        SET application_count = COALESCE(application_count, 0) + 1
        WHERE id = NEW.job_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        -- Decrement application count
        UPDATE jobs 
        SET application_count = GREATEST(COALESCE(application_count, 0) - 1, 0)
        WHERE id = OLD.job_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$function$;

-- Create trigger for job applications
CREATE TRIGGER update_application_count_trigger
    AFTER INSERT OR DELETE ON public.job_applications
    FOR EACH ROW
    EXECUTE FUNCTION public.update_job_application_count();

-- Create trigger for updated_at
CREATE TRIGGER update_jobs_updated_at
    BEFORE UPDATE ON public.jobs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();