
-- Step 1: Create enums
CREATE TYPE public.app_role AS ENUM ('admin', 'customer', 'contractor');
CREATE TYPE public.job_status AS ENUM ('open', 'engaged', 'completed', 'archived');
CREATE TYPE public.service_type AS ENUM ('multiple_quotes', 'estimate', 'instant_booking', 'site_assessment', 'inspection');
CREATE TYPE public.quote_status AS ENUM ('pending', 'accepted', 'declined');
CREATE TYPE public.engagement_status AS ENUM ('active', 'completed', 'bad_lead');
CREATE TYPE public.credit_type AS ENUM ('purchase', 'spend', 'refund');
CREATE TYPE public.invoice_status AS ENUM ('paid', 'unpaid');
CREATE TYPE public.invoice_role AS ENUM ('customer', 'contractor');
CREATE TYPE public.subscription_status AS ENUM ('active', 'expired');

-- Step 2: user_roles table (security best practice)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Step 3: Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Step 4: profiles table (shared)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL DEFAULT '',
  mobile TEXT DEFAULT '',
  email TEXT DEFAULT '',
  profile_picture_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Step 5: customer_profiles
CREATE TABLE public.customer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  home_address TEXT DEFAULT '',
  job_address TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;

-- Step 6: contractor_profiles
CREATE TABLE public.contractor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  company_name TEXT DEFAULT '',
  profile_description TEXT DEFAULT '',
  trade_categories TEXT[] DEFAULT '{}',
  company_address TEXT DEFAULT '',
  coverage_radius_km INTEGER DEFAULT 25,
  subscription_status subscription_status DEFAULT 'expired',
  credits_balance INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  documents_submitted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contractor_profiles ENABLE ROW LEVEL SECURITY;

-- Step 7: jobs
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  trade_category TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  budget TEXT DEFAULT '',
  location TEXT DEFAULT '',
  timing TEXT DEFAULT '',
  photo_urls TEXT[] DEFAULT '{}',
  status job_status NOT NULL DEFAULT 'open',
  service_type service_type NOT NULL DEFAULT 'multiple_quotes',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Step 8: quotes
CREATE TABLE public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  contractor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT DEFAULT '',
  amount NUMERIC(10,2) DEFAULT 0,
  status quote_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Step 9: engagements
CREATE TABLE public.engagements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  contractor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  credits_used INTEGER DEFAULT 1,
  status engagement_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.engagements ENABLE ROW LEVEL SECURITY;

-- Step 10: reviews
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  contractor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Step 11: credits_transactions
CREATE TABLE public.credits_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contractor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  type credit_type NOT NULL,
  reference TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.credits_transactions ENABLE ROW LEVEL SECURITY;

-- Step 12: invoices
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role invoice_role NOT NULL DEFAULT 'customer',
  amount NUMERIC(10,2) DEFAULT 0,
  description TEXT DEFAULT '',
  reference_number TEXT DEFAULT '',
  month INTEGER,
  year INTEGER,
  status invoice_status NOT NULL DEFAULT 'unpaid',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Step 13: subscriptions
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contractor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_name TEXT NOT NULL DEFAULT 'basic',
  status subscription_status NOT NULL DEFAULT 'active',
  start_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_date TIMESTAMPTZ
);
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Step 14: notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Step 15: RLS Policies

-- user_roles: users can read own roles, admins can manage all
CREATE POLICY "Users can read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- profiles: users can read/update own, admins can read all
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can read all profiles" ON public.profiles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- customer_profiles
CREATE POLICY "Customers can read own" ON public.customer_profiles
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Customers can update own" ON public.customer_profiles
  FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Customers can insert own" ON public.customer_profiles
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can read all customer profiles" ON public.customer_profiles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- contractor_profiles
CREATE POLICY "Contractors can read own" ON public.contractor_profiles
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Contractors can update own" ON public.contractor_profiles
  FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Contractors can insert own" ON public.contractor_profiles
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can read all contractor profiles" ON public.contractor_profiles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- jobs
CREATE POLICY "Customers can read own jobs" ON public.jobs
  FOR SELECT TO authenticated USING (customer_id = auth.uid());
CREATE POLICY "Customers can insert jobs" ON public.jobs
  FOR INSERT TO authenticated WITH CHECK (customer_id = auth.uid());
CREATE POLICY "Customers can update own jobs" ON public.jobs
  FOR UPDATE TO authenticated USING (customer_id = auth.uid());
CREATE POLICY "Contractors can read open jobs" ON public.jobs
  FOR SELECT TO authenticated USING (status = 'open' AND public.has_role(auth.uid(), 'contractor'));
CREATE POLICY "Admins can manage all jobs" ON public.jobs
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- quotes
CREATE POLICY "Contractors can insert quotes" ON public.quotes
  FOR INSERT TO authenticated WITH CHECK (contractor_id = auth.uid());
CREATE POLICY "Contractors can read own quotes" ON public.quotes
  FOR SELECT TO authenticated USING (contractor_id = auth.uid());
CREATE POLICY "Customers can read quotes on own jobs" ON public.quotes
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.jobs WHERE jobs.id = quotes.job_id AND jobs.customer_id = auth.uid()));
CREATE POLICY "Admins can manage all quotes" ON public.quotes
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- engagements
CREATE POLICY "Contractors can insert engagements" ON public.engagements
  FOR INSERT TO authenticated WITH CHECK (contractor_id = auth.uid());
CREATE POLICY "Contractors can read own engagements" ON public.engagements
  FOR SELECT TO authenticated USING (contractor_id = auth.uid());
CREATE POLICY "Contractors can update own engagements" ON public.engagements
  FOR UPDATE TO authenticated USING (contractor_id = auth.uid());
CREATE POLICY "Customers can read engagements on own jobs" ON public.engagements
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.jobs WHERE jobs.id = engagements.job_id AND jobs.customer_id = auth.uid()));
CREATE POLICY "Admins can manage all engagements" ON public.engagements
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- reviews
CREATE POLICY "Users can read all reviews" ON public.reviews
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Customers can insert reviews" ON public.reviews
  FOR INSERT TO authenticated WITH CHECK (customer_id = auth.uid());
CREATE POLICY "Admins can manage all reviews" ON public.reviews
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- credits_transactions
CREATE POLICY "Contractors can read own credits" ON public.credits_transactions
  FOR SELECT TO authenticated USING (contractor_id = auth.uid());
CREATE POLICY "Admins can manage all credits" ON public.credits_transactions
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- invoices
CREATE POLICY "Users can read own invoices" ON public.invoices
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can manage all invoices" ON public.invoices
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- subscriptions
CREATE POLICY "Contractors can read own subscriptions" ON public.subscriptions
  FOR SELECT TO authenticated USING (contractor_id = auth.uid());
CREATE POLICY "Admins can manage all subscriptions" ON public.subscriptions
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- notifications
CREATE POLICY "Users can read own notifications" ON public.notifications
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can manage all notifications" ON public.notifications
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Step 16: Trigger to auto-create profile + role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _role app_role;
BEGIN
  -- Default role from metadata, fallback to 'customer'
  _role := COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'customer');

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
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Step 17: Storage bucket for job photos
INSERT INTO storage.buckets (id, name, public) VALUES ('job-photos', 'job-photos', true);

-- Storage policies for job-photos bucket
CREATE POLICY "Authenticated users can upload job photos"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'job-photos');

CREATE POLICY "Anyone can view job photos"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'job-photos');

CREATE POLICY "Users can delete own job photos"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'job-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Storage bucket for profile pictures
INSERT INTO storage.buckets (id, name, public) VALUES ('profile-pictures', 'profile-pictures', true);

CREATE POLICY "Authenticated users can upload profile pictures"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'profile-pictures');

CREATE POLICY "Anyone can view profile pictures"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'profile-pictures');

-- Storage bucket for contractor documents
INSERT INTO storage.buckets (id, name, public) VALUES ('contractor-documents', 'contractor-documents', false);

CREATE POLICY "Contractors can upload documents"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'contractor-documents');

CREATE POLICY "Contractors can read own documents"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'contractor-documents' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Admins can read all documents"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'contractor-documents' AND public.has_role(auth.uid(), 'admin'));
