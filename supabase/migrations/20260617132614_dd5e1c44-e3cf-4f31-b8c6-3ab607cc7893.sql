
CREATE OR REPLACE FUNCTION public.protect_engagement_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF public.has_role(auth.uid(), 'admin'::app_role) THEN
    RETURN NEW;
  END IF;

  NEW.credits_used  := OLD.credits_used;
  NEW.job_id        := OLD.job_id;
  NEW.contractor_id := OLD.contractor_id;
  NEW.created_at    := OLD.created_at;

  IF NEW.status NOT IN ('active'::engagement_status, 'completed'::engagement_status, 'bad_lead'::engagement_status) THEN
    RAISE EXCEPTION 'Invalid engagement status';
  END IF;

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.protect_engagement_fields() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS protect_engagement_fields_trg ON public.engagements;
CREATE TRIGGER protect_engagement_fields_trg
  BEFORE UPDATE ON public.engagements
  FOR EACH ROW EXECUTE FUNCTION public.protect_engagement_fields();

DROP POLICY IF EXISTS "Anyone can view job photos" ON storage.objects;

REVOKE SELECT ON
  public.contractor_profiles,
  public.credits_transactions,
  public.customer_profiles,
  public.engagements,
  public.invoices,
  public.jobs,
  public.notifications,
  public.profiles,
  public.quotes,
  public.reviews,
  public.subscriptions,
  public.user_roles
FROM anon;

REVOKE EXECUTE ON FUNCTION public.handle_new_user()       FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.notify_new_contractor() FROM PUBLIC, anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role)          FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.engage_job(uuid)                  FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_customer_for_engagement(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.promote_to_contractor(uuid)       FROM PUBLIC, anon;
