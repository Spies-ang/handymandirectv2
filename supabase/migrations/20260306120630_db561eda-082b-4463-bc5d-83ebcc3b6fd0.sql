
DROP POLICY IF EXISTS "Contractors can read open jobs" ON public.jobs;

CREATE POLICY "Contractors can read open jobs"
ON public.jobs
FOR SELECT
TO authenticated
USING (
  status = 'open'::job_status
  AND has_role(auth.uid(), 'contractor'::app_role)
  AND EXISTS (
    SELECT 1 FROM public.contractor_profiles
    WHERE user_id = auth.uid() AND is_verified = true
  )
);
