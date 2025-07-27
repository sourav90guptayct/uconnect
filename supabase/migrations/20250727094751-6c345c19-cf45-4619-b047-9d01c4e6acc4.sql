-- Add new columns to candidate_profiles table for additional personal details
ALTER TABLE public.candidate_profiles 
ADD COLUMN marital_status TEXT,
ADD COLUMN family_details TEXT,
ADD COLUMN caste TEXT,
ADD COLUMN disability_status TEXT,
ADD COLUMN profile_picture_url TEXT,
ADD COLUMN industry TEXT;

-- Create an enum for common industries
CREATE TYPE industry_type AS ENUM (
  'technology',
  'healthcare',
  'finance',
  'education',
  'retail',
  'manufacturing',
  'consulting',
  'marketing',
  'real_estate',
  'automotive',
  'aerospace',
  'energy',
  'media',
  'hospitality',
  'construction',
  'agriculture',
  'logistics',
  'telecommunications',
  'government',
  'non_profit',
  'other'
);

-- Update the industry column to use the enum
ALTER TABLE public.candidate_profiles 
ALTER COLUMN industry TYPE industry_type USING industry::industry_type;

-- Create storage bucket for profile pictures
INSERT INTO storage.buckets (id, name, public) 
VALUES ('profile-pictures', 'profile-pictures', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for profile pictures
CREATE POLICY "Users can view profile pictures" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'profile-pictures');

CREATE POLICY "Users can upload their own profile pictures" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own profile pictures" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own profile pictures" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);