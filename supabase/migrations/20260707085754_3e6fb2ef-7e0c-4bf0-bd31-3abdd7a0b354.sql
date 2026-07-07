CREATE TABLE public.screening_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL DEFAULT 'l2-network-engineer',
  candidate_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  current_location TEXT NOT NULL,
  qualification TEXT NOT NULL,
  total_experience TEXT NOT NULL,
  relevant_experience TEXT NOT NULL,
  current_company TEXT NOT NULL,
  current_designation TEXT NOT NULL,
  owns_laptop TEXT NOT NULL,
  comfortable_manesar TEXT NOT NULL,
  comfortable_shifts TEXT NOT NULL,
  joining_availability TEXT NOT NULL,
  current_ctc TEXT NOT NULL,
  expected_ctc TEXT NOT NULL,
  comfortable_25k TEXT NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  score INT NOT NULL DEFAULT 0,
  recommendation TEXT NOT NULL DEFAULT 'Pending',
  tab_switches INT NOT NULL DEFAULT 0,
  fullscreen_exits INT NOT NULL DEFAULT 0,
  window_blurs INT NOT NULL DEFAULT 0,
  video_url TEXT,
  video_uploaded BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT screening_submissions_email_unique UNIQUE (email),
  CONSTRAINT screening_submissions_phone_unique UNIQUE (phone)
);

GRANT SELECT ON public.screening_submissions TO authenticated;
GRANT ALL ON public.screening_submissions TO service_role;

ALTER TABLE public.screening_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all screening submissions"
  ON public.screening_submissions
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_screening_submissions_updated_at
  BEFORE UPDATE ON public.screening_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_screening_submissions_created_at ON public.screening_submissions (created_at DESC);
CREATE INDEX idx_screening_submissions_recommendation ON public.screening_submissions (recommendation);