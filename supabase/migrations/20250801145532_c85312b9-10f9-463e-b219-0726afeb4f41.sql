-- Enable realtime for job_applications table to allow real-time status updates
-- This will allow applicants to see status changes immediately when admins update them

-- Enable realtime replication for job_applications table
ALTER TABLE public.job_applications REPLICA IDENTITY FULL;

-- Add the table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.job_applications;