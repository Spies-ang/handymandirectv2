
-- Tighten job-photos SELECT
DROP POLICY IF EXISTS "Authenticated users can view job photos" ON storage.objects;

CREATE POLICY "Owners can view their job photos"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'job-photos'
  AND (storage.foldername(name))[1] = (auth.uid())::text
);

CREATE POLICY "Admins can view all job photos"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'job-photos'
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

-- Tighten profile-pictures SELECT
DROP POLICY IF EXISTS "Authenticated users can view profile pictures" ON storage.objects;

CREATE POLICY "Owners can view their profile picture"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'profile-pictures'
  AND (storage.foldername(name))[1] = (auth.uid())::text
);

CREATE POLICY "Admins can view all profile pictures"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'profile-pictures'
  AND public.has_role(auth.uid(), 'admin'::app_role)
);
