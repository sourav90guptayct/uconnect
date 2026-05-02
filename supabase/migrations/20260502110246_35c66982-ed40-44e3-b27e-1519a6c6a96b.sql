
-- Revoke EXECUTE from anon and public on functions that shouldn't be publicly callable

-- assign_admin_role_to_user: only used manually from DB dashboard
REVOKE EXECUTE ON FUNCTION public.assign_admin_role_to_user(text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.assign_admin_role_to_user(text) FROM authenticated;

-- get_user_email: has internal admin check but shouldn't be callable by anon
REVOKE EXECUTE ON FUNCTION public.get_user_email(uuid) FROM anon;

-- get_employee_by_email: used by edge functions (service_role), not by anon
REVOKE EXECUTE ON FUNCTION public.get_employee_by_email(text) FROM anon;

-- Trigger functions don't need direct EXECUTE by any API role
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM authenticated;

REVOKE EXECUTE ON FUNCTION public.update_job_application_count() FROM anon;
REVOKE EXECUTE ON FUNCTION public.update_job_application_count() FROM authenticated;
