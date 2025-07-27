-- Ensure the admin user is properly confirmed
DO $$
DECLARE
    admin_user_id UUID;
BEGIN
    -- Check if user exists
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = 'sourav90.gupta@gmail.com';
    
    IF admin_user_id IS NOT NULL THEN
        -- Update user to be email confirmed (in case email confirmation is blocking)
        UPDATE auth.users 
        SET email_confirmed_at = COALESCE(email_confirmed_at, now())
        WHERE id = admin_user_id;
        
        -- Ensure admin role exists
        INSERT INTO public.user_roles (user_id, role)
        VALUES (admin_user_id, 'admin'::app_role)
        ON CONFLICT (user_id, role) DO NOTHING;
        
        RAISE NOTICE 'Admin user email confirmed and admin role assigned';
    ELSE
        RAISE NOTICE 'Admin user does not exist in auth.users table';
    END IF;
END $$;