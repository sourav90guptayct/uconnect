-- Ensure the admin user exists and is properly configured
DO $$
DECLARE
    admin_user_id UUID;
BEGIN
    -- Check if user exists, if not this will help identify the issue
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = 'sourav90.gupta@gmail.com';
    
    IF admin_user_id IS NULL THEN
        RAISE NOTICE 'Admin user does not exist in auth.users table';
    ELSE
        -- Update user to be confirmed (in case email confirmation is blocking)
        UPDATE auth.users 
        SET 
            email_confirmed_at = COALESCE(email_confirmed_at, now()),
            confirmed_at = COALESCE(confirmed_at, now())
        WHERE id = admin_user_id;
        
        -- Ensure admin role exists
        INSERT INTO public.user_roles (user_id, role)
        VALUES (admin_user_id, 'admin'::app_role)
        ON CONFLICT (user_id, role) DO NOTHING;
        
        RAISE NOTICE 'Admin user updated and confirmed';
    END IF;
END $$;