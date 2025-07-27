-- Enable RLS on storage.objects table (this fixes the security warning)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;