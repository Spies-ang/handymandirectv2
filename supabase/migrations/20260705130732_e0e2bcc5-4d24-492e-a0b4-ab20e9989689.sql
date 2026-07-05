DROP POLICY IF EXISTS "Authenticated users can upload job photos" ON storage.objects;

CREATE POLICY "Customers can upload job photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'job-photos'
  AND (storage.foldername(name))[1] = auth.uid()::text
  AND public.has_role(auth.uid(), 'customer'::public.app_role)
);