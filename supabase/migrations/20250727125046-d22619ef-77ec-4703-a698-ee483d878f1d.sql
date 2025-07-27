-- Assign admin role to sourav90.gupta@gmail.com
DO $$
DECLARE
    target_user_id UUID;
BEGIN
    -- Get the user ID from auth.users based on email
    SELECT id INTO target_user_id
    FROM auth.users
    WHERE email = 'sourav90.gupta@gmail.com';
    
    -- If user exists, insert admin role
    IF target_user_id IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role)
        VALUES (target_user_id, 'admin'::app_role)
        ON CONFLICT (user_id, role) DO NOTHING;
        
        RAISE NOTICE 'Admin role assigned to user: %', target_user_id;
    ELSE
        RAISE NOTICE 'User with email sourav90.gupta@gmail.com not found';
    END IF;
END $$;