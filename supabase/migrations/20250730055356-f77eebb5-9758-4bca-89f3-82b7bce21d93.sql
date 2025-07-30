-- Fix the security issue with function search path
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';