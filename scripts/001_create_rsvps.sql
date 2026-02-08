-- Create RSVP table for wedding guest registration
CREATE TABLE IF NOT EXISTS public.rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL,
  pax INTEGER NOT NULL DEFAULT 1 CHECK (pax >= 1 AND pax <= 20),
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert RSVPs (public wedding site, no auth required)
CREATE POLICY "allow_public_insert" ON public.rsvps
  FOR INSERT
  WITH CHECK (true);

-- Allow anonymous users to read RSVPs (for confirmation)
CREATE POLICY "allow_public_select" ON public.rsvps
  FOR SELECT
  USING (true);
