-- Temporarily drop the trigger to avoid conflicts
DROP TRIGGER IF EXISTS update_application_count_trigger ON public.job_applications;

-- Clear all job applications first
TRUNCATE TABLE public.job_applications CASCADE;

-- Clear all jobs
TRUNCATE TABLE public.jobs CASCADE;

-- Recreate the trigger
CREATE TRIGGER update_application_count_trigger
    AFTER INSERT OR DELETE ON public.job_applications
    FOR EACH ROW
    EXECUTE FUNCTION public.update_job_application_count();