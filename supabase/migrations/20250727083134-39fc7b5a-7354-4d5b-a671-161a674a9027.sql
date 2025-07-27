-- Create enum types for better data consistency
CREATE TYPE public.education_level AS ENUM ('10th', '12th', 'diploma', 'bachelor', 'master', 'phd', 'other');
CREATE TYPE public.experience_level AS ENUM ('fresher', '1-2', '3-5', '6-10', '10+');
CREATE TYPE public.employment_type AS ENUM ('full_time', 'part_time', 'contract', 'internship', 'freelance');

-- Create candidate profiles table
CREATE TABLE public.candidate_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT,
  current_city TEXT,
  home_location TEXT,
  total_experience experience_level DEFAULT 'fresher',
  current_salary DECIMAL(10,2),
  expected_salary DECIMAL(10,2),
  notice_period INTEGER, -- in days
  resume_url TEXT,
  profile_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create education table
CREATE TABLE public.candidate_education (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  education_level education_level NOT NULL,
  course_name TEXT NOT NULL,
  specialization TEXT,
  institute_name TEXT NOT NULL,
  year_of_passing INTEGER,
  percentage DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create skills table
CREATE TABLE public.candidate_skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  proficiency_level INTEGER CHECK (proficiency_level >= 1 AND proficiency_level <= 5), -- 1-5 scale
  years_of_experience DECIMAL(3,1),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create work experience table
CREATE TABLE public.candidate_experience (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id UUID NOT NULL REFERENCES public.candidate_profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  designation TEXT NOT NULL,
  employment_type employment_type DEFAULT 'full_time',
  start_date DATE NOT NULL,
  end_date DATE, -- NULL if current job
  is_current_job BOOLEAN DEFAULT FALSE,
  salary DECIMAL(10,2),
  job_description TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.candidate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_experience ENABLE ROW LEVEL SECURITY;

-- RLS Policies for candidate_profiles
CREATE POLICY "Users can view their own profile" 
ON public.candidate_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.candidate_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.candidate_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for candidate_education
CREATE POLICY "Users can view their own education" 
ON public.candidate_education 
FOR SELECT 
USING (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Users can create their own education" 
ON public.candidate_education 
FOR INSERT 
WITH CHECK (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Users can update their own education" 
ON public.candidate_education 
FOR UPDATE 
USING (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Users can delete their own education" 
ON public.candidate_education 
FOR DELETE 
USING (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

-- RLS Policies for candidate_skills
CREATE POLICY "Users can view their own skills" 
ON public.candidate_skills 
FOR SELECT 
USING (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Users can create their own skills" 
ON public.candidate_skills 
FOR INSERT 
WITH CHECK (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Users can update their own skills" 
ON public.candidate_skills 
FOR UPDATE 
USING (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Users can delete their own skills" 
ON public.candidate_skills 
FOR DELETE 
USING (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

-- RLS Policies for candidate_experience
CREATE POLICY "Users can view their own experience" 
ON public.candidate_experience 
FOR SELECT 
USING (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Users can create their own experience" 
ON public.candidate_experience 
FOR INSERT 
WITH CHECK (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Users can update their own experience" 
ON public.candidate_experience 
FOR UPDATE 
USING (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

CREATE POLICY "Users can delete their own experience" 
ON public.candidate_experience 
FOR DELETE 
USING (auth.uid() = (SELECT user_id FROM public.candidate_profiles WHERE id = candidate_id));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_candidate_profiles_updated_at
  BEFORE UPDATE ON public.candidate_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();