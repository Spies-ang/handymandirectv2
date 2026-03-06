
-- Drop the existing blanket UPDATE policy
DROP POLICY IF EXISTS "Contractors can update own safe fields" ON public.contractor_profiles;

-- Create a new UPDATE policy that prevents contractors from modifying sensitive columns
CREATE POLICY "Contractors can update own safe fields" ON public.contractor_profiles
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (
    user_id = auth.uid()
    AND is_verified IS NOT DISTINCT FROM (SELECT cp.is_verified FROM public.contractor_profiles cp WHERE cp.user_id = auth.uid())
    AND subscription_status IS NOT DISTINCT FROM (SELECT cp.subscription_status FROM public.contractor_profiles cp WHERE cp.user_id = auth.uid())
    AND credits_balance IS NOT DISTINCT FROM (SELECT cp.credits_balance FROM public.contractor_profiles cp WHERE cp.user_id = auth.uid())
  );
