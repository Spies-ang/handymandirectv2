CREATE OR REPLACE FUNCTION public.get_customer_for_engagement(p_job_id uuid)
RETURNS TABLE (full_name text, mobile text, email text)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  -- Verify the caller has an active engagement on this job
  IF NOT EXISTS (
    SELECT 1 FROM public.engagements
    WHERE job_id = p_job_id
      AND contractor_id = auth.uid()
      AND status = 'active'
  ) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  RETURN QUERY
    SELECT p.full_name, p.mobile, p.email
    FROM public.profiles p
    JOIN public.jobs j ON j.customer_id = p.user_id
    WHERE j.id = p_job_id;
END;
$$;