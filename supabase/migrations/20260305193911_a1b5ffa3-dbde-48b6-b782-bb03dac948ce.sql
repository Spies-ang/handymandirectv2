
-- 1. Add unique constraint to prevent duplicate engagements
ALTER TABLE public.engagements ADD CONSTRAINT uq_engagement UNIQUE (job_id, contractor_id);

-- 2. Create atomic engagement function
CREATE OR REPLACE FUNCTION public.engage_job(p_job_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_credits integer;
  v_engagement_id uuid;
  v_user_id uuid;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Verify caller is a contractor
  IF NOT has_role(v_user_id, 'contractor'::app_role) THEN
    RAISE EXCEPTION 'Only contractors can engage with jobs';
  END IF;

  -- Verify job exists and is open
  IF NOT EXISTS (SELECT 1 FROM public.jobs WHERE id = p_job_id AND status = 'open'::job_status) THEN
    RAISE EXCEPTION 'Job is not available';
  END IF;

  -- Check for existing engagement
  IF EXISTS (SELECT 1 FROM public.engagements WHERE job_id = p_job_id AND contractor_id = v_user_id) THEN
    RAISE EXCEPTION 'Already engaged with this job';
  END IF;

  -- Lock and check credits
  SELECT credits_balance INTO v_credits
  FROM public.contractor_profiles
  WHERE user_id = v_user_id
  FOR UPDATE;

  IF v_credits IS NULL OR v_credits < 1 THEN
    RAISE EXCEPTION 'Insufficient credits';
  END IF;

  -- Deduct credit
  UPDATE public.contractor_profiles
  SET credits_balance = credits_balance - 1
  WHERE user_id = v_user_id;

  -- Create engagement
  INSERT INTO public.engagements (job_id, contractor_id, credits_used, status)
  VALUES (p_job_id, v_user_id, 1, 'active'::engagement_status)
  RETURNING id INTO v_engagement_id;

  -- Log transaction
  INSERT INTO public.credits_transactions (contractor_id, amount, type, reference)
  VALUES (v_user_id, -1, 'spend'::credit_type, 'Engaged job ' || p_job_id::text);

  RETURN v_engagement_id;
END;
$$;
