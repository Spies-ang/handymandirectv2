
-- Fix 1: Replace handle_new_user to prevent admin self-assignment
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _role app_role;
BEGIN
  -- Determine role safely: if company_name is provided, treat as contractor, otherwise customer.
  -- NEVER allow 'admin' to be self-assigned via signup metadata.
  _role := CASE 
    WHEN NEW.raw_user_meta_data->>'company_name' IS NOT NULL 
         AND NEW.raw_user_meta_data->>'company_name' != '' THEN 'contractor'::app_role
    ELSE 'customer'::app_role
  END;

  -- Create profile
  INSERT INTO public.profiles (user_id, full_name, email, mobile)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'mobile', '')
  );

  -- Assign role
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, _role);

  -- Create role-specific profile
  IF _role = 'customer' THEN
    INSERT INTO public.customer_profiles (user_id) VALUES (NEW.id);
  ELSIF _role = 'contractor' THEN
    INSERT INTO public.contractor_profiles (
      user_id,
      company_name,
      trade_categories,
      company_address,
      coverage_radius_km
    ) VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'company_name', ''),
      COALESCE(
        ARRAY(SELECT jsonb_array_elements_text((NEW.raw_user_meta_data->>'trade_categories')::jsonb)),
        '{}'
      ),
      COALESCE(NEW.raw_user_meta_data->>'company_address', ''),
      COALESCE((NEW.raw_user_meta_data->>'coverage_radius_km')::integer, 25)
    );
  END IF;

  RETURN NEW;
END;
$function$;

-- Fix 2: Replace contractor_profiles UPDATE policy with column-level restrictions
DROP POLICY IF EXISTS "Contractors can update own" ON public.contractor_profiles;

CREATE POLICY "Contractors can update own safe fields" ON public.contractor_profiles
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (
    user_id = auth.uid()
    AND is_verified IS NOT DISTINCT FROM (SELECT cp.is_verified FROM public.contractor_profiles cp WHERE cp.user_id = auth.uid())
    AND subscription_status IS NOT DISTINCT FROM (SELECT cp.subscription_status FROM public.contractor_profiles cp WHERE cp.user_id = auth.uid())
    AND credits_balance IS NOT DISTINCT FROM (SELECT cp.credits_balance FROM public.contractor_profiles cp WHERE cp.user_id = auth.uid())
  );
