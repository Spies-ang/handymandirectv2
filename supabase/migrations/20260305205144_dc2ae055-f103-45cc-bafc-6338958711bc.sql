-- Make job-photos bucket private
UPDATE storage.buckets SET public = false WHERE id = 'job-photos';

-- Drop the old public SELECT policy and replace with authenticated-only
DROP POLICY IF EXISTS "Authenticated users can view job photos" ON storage.objects;
DROP POLICY IF EXISTS "Public can view job photos" ON storage.objects;

CREATE POLICY "Authenticated users can view job photos"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'job-photos');