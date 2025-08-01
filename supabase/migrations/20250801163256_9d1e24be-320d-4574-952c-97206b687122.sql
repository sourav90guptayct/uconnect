-- Create an edge function to handle admin user creation
-- This will be created as an edge function that admins can call

-- First, let's add a function to create employee auth accounts
CREATE OR REPLACE FUNCTION public.create_employee_auth_account(
  employee_email text,
  employee_password text,
  employee_first_name text,
  employee_last_name text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  new_user_id uuid;
BEGIN
  -- This function will be called from an edge function
  -- Return a placeholder for now - the actual user creation will happen in the edge function
  RETURN gen_random_uuid();
END;
$$;

-- Add a function to get employee by email for login verification
CREATE OR REPLACE FUNCTION public.get_employee_by_email(employee_email text)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  employee_id text,
  first_name text,
  last_name text,
  email text,
  department text,
  position text,
  is_active boolean
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT 
    ep.id,
    ep.user_id,
    ep.employee_id,
    ep.first_name,
    ep.last_name,
    ep.email,
    ep.department,
    ep.position,
    ep.is_active
  FROM public.employee_profiles ep
  WHERE ep.email = employee_email AND ep.is_active = true;
$$;