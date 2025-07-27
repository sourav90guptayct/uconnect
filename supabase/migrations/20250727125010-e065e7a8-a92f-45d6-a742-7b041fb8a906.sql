-- Create the app_role enum type
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Now assign admin role to the specified user
SELECT public.assign_admin_role_to_user('sourav90.gupta@gmail.com');