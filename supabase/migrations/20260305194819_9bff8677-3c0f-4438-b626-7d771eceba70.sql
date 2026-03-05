
-- Fix 1: Add role check to jobs INSERT policy
DROP POLICY "Customers can insert jobs" ON public.jobs;
CREATE POLICY "Customers can insert jobs" ON public.jobs
  FOR INSERT TO authenticated
  WITH CHECK (
    customer_id = auth.uid()
    AND public.has_role(auth.uid(), 'customer')
  );

-- Fix 2: Tighten storage upload policies with path ownership
DROP POLICY IF EXISTS "Authenticated users can upload job photos" ON storage.objects;
CREATE POLICY "Authenticated users can upload job photos"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'job-photos'
    AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS "Authenticated users can upload profile pictures" ON storage.objects;
CREATE POLICY "Authenticated users can upload profile pictures"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'profile-pictures'
    AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS "Contractors can upload documents" ON storage.objects;
CREATE POLICY "Contractors can upload documents"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'contractor-documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
    AND public.has_role(auth.uid(), 'contractor'));
