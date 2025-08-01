-- Enable realtime for job_applications table
ALTER TABLE job_applications REPLICA IDENTITY FULL;

-- Add the table to realtime publication if not already added
ALTER PUBLICATION supabase_realtime ADD TABLE job_applications;