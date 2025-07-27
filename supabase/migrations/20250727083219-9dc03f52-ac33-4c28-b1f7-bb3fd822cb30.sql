-- Fix the function search path security issue
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Update RLS policies to restrict to authenticated users only
-- Remove existing policies that allow anonymous access
DROP POLICY IF EXISTS "Users can view their own profile" ON public.candidate_profiles;
DROP POLICY IF EXISTS "Users can create their own profile" ON public.candidate_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.candidate_profiles;

DROP POLICY IF EXISTS "Users can view their own education" ON public.candidate_education;
DROP POLICY IF EXISTS "Users can create their own education" ON public.candidate_education;
DROP POLICY IF EXISTS "Users can update their own education" ON public.candidate_education;
DROP POLICY IF EXISTS "Users can delete their own education" ON public.candidate_education;

DROP POLICY IF EXISTS "Users can view their own skills" ON public.candidate_skills;
DROP POLICY IF EXISTS "Users can create their own skills" ON public.candidate_skills;
DROP POLICY IF EXISTS "Users can update their own skills" ON public.candidate_skills;
DROP POLICY IF EXISTS "Users can delete their own skills" ON public.candidate_skills;

DROP POLICY IF EXISTS "Users can view their own experience" ON public.candidate_experience;
DROP POLICY IF EXISTS "Users can create their own experience" ON public.candidate_experience;
DROP POLICY IF EXISTS "Users can update their own experience" ON public.candidate_experience;
DROP POLICY IF EXISTS "Users can delete their own experience" ON public.candidate_experience;

-- Create new policies that restrict to authenticated users only
-- RLS Policies for candidate_profiles
CREATE POLICY "Authenticated users can view their own profile" 
ON public.candidate_profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create their own profile" 
ON public.candidate_profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own profile" 
ON public.candidate_profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- RLS Policies for candidate_education
CREATE POLICY "Authenticated users can view their own education" 
ON public.candidate_education 
FOR SELECT 
TO authenticated
USING (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Authenticated users can create their own education" 
ON public.candidate_education 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Authenticated users can update their own education" 
ON public.candidate_education 
FOR UPDATE 
TO authenticated
USING (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Authenticated users can delete their own education" 
ON public.candidate_education 
FOR DELETE 
TO authenticated
USING (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

-- RLS Policies for candidate_skills
CREATE POLICY "Authenticated users can view their own skills" 
ON public.candidate_skills 
FOR SELECT 
TO authenticated
USING (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Authenticated users can create their own skills" 
ON public.candidate_skills 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Authenticated users can update their own skills" 
ON public.candidate_skills 
FOR UPDATE 
TO authenticated
USING (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Authenticated users can delete their own skills" 
ON public.candidate_skills 
FOR DELETE 
TO authenticated
USING (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

-- RLS Policies for candidate_experience
CREATE POLICY "Authenticated users can view their own experience" 
ON public.candidate_experience 
FOR SELECT 
TO authenticated
USING (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Authenticated users can create their own experience" 
ON public.candidate_experience 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Authenticated users can update their own experience" 
ON public.candidate_experience 
FOR UPDATE 
TO authenticated
USING (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Authenticated users can delete their own experience" 
ON public.candidate_experience 
FOR DELETE 
TO authenticated
USING (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));