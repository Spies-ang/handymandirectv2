
DROP POLICY IF EXISTS "Users can read all reviews" ON public.reviews;
CREATE POLICY "Involved parties and admins can read reviews"
ON public.reviews
FOR SELECT
TO authenticated
USING (
  customer_id = auth.uid()
  OR contractor_id = auth.uid()
  OR has_role(auth.uid(), 'admin'::app_role)
);

DROP POLICY IF EXISTS "Contractors can upload documents" ON storage.objects;
CREATE POLICY "Contractors with profile can upload documents"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'contractor-documents'
  AND (storage.foldername(name))[1] = auth.uid()::text
  AND EXISTS (
    SELECT 1 FROM public.contractor_profiles cp WHERE cp.user_id = auth.uid()
  )
);
