-- Fix the syntax error by using quotes around position column name
CREATE OR REPLACE FUNCTION public.get_employee_by_email(employee_email text)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  employee_id text,
  first_name text,
  last_name text,
  email text,
  department text,
  "position" text,
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
    ep."position",
    ep.is_active
  FROM public.employee_profiles ep
  WHERE ep.email = employee_email AND ep.is_active = true;
$$;