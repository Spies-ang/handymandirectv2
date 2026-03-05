-- Fix 1: Quotes INSERT policy - require contractor role
DROP POLICY IF EXISTS "Contractors can insert quotes" ON public.quotes;
CREATE POLICY "Contractors can insert quotes" ON public.quotes
  FOR INSERT TO authenticated
  WITH CHECK (
    contractor_id = auth.uid()
    AND public.has_role(auth.uid(), 'contractor'::app_role)
  );

-- Fix 2: Make profile-pictures bucket private
UPDATE storage.buckets SET public = false WHERE id = 'profile-pictures';

DROP POLICY IF EXISTS "Anyone can view profile pictures" ON storage.objects;
DROP POLICY IF EXISTS "Public can view profile pictures" ON storage.objects;

CREATE POLICY "Authenticated users can view profile pictures"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'profile-pictures');