
-- ============================================================
-- Fix: Drop all RESTRICTIVE policies and recreate as PERMISSIVE
-- ============================================================

-- contractor_profiles
DROP POLICY IF EXISTS "Admin can read all contractor_profiles" ON public.contractor_profiles;
DROP POLICY IF EXISTS "Admins can read all contractor profiles" ON public.contractor_profiles;
DROP POLICY IF EXISTS "Contractors can insert own" ON public.contractor_profiles;
DROP POLICY IF EXISTS "Contractors can read own" ON public.contractor_profiles;
DROP POLICY IF EXISTS "Contractors can update own safe fields" ON public.contractor_profiles;

CREATE POLICY "Admin can read all contractor_profiles" ON public.contractor_profiles FOR SELECT TO public USING (EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'::app_role));
CREATE POLICY "Admins can read all contractor profiles" ON public.contractor_profiles FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Contractors can insert own" ON public.contractor_profiles FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Contractors can read own" ON public.contractor_profiles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Contractors can update own safe fields" ON public.contractor_profiles FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (
    (user_id = auth.uid())
    AND (NOT (is_verified IS DISTINCT FROM (SELECT cp.is_verified FROM contractor_profiles cp WHERE cp.user_id = auth.uid())))
    AND (NOT (subscription_status IS DISTINCT FROM (SELECT cp.subscription_status FROM contractor_profiles cp WHERE cp.user_id = auth.uid())))
    AND (NOT (credits_balance IS DISTINCT FROM (SELECT cp.credits_balance FROM contractor_profiles cp WHERE cp.user_id = auth.uid())))
  );

-- credits_transactions
DROP POLICY IF EXISTS "Admin can read all credits_transactions" ON public.credits_transactions;
DROP POLICY IF EXISTS "Admins can manage all credits" ON public.credits_transactions;
DROP POLICY IF EXISTS "Contractors can read own credits" ON public.credits_transactions;

CREATE POLICY "Admin can read all credits_transactions" ON public.credits_transactions FOR SELECT TO public USING (EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'::app_role));
CREATE POLICY "Admins can manage all credits" ON public.credits_transactions FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Contractors can read own credits" ON public.credits_transactions FOR SELECT TO authenticated USING (contractor_id = auth.uid());

-- customer_profiles
DROP POLICY IF EXISTS "Admins can read all customer profiles" ON public.customer_profiles;
DROP POLICY IF EXISTS "Customers can insert own" ON public.customer_profiles;
DROP POLICY IF EXISTS "Customers can read own" ON public.customer_profiles;
DROP POLICY IF EXISTS "Customers can update own" ON public.customer_profiles;

CREATE POLICY "Admins can read all customer profiles" ON public.customer_profiles FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Customers can insert own" ON public.customer_profiles FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Customers can read own" ON public.customer_profiles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Customers can update own" ON public.customer_profiles FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- engagements
DROP POLICY IF EXISTS "Admins can manage all engagements" ON public.engagements;
DROP POLICY IF EXISTS "Contractors can read own engagements" ON public.engagements;
DROP POLICY IF EXISTS "Contractors can update own engagements" ON public.engagements;
DROP POLICY IF EXISTS "Customers can read engagements on own jobs" ON public.engagements;

CREATE POLICY "Admins can manage all engagements" ON public.engagements FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Contractors can read own engagements" ON public.engagements FOR SELECT TO authenticated USING (contractor_id = auth.uid());
CREATE POLICY "Contractors can update own engagements" ON public.engagements FOR UPDATE TO authenticated USING (contractor_id = auth.uid());
CREATE POLICY "Customers can read engagements on own jobs" ON public.engagements FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM jobs WHERE jobs.id = engagements.job_id AND jobs.customer_id = auth.uid()));

-- invoices
DROP POLICY IF EXISTS "Admin can read all invoices" ON public.invoices;
DROP POLICY IF EXISTS "Admins can manage all invoices" ON public.invoices;
DROP POLICY IF EXISTS "Users can read own invoices" ON public.invoices;

CREATE POLICY "Admin can read all invoices" ON public.invoices FOR SELECT TO public USING (EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'::app_role));
CREATE POLICY "Admins can manage all invoices" ON public.invoices FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can read own invoices" ON public.invoices FOR SELECT TO authenticated USING (user_id = auth.uid());

-- jobs
DROP POLICY IF EXISTS "Admin can read all jobs" ON public.jobs;
DROP POLICY IF EXISTS "Admins can manage all jobs" ON public.jobs;
DROP POLICY IF EXISTS "Contractors can read open jobs" ON public.jobs;
DROP POLICY IF EXISTS "Customers can insert jobs" ON public.jobs;
DROP POLICY IF EXISTS "Customers can read own jobs" ON public.jobs;
DROP POLICY IF EXISTS "Customers can update own jobs" ON public.jobs;

CREATE POLICY "Admin can read all jobs" ON public.jobs FOR SELECT TO public USING (EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'::app_role));
CREATE POLICY "Admins can manage all jobs" ON public.jobs FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Contractors can read open jobs" ON public.jobs FOR SELECT TO authenticated USING (status = 'open'::job_status AND has_role(auth.uid(), 'contractor'::app_role) AND EXISTS (SELECT 1 FROM contractor_profiles WHERE contractor_profiles.user_id = auth.uid() AND contractor_profiles.is_verified = true));
CREATE POLICY "Customers can insert jobs" ON public.jobs FOR INSERT TO authenticated WITH CHECK (customer_id = auth.uid() AND has_role(auth.uid(), 'customer'::app_role));
CREATE POLICY "Customers can read own jobs" ON public.jobs FOR SELECT TO authenticated USING (customer_id = auth.uid());
CREATE POLICY "Customers can update own jobs" ON public.jobs FOR UPDATE TO authenticated USING (customer_id = auth.uid());

-- notifications
DROP POLICY IF EXISTS "Admins can manage all notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can read own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;

CREATE POLICY "Admins can manage all notifications" ON public.notifications FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can read own notifications" ON public.notifications FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- profiles
DROP POLICY IF EXISTS "Admin can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Admin can read all profiles" ON public.profiles FOR SELECT TO public USING (EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'::app_role));
CREATE POLICY "Admins can read all profiles" ON public.profiles FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- quotes
DROP POLICY IF EXISTS "Admins can manage all quotes" ON public.quotes;
DROP POLICY IF EXISTS "Contractors can insert quotes" ON public.quotes;
DROP POLICY IF EXISTS "Contractors can read own quotes" ON public.quotes;
DROP POLICY IF EXISTS "Customers can read quotes on own jobs" ON public.quotes;

CREATE POLICY "Admins can manage all quotes" ON public.quotes FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Contractors can insert quotes" ON public.quotes FOR INSERT TO authenticated WITH CHECK (contractor_id = auth.uid() AND has_role(auth.uid(), 'contractor'::app_role));
CREATE POLICY "Contractors can read own quotes" ON public.quotes FOR SELECT TO authenticated USING (contractor_id = auth.uid());
CREATE POLICY "Customers can read quotes on own jobs" ON public.quotes FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM jobs WHERE jobs.id = quotes.job_id AND jobs.customer_id = auth.uid()));

-- reviews
DROP POLICY IF EXISTS "Admin can read all reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can manage all reviews" ON public.reviews;
DROP POLICY IF EXISTS "Customers can insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can read all reviews" ON public.reviews;

CREATE POLICY "Admin can read all reviews" ON public.reviews FOR SELECT TO public USING (EXISTS (SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'::app_role));
CREATE POLICY "Admins can manage all reviews" ON public.reviews FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Customers can insert reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (
  customer_id = auth.uid()
  AND has_role(auth.uid(), 'customer'::app_role)
  AND EXISTS (SELECT 1 FROM jobs j WHERE j.id = reviews.job_id AND j.customer_id = auth.uid())
  AND EXISTS (SELECT 1 FROM engagements e WHERE e.job_id = reviews.job_id AND e.contractor_id = reviews.contractor_id)
);
CREATE POLICY "Users can read all reviews" ON public.reviews FOR SELECT TO authenticated USING (true);

-- subscriptions
DROP POLICY IF EXISTS "Admins can manage all subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Contractors can read own subscriptions" ON public.subscriptions;

CREATE POLICY "Admins can manage all subscriptions" ON public.subscriptions FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Contractors can read own subscriptions" ON public.subscriptions FOR SELECT TO authenticated USING (contractor_id = auth.uid());

-- user_roles
DROP POLICY IF EXISTS "Admin can read all user_roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can read own role" ON public.user_roles;
DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;

CREATE POLICY "Admin can read all user_roles" ON public.user_roles FOR SELECT TO public USING (EXISTS (SELECT 1 FROM user_roles user_roles_1 WHERE user_roles_1.user_id = auth.uid() AND user_roles_1.role = 'admin'::app_role));
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can read own role" ON public.user_roles FOR SELECT TO public USING (user_id = auth.uid());
CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
