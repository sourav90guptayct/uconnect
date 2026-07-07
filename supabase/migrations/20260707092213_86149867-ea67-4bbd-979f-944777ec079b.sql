
-- Remove admin role from all existing users
DELETE FROM public.user_roles WHERE role = 'admin';

-- Create the new admin user in auth.users (or reuse if already exists)
DO $$
DECLARE
  new_user_id uuid;
  existing_id uuid;
BEGIN
  SELECT id INTO existing_id FROM auth.users WHERE email = 'reachus@youconnecttech.com';

  IF existing_id IS NULL THEN
    new_user_id := gen_random_uuid();

    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, recovery_sent_at, last_sign_in_at,
      raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at, confirmation_token, email_change,
      email_change_token_new, recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      new_user_id,
      'authenticated',
      'authenticated',
      'reachus@youconnecttech.com',
      crypt('Admin@123', gen_salt('bf')),
      now(), now(), now(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      now(), now(), '', '', '', ''
    );

    INSERT INTO auth.identities (
      id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(), new_user_id, new_user_id::text,
      format('{"sub":"%s","email":"%s"}', new_user_id, 'reachus@youconnecttech.com')::jsonb,
      'email', now(), now(), now()
    );
  ELSE
    new_user_id := existing_id;
    UPDATE auth.users
    SET encrypted_password = crypt('Admin@123', gen_salt('bf')),
        email_confirmed_at = COALESCE(email_confirmed_at, now()),
        updated_at = now()
    WHERE id = existing_id;
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (new_user_id, 'admin'::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;
END $$;
