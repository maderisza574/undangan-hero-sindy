-- ========================================================
-- DATABASE SCHEMA SUPABASE (SAFE RE-RUN / IDEMPOTENT)
-- Hero Saksono & Sindy Ayunda Putri
-- ========================================================

-- 1. TABEL DAFTAR TAMU (GUESTS)
CREATE TABLE IF NOT EXISTS public.guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent')),
    generated_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to guests" ON public.guests;
DROP POLICY IF EXISTS "Allow public insert access to guests" ON public.guests;
DROP POLICY IF EXISTS "Allow public update access to guests" ON public.guests;
DROP POLICY IF EXISTS "Allow public delete access to guests" ON public.guests;

CREATE POLICY "Allow public read access to guests" ON public.guests FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to guests" ON public.guests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to guests" ON public.guests FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access to guests" ON public.guests FOR DELETE USING (true);


-- 2. TABEL RSVP & UCAPAN DOA RESTU (RSVP_MESSAGES)
CREATE TABLE IF NOT EXISTS public.rsvp_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    attendance TEXT NOT NULL CHECK (attendance IN ('hadir', 'ragu', 'tidak_hadir')),
    guest_count INT DEFAULT 1,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.rsvp_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to rsvp_messages" ON public.rsvp_messages;
DROP POLICY IF EXISTS "Allow public insert access to rsvp_messages" ON public.rsvp_messages;

CREATE POLICY "Allow public read access to rsvp_messages" ON public.rsvp_messages FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to rsvp_messages" ON public.rsvp_messages FOR INSERT WITH CHECK (true);

-- Enable Realtime Sync
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'guests') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.guests;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'rsvp_messages') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.rsvp_messages;
    END IF;
END $$;
