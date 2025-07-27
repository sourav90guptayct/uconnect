-- Fix the function search path security issue
CREATE OR REPLACE FUNCTION assign_admin_role_to_user(user_email TEXT)
RETURNS VOID AS $$
DECLARE
    target_user_id UUID;
BEGIN
    -- Get the user ID from auth.users based on email
    SELECT id INTO target_user_id
    FROM auth.users
    WHERE email = user_email;
    
    -- If user exists, insert admin role
    IF target_user_id IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role)
        VALUES (target_user_id, 'admin'::app_role)
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';