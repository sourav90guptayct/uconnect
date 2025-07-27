-- Insert admin role for the specific user
-- First, we need to find the user ID for sourav90.gupta@gmail.com
-- Since we can't directly query auth.users, we'll create a function to handle this

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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Assign admin role to the specific user
SELECT assign_admin_role_to_user('sourav90.gupta@gmail.com');