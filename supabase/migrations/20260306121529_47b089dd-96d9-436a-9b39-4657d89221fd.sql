
-- 1. Update handle_new_user to ALWAYS assign 'customer' role.
--    Contractor signup metadata is still stored in profiles but the user
--    starts as a customer until an admin promotes them.
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (user_id, full_name, email, mobile)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'mobile', '')
  );

  -- Always assign customer role — contractor promotion requires admin action
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer'::app_role);

  -- Always create a customer profile
  INSERT INTO public.customer_profiles (user_id) VALUES (NEW.id);

  -- If contractor metadata was provided, also create a contractor_profile
  -- (but the role remains 'customer' until admin promotes)
  IF NEW.raw_user_meta_data->>'company_name' IS NOT NULL
     AND NEW.raw_user_meta_data->>'company_name' != '' THEN
    INSERT INTO public.contractor_profiles (
      user_id,
      company_name,
      trade_categories,
      company_address,
      coverage_radius_km,
      is_verified
    ) VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'company_name', ''),
      COALESCE(
        ARRAY(SELECT jsonb_array_elements_text((NEW.raw_user_meta_data->>'trade_categories')::jsonb)),
        '{}'
      ),
      COALESCE(NEW.raw_user_meta_data->>'company_address', ''),
      COALESCE((NEW.raw_user_meta_data->>'coverage_radius_km')::integer, 25),
      false
    );
  END IF;

  RETURN NEW;
END;
$function$;

-- 2. Create admin-only RPC to promote a user to contractor
CREATE OR REPLACE FUNCTION public.promote_to_contractor(p_user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Only admins can promote
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Only admins can promote users to contractor';
  END IF;

  -- Verify a contractor_profile exists for this user
  IF NOT EXISTS (SELECT 1 FROM public.contractor_profiles WHERE user_id = p_user_id) THEN
    RAISE EXCEPTION 'No contractor profile found for this user';
  END IF;

  -- Upsert the contractor role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (p_user_id, 'contractor'::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;

  -- Mark as verified
  UPDATE public.contractor_profiles
  SET is_verified = true
  WHERE user_id = p_user_id;
END;
$function$;
