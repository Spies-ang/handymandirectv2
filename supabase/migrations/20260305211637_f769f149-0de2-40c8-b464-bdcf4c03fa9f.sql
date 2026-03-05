
DROP POLICY IF EXISTS "Customers can insert reviews" ON public.reviews;
CREATE POLICY "Customers can insert reviews" ON public.reviews
  FOR INSERT TO authenticated
  WITH CHECK (
    customer_id = auth.uid()
    AND public.has_role(auth.uid(), 'customer'::app_role)
    AND EXISTS (
      SELECT 1 FROM public.jobs j
      WHERE j.id = job_id AND j.customer_id = auth.uid()
    )
    AND EXISTS (
      SELECT 1 FROM public.engagements e
      WHERE e.job_id = reviews.job_id AND e.contractor_id = reviews.contractor_id
    )
  );
