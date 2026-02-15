-- Create RSVP table for wedding guest registration
CREATE TABLE IF NOT EXISTS public.rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL,
  pax INTEGER NOT NULL DEFAULT 1 CHECK (pax >= 1 AND pax <= 20),
  phone TEXT,
  attendance_status TEXT NOT NULL DEFAULT 'attend' CHECK (attendance_status IN ('attend', 'not_attending')),
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert RSVPs (public wedding site, no auth required)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'rsvps'
      AND policyname = 'allow_public_insert'
  ) THEN
    CREATE POLICY "allow_public_insert" ON public.rsvps
      FOR INSERT
      WITH CHECK (true);
  END IF;
END $$;

-- Allow anonymous users to read RSVPs (for confirmation)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'rsvps'
      AND policyname = 'allow_public_select'
  ) THEN
    CREATE POLICY "allow_public_select" ON public.rsvps
      FOR SELECT
      USING (true);
  END IF;
END $$;

-- Ensure phone column exists on existing databases
ALTER TABLE public.rsvps
  ADD COLUMN IF NOT EXISTS phone TEXT;

-- Add attendance status for RSVP responses
ALTER TABLE public.rsvps
  ADD COLUMN IF NOT EXISTS attendance_status TEXT NOT NULL DEFAULT 'attend';

-- Ensure status values stay consistent
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'rsvps_attendance_status_check'
  ) THEN
    ALTER TABLE public.rsvps
      ADD CONSTRAINT rsvps_attendance_status_check
      CHECK (attendance_status IN ('attend', 'not_attending'));
  END IF;
END $$;

-- Allow not-attending responses without phone
ALTER TABLE public.rsvps
  ALTER COLUMN phone DROP NOT NULL;
