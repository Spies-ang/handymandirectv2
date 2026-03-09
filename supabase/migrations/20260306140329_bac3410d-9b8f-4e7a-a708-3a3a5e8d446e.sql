
-- Enable pg_net extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Create the trigger function
CREATE OR REPLACE FUNCTION public.notify_new_contractor()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  payload jsonb;
  edge_function_url text;
  service_role_key text;
BEGIN
  payload := jsonb_build_object('record', row_to_json(NEW));

  SELECT decrypted_secret INTO service_role_key
  FROM vault.decrypted_secrets
  WHERE name = 'SUPABASE_SERVICE_ROLE_KEY'
  LIMIT 1;

  edge_function_url := 'https://xualguiyqxutdgybbhie.supabase.co/functions/v1/notify-new-contractor';

  PERFORM net.http_post(
    url := edge_function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || service_role_key
    ),
    body := payload
  );

  RETURN NEW;
END;
$$;

-- Create the trigger
DROP TRIGGER IF EXISTS on_new_contractor_profile ON public.contractor_profiles;
CREATE TRIGGER on_new_contractor_profile
  AFTER INSERT ON public.contractor_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_contractor();
