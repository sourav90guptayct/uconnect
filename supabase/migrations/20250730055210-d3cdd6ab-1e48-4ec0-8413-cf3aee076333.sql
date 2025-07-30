-- Update jobs table to properly sync application counts
CREATE OR REPLACE FUNCTION update_job_application_count()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update application count
DROP TRIGGER IF EXISTS trigger_update_job_application_count ON job_applications;
CREATE TRIGGER trigger_update_job_application_count
    AFTER INSERT OR DELETE ON job_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_job_application_count();

-- Sync existing application counts
UPDATE jobs 
SET application_count = (
    SELECT COUNT(*) 
    FROM job_applications 
    WHERE job_applications.job_id = jobs.id
);